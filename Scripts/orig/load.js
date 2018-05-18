import variables from './variables.js';
let obj = {}

function getSavedGame(propertyName) {

  return JSON.parse(localStorage[propertyName]);
}

function putSavedValuesIntoTable(rowPosition,colPosition) {
  let values = getSavedGame(variables.propInLocalStorage);
  let row;
  let col;
  let value;
  let inputField;
  values = values.value

  for(let value in values) {

    row = value[variables.rowPosition];
    col = value[variables.colPosition];
    inputField = document.querySelector(`[${variables.ROW_ATTRIBUTE}="${row}"][${variables.COL_ATTRIBUTE}="${col}"]`)

    inputField.value = values[value]
    inputField.setAttribute('readonly','true')
  }
  variables.isTableBuild = true;
}

function insertDateSavedGame(element, date) {
  element.value = date;
  return;
}

obj = {
  getSavedGame,
  putSavedValuesIntoTable
}
export default obj
