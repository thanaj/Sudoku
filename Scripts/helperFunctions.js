(function(window) {
  let Sudoku = window.Sudoku || {};

  function helperFunctions() {
    let obj = {}

    function getCollection(attribute) {
      return [...document.querySelectorAll(attribute)];
    }

    function removeInsertedCellFromCollection(collection, insertedCell) {
      let insertedCellRow = insertedCell.getAttribute('data-target-row');
      let insertedCellCol = insertedCell.getAttribute('data-target-col');
      let collectionWithoutInsertedValue = collection.filter(cell => {
        let cellRow = cell.getAttribute('data-target-row');
        let cellCol = cell.getAttribute('data-target-col');
        return (cellRow !== insertedCellRow || cellCol !== insertedCellCol);
      })
      return collectionWithoutInsertedValue;
    }

    function clearValue(cell) {
      cell.value = '';
    }

    obj = {
      getCollection: getCollection,
      removeInsertedCellFromCollection: removeInsertedCellFromCollection,
      clearValue: clearValue
    }
    return obj;
  }

  Sudoku.helperFunctions = helperFunctions;
  window.Sudoku = Sudoku;
})(window)
