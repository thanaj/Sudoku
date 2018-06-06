(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var obj = {};

function getCollection(attribute) {
  return [].concat(_toConsumableArray(document.querySelectorAll(attribute)));
}

function removeInsertedCellFromCollection(collection, insertedCell) {
  var insertedCellRow = insertedCell.getAttribute(_variables2.default.ROW_ATTRIBUTE);
  var insertedCellCol = insertedCell.getAttribute(_variables2.default.COL_ATTRIBUTE);
  var collectionWithoutInsertedValue = collection.filter(function (cell) {
    var cellRow = cell.getAttribute(_variables2.default.ROW_ATTRIBUTE);
    var cellCol = cell.getAttribute(_variables2.default.COL_ATTRIBUTE);
    return cellRow !== insertedCellRow || cellCol !== insertedCellCol;
  });
  return collectionWithoutInsertedValue;
}

function clearValue(cell) {
  cell.value = '';
}

function getCurrentDateAndTime() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var min = today.getMinutes();

  dd = add0toTimeValue(dd);
  mm = add0toTimeValue(mm);
  min = add0toTimeValue(min);

  return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min;
}

function add0toTimeValue(timeValue) {
  return timeValue < 10 ? '0' + timeValue : timeValue;
}

function clearGame() {
  var elements = document.querySelectorAll(_variables2.default.ALL_FIELDS_SELECTOR);
  elements.forEach(function (element) {
    if (element.value) {
      element.value = "";
    }
    if (element.getAttribute('readonly')) {
      element.removeAttribute('readonly');
    }
  });
  _variables2.default.isTableBuild = false;
  return;
}

function getLastSavedGame() {
  var localStorage = window.localStorage[_variables2.default.propInLocalStorage];
  var object = void 0;
  var lastSaveInfo = void 0;

  if (localStorage) {
    lastSaveInfo = document.querySelector(_variables2.default.LAST_SAVE_SELECTOR);
    object = JSON.parse(localStorage);
    lastSaveInfo.innerHTML = 'Last saved at: ' + object.date;
  }
}

function clearSave() {
  var result = clearLocalStorage();
  var lastSaveInfo = void 0;

  if (result) {
    lastSaveInfo = document.querySelector(_variables2.default.LAST_SAVE_SELECTOR);
    if (lastSaveInfo) {
      lastSaveInfo.innerHTML = "";
    }
  }
}

function clearLocalStorage() {
  var localStorage = window.localStorage;
  if (localStorage[_variables2.default.propInLocalStorage]) {
    return delete localStorage[_variables2.default.propInLocalStorage];
  }
}

obj = {
  getCollection: getCollection,
  removeInsertedCellFromCollection: removeInsertedCellFromCollection,
  clearValue: clearValue,
  getCurrentDateAndTime: getCurrentDateAndTime,
  clearGame: clearGame,
  getLastSavedGame: getLastSavedGame,
  clearSave: clearSave
};

