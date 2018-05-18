(function(window) {
  let Sudoku = window.Sudoku;

  function createTable(variables, validation) {
    let table = document.createElement('table');
    let sudokuContainer = getSudokuContainer(variables);

    function getSudokuContainer(variables) {
      //let sudokuContainer = document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR);
      return document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR);
    }

    function createCell(row, col) {
      let cell = document.createElement('td');
      cell.classList.add('class', `row-${row}`);
      cell.classList.add('class', `col-${col}`);
      return cell;
    }

    function createHelpField() {
      let field = document.createElement('input');
      field.setAttribute('type', 'text');
      field.setAttribute('maxLength', +variables.MAX_LENGTH_HELP_FIELD);
      field.classList.add('help-field');
      return field;
    };

    function createInputField(row, col) {
      let inputField = document.createElement('input');
      let squareNr = getSquareNr(row, col);
      inputField.setAttribute('type', 'text');
      inputField.classList.add('main-field');
      inputField.setAttribute('pattern', variables.INPUT_FIELD_PATTERN);
      inputField.setAttribute('maxLength', +variables.MAX_LENGTH_INPUT_FIELD);
      inputField.setAttribute('data-target-row', `${row}`);
      inputField.setAttribute('data-target-col', `${col}`);
      inputField.setAttribute('data-target-sqr', `${squareNr}`);

      return inputField;
    }

    function getSquareNr(row, col) {
      if (row <= 3 && col <= 3) {
        return 1;
      } else if (row <= 3 && col > 3 && col < 7) {
        return 2;
      } else if (row <= 3 && col >= 7) {
        return 3;
      } else if (row > 3 && row < 7 && col <= 3) {
        return 4;
      } else if (row > 3 && row < 7 && col > 3 && col < 7) {
        return 5;
      } else if (row > 3 && row < 7 && col >= 7) {
        return 6
      } else if (row >= 7 && col <= 3) {
        return 7;
      } else if (row >= 7 && col > 3 && col < 7) {
        return 8;
      } else if (row >= 7 && col >= 7) {
        return 9;
      }
    }


    //let sudokuContainer = document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR);
    function addEventListenersToInputFields(variables, validation) {

      let inputFields = document.querySelectorAll(variables.INPUT_FIELD_SELECTOR);
      inputFields = [...inputFields];

      inputFields.forEach(function(input) {
        input.addEventListener('input', validation.isInputValid)
      })
    }

    for (let row = variables.TABLE_START; row <= variables.TABLE_HEIGHT; row++) {
      let currentRow = document.createElement('tr')
      for (let column = variables.TABLE_START; column <= variables.TABLE_WIDTH; column++) {
        let cell = createCell(row, column);
        cell.appendChild(createHelpField())
        cell.appendChild(createInputField(row, column))
        currentRow.appendChild(cell)
      }
      table.appendChild(currentRow)
    }
    sudokuContainer.appendChild(table)
    addEventListenersToInputFields(variables, validation);

    return ;
  }



  Sudoku.createTable = createTable;
  window.Sudoku = Sudoku;
  })(window)
