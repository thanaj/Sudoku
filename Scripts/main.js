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
  let ASCII_FOR_0 = 48;
  let ASCII_FOR_9 = 57;
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
        result = isInvalidRow(cell)
        i++;
      };
      isTableBuild = true;
      //console.log(populateCells());
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
    /*
    inputField.setAttribute('data-target-row', `row-${row}`);
    inputField.setAttribute('data-target-col', `col-${col}`);
    inputField.setAttribute('data-target-sqr', `sqr-${squareNr}`);
    */
    return inputField;
  }

  function checkIsInputNumber(event) {
    let input = event.which;
    if (input >= ASCII_FOR_0 && input <= ASCII_FOR_9) {
      return true;
    }
    return false;
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

  function isInvalidCol(event) {
    let colAttrVal = event.target.getAttribute(COL_ATTRIBUTE);
    let colCollection = getCollection(`[${COL_ATTRIBUTE}="${colAttrVal}"]`)
    colCollection = removeInsertedCellFromCollection(colCollection, event.target);
    if (colCollection.length > 0) {
      return doesCollectionContainInsertedValue(colCollection, event.target);
    }
    return true;
  }

  function isInvalidSquare(event) {
    let sqrNr = event.target.getAttribute(SQR_ATTRIBUTE);
    let sqrCollection = getCollection(`[${SQR_ATTRIBUTE}="${sqrNr}"]`);
    sqrCollection = removeInsertedCellFromCollection(sqrCollection, event.target);
    if (sqrCollection.length > 0) {
      return doesCollectionContainInsertedValue(sqrCollection, event.target);
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

  function isInputValid(event) {
    if (!checkIsInputNumber(event)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidRow(event.target)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidCol(event)) {
      clearValue(event.target);
      return false;
    }
    if (isInvalidSquare(event)) {
      clearValue(event.target);
      return false;
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
    cell.parentNode.classList.add('invalid-field')
    window.setTimeout(function() {
      cell.parentNode.classList.remove('invalid-field')
    }, 2000);
  }

  //pobierz komorke, losuj wiersz, losuj kolumne, losuj liczbe, sprawdz czy prawidłowe,
  // jesli nie to losuj kolejna, następna komorka;
  function populateCells() {
    let cell = getCell(getRandomArbitrary(START_NUMBER,END_NUMBER),getRandomArbitrary(START_NUMBER,END_NUMBER));
    let randomValue = getRandomArbitrary(START_NUMBER,END_NUMBER);
    cell.value = randomValue
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
  console.log(Math.round(getRandomArbitrary(1,9)));

//data-target-row="row-9" data-target-col="col-1"


  Sudoku.Table = Table;
  window.Sudoku = Sudoku;
})(window);
