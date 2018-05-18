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

function clearGame(variables) {
  var table = document.querySelector(variables.SUDOKU_CONTAINER_SELECTOR);
  return table.firstChild.remove();
}

obj = {
  getCollection: getCollection,
  removeInsertedCellFromCollection: removeInsertedCellFromCollection,
  clearValue: clearValue,
  getCurrentDateAndTime: getCurrentDateAndTime,
  clearGame: clearGame
};

exports.default = obj;

},{"./variables.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _variables = require('./variables.js');

var _variables2 = _interopRequireDefault(_variables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = {};

function getSavedGame(propertyName) {

  return JSON.parse(localStorage[propertyName]);
}

function putSavedValuesIntoTable(rowPosition, colPosition) {
  var values = getSavedGame(_variables2.default.propInLocalStorage);
  var row = void 0;
  var col = void 0;
  var value = void 0;
  var inputField = void 0;
  values = values.value;

  for (var _value in values) {

    row = _value[_variables2.default.rowPosition];
    col = _value[_variables2.default.colPosition];
    inputField = document.querySelector('[' + _variables2.default.ROW_ATTRIBUTE + '="' + row + '"][' + _variables2.default.COL_ATTRIBUTE + '="' + col + '"]');

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
var localStorage = window.localStorage;

(0, _table2.default)();

saveButton.addEventListener('click', _save2.default.saveInLocalStorage);
newGameButton.addEventListener('click', _populate2.default.insertValues);
loadGameButton.addEventListener('click', _load2.default.putSavedValuesIntoTable);
clearGameButton.addEventListener('click', _populate2.default.insertValues);

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

function insertValues(isTableBuild, maxCellsToBePopulated, isInputUniqeFn, clearValueFn) {
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
var inputFields = document.querySelectorAll(_variables2.default.INPUT_FIELD_SELECTOR);
inputFields = [].concat(_toConsumableArray(inputFields));

function getValuesFromFields() {
  var objWithValues = {};
  var obj = {};
  var row = void 0;
  var col = void 0;
  var date = new Date();

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
  localStorage[_variables2.default.propInLocalStorage] = objWithValues;
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
    input.addEventListener('input', validationFn);
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
obj.propInLocalStorage = 'Sudoku';
obj.isTableBuild = false;
obj.rowPosition = 3;
obj.colPosition = 7;

exports.default = obj;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL29yaWcvaGVscGVyLmpzIiwiU2NyaXB0cy9vcmlnL2xvYWQuanMiLCJTY3JpcHRzL29yaWcvbWFpbi5qcyIsIlNjcmlwdHMvb3JpZy9wb3B1bGF0ZS5qcyIsIlNjcmlwdHMvb3JpZy9zYXZlLmpzIiwiU2NyaXB0cy9vcmlnL3RhYmxlLmpzIiwiU2NyaXB0cy9vcmlnL3ZhbGlkYXRpb24uanMiLCJTY3JpcHRzL29yaWcvdmFyaWFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxNQUFNLEVBQVY7O0FBRUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLHNDQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBWDtBQUNEOztBQUVELFNBQVMsZ0NBQVQsQ0FBMEMsVUFBMUMsRUFBc0QsWUFBdEQsRUFBb0U7O0FBRWxFLE1BQUksa0JBQWtCLGFBQWEsWUFBYixDQUEwQixvQkFBVSxhQUFwQyxDQUF0QjtBQUNBLE1BQUksa0JBQWtCLGFBQWEsWUFBYixDQUEwQixvQkFBVSxhQUFwQyxDQUF0Qjs7QUFFQSxNQUFJLGlDQUFpQyxXQUFXLE1BQVgsQ0FBa0IsZ0JBQVE7QUFDN0QsUUFBSSxVQUFVLEtBQUssWUFBTCxDQUFrQixvQkFBVSxhQUE1QixDQUFkO0FBQ0EsUUFBSSxVQUFVLEtBQUssWUFBTCxDQUFrQixvQkFBVSxhQUE1QixDQUFkO0FBQ0EsV0FBUSxZQUFZLGVBQVosSUFBK0IsWUFBWSxlQUFuRDtBQUNELEdBSm9DLENBQXJDO0FBS0EsU0FBTyw4QkFBUDtBQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN4QixPQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7O0FBRUQsU0FBUyxxQkFBVCxHQUFpQztBQUMvQixNQUFJLFFBQVEsSUFBSSxJQUFKLEVBQVo7QUFDQSxN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Q0FBbkI7QUFDQSxJQUFJLFNBQUosR0FBZ0IsQ0FBaEI7QUFDQSxJQUFJLHlCQUFKLEdBQWdDLEVBQWhDO0FBQ0EsSUFBSSxxQkFBSixHQUE0QixDQUE1QjtBQUNBLElBQUksc0JBQUosR0FBNkIsQ0FBN0I7QUFDQSxJQUFJLFdBQUosR0FBa0IsRUFBbEI7QUFDQSxJQUFJLFdBQUosR0FBa0IsRUFBbEI7QUFDQSxJQUFJLGdCQUFKLEdBQXVCLEVBQXZCO0FBQ0EsSUFBSSxnQkFBSixHQUF1QixHQUF2QjtBQUNBLElBQUksYUFBSixHQUFvQixDQUFwQjtBQUNBLElBQUksYUFBSixHQUFvQixpQkFBcEI7QUFDQSxJQUFJLGFBQUosR0FBb0IsaUJBQXBCO0FBQ0EsSUFBSSxhQUFKLEdBQW9CLGlCQUFwQjtBQUNBLElBQUksbUJBQUosR0FBMEIsVUFBMUI7QUFDQSxJQUFJLHlCQUFKLEdBQWdDLGtDQUFoQztBQUNBLElBQUksMEJBQUosR0FBaUMsbUNBQWpDO0FBQ0EsSUFBSSwwQkFBSixHQUFpQyxtQ0FBakM7QUFDQSxJQUFJLDBCQUFKLEdBQWlDLG1DQUFqQztBQUNBLElBQUksb0JBQUosR0FBMkIsc0JBQTNCO0FBQ0EsSUFBSSxvQkFBSixHQUEyQiw2QkFBM0I7QUFDQSxJQUFJLHdCQUFKLEdBQStCLGlDQUEvQjtBQUNBLElBQUkseUJBQUosR0FBZ0MsNkJBQWhDO0FBQ0EsSUFBSSwwQkFBSixHQUFpQyxtQ0FBakM7QUFDQSxJQUFJLGtCQUFKLEdBQXlCLFFBQXpCO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLEtBQW5CO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLENBQWxCO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLENBQWxCOztrQkFFZSxHIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcblxyXG5sZXQgb2JqID0ge31cclxuXHJcbmZ1bmN0aW9uIGdldENvbGxlY3Rpb24oYXR0cmlidXRlKSB7XHJcbiAgcmV0dXJuIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGF0dHJpYnV0ZSldO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVJbnNlcnRlZENlbGxGcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBpbnNlcnRlZENlbGwpIHtcclxuXHJcbiAgbGV0IGluc2VydGVkQ2VsbFJvdyA9IGluc2VydGVkQ2VsbC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLlJPV19BVFRSSUJVVEUpO1xyXG4gIGxldCBpbnNlcnRlZENlbGxDb2wgPSBpbnNlcnRlZENlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKTtcclxuXHJcbiAgbGV0IGNvbGxlY3Rpb25XaXRob3V0SW5zZXJ0ZWRWYWx1ZSA9IGNvbGxlY3Rpb24uZmlsdGVyKGNlbGwgPT4ge1xyXG4gICAgbGV0IGNlbGxSb3cgPSBjZWxsLmdldEF0dHJpYnV0ZSh2YXJpYWJsZXMuUk9XX0FUVFJJQlVURSk7XHJcbiAgICBsZXQgY2VsbENvbCA9IGNlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKTtcclxuICAgIHJldHVybiAoY2VsbFJvdyAhPT0gaW5zZXJ0ZWRDZWxsUm93IHx8IGNlbGxDb2wgIT09IGluc2VydGVkQ2VsbENvbCk7XHJcbiAgfSlcclxuICByZXR1cm4gY29sbGVjdGlvbldpdGhvdXRJbnNlcnRlZFZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhclZhbHVlKGNlbGwpIHtcclxuICBjZWxsLnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnREYXRlQW5kVGltZSgpIHtcclxuICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIGxldCBkZCA9IHRvZGF5LmdldERhdGUoKTtcclxuICBsZXQgbW0gPSB0b2RheS5nZXRNb250aCgpICsgMTtcclxuICBsZXQgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgbGV0IGhoID0gdG9kYXkuZ2V0SG91cnMoKTtcclxuICBsZXQgbWluID0gdG9kYXkuZ2V0TWludXRlcygpO1xyXG5cclxuICBkZCA9IGFkZDB0b1RpbWVWYWx1ZShkZClcclxuICBtbSA9IGFkZDB0b1RpbWVWYWx1ZShtbSlcclxuICBtaW4gPSBhZGQwdG9UaW1lVmFsdWUobWluKVxyXG4gIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfSAke2hofToke21pbn1gXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGQwdG9UaW1lVmFsdWUodGltZVZhbHVlKSB7XHJcbiAgcmV0dXJuIHRpbWVWYWx1ZSA8IDEwID8gJzAnICsgdGltZVZhbHVlIDogdGltZVZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckdhbWUodmFyaWFibGVzKSB7XHJcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuU1VET0tVX0NPTlRBSU5FUl9TRUxFQ1RPUilcclxuICByZXR1cm4gdGFibGUuZmlyc3RDaGlsZC5yZW1vdmUoKTtcclxufVxyXG5cclxub2JqID0ge1xyXG4gIGdldENvbGxlY3Rpb24sXHJcbiAgcmVtb3ZlSW5zZXJ0ZWRDZWxsRnJvbUNvbGxlY3Rpb24sXHJcbiAgY2xlYXJWYWx1ZSxcclxuICBnZXRDdXJyZW50RGF0ZUFuZFRpbWUsXHJcbiAgY2xlYXJHYW1lXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG9iajtcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmxldCBvYmogPSB7fVxyXG5cclxuZnVuY3Rpb24gZ2V0U2F2ZWRHYW1lKHByb3BlcnR5TmFtZSkge1xyXG5cclxuICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbcHJvcGVydHlOYW1lXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHB1dFNhdmVkVmFsdWVzSW50b1RhYmxlKHJvd1Bvc2l0aW9uLGNvbFBvc2l0aW9uKSB7XHJcbiAgbGV0IHZhbHVlcyA9IGdldFNhdmVkR2FtZSh2YXJpYWJsZXMucHJvcEluTG9jYWxTdG9yYWdlKTtcclxuICBsZXQgcm93O1xyXG4gIGxldCBjb2w7XHJcbiAgbGV0IHZhbHVlO1xyXG4gIGxldCBpbnB1dEZpZWxkO1xyXG4gIHZhbHVlcyA9IHZhbHVlcy52YWx1ZVxyXG5cclxuICBmb3IobGV0IHZhbHVlIGluIHZhbHVlcykge1xyXG5cclxuICAgIHJvdyA9IHZhbHVlW3ZhcmlhYmxlcy5yb3dQb3NpdGlvbl07XHJcbiAgICBjb2wgPSB2YWx1ZVt2YXJpYWJsZXMuY29sUG9zaXRpb25dO1xyXG4gICAgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFske3ZhcmlhYmxlcy5ST1dfQVRUUklCVVRFfT1cIiR7cm93fVwiXVske3ZhcmlhYmxlcy5DT0xfQVRUUklCVVRFfT1cIiR7Y29sfVwiXWApXHJcblxyXG4gICAgaW5wdXRGaWVsZC52YWx1ZSA9IHZhbHVlc1t2YWx1ZV1cclxuICAgIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdyZWFkb25seScsJ3RydWUnKVxyXG4gIH1cclxuICB2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0RGF0ZVNhdmVkR2FtZShlbGVtZW50LCBkYXRlKSB7XHJcbiAgZWxlbWVudC52YWx1ZSA9IGRhdGU7XHJcbiAgcmV0dXJuO1xyXG59XHJcblxyXG5vYmogPSB7XHJcbiAgZ2V0U2F2ZWRHYW1lLFxyXG4gIHB1dFNhdmVkVmFsdWVzSW50b1RhYmxlXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgb2JqXHJcbiIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgaGVscGVyRnVuY3Rpb25zfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBsb2FkfSBmcm9tICcuL2xvYWQnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgdmFsaWRhdGlvbn0gZnJvbSAnLi92YWxpZGF0aW9uJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHBvcHVsYXRlfSBmcm9tICcuL3BvcHVsYXRlJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHNhdmV9IGZyb20gJy4vc2F2ZSc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB0YWJsZX0gZnJvbSAnLi90YWJsZSc7XHJcblxyXG5sZXQgc2F2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLlNBVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGV0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5ORVdfR0FNRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5sZXQgbG9hZEdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5MT0FEX0dBTUVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGV0IGNsZWFyR2FtZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodmFyaWFibGVzLkNMRUFSX0dBTUVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGV0IGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcblxyXG50YWJsZSgpXHJcblxyXG5zYXZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxzYXZlLnNhdmVJbkxvY2FsU3RvcmFnZSk7XHJcbm5ld0dhbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHBvcHVsYXRlLmluc2VydFZhbHVlcyk7XHJcbmxvYWRHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxsb2FkLnB1dFNhdmVkVmFsdWVzSW50b1RhYmxlKTtcclxuY2xlYXJHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxwb3B1bGF0ZS5pbnNlcnRWYWx1ZXMpXHJcbiIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgaGVscGVyRnVuY3Rpb25zfSBmcm9tICcuL2hlbHBlci5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB2YWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5sZXQgb2JqID0ge307XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRWYWx1ZXMoaXNUYWJsZUJ1aWxkLCBtYXhDZWxsc1RvQmVQb3B1bGF0ZWQsaXNJbnB1dFVuaXFlRm4sY2xlYXJWYWx1ZUZuKSB7XHJcbiAgaWYoIXZhcmlhYmxlcy5pc1RhYmxlQnVpbGQpe1xyXG4gICAgbGV0IHBvcHVsYXRlZENlbGxzQ291bnRlciA9IDA7XHJcbiAgICB3aGlsZSAocG9wdWxhdGVkQ2VsbHNDb3VudGVyIDwgdmFyaWFibGVzLk1BWF9DRUxMU19UT19CRV9QT1BVTEFURUQpIHtcclxuICAgICAgbGV0IGNlbGwgPSBpbnNlcnRWYWx1ZUludG9DZWxsKClcclxuICAgICAgaWYgKHZhbGlkYXRpb24uaXNJbnB1dFVuaXF1ZShjZWxsKSkge1xyXG4gICAgICAgIHBvcHVsYXRlZENlbGxzQ291bnRlcisrO1xyXG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdyZWFkb25seScsJ3RydWUnKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyaWFibGVzLmlzVGFibGVCdWlsZCA9IHRydWU7XHJcbiAgfVxyXG4gIHJldHVybjtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluc2VydFZhbHVlSW50b0NlbGwoc3RhcnQsZW5kKSB7XHJcbiAgbGV0IGNvbE5yID0gZ2V0UmFuZG9tQXJiaXRyYXJ5KHZhcmlhYmxlcy5UQUJMRV9TVEFSVCwgdmFyaWFibGVzLlRBQkxFX0VORClcclxuICBsZXQgcm93TnIgPSBnZXRSYW5kb21BcmJpdHJhcnkodmFyaWFibGVzLlRBQkxFX1NUQVJULCB2YXJpYWJsZXMuVEFCTEVfRU5EKVxyXG4gIGxldCByYW5kb21WYWx1ZSA9IGdldFJhbmRvbUFyYml0cmFyeSh2YXJpYWJsZXMuVEFCTEVfU1RBUlQsIHZhcmlhYmxlcy5UQUJMRV9FTkQpO1xyXG5cclxuICBsZXQgY2VsbCA9IGdldENlbGwocm93TnIsIGNvbE5yKTtcclxuXHJcbiAgaWYgKCFjZWxsLnZhbHVlKSB7XHJcbiAgICBjZWxsLnZhbHVlID0gcmFuZG9tVmFsdWVcclxuICB9XHJcbiAgcmV0dXJuIGNlbGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbUFyYml0cmFyeShzdGFydFJhbmdlLCBlbmRSYW5nZSkge1xyXG4gIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoZW5kUmFuZ2UgLSBzdGFydFJhbmdlKSArIHN0YXJ0UmFuZ2UpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDZWxsKHJvdywgY29sLHJvd0F0dHJpYnV0ZSxjb2xBdHRyaWJ1dGUpIHtcclxuICBsZXQgY2VsbHNJblJvdyA9IGdldENvbGxlY3Rpb24oYFske3ZhcmlhYmxlcy5ST1dfQVRUUklCVVRFfT1cIiR7cm93fVwiXWApO1xyXG4gIGxldCBjZWxscyA9IGNlbGxzSW5Sb3cuZmlsdGVyKGNlbGxJblJvdyA9PiB7XHJcbiAgICByZXR1cm4gY2VsbEluUm93LmdldEF0dHJpYnV0ZSh2YXJpYWJsZXMuQ09MX0FUVFJJQlVURSkgPT0gY29sO1xyXG4gIH0pXHJcbiAgcmV0dXJuIGNlbGxzWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9uKGF0dHJpYnV0ZSkge1xyXG4gIHJldHVybiBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChhdHRyaWJ1dGUpXTtcclxufVxyXG4gb2JqID0ge1xyXG4gIGluc2VydFZhbHVlc1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGhlbHBlckZ1bmN0aW9uc30gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxuXHJcbmxldCBvYmogPSB7fTtcclxubGV0IGlucHV0RmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh2YXJpYWJsZXMuSU5QVVRfRklFTERfU0VMRUNUT1IpO1xyXG5pbnB1dEZpZWxkcyA9IFsuLi5pbnB1dEZpZWxkc107XHJcblxyXG5mdW5jdGlvbiBnZXRWYWx1ZXNGcm9tRmllbGRzKCkge1xyXG4gIGxldCBvYmpXaXRoVmFsdWVzID0ge307XHJcbiAgbGV0IG9iaiA9IHt9O1xyXG4gIGxldCByb3c7XHJcbiAgbGV0IGNvbDtcclxuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIGlucHV0RmllbGRzLmZvckVhY2goZnVuY3Rpb24oZmllbGQpIHtcclxuICAgIGlmIChmaWVsZC52YWx1ZSkge1xyXG4gICAgICByb3cgPSBmaWVsZC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLlJPV19BVFRSSUJVVEUpO1xyXG4gICAgICBjb2wgPSBmaWVsZC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpO1xyXG4gICAgICB2YWx1ZSA9IGZpZWxkLnZhbHVlO1xyXG4gICAgICBvYmpXaXRoVmFsdWVzW2Byb3cke3Jvd31jb2wke2NvbH1gXSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgb2JqLnZhbHVlID0gb2JqV2l0aFZhbHVlcztcclxuICBvYmouZGF0ZSA9IGhlbHBlckZ1bmN0aW9ucy5nZXRDdXJyZW50RGF0ZUFuZFRpbWUoKVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVJbkxvY2FsU3RvcmFnZSgpIHtcclxuICBsZXQgb2JqV2l0aFZhbHVlcyA9IGdldFZhbHVlc0Zyb21GaWVsZHMoKTtcclxuICBvYmpXaXRoVmFsdWVzID0gSlNPTi5zdHJpbmdpZnkob2JqV2l0aFZhbHVlcyk7XHJcbiAgbG9jYWxTdG9yYWdlW3ZhcmlhYmxlcy5wcm9wSW5Mb2NhbFN0b3JhZ2VdID0gb2JqV2l0aFZhbHVlcztcclxufVxyXG5cclxub2JqID0ge1xyXG4gIHNhdmVJbkxvY2FsU3RvcmFnZVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGVUYWJsZSgpIHtcclxuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG4gIGxldCBzdWRva3VDb250YWluZXIgPSBnZXRTdWRva3VDb250YWluZXIodmFyaWFibGVzLlNVRE9LVV9DT05UQUlORVJfU0VMRUNUT1IpO1xyXG5cclxuICBmb3IgKGxldCByb3cgPSB2YXJpYWJsZXMuVEFCTEVfU1RBUlQ7IHJvdyA8PSB2YXJpYWJsZXMuVEFCTEVfSEVJR0hUOyByb3crKykge1xyXG4gICAgbGV0IGN1cnJlbnRSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpXHJcbiAgICBmb3IgKGxldCBjb2x1bW4gPSB2YXJpYWJsZXMuVEFCTEVfU1RBUlQ7IGNvbHVtbiA8PSB2YXJpYWJsZXMuVEFCTEVfV0lEVEg7IGNvbHVtbisrKSB7XHJcbiAgICAgIGxldCBjZWxsID0gY3JlYXRlQ2VsbChyb3csIGNvbHVtbik7XHJcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoY3JlYXRlSGVscEZpZWxkKHZhcmlhYmxlcy5NQVhfTEVOR1RIX0hFTFBfRklFTEQpKVxyXG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0RmllbGQocm93LCBjb2x1bW4sIHZhcmlhYmxlcy5JTlBVVF9GSUVMRF9QQVRURVJOLCB2YXJpYWJsZXMuTUFYX0xFTkdUSF9JTlBVVF9GSUVMRCkpXHJcbiAgICAgIGN1cnJlbnRSb3cuYXBwZW5kQ2hpbGQoY2VsbClcclxuICAgIH1cclxuICAgIHRhYmxlLmFwcGVuZENoaWxkKGN1cnJlbnRSb3cpXHJcbiAgfVxyXG4gIHN1ZG9rdUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWJsZSlcclxuICBsZXQgaW5wdXRGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZhcmlhYmxlcy5JTlBVVF9GSUVMRF9TRUxFQ1RPUik7XHJcbiAgYWRkRXZlbnRMaXN0ZW5lcnNUb0lucHV0RmllbGRzKHZhbGlkYXRpb24uaXNJbnB1dFZhbGlkLCBpbnB1dEZpZWxkcyk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTdWRva3VDb250YWluZXIoc3Vkb2t1Q29udGFpbmVyU2VsZWN0b3IpIHtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdWRva3VDb250YWluZXJTZWxlY3Rvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNlbGwocm93LCBjb2wpIHtcclxuICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjbGFzcycsIGByb3ctJHtyb3d9YCk7XHJcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjbGFzcycsIGBjb2wtJHtjb2x9YCk7XHJcbiAgcmV0dXJuIGNlbGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhlbHBGaWVsZChtYXhMZW5ndGgpIHtcclxuICBsZXQgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgZmllbGQuc2V0QXR0cmlidXRlKCdtYXhMZW5ndGgnLCArbWF4TGVuZ3RoKTtcclxuICBmaWVsZC5jbGFzc0xpc3QuYWRkKCdoZWxwLWZpZWxkJyk7XHJcbiAgcmV0dXJuIGZpZWxkO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW5wdXRGaWVsZChyb3csIGNvbCwgcGF0dGVybiwgbWF4TGVuZ3RoKSB7XHJcbiAgbGV0IGlucHV0RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gIGxldCBzcXVhcmVOciA9IGdldFNxdWFyZU5yKHJvdywgY29sKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0Jyk7XHJcbiAgaW5wdXRGaWVsZC5jbGFzc0xpc3QuYWRkKCdtYWluLWZpZWxkJyk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3BhdHRlcm4nLCBwYXR0ZXJuKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgnbWF4TGVuZ3RoJywgK21heExlbmd0aCk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LXJvdycsIGAke3Jvd31gKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtY29sJywgYCR7Y29sfWApO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1zcXInLCBgJHtzcXVhcmVOcn1gKTtcclxuXHJcbiAgcmV0dXJuIGlucHV0RmllbGQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNxdWFyZU5yKHJvdywgY29sKSB7XHJcbiAgaWYgKHJvdyA8PSAzICYmIGNvbCA8PSAzKSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9IGVsc2UgaWYgKHJvdyA8PSAzICYmIGNvbCA+IDMgJiYgY29sIDwgNykge1xyXG4gICAgcmV0dXJuIDI7XHJcbiAgfSBlbHNlIGlmIChyb3cgPD0gMyAmJiBjb2wgPj0gNykge1xyXG4gICAgcmV0dXJuIDM7XHJcbiAgfSBlbHNlIGlmIChyb3cgPiAzICYmIHJvdyA8IDcgJiYgY29sIDw9IDMpIHtcclxuICAgIHJldHVybiA0O1xyXG4gIH0gZWxzZSBpZiAocm93ID4gMyAmJiByb3cgPCA3ICYmIGNvbCA+IDMgJiYgY29sIDwgNykge1xyXG4gICAgcmV0dXJuIDU7XHJcbiAgfSBlbHNlIGlmIChyb3cgPiAzICYmIHJvdyA8IDcgJiYgY29sID49IDcpIHtcclxuICAgIHJldHVybiA2XHJcbiAgfSBlbHNlIGlmIChyb3cgPj0gNyAmJiBjb2wgPD0gMykge1xyXG4gICAgcmV0dXJuIDc7XHJcbiAgfSBlbHNlIGlmIChyb3cgPj0gNyAmJiBjb2wgPiAzICYmIGNvbCA8IDcpIHtcclxuICAgIHJldHVybiA4O1xyXG4gIH0gZWxzZSBpZiAocm93ID49IDcgJiYgY29sID49IDcpIHtcclxuICAgIHJldHVybiA5O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNUb0lucHV0RmllbGRzKHZhbGlkYXRpb25GbiwgaW5wdXRGaWVsZHMpIHtcclxuICBpbnB1dEZpZWxkcyA9IFsuLi5pbnB1dEZpZWxkc107XHJcbiAgaW5wdXRGaWVsZHMuZm9yRWFjaChmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB2YWxpZGF0aW9uRm4pXHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGhlbHBlckZ1bmN0aW9uc30gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gaXNJbnB1dFVuaXF1ZShjZWxsKSB7XHJcblxyXG4gIGlmIChpc1VuaXF1ZUluQ29sbGVjdGlvbihjZWxsLCB2YXJpYWJsZXMuUk9XX0FUVFJJQlVURSkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAoaXNVbmlxdWVJbkNvbGxlY3Rpb24oY2VsbCwgdmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpKSB7XHJcbiAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKGlzVW5pcXVlSW5Db2xsZWN0aW9uKGNlbGwsIHZhcmlhYmxlcy5TUVJfQVRUUklCVVRFKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSXNJbnB1dE51bWJlcihpbnB1dCkge1xyXG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChpbnB1dCkpICYmIGlzRmluaXRlKGlucHV0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNVbmlxdWVJbkNvbGxlY3Rpb24oY2VsbCwgYXR0cikge1xyXG4gIGxldCByb3dBdHRyVmFsID0gY2VsbC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgbGV0IGNvbGxlY3Rpb24gPSBoZWxwZXJGdW5jdGlvbnMuZ2V0Q29sbGVjdGlvbihgWyR7YXR0cn09XCIke3Jvd0F0dHJWYWx9XCJdYCk7XHJcbiAgY29sbGVjdGlvbiA9IGhlbHBlckZ1bmN0aW9ucy5yZW1vdmVJbnNlcnRlZENlbGxGcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBjZWxsKTtcclxuXHJcbiAgcmV0dXJuIGRvZXNDb2xsZWN0aW9uQ29udGFpbkluc2VydGVkVmFsdWUoY29sbGVjdGlvbiwgY2VsbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvZXNDb2xsZWN0aW9uQ29udGFpbkluc2VydGVkVmFsdWUoY29sbGVjdGlvbiwgaW5zZXJ0ZWRWYWx1ZSkge1xyXG4gIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICBjb2xsZWN0aW9uLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICBpZiAoY2VsbC52YWx1ZSA9PT0gaW5zZXJ0ZWRWYWx1ZS52YWx1ZSkge1xyXG4gICAgICBnaXZlSW52YWxpZENsYXNzKGNlbGwpO1xyXG4gICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2l2ZUludmFsaWRDbGFzcyhjZWxsKSB7XHJcbiAgaWYgKHZhcmlhYmxlcy5pc1RhYmxlQnVpbGQpIHtcclxuICAgIGNlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkLWZpZWxkJylcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY2VsbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQtZmllbGQnKVxyXG4gICAgfSwgMjAwMCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0lucHV0VmFsaWQoZXZlbnQpIHtcclxuICBsZXQgY2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICBpZiAoY2VsbC52YWx1ZSA9PSAnJykge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNoZWNrSXNJbnB1dE51bWJlcihjZWxsLnZhbHVlKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIWlzSW5wdXRVbmlxdWUoY2VsbCkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4gb2JqID0ge1xyXG4gIGlzSW5wdXRVbmlxdWUsXHJcbiAgY2hlY2tJc0lucHV0TnVtYmVyLFxyXG4gIGlzVW5pcXVlSW5Db2xsZWN0aW9uLFxyXG4gIGlzSW5wdXRWYWxpZFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJcclxuY29uc3Qgb2JqID0ge307XHJcblxyXG5vYmouU1VET0tVX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzdWRva3UtY29udGFpbmVyXCJdJ1xyXG5vYmouVEFCTEVfU1RBUlQgPSAxO1xyXG5vYmouVEFCTEVfV0lEVEggPSA5O1xyXG5vYmouVEFCTEVfSEVJR0hUID0gOTtcclxub2JqLlRBQkxFX0VORCA9IDk7XHJcbm9iai5NQVhfQ0VMTFNfVE9fQkVfUE9QVUxBVEVEID0gMjA7XHJcbm9iai5NQVhfTEVOR1RIX0hFTFBfRklFTEQgPSA2O1xyXG5vYmouTUFYX0xFTkdUSF9JTlBVVF9GSUVMRCA9IDE7XHJcbm9iai5BU0NJSV9GT1JfMCA9IDQ4O1xyXG5vYmouQVNDSUlfRk9SXzkgPSA1Nztcclxub2JqLkFTQ0lJX0ZPUl8wX05tS3AgPSA5Njtcclxub2JqLkFTQ0lJX0ZPUl85X05tS3AgPSAxMDU7XHJcbm9iai5BU0NJSV9GT1JfVGFiID0gOTtcclxub2JqLlJPV19BVFRSSUJVVEUgPSAnZGF0YS10YXJnZXQtcm93Jztcclxub2JqLkNPTF9BVFRSSUJVVEUgPSAnZGF0YS10YXJnZXQtY29sJztcclxub2JqLlNRUl9BVFRSSUJVVEUgPSAnZGF0YS10YXJnZXQtc3FyJztcclxub2JqLklOUFVUX0ZJRUxEX1BBVFRFUk4gPSAnWzAtOV17MX0nO1xyXG5vYmouU1VET0tVX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJzdWRva3UtY29udGFpbmVyXCJdJztcclxub2JqLkJUTl9DUkVBVEVfU1VET0tVX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImJ0bi1jcmVhdGUtc3Vkb2t1XCJdJztcclxub2JqLlZBTElEQVRJT05fQkFOTkVSX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInZhbGlkYXRpb24tYmFubmVyXCJdJztcclxub2JqLlZBTElEQVRJT05fQkFOTkVSX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInZhbGlkYXRpb24tYmFubmVyXCJdJztcclxub2JqLklOUFVUX0ZJRUxEX1NFTEVDVE9SID0gJ1tjbGFzcz1cIm1haW4tZmllbGRcIl0nO1xyXG5vYmouU0FWRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwic2F2ZS1idXR0b25cIl0nO1xyXG5vYmouTkVXX0dBTUVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cIm5ldy1nYW1lLWJ1dHRvblwiXSc7XHJcbm9iai5MT0FEX0dBTUVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImxvYWQtYnV0dG9uXCJdJztcclxub2JqLkNMRUFSX0dBTUVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cImNsZWFyLWdhbWUtYnV0dG9uXCJdJztcclxub2JqLnByb3BJbkxvY2FsU3RvcmFnZSA9ICdTdWRva3UnO1xyXG5vYmouaXNUYWJsZUJ1aWxkID0gZmFsc2U7XHJcbm9iai5yb3dQb3NpdGlvbiA9IDM7XHJcbm9iai5jb2xQb3NpdGlvbiA9IDc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiJdfQ==
