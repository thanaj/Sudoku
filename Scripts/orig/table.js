import variables from './variables.js';
import { default as validation } from './validation';

export default function CreateTable() {
  let table = document.createElement('table');
  let sudokuContainer = getSudokuContainer(variables.SUDOKU_CONTAINER_SELECTOR);

  for (let row = variables.TABLE_START; row <= variables.TABLE_HEIGHT; row++) {
    let currentRow = document.createElement('tr')
    for (let column = variables.TABLE_START; column <= variables.TABLE_WIDTH; column++) {
      let cell = createCell(row, column);
      cell.appendChild(createHelpField(variables.MAX_LENGTH_HELP_FIELD))
      cell.appendChild(createInputField(row, column, variables.INPUT_FIELD_PATTERN, variables.MAX_LENGTH_INPUT_FIELD))
      currentRow.appendChild(cell)
    }
    table.appendChild(currentRow)
  }
  sudokuContainer.appendChild(table)
  let inputFields = document.querySelectorAll(variables.INPUT_FIELD_SELECTOR);
  addEventListenersToInputFields(validation.isInputValid, inputFields);

}

function getSudokuContainer(sudokuContainerSelector) {
  return document.querySelector(sudokuContainerSelector);
}

function createCell(row, col) {
  let cell = document.createElement('td');
  cell.classList.add('class', `row-${row}`);
  cell.classList.add('class', `col-${col}`);
  return cell;
}

function createHelpField(maxLength) {
  let field = document.createElement('input');
  field.setAttribute('type', 'text');
  field.setAttribute('maxLength', +maxLength);
  field.classList.add('help-field');
  return field;
};

function createInputField(row, col, pattern, maxLength) {
  let inputField = document.createElement('input');
  let squareNr = getSquareNr(row, col);
  inputField.setAttribute('type', 'text');
  inputField.classList.add('main-field');
  inputField.setAttribute('pattern', pattern);
  inputField.setAttribute('maxLength', +maxLength);
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

function addEventListenersToInputFields(validationFn, inputFields) {
  inputFields = [...inputFields];
  inputFields.forEach( input =>
    input.addEventListener('input', validationFn)
  )
}
