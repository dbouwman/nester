/**
 * nester.spec.js
 */
'use strict';


var nester = require('../nester'),
    chai = require('chai');

var expect = chai.expect;

describe('nester : ', function () {
  var layout, output;

  describe('one row : ', function () {

    describe('one col', function () {
      beforeEach(function () {
        layout = [ { "x": 0, "y": 0, "width": 12, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } } ];
        output = nester.convert(layout);
      });

      it('should have one row ', function () {
        expect(output.length).to.equal(1);
      });
      it('row should have one col-md-12', function () {
        expect(output[0].cols.length).to.equal(1);
        expect(output[0].cols[0].classNames).to.contain('col-md-12');
      });
    });

    describe('two cols :', function () {
      beforeEach(function () {
        layout = [
          { "x": 0, "y": 0, "width": 6, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
          { "x": 6, "y": 0, "width": 6, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });

      it('should have one row ', function () {
        expect(output.length).to.equal(1);
      });

      it('should have two col-md-6', function () {
        expect(output[0].cols.length).to.equal(2);
        expect(output[0].cols[0].classNames).to.contain('col-md-6');
        expect(output[0].cols[1].classNames).to.contain('col-md-6');
      });
    });

    describe('two cols with offsets :', function () {

      beforeEach(function () {
        layout = [
          { "x": 1, "y": 0, "width": 3, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
          { "x": 6, "y": 0, "width": 3, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });

      it('should have one row ', function () {
        expect(output.length).to.equal(1);
      });
      it('should have two cols', function () {
        expect(output[0].cols.length).to.equal(2);
      });
      it('first col: col-sm-offset 1, width:3', function () {
        expect(output[0].cols[0].classNames).to.contain('col-sm-offset-1');
        expect(output[0].cols[0].classNames).to.contain('col-md-3');
      });
      it('second col: col-sm-offset 1, width:3', function () {
        expect(output[0].cols[1].classNames).to.contain('col-sm-offset-2');
        expect(output[0].cols[1].classNames).to.contain('col-md-3');
      });

    });

    describe('two cols with more offsets', function () {

      beforeEach(function () {
        layout = [
          { "x": 0, "y": 0, "width": 3, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
          { "x": 9, "y": 0, "width": 3, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });

      it('should have one row ', function () {
        expect(output.length).to.equal(1);
      });
      it('should have two cols', function () {
        expect(output[0].cols.length).to.equal(2);
      });
      it('first col: no offset width:3', function () {
        expect(output[0].cols[0].classNames).not.to.contain('col-sm-offset');
        expect(output[0].cols[0].classNames).to.contain('col-md-3');
      });
      it('second col: col-sm-offset 6, width:3', function () {
        expect(output[0].cols[1].classNames).to.contain('col-sm-offset-6');
        expect(output[0].cols[1].classNames).to.contain('col-md-3');
      });
    });

  }); //one row


  describe('two rows', function () {

    describe('one col per row', function () {
      beforeEach(function () {
        layout = [
          { "x": 0, "y": 0, "width": 12, "height": 4, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 4, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });

      it('should have two rows ', function () {
        expect(output.length).to.equal(2);
      });
      it('rows should have one col-md-12', function () {
        output.forEach(function(row){
          expect(row.cols.length).to.equal(1);
          expect(row.cols[0].classNames).to.contain('col-md-12');
        });
      });
    });//one col per row

    describe('r1: c,c,c r2:c,c', function () {
      beforeEach(function () {
        layout = [
          { "x": 0, "y": 0, "width": 4, "height": 4, "component": { "name": "placeholder-card" } },
          { "x": 4, "y": 0, "width": 4, "height": 4, "component": { "name": "placeholder-card" } },
          { "x": 8, "y": 0, "width": 4, "height": 4, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 4, "width": 6, "height": 4, "component": { "name": "placeholder-card" } },
          { "x": 6, "y": 4, "width": 6, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });
      it('should have two rows ', function () {
        expect(output.length).to.equal(2);
      });
      it('row 1 has 3 col-md-4', function () {
        expect(output[0].cols.length).to.equal(3);
        output[0].cols.forEach(function(col){
          expect(col.classNames).to.contain('col-md-4');
        });
      });
      it('row 2 has 2 col-md-6', function () {
        expect(output[1].cols.length).to.equal(2);
        output[1].cols.forEach(function(col){
          expect(col.classNames).to.contain('col-md-6');
        });
      });

    });

    describe('r1: c,o,c r2:o,c', function () {
      beforeEach(function () {
        layout = [
          { "x": 0, "y": 0, "width": 4, "height": 4, "component": { "name": "placeholder-card" }},
          { "x": 8, "y": 0, "width": 4, "height": 4, "component": { "name": "placeholder-card" } },
          { "x": 6, "y": 4, "width": 6, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });
      it('should have two rows ', function () {
        expect(output.length).to.equal(2);
      });
      it('row 1 has 2 col-md-4 with an offset', function () {
        expect(output[0].cols.length).to.equal(2);
        expect(output[0].cols[0].classNames).to.contain('col-md-4');
        expect(output[0].cols[1].classNames).to.contain('col-md-4');
        expect(output[0].cols[1].classNames).to.contain('col-sm-offset-4');
      });
      it('row 2 has offset and col-md-6', function () {
        expect(output[1].cols.length).to.equal(1);
        expect(output[1].cols[0].classNames).to.contain('col-md-6');
        expect(output[1].cols[0].classNames).to.contain('col-sm-offset-6');
      });


    });


  });//two rows

  describe('nesting: ', function () {

    /**
     * |------| |-------|
     * |      | |       |
     * |      | |-------|
     * |      | |       |
     * |------| |-------|
     */
    describe('simple nesting', function () {
      beforeEach(function () {
        layout = [
          { "x": 0, "y": 0, "width": 6, "height": 8, "id": "ONE", "component": { "name": "placeholder-card" } },
          { "x": 6, "y": 4, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" } },
          { "x": 6, "y": 0, "width": 6, "height": 4, "id": "THR", "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });

      it('should have one row', function () {
        expect(output.length).to.equal(1);
      });
      it('first col should be col-md-6', function () {
        expect(output[0].cols[1].rows).not.to.be.defined;
        expect(output[0].cols[1].classNames).to.contain('col-md-6');
      });
      it('second col should be col-md-6 no offset', function () {
        var col = output[0].cols[1];
        expect(col.classNames).to.contain('col-md-6');
        expect(col.classNames).not.to.contain('offset');
      });
      it('second col should have nested row with two entries', function () {
        var col = output[0].cols[1];
        expect(col.rows).to.be.defined;
        expect(col.rows.length).to.equal(2);
      });
      it('nested row, col 0, should not have an offset', function () {
        var col = output[0].cols[1].rows[0].cols[0];
        expect(col.classNames).not.to.contain('offset');
      });
      it('nested row, col 0, should be col-md-12', function () {
        var col = output[0].cols[1].rows[0].cols[0];
        expect(col.classNames).to.contain('col-md-12');
      });

    });

    describe('multi-column nesting : ', function () {
      /**
       * |----| |---------|
       * |    | |  5  | 3 |
       * |  4 | |---------|
       * |    | |  6   |2 |
       * |----| |---------|
       */
      beforeEach(function () {
        layout = [
          { "x": 9, "y": 0, "width": 3, "height": 4,  "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 0, "width": 4, "height": 8,  "component": { "name": "placeholder-card" } },
          { "x": 4, "y": 0, "width": 5, "height": 4,  "component": { "name": "placeholder-card" } },
          { "x": 4, "y": 4, "width": 6, "height": 4,  "component": { "name": "placeholder-card" } },
          { "x": 10, "y": 4, "width": 2, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });
      it('should have one row', function () {
        expect(output.length).to.equal(1);
      });
      it('first col should be col-md-4', function () {
        var col = output[0].cols[0];
        expect(col.rows).not.to.be.defined;
        expect(col.classNames).to.contain('col-md-4');
      });
      it('second col should be col-md-8 no offset', function () {
        var col = output[0].cols[1];
        expect(col.classNames).to.contain('col-md-8');
        expect(col.classNames).not.to.contain('offset');
      });
      it('nested row 0, col 0 should be col-md-8', function () {
        var col = output[0].cols[1].rows[0].cols[0];
        expect(col.classNames).to.contain('col-md-8');
      });
      it('nested row 0, col 1 should be col-md-4', function () {
        var col = output[0].cols[1].rows[0].cols[1];
        expect(col.classNames).to.contain('col-md-4');
      });
      it('nested row 1, col 0 should be col-md-9', function () {
        var col = output[0].cols[1].rows[1].cols[0];
        expect(col.classNames).to.contain('col-md-9');
      });
      it('nested row 1, col 1 should be col-md-3', function () {
        var col = output[0].cols[1].rows[1].cols[1];
        expect(col.classNames).to.contain('col-md-3');
      });


    });

    xdescribe('multi-column nesting with offsets : ', function () {
      /**
       * |----|       |---|
       * | 4  |       | 3 |
       * |    | |-----|---|
       * |    | |  6   |2 |
       * |----| |---------|
       */
      beforeEach(function () {
        layout = [
          { "x": 9, "y": 0, "width": 3, "height": 4,  "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 0, "width": 4, "height": 8,  "component": { "name": "placeholder-card" } },
          { "x": 4, "y": 4, "width": 6, "height": 4,  "component": { "name": "placeholder-card" } },
          { "x": 10, "y": 4, "width": 2, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.convert(layout);
      });
      it('should have one row', function () {
        expect(output.length).to.equal(1);
      });
      it('first col should be col-md-4', function () {
        var col = output[0].cols[0];
        expect(col.rows).not.to.be.defined;
        expect(col.classNames).to.contain('col-md-4');
      });
      it('second col should be col-md-8 no offset', function () {
        var col = output[0].cols[1];
        expect(col.classNames).to.contain('col-md-8');
        expect(col.classNames).not.to.contain('offset');
      });

    });


  });


  describe('getRows :', function () {

    describe('simple rows :', function () {
      beforeEach(function () {
        layout = [
          { "x": 4, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
          { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
        ];
        output = nester.getRows(layout);

      });

      it('should get two rows', function () {
        expect(output.length).to.equal(2);
      });
      it('first row should have 3 cols', function () {
        expect(output[0].cols.length).to.equal(3);
      });
      it('first row: first col should have min-height 8 * 60', function () {
        expect(output[0].cols[0].minHeight).to.be.defined;
        expect(output[0].cols[0].minHeight).to.equal(8 * 60);
      });
      it('first row: third col should have min-height 3 * 60', function () {
        expect(output[0].cols[2].minHeight).to.be.defined;
        expect(output[0].cols[2].minHeight).to.equal(3 * 60);
      });
      it('second row should have 1 col', function () {
        expect(output[1].cols.length).to.equal(1);
      });
      it('second row: first col should have min-height 4 * 60', function () {
        expect(output[1].cols[0].minHeight).to.be.defined;
        expect(output[1].cols[0].minHeight).to.equal(4 * 60);
      });
      it('second row: first col should have classNames', function () {
        expect(output[1].cols[0].classNames).to.be.defined;
        expect(output[1].cols[0].classNames).to.contain('col-md-12');
      });

    });

    describe('non-simple rows', function () {

    });
  });

  describe('helpers :', function () {

    describe('checkXIntersection', function () {

      describe('simple rows', function () {
        beforeEach(function () {
          layout = [
                  { "x": 0, "y": 0, "width": 12, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
                  { "x": 0, "y": 4, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" } },
                  { "x": 6, "y": 4, "width": 6, "height": 4, "id": "THREE", "component": { "name": "placeholder-card" } }
                ];
        });
        it('should not intersect on 0,12', function () {
          expect(nester.checkXIntersection(layout, 0)).to.be.false;
          expect(nester.checkXIntersection(layout, 12)).to.be.false;
        });
        it('should intersect on 1,2,3,4,5,6,7,8,9,10,11', function () {
          expect(nester.checkXIntersection(layout, 1)).to.be.true;
          expect(nester.checkXIntersection(layout, 2)).to.be.true;
          expect(nester.checkXIntersection(layout, 3)).to.be.true;
          expect(nester.checkXIntersection(layout, 4)).to.be.true;
          expect(nester.checkXIntersection(layout, 5)).to.be.true;
          expect(nester.checkXIntersection(layout, 6)).to.be.true;
          expect(nester.checkXIntersection(layout, 7)).to.be.true;
          expect(nester.checkXIntersection(layout, 8)).to.be.true;
          expect(nester.checkXIntersection(layout, 9)).to.be.true;
          expect(nester.checkXIntersection(layout, 10)).to.be.true;
          expect(nester.checkXIntersection(layout, 11)).to.be.true;
        });
      });

      describe('simple nested-rows', function () {
        beforeEach(function () {
          layout = [
             { "x": 0, "y": 0, "width": 6, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" }},
             { "x": 0, "y": 4, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" }},
             { "x": 6, "y": 0, "width": 6, "height": 8, "id": "THR", "component": { "name": "placeholder-card" }}
           ];
        });
        it('should not intersect on 0,6,12', function () {
          expect(nester.checkXIntersection(layout, 0)).to.be.false;
          expect(nester.checkXIntersection(layout, 6)).to.be.false;
          expect(nester.checkXIntersection(layout, 12)).to.be.false;
        });
        it('should intersect on 1,2,3,4,5,7,8,9,10,11', function () {
          expect(nester.checkXIntersection(layout, 1)).to.be.true;
          expect(nester.checkXIntersection(layout, 2)).to.be.true;
          expect(nester.checkXIntersection(layout, 3)).to.be.true;
          expect(nester.checkXIntersection(layout, 4)).to.be.true;
          expect(nester.checkXIntersection(layout, 5)).to.be.true;

          expect(nester.checkXIntersection(layout, 7)).to.be.true;
          expect(nester.checkXIntersection(layout, 8)).to.be.true;
          expect(nester.checkXIntersection(layout, 9)).to.be.true;
          expect(nester.checkXIntersection(layout, 10)).to.be.true;
          expect(nester.checkXIntersection(layout, 11)).to.be.true;
        });
      });

    });

    describe('checkYIntersection :', function () {

      describe('simple rows :', function () {
        beforeEach(function () {
          layout = [
                  { "x": 0, "y": 0, "width": 12, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
                  { "x": 0, "y": 4, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" } },
                  { "x": 6, "y": 4, "width": 6, "height": 4, "id": "THREE", "component": { "name": "placeholder-card" } }
                ];
        });
        it('should not intersect on 0', function () {
          expect(nester.checkYIntersection(layout, 0)).to.be.false;
        });
        it('should intersect on 1', function () {
          expect(nester.checkYIntersection(layout, 1)).to.be.true;
        });
        it('should intersect on 2', function () {
          expect(nester.checkYIntersection(layout, 2)).to.be.true;
        });
        it('should intersect on 3', function () {
          expect(nester.checkYIntersection(layout, 3)).to.be.true;
        });
        it('should not intersect on 4, 8', function () {
          expect(nester.checkYIntersection(layout, 4)).to.be.false;
          expect(nester.checkYIntersection(layout, 8)).to.be.false;
        });
        it('should intersect on 5', function () {
          expect(nester.checkYIntersection(layout, 5)).to.be.true;
        });
        it('should intersect on 6', function () {
          expect(nester.checkYIntersection(layout, 6)).to.be.true;
        });
        it('should intersect on 7', function () {
          expect(nester.checkYIntersection(layout, 7)).to.be.true;
        });
      });

      describe('tall row', function () {
        beforeEach(function () {
          layout = [
            { "x": 0, "y": 0, "width": 6, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
             { "x": 0, "y": 4, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" } },
             { "x": 6, "y": 0, "width": 6, "height": 8, "id": "THREE", "component": { "name": "placeholder-card" }},
             { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
           ];
        });

        it('should not intersect on 0, 8,12', function () {
          expect(nester.checkYIntersection(layout, 0)).to.be.false;
          expect(nester.checkYIntersection(layout, 8)).to.be.false;
          expect(nester.checkYIntersection(layout, 12)).to.be.false;
        });
        it('should intersect on 1,2,3,4,5,6,7,9,10,11', function () {
          expect(nester.checkYIntersection(layout, 1)).to.be.true;
          expect(nester.checkYIntersection(layout, 2)).to.be.true;
          expect(nester.checkYIntersection(layout, 3)).to.be.true;
          expect(nester.checkYIntersection(layout, 4)).to.be.true;
          expect(nester.checkYIntersection(layout, 5)).to.be.true;
          expect(nester.checkYIntersection(layout, 6)).to.be.true;
          expect(nester.checkYIntersection(layout, 7)).to.be.true;
          expect(nester.checkYIntersection(layout, 9)).to.be.true;
          expect(nester.checkYIntersection(layout, 10)).to.be.true;
          expect(nester.checkYIntersection(layout, 11)).to.be.true;
        });
      });

    });

    describe('getColumns:', function () {

      describe('single column layout :', function () {
        beforeEach(function () {
          layout = [
            { "x": 0, "y": 0, "width": 12, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } }
          ];
          output = nester.getColumns(layout);
        });
        it('should return one column object', function () {
          expect(output.length).to.equal(1);
        });
        it('column object should have classNames', function () {
          expect(output[0].classNames).to.be.defined;
        });

      });
      describe('two column layout :', function () {
        beforeEach(function () {
          layout = [
            { "x": 0, "y": 0, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" } },
            { "x": 6, "y": 0, "width": 6, "height": 4, "id": "THREE", "component": { "name": "placeholder-card" } }
          ];
          output = nester.getColumns(layout);
        });
        it('should return two column objects', function () {
          expect(output.length).to.equal(2);
        });
        it('column objects should have classNames', function () {
          expect(output[0].classNames).to.be.defined;
          expect(output[1].classNames).to.be.defined;
        });
      });

      describe('two column with offsets :', function () {
        beforeEach(function () {
          layout = [
            { "x": 1, "y": 0, "width": 5, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
            { "x": 7, "y": 0, "width": 4, "height": 4, "id": "THREE", "component": { "name": "placeholder-card" } }
          ];
          output = nester.getColumns(layout);
        });
        it('should return two columns', function () {
          expect(output.length).to.equal(2);
        });
        it('first col should have offset of 1', function () {
          expect(output[0].classNames).to.contain('col-sm-offset-1');
        });
        it('second col should have offset of 1', function () {
          expect(output[1].classNames).to.contain('col-sm-offset-1');
        });
      });

      describe('column with nested rows', function () {
        beforeEach(function () {
          layout = [
            { "x": 0, "y": 0, "width": 6, "height": 8, "id": "ONE", "component": { "name": "placeholder-card" } },
            { "x": 6, "y": 2, "width": 6, "height": 6, "id": "TWO", "component": { "name": "placeholder-card" } },
            { "x": 6, "y": 0, "width": 6, "height": 2, "id": "THR", "component": { "name": "placeholder-card" } }
          ];
          output = nester.getColumns(layout);
        });
        it('should return two columns', function () {
          expect(output.length).to.equal(2);
        });
        it('first col should be a normal column', function () {
          expect(output[0].classNames).to.contain('col-md-6');
        });
        it('second col should have classNames', function () {
          expect(output[1].classNames).to.contain('col-md-6');
        });
        it('second col should have row array length 2', function () {
          expect(output[1].rows.length).to.equal(2);
        });
      });

    });

    describe('getRow :', function () {
      beforeEach(function () {
        layout = [
          { "x": 4, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
          { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
        ];
      });
      it('gets first row with 3 cards starting at 0', function () {
        output = nester.getRow(layout, 0);
        expect(output.maxY).to.equal(8);
        expect(output.cardsInRow.length).to.equal(3);
        expect(output.remainingCards.length).to.equal(1);
      });
      it('gets second row with one card starting at 8', function () {
        output = nester.getRow(layout, 8);
        expect(output.maxY).to.equal(12);
        expect(output.cardsInRow.length).to.equal(1);
        expect(output.remainingCards.length).to.equal(3);
      });
    });

    describe('getColumn :', function () {
      describe('one row, simple columns', function () {
        beforeEach(function () {
          layout = [
            { "x": 4, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
            { "x": 0, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
            { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } }
          ];
        });
        it('should return one col starting at 0', function () {
          output = nester.getColumn(layout, 0);
          expect(output.col).to.be.defined;
          expect(output.col.classNames).to.be.defined;
          expect(output.maxX).to.equal(4);
          expect(output.remainingCards.length).to.equal(2);
        });
        it('should return one col starting at 4', function () {
          output = nester.getColumn(layout, 4);
          expect(output.col).to.be.defined;
          expect(output.col.classNames).to.be.defined;
          expect(output.maxX).to.equal(8);
          expect(output.remainingCards.length).to.equal(2);
        });
      });
      describe('one row, nested rows in second column', function () {
        beforeEach(function () {
          layout = [
            { "x": 0, "y": 0, "width": 6, "height": 8, "id": "ONE", "component": { "name": "placeholder-card" } },
            { "x": 6, "y": 4, "width": 6, "height": 4, "id": "TWO", "component": { "name": "placeholder-card" } },
            { "x": 6, "y": 0, "width": 6, "height": 4, "id": "THREE", "component": { "name": "placeholder-card" }}
          ];
        });

        it('should return one col starting at 0', function () {
          output = nester.getColumn(layout, 0);
          expect(output.col).to.be.defined;
          expect(output.col.classNames).to.be.defined;
          expect(output.maxX).to.equal(6);
          expect(output.remainingCards.length).to.equal(2);
        });

        xit('should return col with nested rows and cols starting at 4', function () {

        });
      });
      describe('one row, two cols with offsets :', function () {
        beforeEach(function () {
          layout = [
            { "x": 1, "y": 0, "width": 5, "height": 4, "id": "ONE", "component": { "name": "placeholder-card" } },
            { "x": 8, "y": 0, "width": 3, "height": 4, "id": "THREE", "component": { "name": "placeholder-card" } }
          ];

        });
        it('starting at 0, return col w offset of 1', function () {
          output = nester.getColumn(layout,0);
          expect(output.col.classNames).to.contain('col-sm-offset-1');
        });
        it('starting at 6, return col w offset of 2', function () {
          output = nester.getColumn(layout,6);
          expect(output.col.classNames).to.contain('col-sm-offset-2');
        });
      });
    });


    describe('y range functions', function () {
      beforeEach(function () {
        layout = [
          { "x": 4, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
          { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
        ];
      });
      it('returns cards in y range 0,8', function () {
        output = nester.cardsInYRange(layout, 0,8);
        expect(output.length).to.equal(3);
      });
      it('returns cards not in y range 0,8', function () {
        output = nester.cardsNotInYRange(layout, 0, 8);
        expect(output.length).to.equal(1);
        expect(output[0].width).to.equal(12);
      });
      it('returns cards in y range 8,12', function () {
        output = nester.cardsInYRange(layout, 8,12);
        expect(output.length).to.equal(1);
        expect(output[0].width).to.equal(12);
      });
      it('returns cards not in y range 8,12', function () {
        output = nester.cardsNotInYRange(layout, 8, 12);
        expect(output.length).to.equal(3);
      });
    });

    describe('x range functions', function () {
      beforeEach(function () {
        layout = [
          { "x": 4, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
          { "x": 0, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
          { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } }
        ];
      });
      it('returns cards in x range 0,4', function () {
        output = nester.cardsInXRange(layout, 0,4);
        expect(output.length).to.equal(1);
      });
      it('returns cards not in x range 0,4', function () {
        output = nester.cardsNotInXRange(layout, 0, 4);
        expect(output.length).to.equal(2);
        expect(output[0].width).to.equal(4);
      });
      it('returns cards in x range 4,12', function () {
        output = nester.cardsInXRange(layout, 4,12);
        expect(output.length).to.equal(2);
        expect(output[0].width).to.equal(4);
      });
      it('returns cards not in y range 4,12', function () {
        output = nester.cardsNotInXRange(layout,4, 12);
        expect(output.length).to.equal(1);
      });
    });

    // describe('maxHeight ', function () {
    //
    //   it('first row is tallest', function () {
    //     layout = [
    //       { "x": 4, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
    //       { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
    //     ];
    //     output = nester.maxHeightInRow(layout,0);
    //     expect(output).to.equal(8);
    //   });
    //
    //   it('second is tallest', function () {
    //     layout = [
    //       { "x": 4, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
    //       { "x": 8, "y": 0, "width": 4,  "height": 3, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
    //     ];
    //     output = nester.maxHeightInRow(layout,0);
    //     expect(output).to.equal(8);
    //     var chk = nester.cardsInYRange(layout, 0,8);
    //     expect(chk.length).to.equal(3);
    //   });
    //   it('last is tallest', function () {
    //     layout = [
    //       { "x": 4, "y": 0, "width": 4,  "height": 4, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 0, "width": 4,  "height": 6, "component": { "name": "placeholder-card" } },
    //       { "x": 8, "y": 0, "width": 4,  "height": 8, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 8, "width": 12, "height": 4, "component": { "name": "placeholder-card" } }
    //     ];
    //     output = nester.maxHeightInRow(layout,0);
    //     expect(output).to.equal(8);
    //     output = nester.cardsInYRange(layout, 0,8);
    //     expect(output.length).to.equal(3);
    //     output = nester.maxHeightInRow(layout, 2);
    //     expect(output).to.equal(0);
    //     expect(nester.cardsInYRange(layout, 0,4).length).to.equal(1);
    //   });
    //
    //   it('two rows', function () {
    //     layout = [
    //       { "x": 0, "y": 0,  "width": 6, "height": 4, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 4,  "width": 6, "height": 4, "component": { "name": "placeholder-card" } },
    //       { "x": 6, "y": 0,  "width": 6, "height": 8, "component": { "name": "placeholder-card" } },
    //       { "x": 0, "y": 8,  "width": 6, "height": 8, "component": { "name": "placeholder-card" } },
    //       { "x": 6, "y": 8,  "width": 6, "height": 4, "component": { "name": "placeholder-card" } },
    //       { "x": 6, "y": 12, "width": 6, "height": 4, "component": { "name": "placeholder-card" }}
    //     ];
    //     output = nester.maxHeightInRow(layout,0);
    //     expect(output).to.equal(8);
    //     output = nester.cardsInYRange(layout, 0,8);
    //     expect(output.length).to.equal(3);
    //     output = nester.maxHeightInRow(layout,8);
    //     expect(output).to.equal(8);
    //     output = nester.cardsInYRange(layout, 8,16);
    //     expect(output.length).to.equal(3);
    //   });
    //
    // });

    //end
  });


});