exports.default = obj;

},{"./variables.js":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require("./variables.js");

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

function getSavedGame(propertyName) {
  if (localStorage[propertyName]) {
    return JSON.parse(localStorage[propertyName]);
  }
  return null;
}

function putSavedValuesIntoTable() {
  if (_variables2.default.isTableBuild) {
    return;
  }
  var values = getSavedGame(_variables2.default.propInLocalStorage);
  var lastSaveInfo = document.querySelector(_variables2.default.LAST_SAVE_SELECTOR);
  var row = void 0;
  var col = void 0;
  var value = void 0;
  var inputField = void 0;

  if (!values) {
    lastSaveInfo.innerHTML = "Nothing to load";
    window.setTimeout(function () {
      lastSaveInfo.innerHTML = " ";
    }, 3000);
    return;
  }
  values = values.value;

  for (var _value in values) {

    row = _value[_variables2.default.rowPosition];
    col = _value[_variables2.default.colPosition];
    inputField = document.querySelector("[" + _variables2.default.ROW_ATTRIBUTE + "=\"" + row + "\"][" + _variables2.default.COL_ATTRIBUTE + "=\"" + col + "\"]");

    inputField.value = values[_value];
    inputField.setAttribute('readonly', 'true');
  }
  _variables2.default.isTableBuild = true;
}

function insertDateSavedGame(element, date) {
  element.value = date;
  return;
}

obj = {
  getSavedGame: getSavedGame,
  putSavedValuesIntoTable: putSavedValuesIntoTable
};
exports.default = obj;

},{"./variables.js":8}],3:[function(require,module,exports){
'use strict';

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

var _populate = require('./populate');

var _populate2 = _interopRequireDefault(_populate);

var _save = require('./save');

var _save2 = _interopRequireDefault(_save);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveButton = document.querySelector(_variables2.default.SAVE_BUTTON_SELECTOR);
var newGameButton = document.querySelector(_variables2.default.NEW_GAME_BUTTON_SELECTOR);
var loadGameButton = document.querySelector(_variables2.default.LOAD_GAME_BUTTON_SELECTOR);
var clearGameButton = document.querySelector(_variables2.default.CLEAR_GAME_BUTTON_SELECTOR);
var clearSaveutton = document.querySelector(_variables2.default.CLEAR_SAVE_SELECTOR);
var localStorage = window.localStorage;

(0, _table2.default)();
_helper2.default.getLastSavedGame();

saveButton.addEventListener('click', _save2.default.saveInLocalStorage);
newGameButton.addEventListener('click', _populate2.default.insertValues);
loadGameButton.addEventListener('click', _load2.default.putSavedValuesIntoTable);
clearGameButton.addEventListener('click', _helper2.default.clearGame);
clearSaveutton.addEventListener('click', _helper2.default.clearSave);

},{"./helper.js":1,"./load":2,"./populate":4,"./save":5,"./table":6,"./validation":7,"./variables.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var obj = {};

function insertValues() {
  if (!_variables2.default.isTableBuild) {
    var populatedCellsCounter = 0;
    while (populatedCellsCounter < _variables2.default.MAX_CELLS_TO_BE_POPULATED) {
      var cell = insertValueIntoCell();
      if (_validation2.default.isInputUnique(cell)) {
        populatedCellsCounter++;
        cell.setAttribute('readonly', 'true');
      } else {
        _helper2.default.clearValue(cell);
      }
    };
    _variables2.default.isTableBuild = true;
  }
  return;
}

function insertValueIntoCell(start, end) {
  var colNr = getRandomArbitrary(_variables2.default.TABLE_START, _variables2.default.TABLE_END);
  var rowNr = getRandomArbitrary(_variables2.default.TABLE_START, _variables2.default.TABLE_END);
  var randomValue = getRandomArbitrary(_variables2.default.TABLE_START, _variables2.default.TABLE_END);
  var cell = getCell(rowNr, colNr);

  if (!cell.value) {
    cell.value = randomValue;
  }
  return cell;
}

function getRandomArbitrary(startRange, endRange) {
  return Math.round(Math.random() * (endRange - startRange) + startRange);
}

function getCell(row, col, rowAttribute, colAttribute) {
  var cellsInRow = getCollection('[' + _variables2.default.ROW_ATTRIBUTE + '="' + row + '"]');
  var cells = cellsInRow.filter(function (cellInRow) {
    return cellInRow.getAttribute(_variables2.default.COL_ATTRIBUTE) == col;
  });
  return cells[0];
}

function getCollection(attribute) {
  return [].concat(_toConsumableArray(document.querySelectorAll(attribute)));
}
obj = {
  insertValues: insertValues
};
exports.default = obj;

},{"./helper.js":1,"./validation":7,"./variables.js":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var obj = {};

function getValuesFromFields() {
  var objWithValues = {};
  var obj = {};
  var row = void 0;
  var col = void 0;
  var date = new Date();
  var value = void 0;
  var inputFields = document.querySelectorAll(_variables2.default.INPUT_FIELD_SELECTOR);
  inputFields = [].concat(_toConsumableArray(inputFields));

  inputFields.forEach(function (field) {
    if (field.value) {
      row = field.getAttribute(_variables2.default.ROW_ATTRIBUTE);
      col = field.getAttribute(_variables2.default.COL_ATTRIBUTE);
      value = field.value;
      objWithValues['row' + row + 'col' + col] = value;
    }
  });
  obj.value = objWithValues;
  obj.date = _helper2.default.getCurrentDateAndTime();
  return obj;
}

function saveInLocalStorage() {
  var objWithValues = getValuesFromFields();
  objWithValues = JSON.stringify(objWithValues);
  Object.defineProperty(localStorage, _variables2.default.propInLocalStorage, {
    configurable: true,
    writable: true
  });
  localStorage[_variables2.default.propInLocalStorage] = objWithValues;
  _helper2.default.getLastSavedGame();
}

obj = {
  saveInLocalStorage: saveInLocalStorage
};
exports.default = obj;

},{"./helper.js":1,"./variables.js":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateTable;

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function CreateTable() {
  var table = document.createElement('table');
  var sudokuContainer = getSudokuContainer(_variables2.default.SUDOKU_CONTAINER_SELECTOR);

  for (var row = _variables2.default.TABLE_START; row <= _variables2.default.TABLE_HEIGHT; row++) {
    var currentRow = document.createElement('tr');
    for (var column = _variables2.default.TABLE_START; column <= _variables2.default.TABLE_WIDTH; column++) {
      var cell = createCell(row, column);
      cell.appendChild(createHelpField(_variables2.default.MAX_LENGTH_HELP_FIELD));
      cell.appendChild(createInputField(row, column, _variables2.default.INPUT_FIELD_PATTERN, _variables2.default.MAX_LENGTH_INPUT_FIELD));
      currentRow.appendChild(cell);
    }
    table.appendChild(currentRow);
  }
  sudokuContainer.appendChild(table);
  var inputFields = document.querySelectorAll(_variables2.default.INPUT_FIELD_SELECTOR);
  addEventListenersToInputFields(_validation2.default.isInputValid, inputFields);
}

function getSudokuContainer(sudokuContainerSelector) {
  return document.querySelector(sudokuContainerSelector);
}

function createCell(row, col) {
  var cell = document.createElement('td');
  cell.classList.add('class', 'row-' + row);
  cell.classList.add('class', 'col-' + col);
  return cell;
}

function createHelpField(maxLength) {
  var field = document.createElement('input');
  field.setAttribute('type', 'text');
  field.setAttribute('maxLength', +maxLength);
  field.classList.add('help-field');
  return field;
};

function createInputField(row, col, pattern, maxLength) {
  var inputField = document.createElement('input');
  var squareNr = getSquareNr(row, col);
  inputField.setAttribute('type', 'text');
  inputField.classList.add('main-field');
  inputField.setAttribute('pattern', pattern);
  inputField.setAttribute('maxLength', +maxLength);
  inputField.setAttribute('data-target-row', '' + row);
  inputField.setAttribute('data-target-col', '' + col);
  inputField.setAttribute('data-target-sqr', '' + squareNr);

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
    return 6;
  } else if (row >= 7 && col <= 3) {
    return 7;
  } else if (row >= 7 && col > 3 && col < 7) {
    return 8;
  } else if (row >= 7 && col >= 7) {
    return 9;
  }
}

function addEventListenersToInputFields(validationFn, inputFields) {
  inputFields = [].concat(_toConsumableArray(inputFields));
  inputFields.forEach(function (input) {
    return input.addEventListener('input', validationFn);
  });
}

},{"./validation":7,"./variables.js":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _helper = require('./helper.js');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

function isInputUnique(cell) {

  if (isUniqueInCollection(cell, _variables2.default.ROW_ATTRIBUTE)) {
    _helper2.default.clearValue(cell);
    return false;
  }
  if (isUniqueInCollection(cell, _variables2.default.COL_ATTRIBUTE)) {
    _helper2.default.clearValue(cell);
    return false;
  }
  if (isUniqueInCollection(cell, _variables2.default.SQR_ATTRIBUTE)) {
    _helper2.default.clearValue(cell);
    return false;
  }
  return true;
}

function checkIsInputNumber(input) {
  return !isNaN(parseFloat(input)) && isFinite(input);
}

function isUniqueInCollection(cell, attr) {
  var rowAttrVal = cell.getAttribute(attr);
  var collection = _helper2.default.getCollection('[' + attr + '="' + rowAttrVal + '"]');
  collection = _helper2.default.removeInsertedCellFromCollection(collection, cell);

  return doesCollectionContainInsertedValue(collection, cell);
}

function doesCollectionContainInsertedValue(collection, insertedValue) {
  var result = false;
  collection.forEach(function (cell) {
    if (cell.value === insertedValue.value) {
      giveInvalidClass(cell);
      result = true;
    }
  });
  return result;
}

function giveInvalidClass(cell) {
  if (_variables2.default.isTableBuild) {
    cell.parentNode.classList.add('invalid-field');
    window.setTimeout(function () {
      cell.parentNode.classList.remove('invalid-field');
    }, 2000);
  }
}

function isInputValid(event) {
  var cell = event.target;
  if (cell.value == '') {
    return true;
  }

  if (!checkIsInputNumber(cell.value)) {
    _helper2.default.clearValue(cell);
    return false;
  }

  if (!isInputUnique(cell)) {
    _helper2.default.clearValue(cell);
    return false;
  }
  return true;
}

obj = {
  isInputUnique: isInputUnique,
  checkIsInputNumber: checkIsInputNumber,
  isUniqueInCollection: isUniqueInCollection,
  isInputValid: isInputValid
};
exports.default = obj;

},{"./helper.js":1,"./variables.js":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var obj = {};

obj.SUDOKU_CONTAINER_SELECTOR = '[data-target="sudoku-container"]';
obj.TABLE_START = 1;
obj.TABLE_WIDTH = 9;
obj.TABLE_HEIGHT = 9;
obj.TABLE_END = 9;
obj.MAX_CELLS_TO_BE_POPULATED = 20;
obj.MAX_LENGTH_HELP_FIELD = 6;
obj.MAX_LENGTH_INPUT_FIELD = 1;
obj.ASCII_FOR_0 = 48;
obj.ASCII_FOR_9 = 57;
obj.ASCII_FOR_0_NmKp = 96;
obj.ASCII_FOR_9_NmKp = 105;
obj.ASCII_FOR_Tab = 9;
obj.ROW_ATTRIBUTE = 'data-target-row';
obj.COL_ATTRIBUTE = 'data-target-col';
obj.SQR_ATTRIBUTE = 'data-target-sqr';
obj.INPUT_FIELD_PATTERN = '[0-9]{1}';
obj.SUDOKU_CONTAINER_SELECTOR = '[data-target="sudoku-container"]';
obj.BTN_CREATE_SUDOKU_SELECTOR = '[data-target="btn-create-sudoku"]';
obj.VALIDATION_BANNER_SELECTOR = '[data-target="validation-banner"]';
obj.VALIDATION_BANNER_SELECTOR = '[data-target="validation-banner"]';
obj.INPUT_FIELD_SELECTOR = '[class="main-field"]';
obj.SAVE_BUTTON_SELECTOR = '[data-target="save-button"]';
obj.NEW_GAME_BUTTON_SELECTOR = '[data-target="new-game-button"]';
obj.LOAD_GAME_BUTTON_SELECTOR = '[data-target="load-button"]';
obj.CLEAR_GAME_BUTTON_SELECTOR = '[data-target="clear-game-button"]';
obj.LAST_SAVE_SELECTOR = '[data-target="last-saved-game"]';
obj.CLEAR_SAVE_SELECTOR = '[data-target="clear-save-button"]';
obj.propInLocalStorage = 'Sudoku';
obj.isTableBuild = false;
obj.rowPosition = 3;
obj.colPosition = 7;
obj.ALL_FIELDS_SELECTOR = '[type="text"]';

exports.default = obj;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL29yaWcvaGVscGVyLmpzIiwiU2NyaXB0cy9vcmlnL2xvYWQuanMiLCJTY3JpcHRzL29yaWcvbWFpbi5qcyIsIlNjcmlwdHMvb3JpZy9wb3B1bGF0ZS5qcyIsIlNjcmlwdHMvb3JpZy9zYXZlLmpzIiwiU2NyaXB0cy9vcmlnL3RhYmxlLmpzIiwiU2NyaXB0cy9vcmlnL3ZhbGlkYXRpb24uanMiLCJTY3JpcHRzL29yaWcvdmFyaWFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxNQUFNLEVBQVY7O0FBRUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLHNDQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBWDtBQUNEOztBQUVELFNBQVMsZ0NBQVQsQ0FBMEMsVUFBMUMsRUFBc0QsWUFBdEQsRUFBb0U7QUFDbEUsTUFBSSxrQkFBa0IsYUFBYSxZQUFiLENBQTBCLG9CQUFVLGFBQXBDLENBQXRCO0FBQ0EsTUFBSSxrQkFBa0IsYUFBYSxZQUFiLENBQTBCLG9CQUFVLGFBQXBDLENBQXRCO0FBQ0EsTUFBSSxpQ0FBaUMsV0FBVyxNQUFYLENBQWtCLGdCQUFRO0FBQzdELFFBQUksVUFBVSxLQUFLLFlBQUwsQ0FBa0Isb0JBQVUsYUFBNUIsQ0FBZDtBQUNBLFFBQUksVUFBVSxLQUFLLFlBQUwsQ0FBa0Isb0JBQVUsYUFBNUIsQ0FBZDtBQUNBLFdBQVEsWUFBWSxlQUFaLElBQStCLFlBQVksZUFBbkQ7QUFDRCxHQUpvQyxDQUFyQztBQUtBLFNBQU8sOEJBQVA7QUFDRDs7QUFFRCxTQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDeEIsT0FBSyxLQUFMLEdBQWEsRUFBYjtBQUNEOztBQUVELFNBQVMscUJBQVQsR0FBaUM7QUFDL0IsTUFBSSxRQUFRLElBQUksSUFBSixFQUFaO0FBQ0EsTUFB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QkFBaEM7QUFDQSxJQUFJLDBCQUFKLEdBQWlDLG1DQUFqQztBQUNBLElBQUksa0JBQUosR0FBeUIsaUNBQXpCO0FBQ0EsSUFBSSxtQkFBSixHQUEwQixtQ0FBMUI7QUFDQSxJQUFJLGtCQUFKLEdBQXlCLFFBQXpCO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLEtBQW5CO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLENBQWxCO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLENBQWxCO0FBQ0EsSUFBSSxtQkFBSixHQUF5QixlQUF6Qjs7a0JBRWUsRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9XHJcblxyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9uKGF0dHJpYnV0ZSkge1xyXG4gIHJldHVybiBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChhdHRyaWJ1dGUpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSW5zZXJ0ZWRDZWxsRnJvbUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgaW5zZXJ0ZWRDZWxsKSB7XHJcbiAgbGV0IGluc2VydGVkQ2VsbFJvdyA9IGluc2VydGVkQ2VsbC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLlJPV19BVFRSSUJVVEUpO1xyXG4gIGxldCBpbnNlcnRlZENlbGxDb2wgPSBpbnNlcnRlZENlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKTtcclxuICBsZXQgY29sbGVjdGlvbldpdGhvdXRJbnNlcnRlZFZhbHVlID0gY29sbGVjdGlvbi5maWx0ZXIoY2VsbCA9PiB7XHJcbiAgICBsZXQgY2VsbFJvdyA9IGNlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5ST1dfQVRUUklCVVRFKTtcclxuICAgIGxldCBjZWxsQ29sID0gY2VsbC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpO1xyXG4gICAgcmV0dXJuIChjZWxsUm93ICE9PSBpbnNlcnRlZENlbGxSb3cgfHwgY2VsbENvbCAhPT0gaW5zZXJ0ZWRDZWxsQ29sKTtcclxuICB9KVxyXG4gIHJldHVybiBjb2xsZWN0aW9uV2l0aG91dEluc2VydGVkVmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyVmFsdWUoY2VsbCkge1xyXG4gIGNlbGwudmFsdWUgPSAnJztcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q3VycmVudERhdGVBbmRUaW1lKCkge1xyXG4gIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgbGV0IGRkID0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG4gIGxldCBtbSA9IHRvZGF5LmdldE1vbnRoKCkgKyAxO1xyXG4gIGxldCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICBsZXQgaGggPSB0b2RheS5nZXRIb3VycygpO1xyXG4gIGxldCBtaW4gPSB0b2RheS5nZXRNaW51dGVzKCk7XHJcblxyXG4gIGRkID0gYWRkMHRvVGltZVZhbHVlKGRkKVxyXG4gIG1tID0gYWRkMHRvVGltZVZhbHVlKG1tKVxyXG4gIG1pbiA9IGFkZDB0b1RpbWVWYWx1ZShtaW4pXHJcblxyXG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfSAke2hofToke21pbn1gXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGQwdG9UaW1lVmFsdWUodGltZVZhbHVlKSB7XHJcbiAgcmV0dXJuIHRpbWVWYWx1ZSA8IDEwID8gJzAnICsgdGltZVZhbHVlIDogdGltZVZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckdhbWUoKSB7XHJcbiAgbGV0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh2YXJpYWJsZXMuQUxMX0ZJRUxEU19TRUxFQ1RPUilcclxuICBlbGVtZW50cy5mb3JFYWNoKCBlbGVtZW50ID0+IHtcclxuICAgIGlmIChlbGVtZW50LnZhbHVlKSB7XHJcbiAgICAgIGVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyZWFkb25seScpKSB7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpXHJcbiAgICB9XHJcbiAgfSlcclxuICB2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkID0gZmFsc2U7XHJcbiAgcmV0dXJuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExhc3RTYXZlZEdhbWUoKSB7XHJcbiAgbGV0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2VbdmFyaWFibGVzLnByb3BJbkxvY2FsU3RvcmFnZV07XHJcbiAgbGV0IG9iamVjdDtcclxuICBsZXQgbGFzdFNhdmVJbmZvO1xyXG5cclxuICBpZiAobG9jYWxTdG9yYWdlKSB7XHJcbiAgICBsYXN0U2F2ZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5MQVNUX1NBVkVfU0VMRUNUT1IpO1xyXG4gICAgb2JqZWN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UpXHJcbiAgICBsYXN0U2F2ZUluZm8uaW5uZXJIVE1MID0gYExhc3Qgc2F2ZWQgYXQ6ICR7b2JqZWN0LmRhdGV9YFxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJTYXZlKCkge1xyXG4gIGxldCByZXN1bHQgPSBjbGVhckxvY2FsU3RvcmFnZSgpO1xyXG4gIGxldCBsYXN0U2F2ZUluZm87XHJcblxyXG4gIGlmIChyZXN1bHQpIHtcclxuICAgIGxhc3RTYXZlSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkxBU1RfU0FWRV9TRUxFQ1RPUik7XHJcbiAgICBpZiAobGFzdFNhdmVJbmZvKSB7XHJcbiAgICAgIGxhc3RTYXZlSW5mby5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckxvY2FsU3RvcmFnZSgpIHtcclxuICBsZXQgbG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICBpZiAobG9jYWxTdG9yYWdlW3ZhcmlhYmxlcy5wcm9wSW5Mb2NhbFN0b3JhZ2VdKSB7XHJcbiAgICByZXR1cm4gZGVsZXRlIGxvY2FsU3RvcmFnZVt2YXJpYWJsZXMucHJvcEluTG9jYWxTdG9yYWdlXTtcclxuICB9XHJcbn1cclxuXHJcbm9iaiA9IHtcclxuICBnZXRDb2xsZWN0aW9uLFxyXG4gIHJlbW92ZUluc2VydGVkQ2VsbEZyb21Db2xsZWN0aW9uLFxyXG4gIGNsZWFyVmFsdWUsXHJcbiAgZ2V0Q3VycmVudERhdGVBbmRUaW1lLFxyXG4gIGNsZWFyR2FtZSxcclxuICBnZXRMYXN0U2F2ZWRHYW1lLFxyXG4gIGNsZWFyU2F2ZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5sZXQgb2JqID0ge31cclxuXHJcbmZ1bmN0aW9uIGdldFNhdmVkR2FtZShwcm9wZXJ0eU5hbWUpIHtcclxuICBpZihsb2NhbFN0b3JhZ2VbcHJvcGVydHlOYW1lXSl7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbcHJvcGVydHlOYW1lXSk7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwdXRTYXZlZFZhbHVlc0ludG9UYWJsZSgpIHtcclxuICBpZih2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgbGV0IHZhbHVlcyA9IGdldFNhdmVkR2FtZSh2YXJpYWJsZXMucHJvcEluTG9jYWxTdG9yYWdlKTtcclxuICBsZXQgbGFzdFNhdmVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuTEFTVF9TQVZFX1NFTEVDVE9SKTtcclxuICBsZXQgcm93O1xyXG4gIGxldCBjb2w7XHJcbiAgbGV0IHZhbHVlO1xyXG4gIGxldCBpbnB1dEZpZWxkO1xyXG5cclxuICBpZighdmFsdWVzKSB7XHJcbiAgICBsYXN0U2F2ZUluZm8uaW5uZXJIVE1MID0gXCJOb3RoaW5nIHRvIGxvYWRcIjtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgIGxhc3RTYXZlSW5mby5pbm5lckhUTUwgPSBcIiBcIlxyXG4gICAgfSwzMDAwKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdmFsdWVzID0gdmFsdWVzLnZhbHVlXHJcblxyXG4gIGZvcihsZXQgdmFsdWUgaW4gdmFsdWVzKSB7XHJcblxyXG4gICAgcm93ID0gdmFsdWVbdmFyaWFibGVzLnJvd1Bvc2l0aW9uXTtcclxuICAgIGNvbCA9IHZhbHVlW3ZhcmlhYmxlcy5jb2xQb3NpdGlvbl07XHJcbiAgICBpbnB1dEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgWyR7dmFyaWFibGVzLlJPV19BVFRSSUJVVEV9PVwiJHtyb3d9XCJdWyR7dmFyaWFibGVzLkNPTF9BVFRSSUJVVEV9PVwiJHtjb2x9XCJdYClcclxuXHJcbiAgICBpbnB1dEZpZWxkLnZhbHVlID0gdmFsdWVzW3ZhbHVlXVxyXG4gICAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywndHJ1ZScpXHJcbiAgfVxyXG4gIHZhcmlhYmxlcy5pc1RhYmxlQnVpbGQgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnREYXRlU2F2ZWRHYW1lKGVsZW1lbnQsIGRhdGUpIHtcclxuICBlbGVtZW50LnZhbHVlID0gZGF0ZTtcclxuICByZXR1cm47XHJcbn1cclxuXHJcbm9iaiA9IHtcclxuICBnZXRTYXZlZEdhbWUsXHJcbiAgcHV0U2F2ZWRWYWx1ZXNJbnRvVGFibGVcclxufVxyXG5leHBvcnQgZGVmYXVsdCBvYmpcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBoZWxwZXJGdW5jdGlvbnN9IGZyb20gJy4vaGVscGVyLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGxvYWR9IGZyb20gJy4vbG9hZCc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB2YWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgcG9wdWxhdGV9IGZyb20gJy4vcG9wdWxhdGUnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgc2F2ZX0gZnJvbSAnLi9zYXZlJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHRhYmxlfSBmcm9tICcuL3RhYmxlJztcclxuXHJcbmxldCBzYXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuU0FWRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5sZXQgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLk5FV19HQU1FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBsb2FkR2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkxPQURfR0FNRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5sZXQgY2xlYXJHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuQ0xFQVJfR0FNRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5sZXQgY2xlYXJTYXZldXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5DTEVBUl9TQVZFX1NFTEVDVE9SKTtcclxubGV0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcblxyXG5cclxudGFibGUoKVxyXG5oZWxwZXJGdW5jdGlvbnMuZ2V0TGFzdFNhdmVkR2FtZSgpXHJcblxyXG5zYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxzYXZlLnNhdmVJbkxvY2FsU3RvcmFnZSk7XHJcbm5ld0dhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHBvcHVsYXRlLmluc2VydFZhbHVlcyk7XHJcbmxvYWRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxsb2FkLnB1dFNhdmVkVmFsdWVzSW50b1RhYmxlKTtcclxuY2xlYXJHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxoZWxwZXJGdW5jdGlvbnMuY2xlYXJHYW1lKVxyXG5jbGVhclNhdmV1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsaGVscGVyRnVuY3Rpb25zLmNsZWFyU2F2ZSlcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgaGVscGVyRnVuY3Rpb25zIH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIHZhbGlkYXRpb24gfSBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5sZXQgb2JqID0ge307XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRWYWx1ZXMoKSB7XHJcbiAgaWYgKCF2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkKSB7XHJcbiAgICBsZXQgcG9wdWxhdGVkQ2VsbHNDb3VudGVyID0gMDtcclxuICAgIHdoaWxlIChwb3B1bGF0ZWRDZWxsc0NvdW50ZXIgPCB2YXJpYWJsZXMuTUFYX0NFTExTX1RPX0JFX1BPUFVMQVRFRCkge1xyXG4gICAgICBsZXQgY2VsbCA9IGluc2VydFZhbHVlSW50b0NlbGwoKVxyXG4gICAgICBpZiAodmFsaWRhdGlvbi5pc0lucHV0VW5pcXVlKGNlbGwpKSB7XHJcbiAgICAgICAgcG9wdWxhdGVkQ2VsbHNDb3VudGVyKys7XHJcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJ3RydWUnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyaWFibGVzLmlzVGFibGVCdWlsZCA9IHRydWU7XHJcbiAgfVxyXG4gIHJldHVybjtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluc2VydFZhbHVlSW50b0NlbGwoc3RhcnQsIGVuZCkge1xyXG4gIGxldCBjb2xOciA9IGdldFJhbmRvbUFyYml0cmFyeSh2YXJpYWJsZXMuVEFCTEVfU1RBUlQsIHZhcmlhYmxlcy5UQUJMRV9FTkQpXHJcbiAgbGV0IHJvd05yID0gZ2V0UmFuZG9tQXJiaXRyYXJ5KHZhcmlhYmxlcy5UQUJMRV9TVEFSVCwgdmFyaWFibGVzLlRBQkxFX0VORClcclxuICBsZXQgcmFuZG9tVmFsdWUgPSBnZXRSYW5kb21BcmJpdHJhcnkodmFyaWFibGVzLlRBQkxFX1NUQVJULCB2YXJpYWJsZXMuVEFCTEVfRU5EKTtcclxuICBsZXQgY2VsbCA9IGdldENlbGwocm93TnIsIGNvbE5yKTtcclxuXHJcbiAgaWYgKCFjZWxsLnZhbHVlKSB7XHJcbiAgICBjZWxsLnZhbHVlID0gcmFuZG9tVmFsdWVcclxuICB9XHJcbiAgcmV0dXJuIGNlbGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUFyYml0cmFyeShzdGFydFJhbmdlLCBlbmRSYW5nZSkge1xyXG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoZW5kUmFuZ2UgLSBzdGFydFJhbmdlKSArIHN0YXJ0UmFuZ2UpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDZWxsKHJvdywgY29sLCByb3dBdHRyaWJ1dGUsIGNvbEF0dHJpYnV0ZSkge1xyXG4gIGxldCBjZWxsc0luUm93ID0gZ2V0Q29sbGVjdGlvbihgWyR7dmFyaWFibGVzLlJPV19BVFRSSUJVVEV9PVwiJHtyb3d9XCJdYCk7XHJcbiAgbGV0IGNlbGxzID0gY2VsbHNJblJvdy5maWx0ZXIoY2VsbEluUm93ID0+IHtcclxuICAgIHJldHVybiBjZWxsSW5Sb3cuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKSA9PSBjb2w7XHJcbiAgfSlcclxuICByZXR1cm4gY2VsbHNbMF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb24oYXR0cmlidXRlKSB7XHJcbiAgcmV0dXJuIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGF0dHJpYnV0ZSldO1xyXG59XHJcbm9iaiA9IHtcclxuICBpbnNlcnRWYWx1ZXNcclxufVxyXG5leHBvcnQgZGVmYXVsdCBvYmpcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgaGVscGVyRnVuY3Rpb25zIH0gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0VmFsdWVzRnJvbUZpZWxkcygpIHtcclxuICBsZXQgb2JqV2l0aFZhbHVlcyA9IHt9O1xyXG4gIGxldCBvYmogPSB7fTtcclxuICBsZXQgcm93O1xyXG4gIGxldCBjb2w7XHJcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIGxldCB2YWx1ZTtcclxuICBsZXQgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZhcmlhYmxlcy5JTlBVVF9GSUVMRF9TRUxFQ1RPUik7XHJcbiAgaW5wdXRGaWVsZHMgPSBbLi4uaW5wdXRGaWVsZHNdO1xyXG5cclxuICBpbnB1dEZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICBpZiAoZmllbGQudmFsdWUpIHtcclxuICAgICAgcm93ID0gZmllbGQuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5ST1dfQVRUUklCVVRFKTtcclxuICAgICAgY29sID0gZmllbGQuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKTtcclxuICAgICAgdmFsdWUgPSBmaWVsZC52YWx1ZTtcclxuICAgICAgb2JqV2l0aFZhbHVlc1tgcm93JHtyb3d9Y29sJHtjb2x9YF0gPSB2YWx1ZTtcclxuICAgIH1cclxuICB9KVxyXG4gIG9iai52YWx1ZSA9IG9ialdpdGhWYWx1ZXM7XHJcbiAgb2JqLmRhdGUgPSBoZWxwZXJGdW5jdGlvbnMuZ2V0Q3VycmVudERhdGVBbmRUaW1lKClcclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlSW5Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgbGV0IG9ialdpdGhWYWx1ZXMgPSBnZXRWYWx1ZXNGcm9tRmllbGRzKCk7XHJcbiAgb2JqV2l0aFZhbHVlcyA9IEpTT04uc3RyaW5naWZ5KG9ialdpdGhWYWx1ZXMpO1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsb2NhbFN0b3JhZ2UsdmFyaWFibGVzLnByb3BJbkxvY2FsU3RvcmFnZSwge1xyXG4gICAgY29uZmlndXJhYmxlOnRydWUsXHJcbiAgICB3cml0YWJsZTp0cnVlXHJcbiAgfSk7XHJcbiAgbG9jYWxTdG9yYWdlW3ZhcmlhYmxlcy5wcm9wSW5Mb2NhbFN0b3JhZ2VdID0gb2JqV2l0aFZhbHVlcztcclxuICBoZWxwZXJGdW5jdGlvbnMuZ2V0TGFzdFNhdmVkR2FtZSgpXHJcbn1cclxuXHJcbm9iaiA9IHtcclxuICBzYXZlSW5Mb2NhbFN0b3JhZ2VcclxufVxyXG5leHBvcnQgZGVmYXVsdCBvYmpcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgdmFsaWRhdGlvbiB9IGZyb20gJy4vdmFsaWRhdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVUYWJsZSgpIHtcclxuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG4gIGxldCBzdWRva3VDb250YWluZXIgPSBnZXRTdWRva3VDb250YWluZXIodmFyaWFibGVzLlNVRE9LVV9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxuICBmb3IgKGxldCByb3cgPSB2YXJpYWJsZXMuVEFCTEVfU1RBUlQ7IHJvdyA8PSB2YXJpYWJsZXMuVEFCTEVfSEVJR0hUOyByb3crKykge1xyXG4gICAgbGV0IGN1cnJlbnRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXHJcbiAgICBmb3IgKGxldCBjb2x1bW4gPSB2YXJpYWJsZXMuVEFCTEVfU1RBUlQ7IGNvbHVtbiA8PSB2YXJpYWJsZXMuVEFCTEVfV0lEVEg7IGNvbHVtbisrKSB7XHJcbiAgICAgIGxldCBjZWxsID0gY3JlYXRlQ2VsbChyb3csIGNvbHVtbik7XHJcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoY3JlYXRlSGVscEZpZWxkKHZhcmlhYmxlcy5NQVhfTEVOR1RIX0hFTFBfRklFTEQpKVxyXG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0RmllbGQocm93LCBjb2x1bW4sIHZhcmlhYmxlcy5JTlBVVF9GSUVMRF9QQVRURVJOLCB2YXJpYWJsZXMuTUFYX0xFTkdUSF9JTlBVVF9GSUVMRCkpXHJcbiAgICAgIGN1cnJlbnRSb3cuYXBwZW5kQ2hpbGQoY2VsbClcclxuICAgIH1cclxuICAgIHRhYmxlLmFwcGVuZENoaWxkKGN1cnJlbnRSb3cpXHJcbiAgfVxyXG4gIHN1ZG9rdUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSlcclxuICBsZXQgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZhcmlhYmxlcy5JTlBVVF9GSUVMRF9TRUxFQ1RPUik7XHJcbiAgYWRkRXZlbnRMaXN0ZW5lcnNUb0lucHV0RmllbGRzKHZhbGlkYXRpb24uaXNJbnB1dFZhbGlkLCBpbnB1dEZpZWxkcyk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdWRva3VDb250YWluZXIoc3Vkb2t1Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdWRva3VDb250YWluZXJTZWxlY3Rvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNlbGwocm93LCBjb2wpIHtcclxuICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjbGFzcycsIGByb3ctJHtyb3d9YCk7XHJcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjbGFzcycsIGBjb2wtJHtjb2x9YCk7XHJcbiAgcmV0dXJuIGNlbGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhlbHBGaWVsZChtYXhMZW5ndGgpIHtcclxuICBsZXQgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgZmllbGQuc2V0QXR0cmlidXRlKCdtYXhMZW5ndGgnLCArbWF4TGVuZ3RoKTtcclxuICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdoZWxwLWZpZWxkJyk7XHJcbiAgcmV0dXJuIGZpZWxkO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW5wdXRGaWVsZChyb3csIGNvbCwgcGF0dGVybiwgbWF4TGVuZ3RoKSB7XHJcbiAgbGV0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGxldCBzcXVhcmVOciA9IGdldFNxdWFyZU5yKHJvdywgY29sKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdtYWluLWZpZWxkJyk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3BhdHRlcm4nLCBwYXR0ZXJuKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgnbWF4TGVuZ3RoJywgK21heExlbmd0aCk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXJvdycsIGAke3Jvd31gKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY29sJywgYCR7Y29sfWApO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1zcXInLCBgJHtzcXVhcmVOcn1gKTtcclxuXHJcbiAgcmV0dXJuIGlucHV0RmllbGQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNxdWFyZU5yKHJvdywgY29sKSB7XHJcbiAgaWYgKHJvdyA8PSAzICYmIGNvbCA8PSAzKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2UgaWYgKHJvdyA8PSAzICYmIGNvbCA+IDMgJiYgY29sIDwgNykge1xyXG4gICAgcmV0dXJuIDI7XHJcbiAgfSBlbHNlIGlmIChyb3cgPD0gMyAmJiBjb2wgPj0gNykge1xyXG4gICAgcmV0dXJuIDM7XHJcbiAgfSBlbHNlIGlmIChyb3cgPiAzICYmIHJvdyA8IDcgJiYgY29sIDw9IDMpIHtcclxuICAgIHJldHVybiA0O1xyXG4gIH0gZWxzZSBpZiAocm93ID4gMyAmJiByb3cgPCA3ICYmIGNvbCA+IDMgJiYgY29sIDwgNykge1xyXG4gICAgcmV0dXJuIDU7XHJcbiAgfSBlbHNlIGlmIChyb3cgPiAzICYmIHJvdyA8IDcgJiYgY29sID49IDcpIHtcclxuICAgIHJldHVybiA2XHJcbiAgfSBlbHNlIGlmIChyb3cgPj0gNyAmJiBjb2wgPD0gMykge1xyXG4gICAgcmV0dXJuIDc7XHJcbiAgfSBlbHNlIGlmIChyb3cgPj0gNyAmJiBjb2wgPiAzICYmIGNvbCA8IDcpIHtcclxuICAgIHJldHVybiA4O1xyXG4gIH0gZWxzZSBpZiAocm93ID49IDcgJiYgY29sID49IDcpIHtcclxuICAgIHJldHVybiA5O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNUb0lucHV0RmllbGRzKHZhbGlkYXRpb25GbiwgaW5wdXRGaWVsZHMpIHtcclxuICBpbnB1dEZpZWxkcyA9IFsuLi5pbnB1dEZpZWxkc107XHJcbiAgaW5wdXRGaWVsZHMuZm9yRWFjaCggaW5wdXQgPT5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdmFsaWRhdGlvbkZuKVxyXG4gIClcclxufVxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGhlbHBlckZ1bmN0aW9uc30gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gaXNJbnB1dFVuaXF1ZShjZWxsKSB7XHJcblxyXG4gIGlmIChpc1VuaXF1ZUluQ29sbGVjdGlvbihjZWxsLCB2YXJpYWJsZXMuUk9XX0FUVFJJQlVURSkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAoaXNVbmlxdWVJbkNvbGxlY3Rpb24oY2VsbCwgdmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpKSB7XHJcbiAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKGlzVW5pcXVlSW5Db2xsZWN0aW9uKGNlbGwsIHZhcmlhYmxlcy5TUVJfQVRUUklCVVRFKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSXNJbnB1dE51bWJlcihpbnB1dCkge1xyXG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChpbnB1dCkpICYmIGlzRmluaXRlKGlucHV0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNVbmlxdWVJbkNvbGxlY3Rpb24oY2VsbCwgYXR0cikge1xyXG4gIGxldCByb3dBdHRyVmFsID0gY2VsbC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgbGV0IGNvbGxlY3Rpb24gPSBoZWxwZXJGdW5jdGlvbnMuZ2V0Q29sbGVjdGlvbihgWyR7YXR0cn09XCIke3Jvd0F0dHJWYWx9XCJdYCk7XHJcbiAgY29sbGVjdGlvbiA9IGhlbHBlckZ1bmN0aW9ucy5yZW1vdmVJbnNlcnRlZENlbGxGcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBjZWxsKTtcclxuXHJcbiAgcmV0dXJuIGRvZXNDb2xsZWN0aW9uQ29udGFpbkluc2VydGVkVmFsdWUoY29sbGVjdGlvbiwgY2VsbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvZXNDb2xsZWN0aW9uQ29udGFpbkluc2VydGVkVmFsdWUoY29sbGVjdGlvbiwgaW5zZXJ0ZWRWYWx1ZSkge1xyXG4gIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICBjb2xsZWN0aW9uLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICBpZiAoY2VsbC52YWx1ZSA9PT0gaW5zZXJ0ZWRWYWx1ZS52YWx1ZSkge1xyXG4gICAgICBnaXZlSW52YWxpZENsYXNzKGNlbGwpO1xyXG4gICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2l2ZUludmFsaWRDbGFzcyhjZWxsKSB7XHJcbiAgaWYgKHZhcmlhYmxlcy5pc1RhYmxlQnVpbGQpIHtcclxuICAgIGNlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWZpZWxkJylcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY2VsbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtZmllbGQnKVxyXG4gICAgfSwgMjAwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0lucHV0VmFsaWQoZXZlbnQpIHtcclxuICBsZXQgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICBpZiAoY2VsbC52YWx1ZSA9PSAnJykge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNoZWNrSXNJbnB1dE51bWJlcihjZWxsLnZhbHVlKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIWlzSW5wdXRVbmlxdWUoY2VsbCkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4gb2JqID0ge1xyXG4gIGlzSW5wdXRVbmlxdWUsXHJcbiAgY2hlY2tJc0lucHV0TnVtYmVyLFxyXG4gIGlzVW5pcXVlSW5Db2xsZWN0aW9uLFxyXG4gIGlzSW5wdXRWYWxpZFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJcclxuY29uc3Qgb2JqID0ge307XHJcblxyXG5vYmouU1VET0tVX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzdWRva3UtY29udGFpbmVyXCJdJ1xyXG5vYmouVEFCTEVfU1RBUlQgPSAxO1xyXG5vYmouVEFCTEVfV0lEVEggPSA5O1xyXG5vYmouVEFCTEVfSEVJR0hUID0gOTtcclxub2JqLlRBQkxFX0VORCA9IDk7XHJcbm9iai5NQVhfQ0VMTFNfVE9fQkVfUE9QVUxBVEVEID0gMjA7XHJcbm9iai5NQVhfTEVOR1RIX0hFTFBfRklFTEQgPSA2O1xyXG5vYmouTUFYX0xFTkdUSF9JTlBVVF9GSUVMRCA9IDE7XHJcbm9iai5BU0NJSV9GT1JfMCA9IDQ4O1xyXG5vYmouQVNDSUlfRk9SXzkgPSA1Nztcclxub2JqLkFTQ0lJX0ZPUl8wX05tS3AgPSA5Njtcclxub2JqLkFTQ0lJX0ZPUl85X05tS3AgPSAxMDU7XHJcbm9iai5BU0NJSV9GT1JfVGFiID0gOTtcclxub2JqLlJPV19BVFRSSUJVVEUgPSAnZGF0YS10YXJnZXQtcm93Jztcclxub2JqLkNPTF9BVFRSSUJVVEUgPSAnZGF0YS10YXJnZXQtY29sJztcclxub2JqLlNRUl9BVFRSSUJVVEUgPSAnZGF0YS10YXJnZXQtc3FyJztcclxub2JqLklOUFVUX0ZJRUxEX1BBVFRFUk4gPSAnWzAtOV17MX0nO1xyXG5vYmouU1VET0tVX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzdWRva3UtY29udGFpbmVyXCJdJztcclxub2JqLkJUTl9DUkVBVEVfU1VET0tVX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImJ0bi1jcmVhdGUtc3Vkb2t1XCJdJztcclxub2JqLlZBTElEQVRJT05fQkFOTkVSX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInZhbGlkYXRpb24tYmFubmVyXCJdJztcclxub2JqLlZBTElEQVRJT05fQkFOTkVSX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInZhbGlkYXRpb24tYmFubmVyXCJdJztcclxub2JqLklOUFVUX0ZJRUxEX1NFTEVDVE9SID0gJ1tjbGFzcz1cIm1haW4tZmllbGRcIl0nO1xyXG5vYmouU0FWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwic2F2ZS1idXR0b25cIl0nO1xyXG5vYmouTkVXX0dBTUVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cIm5ldy1nYW1lLWJ1dHRvblwiXSc7XHJcbm9iai5MT0FEX0dBTUVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImxvYWQtYnV0dG9uXCJdJztcclxub2JqLkNMRUFSX0dBTUVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImNsZWFyLWdhbWUtYnV0dG9uXCJdJztcclxub2JqLkxBU1RfU0FWRV9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJsYXN0LXNhdmVkLWdhbWVcIl0nO1xyXG5vYmouQ0xFQVJfU0FWRV9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJjbGVhci1zYXZlLWJ1dHRvblwiXSc7XHJcbm9iai5wcm9wSW5Mb2NhbFN0b3JhZ2UgPSAnU3Vkb2t1Jztcclxub2JqLmlzVGFibGVCdWlsZCA9IGZhbHNlO1xyXG5vYmoucm93UG9zaXRpb24gPSAzO1xyXG5vYmouY29sUG9zaXRpb24gPSA3O1xyXG5vYmouQUxMX0ZJRUxEU19TRUxFQ1RPUj0gJ1t0eXBlPVwidGV4dFwiXSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiJdfQ==
