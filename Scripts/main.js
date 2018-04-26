(function(window) {
  let Sudoku = window.Sudoku;
  let helperFunctions = Sudoku.helperFunctions()
  let populateCells = Sudoku.populateCells;
  let variables = Sudoku.Variables();
  let table = Sudoku.createTable(variables)

  let validation = Sudoku.validation(variables, helperFunctions)


  let sudokuContainer = document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR);
  sudokuContainer.appendChild(table)
  populateCells(table, variables, validation, helperFunctions);
  let inputFields = document.querySelectorAll(variables.INPUT_FIELD_SELECTOR)

  inputFields.forEach(function(input) {
    input.addEventListener('input', validation.isInputValid)
  })

})(window)
