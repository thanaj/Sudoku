import variables from './variables.js';
import { default as helperFunctions } from './helper.js';
import { default as validation } from './validation';
let obj = {};

function insertValues() {
  if (!variables.isTableBuild) {
    let populatedCellsCounter = 0;
    while (populatedCellsCounter < variables.MAX_CELLS_TO_BE_POPULATED) {
      let cell = insertValueIntoCell()
      if (validation.isInputUnique(cell)) {
        populatedCellsCounter++;
        cell.setAttribute('readonly', 'true')
      } else {
        helperFunctions.clearValue(cell);
      }
    };
    variables.isTableBuild = true;
  }
  return;
}


function insertValueIntoCell(start, end) {
  let colNr = getRandomArbitrary(variables.TABLE_START, variables.TABLE_END)
  let rowNr = getRandomArbitrary(variables.TABLE_START, variables.TABLE_END)
  let randomValue = getRandomArbitrary(variables.TABLE_START, variables.TABLE_END);
  let cell = getCell(rowNr, colNr);

  if (!cell.value) {
    cell.value = randomValue
  }
  return cell;
}

function getRandomArbitrary(startRange, endRange) {
  return Math.round(Math.random() * (endRange - startRange) + startRange);
}

function getCell(row, col, rowAttribute, colAttribute) {
  let cellsInRow = getCollection(`[${variables.ROW_ATTRIBUTE}="${row}"]`);
  let cells = cellsInRow.filter(cellInRow => {
    return cellInRow.getAttribute(variables.COL_ATTRIBUTE) == col;
  })
  return cells[0];
}

function getCollection(attribute) {
  return [...document.querySelectorAll(attribute)];
}
obj = {
  insertValues
}
export default obj
