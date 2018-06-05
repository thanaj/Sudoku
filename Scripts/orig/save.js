import variables from './variables.js';
import {default as helperFunctions} from './helper.js';

let obj = {};

function getValuesFromFields() {
  let objWithValues = {};
  let obj = {};
  let row;
  let col;
  let date = new Date();
  let value;
  let inputFields = document.querySelectorAll(variables.INPUT_FIELD_SELECTOR);
  inputFields = [...inputFields];

  inputFields.forEach(function(field) {
    if (field.value) {
      row = field.getAttribute(variables.ROW_ATTRIBUTE);
      col = field.getAttribute(variables.COL_ATTRIBUTE);
      value = field.value;
      objWithValues[`row${row}col${col}`] = value;
    }
  })
  obj.value = objWithValues;
  obj.date = helperFunctions.getCurrentDateAndTime()
  return obj;
}

function saveInLocalStorage() {
  let objWithValues = getValuesFromFields();
  objWithValues = JSON.stringify(objWithValues);
  Object.defineProperty(localStorage,variables.propInLocalStorage, {
    configurable:true,
    writable:true
  });
  console.log(Object.getOwnPropertyDescriptor(localStorage,variables.propInLocalStorage))
  localStorage[variables.propInLocalStorage] = objWithValues;
}

obj = {
  saveInLocalStorage
}
export default obj
