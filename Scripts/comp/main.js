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

function putSavedValuesIntoTable(rowPosition, colPosition) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL29yaWcvaGVscGVyLmpzIiwiU2NyaXB0cy9vcmlnL2xvYWQuanMiLCJTY3JpcHRzL29yaWcvbWFpbi5qcyIsIlNjcmlwdHMvb3JpZy9wb3B1bGF0ZS5qcyIsIlNjcmlwdHMvb3JpZy9zYXZlLmpzIiwiU2NyaXB0cy9vcmlnL3RhYmxlLmpzIiwiU2NyaXB0cy9vcmlnL3ZhbGlkYXRpb24uanMiLCJTY3JpcHRzL29yaWcvdmFyaWFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxNQUFNLEVBQVY7O0FBRUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLHNDQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBWDtBQUNEOztBQUVELFNBQVMsZ0NBQVQsQ0FBMEMsVUFBMUMsRUFBc0QsWUFBdEQsRUFBb0U7QUFDbEUsTUFBSSxrQkFBa0IsYUFBYSxZQUFiLENBQTBCLG9CQUFVLGFBQXBDLENBQXRCO0FBQ0EsTUFBSSxrQkFBa0IsYUFBYSxZQUFiLENBQTBCLG9CQUFVLGFBQXBDLENBQXRCO0FBQ0EsTUFBSSxpQ0FBaUMsV0FBVyxNQUFYLENBQWtCLGdCQUFRO0FBQzdELFFBQUksVUFBVSxLQUFLLFlBQUwsQ0FBa0Isb0JBQVUsYUFBNUIsQ0FBZDtBQUNBLFFBQUksVUFBVSxLQUFLLFlBQUwsQ0FBa0Isb0JBQVUsYUFBNUIsQ0FBZDtBQUNBLFdBQVEsWUFBWSxlQUFaLElBQStCLFlBQVksZUFBbkQ7QUFDRCxHQUpvQyxDQUFyQztBQUtBLFNBQU8sOEJBQVA7QUFDRDs7QUFFRCxTQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDeEIsT0FBSyxLQUFMLEdBQWEsRUFBYjtBQUNEOztBQUVELFNBQVMscUJBQVQsR0FBaUM7QUFDL0IsTUFBSSxRQUFRLElBQUksSUFBSixFQUFaO0FBQ0EsTUFB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SSwwQkFBSixHQUFpQyxtQ0FBakM7QUFDQSxJQUFJLGtCQUFKLEdBQXlCLGlDQUF6QjtBQUNBLElBQUksbUJBQUosR0FBMEIsbUNBQTFCO0FBQ0EsSUFBSSxrQkFBSixHQUF5QixRQUF6QjtBQUNBLElBQUksWUFBSixHQUFtQixLQUFuQjtBQUNBLElBQUksV0FBSixHQUFrQixDQUFsQjtBQUNBLElBQUksV0FBSixHQUFrQixDQUFsQjtBQUNBLElBQUksbUJBQUosR0FBeUIsZUFBekI7O2tCQUVlLEciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuXHJcbmxldCBvYmogPSB7fVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbihhdHRyaWJ1dGUpIHtcclxuICByZXR1cm4gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYXR0cmlidXRlKV07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUluc2VydGVkQ2VsbEZyb21Db2xsZWN0aW9uKGNvbGxlY3Rpb24sIGluc2VydGVkQ2VsbCkge1xyXG4gIGxldCBpbnNlcnRlZENlbGxSb3cgPSBpbnNlcnRlZENlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5ST1dfQVRUUklCVVRFKTtcclxuICBsZXQgaW5zZXJ0ZWRDZWxsQ29sID0gaW5zZXJ0ZWRDZWxsLmdldEF0dHJpYnV0ZSh2YXJpYWJsZXMuQ09MX0FUVFJJQlVURSk7XHJcbiAgbGV0IGNvbGxlY3Rpb25XaXRob3V0SW5zZXJ0ZWRWYWx1ZSA9IGNvbGxlY3Rpb24uZmlsdGVyKGNlbGwgPT4ge1xyXG4gICAgbGV0IGNlbGxSb3cgPSBjZWxsLmdldEF0dHJpYnV0ZSh2YXJpYWJsZXMuUk9XX0FUVFJJQlVURSk7XHJcbiAgICBsZXQgY2VsbENvbCA9IGNlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKTtcclxuICAgIHJldHVybiAoY2VsbFJvdyAhPT0gaW5zZXJ0ZWRDZWxsUm93IHx8IGNlbGxDb2wgIT09IGluc2VydGVkQ2VsbENvbCk7XHJcbiAgfSlcclxuICByZXR1cm4gY29sbGVjdGlvbldpdGhvdXRJbnNlcnRlZFZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhclZhbHVlKGNlbGwpIHtcclxuICBjZWxsLnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnREYXRlQW5kVGltZSgpIHtcclxuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIGxldCBkZCA9IHRvZGF5LmdldERhdGUoKTtcclxuICBsZXQgbW0gPSB0b2RheS5nZXRNb250aCgpICsgMTtcclxuICBsZXQgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgbGV0IGhoID0gdG9kYXkuZ2V0SG91cnMoKTtcclxuICBsZXQgbWluID0gdG9kYXkuZ2V0TWludXRlcygpO1xyXG5cclxuICBkZCA9IGFkZDB0b1RpbWVWYWx1ZShkZClcclxuICBtbSA9IGFkZDB0b1RpbWVWYWx1ZShtbSlcclxuICBtaW4gPSBhZGQwdG9UaW1lVmFsdWUobWluKVxyXG5cclxuICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH0gJHtoaH06JHttaW59YFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkMHRvVGltZVZhbHVlKHRpbWVWYWx1ZSkge1xyXG4gIHJldHVybiB0aW1lVmFsdWUgPCAxMCA/ICcwJyArIHRpbWVWYWx1ZSA6IHRpbWVWYWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJHYW1lKCkge1xyXG4gIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFyaWFibGVzLkFMTF9GSUVMRFNfU0VMRUNUT1IpXHJcbiAgZWxlbWVudHMuZm9yRWFjaCggZWxlbWVudCA9PiB7XHJcbiAgICBpZiAoZWxlbWVudC52YWx1ZSkge1xyXG4gICAgICBlbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgIH1cclxuICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZSgncmVhZG9ubHknKSkge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgdmFyaWFibGVzLmlzVGFibGVCdWlsZCA9IGZhbHNlO1xyXG4gIHJldHVyblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMYXN0U2F2ZWRHYW1lKCkge1xyXG4gIGxldCBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlW3ZhcmlhYmxlcy5wcm9wSW5Mb2NhbFN0b3JhZ2VdO1xyXG4gIGxldCBvYmplY3Q7XHJcbiAgbGV0IGxhc3RTYXZlSW5mbztcclxuXHJcbiAgaWYgKGxvY2FsU3RvcmFnZSkge1xyXG4gICAgbGFzdFNhdmVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuTEFTVF9TQVZFX1NFTEVDVE9SKTtcclxuICAgIG9iamVjdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlKVxyXG4gICAgbGFzdFNhdmVJbmZvLmlubmVySFRNTCA9IGBMYXN0IHNhdmVkIGF0OiAke29iamVjdC5kYXRlfWBcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyU2F2ZSgpIHtcclxuICBsZXQgcmVzdWx0ID0gY2xlYXJMb2NhbFN0b3JhZ2UoKTtcclxuICBsZXQgbGFzdFNhdmVJbmZvO1xyXG5cclxuICBpZiAocmVzdWx0KSB7XHJcbiAgICBsYXN0U2F2ZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5MQVNUX1NBVkVfU0VMRUNUT1IpO1xyXG4gICAgaWYgKGxhc3RTYXZlSW5mbykge1xyXG4gICAgICBsYXN0U2F2ZUluZm8uaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJMb2NhbFN0b3JhZ2UoKSB7XHJcbiAgbGV0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcbiAgaWYgKGxvY2FsU3RvcmFnZVt2YXJpYWJsZXMucHJvcEluTG9jYWxTdG9yYWdlXSkge1xyXG4gICAgcmV0dXJuIGRlbGV0ZSBsb2NhbFN0b3JhZ2VbdmFyaWFibGVzLnByb3BJbkxvY2FsU3RvcmFnZV07XHJcbiAgfVxyXG59XHJcblxyXG5vYmogPSB7XHJcbiAgZ2V0Q29sbGVjdGlvbixcclxuICByZW1vdmVJbnNlcnRlZENlbGxGcm9tQ29sbGVjdGlvbixcclxuICBjbGVhclZhbHVlLFxyXG4gIGdldEN1cnJlbnREYXRlQW5kVGltZSxcclxuICBjbGVhckdhbWUsXHJcbiAgZ2V0TGFzdFNhdmVkR2FtZSxcclxuICBjbGVhclNhdmVcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxubGV0IG9iaiA9IHt9XHJcblxyXG5mdW5jdGlvbiBnZXRTYXZlZEdhbWUocHJvcGVydHlOYW1lKSB7XHJcbiAgaWYobG9jYWxTdG9yYWdlW3Byb3BlcnR5TmFtZV0pe1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW3Byb3BlcnR5TmFtZV0pO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gcHV0U2F2ZWRWYWx1ZXNJbnRvVGFibGUocm93UG9zaXRpb24sY29sUG9zaXRpb24pIHtcclxuICBsZXQgdmFsdWVzID0gZ2V0U2F2ZWRHYW1lKHZhcmlhYmxlcy5wcm9wSW5Mb2NhbFN0b3JhZ2UpO1xyXG4gIGxldCBsYXN0U2F2ZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5MQVNUX1NBVkVfU0VMRUNUT1IpO1xyXG4gIGxldCByb3c7XHJcbiAgbGV0IGNvbDtcclxuICBsZXQgdmFsdWU7XHJcbiAgbGV0IGlucHV0RmllbGQ7XHJcblxyXG4gIGlmKCF2YWx1ZXMpIHtcclxuICAgIGxhc3RTYXZlSW5mby5pbm5lckhUTUwgPSBcIk5vdGhpbmcgdG8gbG9hZFwiO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgbGFzdFNhdmVJbmZvLmlubmVySFRNTCA9IFwiIFwiXHJcbiAgICB9LDMwMDApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB2YWx1ZXMgPSB2YWx1ZXMudmFsdWVcclxuXHJcbiAgZm9yKGxldCB2YWx1ZSBpbiB2YWx1ZXMpIHtcclxuXHJcbiAgICByb3cgPSB2YWx1ZVt2YXJpYWJsZXMucm93UG9zaXRpb25dO1xyXG4gICAgY29sID0gdmFsdWVbdmFyaWFibGVzLmNvbFBvc2l0aW9uXTtcclxuICAgIGlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbJHt2YXJpYWJsZXMuUk9XX0FUVFJJQlVURX09XCIke3Jvd31cIl1bJHt2YXJpYWJsZXMuQ09MX0FUVFJJQlVURX09XCIke2NvbH1cIl1gKVxyXG5cclxuICAgIGlucHV0RmllbGQudmFsdWUgPSB2YWx1ZXNbdmFsdWVdXHJcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCd0cnVlJylcclxuICB9XHJcbiAgdmFyaWFibGVzLmlzVGFibGVCdWlsZCA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydERhdGVTYXZlZEdhbWUoZWxlbWVudCwgZGF0ZSkge1xyXG4gIGVsZW1lbnQudmFsdWUgPSBkYXRlO1xyXG4gIHJldHVybjtcclxufVxyXG5cclxub2JqID0ge1xyXG4gIGdldFNhdmVkR2FtZSxcclxuICBwdXRTYXZlZFZhbHVlc0ludG9UYWJsZVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGhlbHBlckZ1bmN0aW9uc30gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgbG9hZH0gZnJvbSAnLi9sb2FkJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBwb3B1bGF0ZX0gZnJvbSAnLi9wb3B1bGF0ZSc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBzYXZlfSBmcm9tICcuL3NhdmUnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgdGFibGV9IGZyb20gJy4vdGFibGUnO1xyXG5cclxubGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5TQVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuTkVXX0dBTUVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGV0IGxvYWRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuTE9BRF9HQU1FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBjbGVhckdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5DTEVBUl9HQU1FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBjbGVhclNhdmV1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkNMRUFSX1NBVkVfU0VMRUNUT1IpO1xyXG5sZXQgbG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuXHJcblxyXG50YWJsZSgpXHJcbmhlbHBlckZ1bmN0aW9ucy5nZXRMYXN0U2F2ZWRHYW1lKClcclxuXHJcbnNhdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHNhdmUuc2F2ZUluTG9jYWxTdG9yYWdlKTtcclxubmV3R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycscG9wdWxhdGUuaW5zZXJ0VmFsdWVzKTtcclxubG9hZEdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGxvYWQucHV0U2F2ZWRWYWx1ZXNJbnRvVGFibGUpO1xyXG5jbGVhckdhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGhlbHBlckZ1bmN0aW9ucy5jbGVhckdhbWUpXHJcbmNsZWFyU2F2ZXV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxoZWxwZXJGdW5jdGlvbnMuY2xlYXJTYXZlKVxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBoZWxwZXJGdW5jdGlvbnMgfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgdmFsaWRhdGlvbiB9IGZyb20gJy4vdmFsaWRhdGlvbic7XHJcbmxldCBvYmogPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGluc2VydFZhbHVlcygpIHtcclxuICBpZiAoIXZhcmlhYmxlcy5pc1RhYmxlQnVpbGQpIHtcclxuICAgIGxldCBwb3B1bGF0ZWRDZWxsc0NvdW50ZXIgPSAwO1xyXG4gICAgd2hpbGUgKHBvcHVsYXRlZENlbGxzQ291bnRlciA8IHZhcmlhYmxlcy5NQVhfQ0VMTFNfVE9fQkVfUE9QVUxBVEVEKSB7XHJcbiAgICAgIGxldCBjZWxsID0gaW5zZXJ0VmFsdWVJbnRvQ2VsbCgpXHJcbiAgICAgIGlmICh2YWxpZGF0aW9uLmlzSW5wdXRVbmlxdWUoY2VsbCkpIHtcclxuICAgICAgICBwb3B1bGF0ZWRDZWxsc0NvdW50ZXIrKztcclxuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAndHJ1ZScpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkID0gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VmFsdWVJbnRvQ2VsbChzdGFydCwgZW5kKSB7XHJcbiAgbGV0IGNvbE5yID0gZ2V0UmFuZG9tQXJiaXRyYXJ5KHZhcmlhYmxlcy5UQUJMRV9TVEFSVCwgdmFyaWFibGVzLlRBQkxFX0VORClcclxuICBsZXQgcm93TnIgPSBnZXRSYW5kb21BcmJpdHJhcnkodmFyaWFibGVzLlRBQkxFX1NUQVJULCB2YXJpYWJsZXMuVEFCTEVfRU5EKVxyXG4gIGxldCByYW5kb21WYWx1ZSA9IGdldFJhbmRvbUFyYml0cmFyeSh2YXJpYWJsZXMuVEFCTEVfU1RBUlQsIHZhcmlhYmxlcy5UQUJMRV9FTkQpO1xyXG4gIGxldCBjZWxsID0gZ2V0Q2VsbChyb3dOciwgY29sTnIpO1xyXG5cclxuICBpZiAoIWNlbGwudmFsdWUpIHtcclxuICAgIGNlbGwudmFsdWUgPSByYW5kb21WYWx1ZVxyXG4gIH1cclxuICByZXR1cm4gY2VsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tQXJiaXRyYXJ5KHN0YXJ0UmFuZ2UsIGVuZFJhbmdlKSB7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChlbmRSYW5nZSAtIHN0YXJ0UmFuZ2UpICsgc3RhcnRSYW5nZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENlbGwocm93LCBjb2wsIHJvd0F0dHJpYnV0ZSwgY29sQXR0cmlidXRlKSB7XHJcbiAgbGV0IGNlbGxzSW5Sb3cgPSBnZXRDb2xsZWN0aW9uKGBbJHt2YXJpYWJsZXMuUk9XX0FUVFJJQlVURX09XCIke3Jvd31cIl1gKTtcclxuICBsZXQgY2VsbHMgPSBjZWxsc0luUm93LmZpbHRlcihjZWxsSW5Sb3cgPT4ge1xyXG4gICAgcmV0dXJuIGNlbGxJblJvdy5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpID09IGNvbDtcclxuICB9KVxyXG4gIHJldHVybiBjZWxsc1swXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbihhdHRyaWJ1dGUpIHtcclxuICByZXR1cm4gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYXR0cmlidXRlKV07XHJcbn1cclxub2JqID0ge1xyXG4gIGluc2VydFZhbHVlc1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBoZWxwZXJGdW5jdGlvbnMgfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5sZXQgb2JqID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXRWYWx1ZXNGcm9tRmllbGRzKCkge1xyXG4gIGxldCBvYmpXaXRoVmFsdWVzID0ge307XHJcbiAgbGV0IG9iaiA9IHt9O1xyXG4gIGxldCByb3c7XHJcbiAgbGV0IGNvbDtcclxuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgbGV0IHZhbHVlO1xyXG4gIGxldCBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFyaWFibGVzLklOUFVUX0ZJRUxEX1NFTEVDVE9SKTtcclxuICBpbnB1dEZpZWxkcyA9IFsuLi5pbnB1dEZpZWxkc107XHJcblxyXG4gIGlucHV0RmllbGRzLmZvckVhY2goZnVuY3Rpb24oZmllbGQpIHtcclxuICAgIGlmIChmaWVsZC52YWx1ZSkge1xyXG4gICAgICByb3cgPSBmaWVsZC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLlJPV19BVFRSSUJVVEUpO1xyXG4gICAgICBjb2wgPSBmaWVsZC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpO1xyXG4gICAgICB2YWx1ZSA9IGZpZWxkLnZhbHVlO1xyXG4gICAgICBvYmpXaXRoVmFsdWVzW2Byb3cke3Jvd31jb2wke2NvbH1gXSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgb2JqLnZhbHVlID0gb2JqV2l0aFZhbHVlcztcclxuICBvYmouZGF0ZSA9IGhlbHBlckZ1bmN0aW9ucy5nZXRDdXJyZW50RGF0ZUFuZFRpbWUoKVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVJbkxvY2FsU3RvcmFnZSgpIHtcclxuICBsZXQgb2JqV2l0aFZhbHVlcyA9IGdldFZhbHVlc0Zyb21GaWVsZHMoKTtcclxuICBvYmpXaXRoVmFsdWVzID0gSlNPTi5zdHJpbmdpZnkob2JqV2l0aFZhbHVlcyk7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxvY2FsU3RvcmFnZSx2YXJpYWJsZXMucHJvcEluTG9jYWxTdG9yYWdlLCB7XHJcbiAgICBjb25maWd1cmFibGU6dHJ1ZSxcclxuICAgIHdyaXRhYmxlOnRydWVcclxuICB9KTtcclxuICBsb2NhbFN0b3JhZ2VbdmFyaWFibGVzLnByb3BJbkxvY2FsU3RvcmFnZV0gPSBvYmpXaXRoVmFsdWVzO1xyXG4gIGhlbHBlckZ1bmN0aW9ucy5nZXRMYXN0U2F2ZWRHYW1lKClcclxufVxyXG5cclxub2JqID0ge1xyXG4gIHNhdmVJbkxvY2FsU3RvcmFnZVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyB2YWxpZGF0aW9uIH0gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENyZWF0ZVRhYmxlKCkge1xyXG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgbGV0IHN1ZG9rdUNvbnRhaW5lciA9IGdldFN1ZG9rdUNvbnRhaW5lcih2YXJpYWJsZXMuU1VET0tVX0NPTlRBSU5FUl9TRUxFQ1RPUik7XHJcblxyXG4gIGZvciAobGV0IHJvdyA9IHZhcmlhYmxlcy5UQUJMRV9TVEFSVDsgcm93IDw9IHZhcmlhYmxlcy5UQUJMRV9IRUlHSFQ7IHJvdysrKSB7XHJcbiAgICBsZXQgY3VycmVudFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcclxuICAgIGZvciAobGV0IGNvbHVtbiA9IHZhcmlhYmxlcy5UQUJMRV9TVEFSVDsgY29sdW1uIDw9IHZhcmlhYmxlcy5UQUJMRV9XSURUSDsgY29sdW1uKyspIHtcclxuICAgICAgbGV0IGNlbGwgPSBjcmVhdGVDZWxsKHJvdywgY29sdW1uKTtcclxuICAgICAgY2VsbC5hcHBlbmRDaGlsZChjcmVhdGVIZWxwRmllbGQodmFyaWFibGVzLk1BWF9MRU5HVEhfSEVMUF9GSUVMRCkpXHJcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRGaWVsZChyb3csIGNvbHVtbiwgdmFyaWFibGVzLklOUFVUX0ZJRUxEX1BBVFRFUk4sIHZhcmlhYmxlcy5NQVhfTEVOR1RIX0lOUFVUX0ZJRUxEKSlcclxuICAgICAgY3VycmVudFJvdy5hcHBlbmRDaGlsZChjZWxsKVxyXG4gICAgfVxyXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQoY3VycmVudFJvdylcclxuICB9XHJcbiAgc3Vkb2t1Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhYmxlKVxyXG4gIGxldCBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFyaWFibGVzLklOUFVUX0ZJRUxEX1NFTEVDVE9SKTtcclxuICBhZGRFdmVudExpc3RlbmVyc1RvSW5wdXRGaWVsZHModmFsaWRhdGlvbi5pc0lucHV0VmFsaWQsIGlucHV0RmllbGRzKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFN1ZG9rdUNvbnRhaW5lcihzdWRva3VDb250YWluZXJTZWxlY3Rvcikge1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN1ZG9rdUNvbnRhaW5lclNlbGVjdG9yKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2VsbChyb3csIGNvbCkge1xyXG4gIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NsYXNzJywgYHJvdy0ke3Jvd31gKTtcclxuICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NsYXNzJywgYGNvbC0ke2NvbH1gKTtcclxuICByZXR1cm4gY2VsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSGVscEZpZWxkKG1heExlbmd0aCkge1xyXG4gIGxldCBmaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgZmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ21heExlbmd0aCcsICttYXhMZW5ndGgpO1xyXG4gIGZpZWxkLmNsYXNzTGlzdC5hZGQoJ2hlbHAtZmllbGQnKTtcclxuICByZXR1cm4gZmllbGQ7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJbnB1dEZpZWxkKHJvdywgY29sLCBwYXR0ZXJuLCBtYXhMZW5ndGgpIHtcclxuICBsZXQgaW5wdXRGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgbGV0IHNxdWFyZU5yID0gZ2V0U3F1YXJlTnIocm93LCBjb2wpO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcclxuICBpbnB1dEZpZWxkLmNsYXNzTGlzdC5hZGQoJ21haW4tZmllbGQnKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgncGF0dGVybicsIHBhdHRlcm4pO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdtYXhMZW5ndGgnLCArbWF4TGVuZ3RoKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcm93JywgYCR7cm93fWApO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1jb2wnLCBgJHtjb2x9YCk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXNxcicsIGAke3NxdWFyZU5yfWApO1xyXG5cclxuICByZXR1cm4gaW5wdXRGaWVsZDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3F1YXJlTnIocm93LCBjb2wpIHtcclxuICBpZiAocm93IDw9IDMgJiYgY29sIDw9IDMpIHtcclxuICAgIHJldHVybiAxO1xyXG4gIH0gZWxzZSBpZiAocm93IDw9IDMgJiYgY29sID4gMyAmJiBjb2wgPCA3KSB7XHJcbiAgICByZXR1cm4gMjtcclxuICB9IGVsc2UgaWYgKHJvdyA8PSAzICYmIGNvbCA+PSA3KSB7XHJcbiAgICByZXR1cm4gMztcclxuICB9IGVsc2UgaWYgKHJvdyA+IDMgJiYgcm93IDwgNyAmJiBjb2wgPD0gMykge1xyXG4gICAgcmV0dXJuIDQ7XHJcbiAgfSBlbHNlIGlmIChyb3cgPiAzICYmIHJvdyA8IDcgJiYgY29sID4gMyAmJiBjb2wgPCA3KSB7XHJcbiAgICByZXR1cm4gNTtcclxuICB9IGVsc2UgaWYgKHJvdyA+IDMgJiYgcm93IDwgNyAmJiBjb2wgPj0gNykge1xyXG4gICAgcmV0dXJuIDZcclxuICB9IGVsc2UgaWYgKHJvdyA+PSA3ICYmIGNvbCA8PSAzKSB7XHJcbiAgICByZXR1cm4gNztcclxuICB9IGVsc2UgaWYgKHJvdyA+PSA3ICYmIGNvbCA+IDMgJiYgY29sIDwgNykge1xyXG4gICAgcmV0dXJuIDg7XHJcbiAgfSBlbHNlIGlmIChyb3cgPj0gNyAmJiBjb2wgPj0gNykge1xyXG4gICAgcmV0dXJuIDk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc1RvSW5wdXRGaWVsZHModmFsaWRhdGlvbkZuLCBpbnB1dEZpZWxkcykge1xyXG4gIGlucHV0RmllbGRzID0gWy4uLmlucHV0RmllbGRzXTtcclxuICBpbnB1dEZpZWxkcy5mb3JFYWNoKCBpbnB1dCA9PlxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB2YWxpZGF0aW9uRm4pXHJcbiAgKVxyXG59XHJcbiIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgaGVscGVyRnVuY3Rpb25zfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcblxyXG5sZXQgb2JqID0ge307XHJcblxyXG5mdW5jdGlvbiBpc0lucHV0VW5pcXVlKGNlbGwpIHtcclxuXHJcbiAgaWYgKGlzVW5pcXVlSW5Db2xsZWN0aW9uKGNlbGwsIHZhcmlhYmxlcy5ST1dfQVRUUklCVVRFKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGlmIChpc1VuaXF1ZUluQ29sbGVjdGlvbihjZWxsLCB2YXJpYWJsZXMuQ09MX0FUVFJJQlVURSkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAoaXNVbmlxdWVJbkNvbGxlY3Rpb24oY2VsbCwgdmFyaWFibGVzLlNRUl9BVFRSSUJVVEUpKSB7XHJcbiAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tJc0lucHV0TnVtYmVyKGlucHV0KSB7XHJcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KGlucHV0KSkgJiYgaXNGaW5pdGUoaW5wdXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1VuaXF1ZUluQ29sbGVjdGlvbihjZWxsLCBhdHRyKSB7XHJcbiAgbGV0IHJvd0F0dHJWYWwgPSBjZWxsLmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICBsZXQgY29sbGVjdGlvbiA9IGhlbHBlckZ1bmN0aW9ucy5nZXRDb2xsZWN0aW9uKGBbJHthdHRyfT1cIiR7cm93QXR0clZhbH1cIl1gKTtcclxuICBjb2xsZWN0aW9uID0gaGVscGVyRnVuY3Rpb25zLnJlbW92ZUluc2VydGVkQ2VsbEZyb21Db2xsZWN0aW9uKGNvbGxlY3Rpb24sIGNlbGwpO1xyXG5cclxuICByZXR1cm4gZG9lc0NvbGxlY3Rpb25Db250YWluSW5zZXJ0ZWRWYWx1ZShjb2xsZWN0aW9uLCBjZWxsKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9lc0NvbGxlY3Rpb25Db250YWluSW5zZXJ0ZWRWYWx1ZShjb2xsZWN0aW9uLCBpbnNlcnRlZFZhbHVlKSB7XHJcbiAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gIGNvbGxlY3Rpb24uZm9yRWFjaChjZWxsID0+IHtcclxuICAgIGlmIChjZWxsLnZhbHVlID09PSBpbnNlcnRlZFZhbHVlLnZhbHVlKSB7XHJcbiAgICAgIGdpdmVJbnZhbGlkQ2xhc3MoY2VsbCk7XHJcbiAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnaXZlSW52YWxpZENsYXNzKGNlbGwpIHtcclxuICBpZiAodmFyaWFibGVzLmlzVGFibGVCdWlsZCkge1xyXG4gICAgY2VsbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQtZmllbGQnKVxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjZWxsLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW52YWxpZC1maWVsZCcpXHJcbiAgICB9LCAyMDAwKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5wdXRWYWxpZChldmVudCkge1xyXG4gIGxldCBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gIGlmIChjZWxsLnZhbHVlID09ICcnKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlmICghY2hlY2tJc0lucHV0TnVtYmVyKGNlbGwudmFsdWUpKSB7XHJcbiAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghaXNJbnB1dFVuaXF1ZShjZWxsKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbiBvYmogPSB7XHJcbiAgaXNJbnB1dFVuaXF1ZSxcclxuICBjaGVja0lzSW5wdXROdW1iZXIsXHJcbiAgaXNVbmlxdWVJbkNvbGxlY3Rpb24sXHJcbiAgaXNJbnB1dFZhbGlkXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgb2JqXHJcbiIsIlxyXG5jb25zdCBvYmogPSB7fTtcclxuXHJcbm9iai5TVURPS1VfQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInN1ZG9rdS1jb250YWluZXJcIl0nXHJcbm9iai5UQUJMRV9TVEFSVCA9IDE7XHJcbm9iai5UQUJMRV9XSURUSCA9IDk7XHJcbm9iai5UQUJMRV9IRUlHSFQgPSA5O1xyXG5vYmouVEFCTEVfRU5EID0gOTtcclxub2JqLk1BWF9DRUxMU19UT19CRV9QT1BVTEFURUQgPSAyMDtcclxub2JqLk1BWF9MRU5HVEhfSEVMUF9GSUVMRCA9IDY7XHJcbm9iai5NQVhfTEVOR1RIX0lOUFVUX0ZJRUxEID0gMTtcclxub2JqLkFTQ0lJX0ZPUl8wID0gNDg7XHJcbm9iai5BU0NJSV9GT1JfOSA9IDU3O1xyXG5vYmouQVNDSUlfRk9SXzBfTm1LcCA9IDk2O1xyXG5vYmouQVNDSUlfRk9SXzlfTm1LcCA9IDEwNTtcclxub2JqLkFTQ0lJX0ZPUl9UYWIgPSA5O1xyXG5vYmouUk9XX0FUVFJJQlVURSA9ICdkYXRhLXRhcmdldC1yb3cnO1xyXG5vYmouQ09MX0FUVFJJQlVURSA9ICdkYXRhLXRhcmdldC1jb2wnO1xyXG5vYmouU1FSX0FUVFJJQlVURSA9ICdkYXRhLXRhcmdldC1zcXInO1xyXG5vYmouSU5QVVRfRklFTERfUEFUVEVSTiA9ICdbMC05XXsxfSc7XHJcbm9iai5TVURPS1VfQ09OVEFJTkVSX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInN1ZG9rdS1jb250YWluZXJcIl0nO1xyXG5vYmouQlROX0NSRUFURV9TVURPS1VfU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwiYnRuLWNyZWF0ZS1zdWRva3VcIl0nO1xyXG5vYmouVkFMSURBVElPTl9CQU5ORVJfU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwidmFsaWRhdGlvbi1iYW5uZXJcIl0nO1xyXG5vYmouVkFMSURBVElPTl9CQU5ORVJfU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwidmFsaWRhdGlvbi1iYW5uZXJcIl0nO1xyXG5vYmouSU5QVVRfRklFTERfU0VMRUNUT1IgPSAnW2NsYXNzPVwibWFpbi1maWVsZFwiXSc7XHJcbm9iai5TQVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzYXZlLWJ1dHRvblwiXSc7XHJcbm9iai5ORVdfR0FNRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwibmV3LWdhbWUtYnV0dG9uXCJdJztcclxub2JqLkxPQURfR0FNRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwibG9hZC1idXR0b25cIl0nO1xyXG5vYmouQ0xFQVJfR0FNRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwiY2xlYXItZ2FtZS1idXR0b25cIl0nO1xyXG5vYmouTEFTVF9TQVZFX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImxhc3Qtc2F2ZWQtZ2FtZVwiXSc7XHJcbm9iai5DTEVBUl9TQVZFX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImNsZWFyLXNhdmUtYnV0dG9uXCJdJztcclxub2JqLnByb3BJbkxvY2FsU3RvcmFnZSA9ICdTdWRva3UnO1xyXG5vYmouaXNUYWJsZUJ1aWxkID0gZmFsc2U7XHJcbm9iai5yb3dQb3NpdGlvbiA9IDM7XHJcbm9iai5jb2xQb3NpdGlvbiA9IDc7XHJcbm9iai5BTExfRklFTERTX1NFTEVDVE9SPSAnW3R5cGU9XCJ0ZXh0XCJdJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIl19
