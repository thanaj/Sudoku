(function(window) {
  let Sudoku = window.Sudoku;

  function saveTable( variables, helperFunctions) {
    let obj = {};
    let inputFields = document.querySelectorAll(variables.INPUT_FIELD_SELECTOR);
    inputFields = [...inputFields];

    function getValuesFromFields() {
      let objWithValues = {};
      let obj = {};
      let row;
      let col;
      let date = new Date();

      inputFields.forEach(function(field) {
        if (field.value) {
          row = field.getAttribute(variables.ROW_ATTRIBUTE);
          col = field.getAttribute(variables.COL_ATTRIBUTE);
          value = field.value;
          objWithValues[`row${row}col${col}`] = value;
        }
      })
      obj.value = objWithValues;
      obj.date = helperFunctions.getCurrentDateAndTime()
      return obj;
    }

    function saveInLocalStorage() {
      let objWithValues = getValuesFromFields();
      objWithValues = JSON.stringify(objWithValues);
      localStorage[variables.propInLocalStorage] = objWithValues;
    }

    obj = {
      saveInLocalStorage
    }

    return obj
  }

  Sudoku.saveTable = saveTable;
  window.Sudoku = Sudoku;
})(window)
