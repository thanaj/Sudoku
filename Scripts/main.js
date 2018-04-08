/*
wstawia wartosc
sprawdz czy liczba a nie cyfra
jesli cyfra to spawdz czy w wierszu
spradz czy w kolumnie
sprawdz czy w kwadracie
*/
(function(window) {
  'use strict';
  var Sudoku = window.Sudoku || {};
  var Table = {};

  let ROWS_NUMBER = 9;
  let COLS_NUMBER = 9;
  const START_NUMBER = 1;
  const END_NUMBER = 9;
  const MAX_CELLS_TO_BE_POPULATED = 20;
  let MAX_LENGTH_HELP_FIELD = 6;
  let MAX_LENGTH_INPUT_FIELD = 1;
  const ASCII_FOR_0 = 48;
  const ASCII_FOR_9 = 57;
  const ASCII_FOR_0_NmKp = 96;
  const ASCII_FOR_9_NmKp = 105;
  const ASCII_FOR_Tab = 9;
  let ROW_ATTRIBUTE = 'data-target-row';
  let COL_ATTRIBUTE = 'data-target-col';
  let SQR_ATTRIBUTE = 'data-target-sqr';
  let INPUT_FIELD_PATTERN = '[0-9]{1}';
  let SUDOKU_CONTAINER_SELECTOR = '[data-target="sudoku-container"]'
  let BTN_CREATE_SUDOKU_SELECTOR = '[data-target="btn-create-sudoku"]'
  let VALIDATION_BANNER_SELECTOR = '[data-target="validation-banner"]'

  let isTableBuild = false;
  let validationBanner = document.querySelector(VALIDATION_BANNER_SELECTOR);
  let sudokuContainer = document.querySelector(SUDOKU_CONTAINER_SELECTOR);
  let btnCreateSudoku = document.querySelector(BTN_CREATE_SUDOKU_SELECTOR);
  btnCreateSudoku.addEventListener('click', createSudoku);

  function createSudoku() {
    if(!isTableBuild) {
      sudokuContainer.appendChild(createTable(ROWS_NUMBER, COLS_NUMBER));
      let cell;
      let i= 0;
      let result;
      while(i < MAX_CELLS_TO_BE_POPULATED) {
        cell = populateCells()
        if(!isValueInvalid(cell)){
          i++;
        } else {
          clearValue(cell);
        }
      };
      isTableBuild = true;
    }
  }

  function isValueInvalid(cell){
    if(isInvalidCol(cell)) {
      return true;
    }
    if(isInvalidRow(cell)){
      return true;
    }
    if(isInvalidSquare(cell)){
      return true
    }
    return false
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

  function checkIsInputNumber(event) {
    console.log(event.which);
    let input = event.which;

    if (
      (input >= ASCII_FOR_0 && input <= ASCII_FOR_9)
      || (input >= ASCII_FOR_0_NmKp && input <= ASCII_FOR_9_NmKp)
      || input == ASCII_FOR_Tab
    ) {
      return true;
    }
    return false;
  }
  //new instead of three functions below
  function isInvalidCollection(cell, attr) {
    let rowAttrVal = cell.getAttribute(attr);
    let rowCollection = getCollection(`[${attr}="${rowAttrVal}"]`);
    rowCollection = removeInsertedCellFromCollection(rowCollection, cell);

    if (rowCollection.length > 0) {
      return doesCollectionContainInsertedValue(rowCollection, cell);
    }
    return true;
  }


  function isInvalidRow(cell) {
    let rowAttrVal = cell.getAttribute(ROW_ATTRIBUTE);
    let rowCollection = getCollection(`[${ROW_ATTRIBUTE}="${rowAttrVal}"]`);
    rowCollection = removeInsertedCellFromCollection(rowCollection, cell);

    if (rowCollection.length > 0) {
      return doesCollectionContainInsertedValue(rowCollection, cell);
    }
    return true;
  }

  function isInvalidCol(cell) {
    let colAttrVal = cell.getAttribute(COL_ATTRIBUTE);
    let colCollection = getCollection(`[${COL_ATTRIBUTE}="${colAttrVal}"]`)
    colCollection = removeInsertedCellFromCollection(colCollection, cell);
    if (colCollection.length > 0) {
      return doesCollectionContainInsertedValue(colCollection, cell);
    }
    return true;
  }

  function isInvalidSquare(cell) {
    let sqrNr = cell.getAttribute(SQR_ATTRIBUTE);
    let sqrCollection = getCollection(`[${SQR_ATTRIBUTE}="${sqrNr}"]`);
    sqrCollection = removeInsertedCellFromCollection(sqrCollection, cell);
    if (sqrCollection.length > 0) {
      return doesCollectionContainInsertedValue(sqrCollection, cell);
    }
    return true;
  }


  function clearValue(cell) {
    cell.value = '';
  }

  function getCollection(attribute) {
    return Array.from(document.querySelectorAll(attribute));
  }

  function removeInsertedCellFromCollection(collection, insertedCell) {
    let insertedCellRow = insertedCell.getAttribute('data-target-row');
    let insertedCellCol = insertedCell.getAttribute('data-target-col');
    let collectionWithoutInsertedValue = collection.filter(function(cell) {
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
    /*
    let result = collection.some(function(cell) {
      return cell.value === insertedValue.value;
    });
    */
    collection.forEach(function(cell){
      if(cell.value === insertedValue.value) {
        giveInvalidClass(cell);
        result = true;
      }
    })
    return result;
  }
  function isInputUnique(cell) {
    if (isInvalidCollection(cell,ROW_ATTRIBUTE)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidCollection(cell,COL_ATTRIBUTE)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidCollection(cell,SQR_ATTRIBUTE)) {
      clearValue(event.target);
      return false;
    }
    return true
  }

  function isInputValid(event) {
    if(event.target.value == ''){
      return true;
    }
    if (!checkIsInputNumber(event)) {
      clearValue(event.target);
      return false;
    }
    //isInvalidCollection(cell, attr)
    if(isInputUnique(event.target)) {
      return true
    }
    /*
    if (isInvalidRow(event.target)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidCol(event.target)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidSquare(event.target)) {
      clearValue(event.target);
      return false;
    }
    */
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
    //isTableBuild = true;
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
    if(isTableBuild){
      cell.parentNode.classList.add('invalid-field')
      window.setTimeout(function() {
        cell.parentNode.classList.remove('invalid-field')
      }, 2000);
    }
    /*
    cell.parentNode.classList.add('invalid-field')
    window.setTimeout(function() {
      cell.parentNode.classList.remove('invalid-field')
    }, 2000);
    */
  }

  //pobierz komorke, losuj wiersz, losuj kolumne, losuj liczbe, sprawdz czy prawidłowe,
  // jesli nie to losuj kolejna, następna komorka;
  function populateCells() {
    let cell = getCell(getRandomArbitrary(START_NUMBER,END_NUMBER),getRandomArbitrary(START_NUMBER,END_NUMBER));
    let randomValue = getRandomArbitrary(START_NUMBER,END_NUMBER);
    if (!cell.value) {
      cell.value = randomValue
    }
    return cell;
  }
  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function getCell(row,col) {
    let cellsInRow = getCollection(`[${ROW_ATTRIBUTE}="${row}"]`);
    let cell = cellsInRow.filter(function(cellInRow) {
      return cellInRow.getAttribute(COL_ATTRIBUTE) == col;
    })
    return cell[0];
  }


//data-target-row="row-9" data-target-col="col-1"


  Sudoku.Table = Table;
  window.Sudoku = Sudoku;
})(window);
