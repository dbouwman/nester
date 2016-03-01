/**
 * nester.js
 *
 * takes an array of objects that have x,y,height,width, component
 * and returns an array of nested row objects with correct bootstrap
 * responsive classes
 */
'use strict';
var _ = require('lodash');
var api = {};
module.exports = api;

// api.convertOld = function(cards){
//   var rows = [], row, col,
//         heightInterval = 60,
//         rowHeight=0,
//         current = {x: null, y: null};
//
//     cards.forEach(function(card){
//       //ensure ints
//       card.x = parseInt(card.x,10);
//       card.y = parseInt(card.y,10);
//       card.height = parseInt(card.height,10);
//       card.width = parseInt(card.width,10);
//       card.offset = 0;
//       if(card.y !== current.y){
//         //create a row
//         row = {
//           cols:[]
//         };
//         //add to rows array
//         rows.push(row);
//         current.x = 0;
//         current.y = card.y;
//       }
//       //copy the card
//       col = JSON.parse(JSON.stringify(card));
//       col.classNames = 'card-debug col-md-' + col.width;
//       //console.log(' column class: ', col.classNames);
//       //if x is not the same as our current x, add an offset
//       if(col.x !== current.x){
//         console.log('::OFFSET: col.x: ' + col.x + ' card.x: ' + card.x + ' cur.x:' + current.x + ' offset: ' +(card.x - current.x));
//         card.offset =  (card.x - current.x);
//         col.classNames = col.classNames + ' col-sm-offset-' + (card.x - current.x);
//         //console.log(' column class with offset: ', col.classNames);
//       }
//       //set the height for styling
//       col.minHeight = card.height * heightInterval;
//
//       //push the col/card into the cols array
//       row.cols.push(col);
//
//       current.x += card.width + card.offset;
//
//     });
//
//     return rows;
// };

api.convert = function(cards){
  return api.getRows(cards);
  //return api.convertOld(cards);
};

// api.logCard= function(card){
//   console.log(' card: x: ' + card.x + ' y:' + card.y + ' h:' + card.height + ' w:' + card.width);
// };


// api.maxHeightInRow = function(cards, row){
//   var heights = cards.map(function(card){
//     if(card.y === row){
//       return card.height;
//     }else{
//       return 0;
//     }
//   });
//   return api._max(heights);
// };


api._max = function(ar){
  var max = ar[0];
  ar.forEach(function(v){
    if(v > max){
      max = v;
    }
  });
  return max;
};

api._min = function(ar){
  var min = ar[0];
  ar.forEach(function(v){
    if(v < min){
      min = v;
    }
  });
  return min;
};

/**
 * Return an array of row objects given an array of cardsInRow
 * @param  {Array} cards Array of cards
 * @return {Array}       Array of Rows / Columns
 */
api.getRows = function(cards, isNested, nestingWidth){
  //give the cards, find the row breaks, and then get the row
  var startY = 0,
      remainingCards = cards,
      rows = [];
 isNested = isNested || false;

 while(remainingCards.length){
   console.info('Looking for rows starting at Y:' + startY);
   var output = api.getRow(remainingCards, startY);
   if(output){
     console.info('   ' + output.cardsInRow.length + ' cards in row');
     //do something to cook columns here
     rows.push({cols: api.getColumns(output.cardsInRow, isNested, nestingWidth)});
     startY = output.maxY;
     console.info('   ' + output.remainingCards.length + ' cards left');
     remainingCards = output.remainingCards;
   }
 }
 console.log('Returning:');
 console.log(JSON.stringify(rows));
 return rows;
};

/**
 * Return array of columns, with contained cards
 * as well as an array of remaining cards
 */
api.getColumns = function(cards, isNested, nestingWidth){
   var startX = 0,
    remainingCards = cards,
    offset = 0,
    cols=[];
    isNested = isNested || false;

  while(remainingCards.length){
    var output = api.getColumn(remainingCards, startX, isNested, nestingWidth);
    if(output.col){
      cols.push(output.col);
      offset = 0;
    }else{
      offset = output.maxX;
    }

    startX = output.maxX;
    remainingCards = output.remainingCards;
  }

  return cols;
};

