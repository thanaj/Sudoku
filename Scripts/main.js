(function(window) {
  'use strict';
  let Sudoku = window.Sudoku || {};
  let Table = {};

  const ROWS_NUMBER = 9;
  const COLS_NUMBER = 9;
  const START_NUMBER = 1;
  const END_NUMBER = 9;
  const MAX_CELLS_TO_BE_POPULATED = 20;
  const MAX_LENGTH_HELP_FIELD = 6;
  const MAX_LENGTH_INPUT_FIELD = 1;
  const ASCII_FOR_0 = 48;
  const ASCII_FOR_9 = 57;
  const ASCII_FOR_0_NmKp = 96;
  const ASCII_FOR_9_NmKp = 105;
  const ASCII_FOR_Tab = 9;
  const ROW_ATTRIBUTE = 'data-target-row';
  const COL_ATTRIBUTE = 'data-target-col';
  const SQR_ATTRIBUTE = 'data-target-sqr';
  const INPUT_FIELD_PATTERN = '[0-9]{1}';
  const SUDOKU_CONTAINER_SELECTOR = '[data-target="sudoku-container"]'
  const BTN_CREATE_SUDOKU_SELECTOR = '[data-target="btn-create-sudoku"]'
  const VALIDATION_BANNER_SELECTOR = '[data-target="validation-banner"]'

  let isTableBuild = false;
  let validationBanner = document.querySelector(VALIDATION_BANNER_SELECTOR);
  let sudokuContainer = document.querySelector(SUDOKU_CONTAINER_SELECTOR);
  let btnCreateSudoku = document.querySelector(BTN_CREATE_SUDOKU_SELECTOR);
  btnCreateSudoku.addEventListener('click', createSudoku);

  function createSudoku() {
    if (!isTableBuild) {
      sudokuContainer.appendChild(createTable(ROWS_NUMBER, COLS_NUMBER));
      //let cell;
      let i = 0;
      //let result;
      while (i < MAX_CELLS_TO_BE_POPULATED) {
        let cell = populateCells()
        //if(!isValueInvalid(cell)){
        if (isInputUnique(cell)) {
          i++;
        } else {
          clearValue(cell);
        }
      };
      isTableBuild = true;
    }
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
    field.setAttribute('maxLength', +MAX_LENGTH_HELP_FIELD);
    field.classList.add('help-field');
    return field;
  };

  function createInputField(row, col) {
    let inputField = document.createElement('input');
    let squareNr = getSquareNr(row, col);
    inputField.setAttribute('type', 'text');
    inputField.classList.add('main-field');
    inputField.setAttribute('pattern', INPUT_FIELD_PATTERN);
    inputField.setAttribute('maxLength', +MAX_LENGTH_INPUT_FIELD);
    inputField.setAttribute('data-target-row', `${row}`);
    inputField.setAttribute('data-target-col', `${col}`);
    inputField.setAttribute('data-target-sqr', `${squareNr}`);

    return inputField;
  }

  function checkIsInputNumber(input) {
    if (
      (input >= ASCII_FOR_0 && input <= ASCII_FOR_9) ||
      (input >= ASCII_FOR_0_NmKp && input <= ASCII_FOR_9_NmKp) ||
      (input == ASCII_FOR_Tab)
    ) {
      return true;
    }
    return false;
  }

  function isUniqueInCollection(cell, attr) {
    let rowAttrVal = cell.getAttribute(attr);
    let collection = getCollection(`[${attr}="${rowAttrVal}"]`);
    collection = removeInsertedCellFromCollection(collection, cell);

    return doesCollectionContainInsertedValue(collection, cell);
  }

  function clearValue(cell) {
    cell.value = '';
  }

  function getCollection(attribute) {
    //return Array.from(document.querySelectorAll(attribute));
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

  function getInsertedValue(cell) {
    return cell.value;
  }

  function doesCollectionContainInsertedValue(collection, insertedValue) {
    let result = false;

    collection.forEach(cell => {

      if (cell.value === insertedValue.value) {
        giveInvalidClass(cell);
        result = true;
      }
    })
    return result;
  }

  function isInputUnique(cell) {
    if (isUniqueInCollection(cell, ROW_ATTRIBUTE)) {
      clearValue(cell);
      return false;
    }
    if (isUniqueInCollection(cell, COL_ATTRIBUTE)) {
      clearValue(cell);
      return false;
    }
    if (isUniqueInCollection(cell, SQR_ATTRIBUTE)) {
      clearValue(cell);
      return false;
    }
    return true
  }

  function isInputValid(event) {
    let cell = event.target;
    if (cell.value == '') {
      return true;
    }

    if (!checkIsInputNumber(event.which)) {
      clearValue(cell);
      return false;
    }

    if (!isInputUnique(cell)) {
      clearValue(cell);
      return false
    }
    return true;
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


  function createTable(rowsNumber, colsNumber) {
    let row;
    let cell;
    let inputField;
    let helpField;
    let table = document.createElement('table')

    for (let rowsCounter = START_NUMBER; rowsCounter <= rowsNumber; rowsCounter++) {
      row = document.createElement('tr');
      for (let colsCounter = START_NUMBER; colsCounter <= colsNumber; colsCounter++) {
        cell = createCell(rowsCounter, colsCounter);
        helpField = createHelpField();
        inputField = createInputField(rowsCounter, colsCounter);
        inputField.addEventListener('keyup', isInputValid);
        cell.appendChild(helpField);
        cell.appendChild(inputField);
        row.appendChild(cell)
      }
      table.appendChild(row);
    }
    return table;
  }

  function giveInvalidClass(cell) {
    if (isTableBuild) {
      cell.parentNode.classList.add('invalid-field')
      window.setTimeout(() => {
        cell.parentNode.classList.remove('invalid-field')
      }, 2000);
    }
  }

  function populateCells() {
    let cell = getCell(getRandomArbitrary(), getRandomArbitrary());
    let randomValue = getRandomArbitrary();
    if (!cell.value) {
      cell.value = randomValue
    }
    return cell;
  }

  function getRandomArbitrary() {
    return Math.round(Math.random() * (END_NUMBER - START_NUMBER) + START_NUMBER);
  }

  function getCell(row, col) {
    let cellsInRow = getCollection(`[${ROW_ATTRIBUTE}="${row}"]`);
    let cells = cellsInRow.filter(cellInRow => {
      return cellInRow.getAttribute(COL_ATTRIBUTE) == col;
    })
    return cells[0];
  }


  Sudoku.Table = Table;
  window.Sudoku = Sudoku;
})(window);
