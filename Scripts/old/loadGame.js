(function(window) {
  let Sudoku = window.Sudoku;

  //let localStorage = window.localStorage

  function loadGame(variables, localStorage){
    let obj = {}

    function getSavedGame() {
      return JSON.parse(localStorage[variables.propInLocalStorage]);
    }

    function putSavedValuesIntoTable() {
      let values = getSavedGame();
      let row;
      let col;
      let value;
      let inputField;
      values = values.value

      for(let value in values) {
        row = value[3];
        col = value[7];
        inputField = document.querySelector(`[${variables.ROW_ATTRIBUTE}="${row}"][${variables.COL_ATTRIBUTE}="${col}"]`)

        inputField.value = values[value]
        inputField.setAttribute('readonly','true')
      }
      variables.isTableBuild = true;
    }
    function insertDateSavedGame(element, date) {
      element.value = date;
      return;
    }

    obj = {
      getSavedGame,
      putSavedValuesIntoTable
    }
    return obj;
  }


  Sudoku.loadGame = loadGame;
  window.Sudoku = Sudoku;
})(window)
