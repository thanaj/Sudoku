import variables from './variables.js';

let obj = {}

function getCollection(attribute) {
  return [...document.querySelectorAll(attribute)];
}

function removeInsertedCellFromCollection(collection, insertedCell) {

  let insertedCellRow = insertedCell.getAttribute(variables.ROW_ATTRIBUTE);
  let insertedCellCol = insertedCell.getAttribute(variables.COL_ATTRIBUTE);

  let collectionWithoutInsertedValue = collection.filter(cell => {
    let cellRow = cell.getAttribute(variables.ROW_ATTRIBUTE);
    let cellCol = cell.getAttribute(variables.COL_ATTRIBUTE);
    return (cellRow !== insertedCellRow || cellCol !== insertedCellCol);
  })
  return collectionWithoutInsertedValue;
}

function clearValue(cell) {
  cell.value = '';
}

function getCurrentDateAndTime() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let hh = today.getHours();
  let min = today.getMinutes();

  dd = add0toTimeValue(dd)
  mm = add0toTimeValue(mm)
  min = add0toTimeValue(min)
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`
}


function add0toTimeValue(timeValue) {
  return timeValue < 10 ? '0' + timeValue : timeValue;
}

function clearGame(variables) {
  let table = document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR)
  return table.firstChild.remove();
}

obj = {
  getCollection,
  removeInsertedCellFromCollection,
  clearValue,
  getCurrentDateAndTime,
  clearGame
}

export default obj;
