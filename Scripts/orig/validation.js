import variables from './variables.js';
import {default as helperFunctions} from './helper.js';

let obj = {};

function isInputUnique(cell) {

  if (isUniqueInCollection(cell, variables.ROW_ATTRIBUTE)) {
    helperFunctions.clearValue(cell);
    return false;
  }
  if (isUniqueInCollection(cell, variables.COL_ATTRIBUTE)) {
    helperFunctions.clearValue(cell);
    return false;
  }
  if (isUniqueInCollection(cell, variables.SQR_ATTRIBUTE)) {
    helperFunctions.clearValue(cell);
    return false;
  }
  return true
}

function checkIsInputNumber(input) {
  return !isNaN(parseFloat(input)) && isFinite(input);
}

function isUniqueInCollection(cell, attr) {
  let rowAttrVal = cell.getAttribute(attr);
  let collection = helperFunctions.getCollection(`[${attr}="${rowAttrVal}"]`);
  collection = helperFunctions.removeInsertedCellFromCollection(collection, cell);

  return doesCollectionContainInsertedValue(collection, cell);
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

function giveInvalidClass(cell) {
  if (variables.isTableBuild) {
    cell.parentNode.classList.add('invalid-field')
    window.setTimeout(() => {
      cell.parentNode.classList.remove('invalid-field')
    }, 2000);
  }
}

function isInputValid(event) {
  let cell = event.target;
  if (cell.value == '') {
    return true;
  }

  if (!checkIsInputNumber(cell.value)) {
    helperFunctions.clearValue(cell);
    return false;
  }

  if (!isInputUnique(cell)) {
    helperFunctions.clearValue(cell);
    return false
  }
  return true;
}

 obj = {
  isInputUnique,
  checkIsInputNumber,
  isUniqueInCollection,
  isInputValid
}
export default obj
