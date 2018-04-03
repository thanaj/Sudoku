(function(window) {
  'use strict'
  var Sudoku = window.Sudoku || {};
  var Interaction  = {



  }



  function clearValue(cell) {
    cell.value = '';
  }

  function getCollection(attribute) {
    return document.querySelectorAll(attribute);
  }

  function removeInsertedCellFromCollection(collection, insertedCell) {
    let insertedCellRow = insertedCell.getAttribute('data-target-row');
    let insertedCellCol = insertedCell.getAttribute('data-target-col');
    return collection.filter(function(cell) {
      let cellRow = cell.getAttribute('data-target-row');
      let cellCol = cell.getAttribute('data-target-col');
      return cellRow !== insertedCellRow && cellCol !== insertedCellCol;
    })
  }

  function getInsertedValue(cell) {

  }

  function checkCollection(collection, insertedValue) {
    return collection.some(function(cell) {
      return cell.value !== insertedValue;
    })
  }

  function giveRed(cell) {

  }


  Sudoku.Interaction  = Interaction
  window.Sudoku = Sudoku;
})(window);