api.getColumn = function(cards, startX, isNested, nestingWidth){
  console.log('Looking for column starting at x: ' + startX + ' isNested: ' + isNested + ' nestingWidth: ' + nestingWidth);
  var colBreakX = startX,
      check = false,
      cont = true,
      everIntersected = false,
      offset = 0,
      colCard;

  //Iteratively look for intersections
  //we are actually looking for "misses" i.e. "gaps" in the layout where we split things into columns
  while( cont ){
    //console.log('   Checking for X intersection at ' + colBreakX + ' offset: ' + offset);
    check = api.checkXIntersection(cards,colBreakX);
    //if we got an intersection...
    if(check){
      //and we've never gotten one before
      if(!everIntersected){
        //console.log('   Found first X intersection at ' + colBreakX + ' offset: ' + offset);
        everIntersected = true;
      }
      //increment the colBreakX so we keep looking
      colBreakX++;
    }else{
      //if we get a 'miss', have we ever intersected anything?
      if(!everIntersected){
        //console.log('   No X intersection at ' + colBreakX + ' and no intersection found yet...');
        if(!isNested && colBreakX > startX){
          offset++;
        }
        colBreakX++;
      }else{
        //ok we have the col break we want
        //console.log('   Column break found at ' + colBreakX);
        cont = false;
      }
    }
  }
  console.log('Found Col break at ' + colBreakX + ' offset: ' + offset);
  //return the cards that are in this row
  var cardsInColumn = api.cardsInXRange(cards, startX, colBreakX);
  //console.log('CARDS IN COL: ' + JSON.stringify(cardsInColumn));
  if(cardsInColumn.length){
    if(cardsInColumn.length === 1){
      colCard = api.addClassesToCard(cardsInColumn[0], offset, nestingWidth);
    }else{
      //nested! need to create a column object with classes
      //amd then get rows to inject into it
      colCard = {};

      //Need to get the max width of the "top" row in the cardsInColumn
      //So, get the minY value out of the cards to get the top row
      var minYInCards = api._min(cardsInColumn.map(function(card){return card.y;}));
      var totalWidthCardsWithMinY = _.sum(cardsInColumn.map(function(card){
        if(card.y === minYInCards){
          return card.width;
        }
      }));
      console.log('=====> TOTAL WIDTH IN THIS BLOCK: ' + totalWidthCardsWithMinY);
      colCard.width = totalWidthCardsWithMinY;
      api.addClassesToCard(colCard, offset);
      //cut up the cards in this column into rows
      colCard.rows = api.getRows(cardsInColumn, true, totalWidthCardsWithMinY);
    }
  }else{
    //no cards found using that break
    console.log('NO CARDS FOUND IN RANGE')
  }

  //console.log('CARD: ' + JSON.stringify(colCard));
  return {
    maxX: colBreakX,
    col: colCard,
    remainingCards: api.cardsNotInXRange(cards, startX, colBreakX)
  };
};


api.addClassesToCard = function(card, offset, nestingWidth){
  var width = card.width;
  //This logic has holes - in order to correctly determine the widths
  //for a nested row, we need to know all the column widths, and then
  //normalize those vs 12. We don't know that so this attempts to
  if(nestingWidth){

    width = 12 * (card.width / nestingWidth);
    if(width > 6){
      width = Math.round(width);
    }else{
      width = Math.floor(width);
    }
    console.log('**** NESTING WIDTH ' + nestingWidth + ' card width: ' + card.width + ' class: col-md-' + width);
  }
  card.classNames = 'card-debug col-md-' + width;
  card.minHeight = card.height * 60;
  if(offset){
    card.classNames = card.classNames + ' col-sm-offset-' + offset;
  }
  return card;
};

/**
 * Return a row of all cards that are in a row
 * @param  {array} cards Array of Card objects
 * @return {object}       {row: {x,y,h,w,}, cards:[]}
 */
api.getRow = function(cards, startY){
  var rowBreakY = startY + 1;

  //incremment Y looking for a break
  while(api.checkYIntersection(cards, rowBreakY)){
    rowBreakY++;
  }
  console.info('  rowBreakY:' + rowBreakY);
  //return the cards that are in this row
  return {
    maxY: rowBreakY,
    cardsInRow: api.cardsInYRange(cards, startY, rowBreakY),
    remainingCards: api.cardsNotInYRange(cards, startY, rowBreakY)
  };
};

api.checkYIntersection=function(cards, y){
  //we will always have an inttersection at 0 because its the top
  //of the stack, so bump to 1;

  return cards.some(function(card){
    //console.log('y: ' + y + ' c.y: ' + card.y + ' c.y + c.h: ' + (card.y + card.height));
    return (card.y < y && (card.y + card.height) > y)
  });
};



api.checkXIntersection=function(cards, x){
  return cards.some(function(card){
    //console.log('x: ' + x + ' c.x: ' + card.x + ' c.x + c.w: ' + (card.x + card.width));
    return (card.x < x && (card.x + card.width) > x)
  });
}



api.cardsInXRange = function(cards, xmin, xmax){
  var out =  _.filter(cards, function(card){
    //console.log('card.y: ' + card.y + ' ymin: ' + ymin + ' (card.y + card.height):' + (card.y + card.height) + ' ' + ymax);
    return (card.x >= xmin && (card.x + card.width) <= xmax );
  });
  return out;
};

api.cardsNotInXRange = function(cards, xmin, xmax){
  var out =  _.filter(cards, function(card){
    //console.log('card.y: ' + card.y + ' ymin: ' + ymin + ' (card.y + card.height):' + (card.y + card.height) + ' ' + ymax);
    return (card.x >= xmax || (card.x + card.width) <= xmin );
  });
  return out;
};


/**
 * Return cards that are between ymin, ymax
 */
api.cardsInYRange = function(cards, ymin, ymax){
  var out =  _.filter(cards, function(card){
    //console.log('card.y: ' + card.y + ' ymin: ' + ymin + ' (card.y + card.height):' + (card.y + card.height) + ' ' + ymax);
    return (card.y >= ymin && (card.y + card.height) <= ymax );
  });
  //console.log('OUT: ', out);
  return out;
};
api.cardsNotInYRange = function(cards, ymin, ymax){
  var out =  _.filter(cards, function(card){
    //console.log('card.y: ' + card.y + ' >= ' + ymax + ' (card.y + card.height):' + (card.y + card.height) + ' <=' + ymin);
    return ( card.y >= ymax || (card.y + card.height) <= ymin  );
  });
  //console.log('OUT: ', out);
  return out;
};
