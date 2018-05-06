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

    function getCurrentDateAndTime() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      let hh = today.getHours();
      let min = today.getMinutes();

      dd = add0toTimeValue(dd)
      mm = add0toTimeValue(mm)
      min = add0toTimeValue(min)
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`
    }

    function add0toTimeValue(timeValue) {
      return timeValue < 10 ? '0' + timeValue : timeValue;
    }
    function clearGame(variables) {
      console.log('kasowane')
      let table = document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR)
      return table.firstChild.remove();
    }
    obj = {
      getCollection,
      removeInsertedCellFromCollection,
      clearValue,
      getCurrentDateAndTime,
      clearGame
    }
    return obj;
  }

  Sudoku.helperFunctions = helperFunctions;
  window.Sudoku = Sudoku;
})(window)
