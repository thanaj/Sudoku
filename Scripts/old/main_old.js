(function(window) {
  let Sudoku = window.Sudoku;
  let helperFunctions = new Sudoku.helperFunctions()

  let variables = new Sudoku.Variables();
  let validation = Sudoku.validation(variables, helperFunctions)
  let populateCells = new Sudoku.populateCells( variables, validation, helperFunctions);


  let localStorage = window.localStorage;
  let loadGame = new Sudoku.loadGame(variables,localStorage);
  let saveButton = document.querySelector(variables.SAVE_BUTTON_SELECTOR);
  let newGameButton = document.querySelector(variables.NEW_GAME_BUTTON_SELECTOR);
  let loadGameButton = document.querySelector(variables.LOAD_GAME_BUTTON_SELECTOR);
  let clearGameButton = document.querySelector(variables.CLEAR_GAME_BUTTON_SELECTOR);


  Sudoku.createTable(variables,validation)

  let saveTable = new Sudoku.saveTable( variables, helperFunctions);
  saveButton.addEventListener('click',saveTable.saveInLocalStorage);
  newGameButton.addEventListener('click',populateCells.insertValues);
  loadGameButton.addEventListener('click',loadGame.putSavedValuesIntoTable);
  clearGameButton.addEventListener('click',populateCells.insertValues)

  //ładowanie daty z magazynu sieciowego, informacja, ze zostanie tam zapisane, czyszczenie tablicy
})(window)
