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
  var elements = document.querySelectorAll('[type="text"]');
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

//console.log('vari '+variables)
(0, _table2.default)();

saveButton.addEventListener('click', _save2.default.saveInLocalStorage);
newGameButton.addEventListener('click', _populate2.default.insertValues);
loadGameButton.addEventListener('click', _load2.default.putSavedValuesIntoTable);
clearGameButton.addEventListener('click', _populate2.default.insertValues);
clearGameButton.addEventListener('click', _helper2.default.clearGame);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJTY3JpcHRzL29yaWcvaGVscGVyLmpzIiwiU2NyaXB0cy9vcmlnL2xvYWQuanMiLCJTY3JpcHRzL29yaWcvbWFpbi5qcyIsIlNjcmlwdHMvb3JpZy9wb3B1bGF0ZS5qcyIsIlNjcmlwdHMvb3JpZy9zYXZlLmpzIiwiU2NyaXB0cy9vcmlnL3RhYmxlLmpzIiwiU2NyaXB0cy9vcmlnL3ZhbGlkYXRpb24uanMiLCJTY3JpcHRzL29yaWcvdmFyaWFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBSSxNQUFNLEVBQVY7O0FBRUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLHNDQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBWDtBQUNEOztBQUVELFNBQVMsZ0NBQVQsQ0FBMEMsVUFBMUMsRUFBc0QsWUFBdEQsRUFBb0U7O0FBRWxFLE1BQUksa0JBQWtCLGFBQWEsWUFBYixDQUEwQixvQkFBVSxhQUFwQyxDQUF0QjtBQUNBLE1BQUksa0JBQWtCLGFBQWEsWUFBYixDQUEwQixvQkFBVSxhQUFwQyxDQUF0Qjs7QUFFQSxNQUFJLGlDQUFpQyxXQUFXLE1BQVgsQ0FBa0IsZ0JBQVE7QUFDN0QsUUFBSSxVQUFVLEtBQUssWUFBTCxDQUFrQixvQkFBVSxhQUE1QixDQUFkO0FBQ0EsUUFBSSxVQUFVLEtBQUssWUFBTCxDQUFrQixvQkFBVSxhQUE1QixDQUFkO0FBQ0EsV0FBUSxZQUFZLGVBQVosSUFBK0IsWUFBWSxlQUFuRDtBQUNELEdBSm9DLENBQXJDO0FBS0EsU0FBTyw4QkFBUDtBQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN4QixPQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7O0FBRUQsU0FBUyxxQkFBVCxHQUFpQztBQUMvQixNQUFJLFFBQVEsSUFBSSxJQUFKLEVBQVo7QUFDQSxNQUFJLEtBQUssTUFBTSxPQUFOLEVBQVQ7QUFDQSxNQUFJLEtBQUssTUFBTSxRQUFOLEtBQW1CLENBQTVCO0FBQ0EsTUFBSSxPQUFPLE1BQU0sV0FBTixFQUFYO0FBQ0EsTUFBSSxLQUFLLE1BQU0sUUFBTixFQUFUO0FBQ0EsTUFBSSxNQUFNLE1BQU0sVUFBTixFQUFWOztBQUVBLE9BQUssZ0JBQWdCLEVBQWhCLENBQUw7QUFDQSxPQUFLLGdCQUFnQixFQUFoQixDQUFMO0FBQ0EsUUFBTSxnQkFBZ0IsR0FBaEIsQ0FBTjtBQUNBLFNBQVUsSUFBVixTQUFrQixFQUFsQixTQUF3QixFQUF4QixTQUE4QixFQUE5QixTQUFvQyxHQUFwQztBQUNEOztBQUdELFNBQVMsZUFBVCxDQUF5QixTQUF6QixFQUFvQztBQUNsQyxTQUFPLFlBQVksRUFBWixHQUFpQixNQUFNLFNBQXZCLEdBQW1DLFNBQTFDO0FBQ0Q7O0FBRUQsU0FBUyxTQUFULEdBQXFCO0FBQ25CLE1BQUksV0FBVyxTQUFTLGdCQUFULENBQTBCLGVBQTFCLENBQWY7QUFDQSxXQUFTLE9BQVQsQ0FBaUIsVUFBUyxPQUFULEVBQWlCO0FBQ2hDLFFBQUcsUUFBUSxLQUFYLEVBQWtCO0FBQ2hCLGNBQVEsS0FBUixHQUFnQixFQUFoQjtBQUNEO0FBQ0QsUUFBRyxRQUFRLFlBQVIsQ0FBcUIsVUFBckIsQ0FBSCxFQUFvQztBQUNsQyxjQUFRLGVBQVIsQ0FBd0IsVUFBeEI7QUFDRDtBQUNGLEdBUEQ7QUFRQSxzQkFBVSxZQUFWLEdBQXlCLEtBQXpCO0FBQ0E7QUFDRDs7QUFFRCxNQUFNO0FBQ0osOEJBREk7QUFFSixvRUFGSTtBQUdKLHdCQUhJO0FBSUosOENBSkk7QUFLSjtBQUxJLENBQU47O2tCQVFlLEc7Ozs7Ozs7OztBQ2xFZjs7Ozs7O0FBQ0EsSUFBSSxNQUFNLEVBQVY7O0FBRUEsU0FBUyxZQUFULENBQXNCLFlBQXRCLEVBQW9DOztBQUVsQyxTQUFPLEtBQUssS0FBTCxDQUFXLGFBQWEsWUFBYixDQUFYLENBQVA7QUFDRDs7QUFFRCxTQUFTLHVCQUFULENBQWlDLFdBQWpDLEVBQTZDLFdBQTdDLEVBQTBEO0FBQ3hELE1BQUksU0FBUyxhQUFhLG9CQUFVLGtCQUF2QixDQUFiO0FBQ0EsTUFBSSxZQUFKO0FBQ0EsTUFBSSxZQUFKO0FBQ0EsTUFBSSxjQUFKO0FBQ0EsTUFBSSxtQkFBSjtBQUNBLFdBQVMsT0FBTyxLQUFoQjs7QUFFQSxPQUFJLElBQUksTUFBUixJQUFpQixNQUFqQixFQUF5Qjs7QUFFdkIsVUFBTSxPQUFNLG9CQUFVLFdBQWhCLENBQU47QUFDQSxVQUFNLE9BQU0sb0JBQVUsV0FBaEIsQ0FBTjtBQUNBLGlCQUFhLFNBQVMsYUFBVCxPQUEyQixvQkFBVSxhQUFyQyxVQUF1RCxHQUF2RCxXQUFnRSxvQkFBVSxhQUExRSxVQUE0RixHQUE1RixRQUFiOztBQUVBLGVBQVcsS0FBWCxHQUFtQixPQUFPLE1BQVAsQ0FBbkI7QUFDQSxlQUFXLFlBQVgsQ0FBd0IsVUFBeEIsRUFBbUMsTUFBbkM7QUFDRDtBQUNELHNCQUFVLFlBQVYsR0FBeUIsSUFBekI7QUFDRDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLElBQXRDLEVBQTRDO0FBQzFDLFVBQVEsS0FBUixHQUFnQixJQUFoQjtBQUNBO0FBQ0Q7O0FBRUQsTUFBTTtBQUNKLDRCQURJO0FBRUo7QUFGSSxDQUFOO2tCQUllLEc7Ozs7O0FDckNmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGFBQWEsU0FBUyxhQUFULENBQXVCLG9CQUFVLG9CQUFqQyxDQUFqQjtBQUNBLElBQUksZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixvQkFBVSx3QkFBakMsQ0FBcEI7QUFDQSxJQUFJLGlCQUFpQixTQUFTLGFBQVQsQ0FBdUIsb0JBQVUseUJBQWpDLENBQXJCO0FBQ0EsSUFBSSxrQkFBa0IsU0FBUyxhQUFULENBQXVCLG9CQUFVLDBCQUFqQyxDQUF0QjtBQUNBLElBQUksZUFBZSxPQUFPLFlBQTFCOztBQUVBO0FBQ0E7O0FBRUEsV0FBVyxnQkFBWCxDQUE0QixPQUE1QixFQUFvQyxlQUFLLGtCQUF6QztBQUNBLGNBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBdUMsbUJBQVMsWUFBaEQ7QUFDQSxlQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXdDLGVBQUssdUJBQTdDO0FBQ0EsZ0JBQWdCLGdCQUFoQixDQUFpQyxPQUFqQyxFQUF5QyxtQkFBUyxZQUFsRDtBQUNBLGdCQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBeUMsaUJBQWdCLFNBQXpEOzs7Ozs7Ozs7QUNyQkE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUNBLElBQUksTUFBTSxFQUFWOztBQUVBLFNBQVMsWUFBVCxDQUFzQixZQUF0QixFQUFvQyxxQkFBcEMsRUFBMEQsY0FBMUQsRUFBeUUsWUFBekUsRUFBdUY7QUFDckYsTUFBRyxDQUFDLG9CQUFVLFlBQWQsRUFBMkI7QUFDekIsUUFBSSx3QkFBd0IsQ0FBNUI7QUFDQSxXQUFPLHdCQUF3QixvQkFBVSx5QkFBekMsRUFBb0U7QUFDbEUsVUFBSSxPQUFPLHFCQUFYO0FBQ0EsVUFBSSxxQkFBVyxhQUFYLENBQXlCLElBQXpCLENBQUosRUFBb0M7QUFDbEM7QUFDQSxhQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBNkIsTUFBN0I7QUFDRCxPQUhELE1BR087QUFDTCx5QkFBZ0IsVUFBaEIsQ0FBMkIsSUFBM0I7QUFDRDtBQUNGO0FBQ0Qsd0JBQVUsWUFBVixHQUF5QixJQUF6QjtBQUNEO0FBQ0Q7QUFDRDs7QUFHRCxTQUFTLG1CQUFULENBQTZCLEtBQTdCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3RDLE1BQUksUUFBUSxtQkFBbUIsb0JBQVUsV0FBN0IsRUFBMEMsb0JBQVUsU0FBcEQsQ0FBWjtBQUNBLE1BQUksUUFBUSxtQkFBbUIsb0JBQVUsV0FBN0IsRUFBMEMsb0JBQVUsU0FBcEQsQ0FBWjtBQUNBLE1BQUksY0FBYyxtQkFBbUIsb0JBQVUsV0FBN0IsRUFBMEMsb0JBQVUsU0FBcEQsQ0FBbEI7O0FBRUEsTUFBSSxPQUFPLFFBQVEsS0FBUixFQUFlLEtBQWYsQ0FBWDs7QUFFQSxNQUFJLENBQUMsS0FBSyxLQUFWLEVBQWlCO0FBQ2YsU0FBSyxLQUFMLEdBQWEsV0FBYjtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBUyxrQkFBVCxDQUE0QixVQUE1QixFQUF3QyxRQUF4QyxFQUFrRDtBQUNoRCxTQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxNQUFpQixXQUFXLFVBQTVCLElBQTBDLFVBQXJELENBQVA7QUFDRDs7QUFFRCxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMEIsWUFBMUIsRUFBdUMsWUFBdkMsRUFBcUQ7QUFDbkQsTUFBSSxhQUFhLG9CQUFrQixvQkFBVSxhQUE1QixVQUE4QyxHQUE5QyxRQUFqQjtBQUNBLE1BQUksUUFBUSxXQUFXLE1BQVgsQ0FBa0IscUJBQWE7QUFDekMsV0FBTyxVQUFVLFlBQVYsQ0FBdUIsb0JBQVUsYUFBakMsS0FBbUQsR0FBMUQ7QUFDRCxHQUZXLENBQVo7QUFHQSxTQUFPLE1BQU0sQ0FBTixDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQ2hDLHNDQUFXLFNBQVMsZ0JBQVQsQ0FBMEIsU0FBMUIsQ0FBWDtBQUNEO0FBQ0EsTUFBTTtBQUNMO0FBREssQ0FBTjtrQkFHYyxHOzs7Ozs7Ozs7QUN0RGY7Ozs7QUFDQTs7Ozs7Ozs7QUFHQSxJQUFJLE1BQU0sRUFBVjtBQUNBLElBQUksY0FBYyxTQUFTLGdCQUFULENBQTBCLG9CQUFVLG9CQUFwQyxDQUFsQjtBQUNBLDJDQUFrQixXQUFsQjs7QUFFQSxTQUFTLG1CQUFULEdBQStCO0FBQzdCLE1BQUksZ0JBQWdCLEVBQXBCO0FBQ0EsTUFBSSxNQUFNLEVBQVY7QUFDQSxNQUFJLFlBQUo7QUFDQSxNQUFJLFlBQUo7QUFDQSxNQUFJLE9BQU8sSUFBSSxJQUFKLEVBQVg7O0FBRUEsY0FBWSxPQUFaLENBQW9CLFVBQVMsS0FBVCxFQUFnQjtBQUNsQyxRQUFJLE1BQU0sS0FBVixFQUFpQjtBQUNmLFlBQU0sTUFBTSxZQUFOLENBQW1CLG9CQUFVLGFBQTdCLENBQU47QUFDQSxZQUFNLE1BQU0sWUFBTixDQUFtQixvQkFBVSxhQUE3QixDQUFOO0FBQ0EsY0FBUSxNQUFNLEtBQWQ7QUFDQSw0QkFBb0IsR0FBcEIsV0FBNkIsR0FBN0IsSUFBc0MsS0FBdEM7QUFDRDtBQUNGLEdBUEQ7QUFRQSxNQUFJLEtBQUosR0FBWSxhQUFaO0FBQ0EsTUFBSSxJQUFKLEdBQVcsaUJBQWdCLHFCQUFoQixFQUFYO0FBQ0EsU0FBTyxHQUFQO0FBQ0Q7O0FBRUQsU0FBUyxrQkFBVCxHQUE4QjtBQUM1QixNQUFJLGdCQUFnQixxQkFBcEI7QUFDQSxrQkFBZ0IsS0FBSyxTQUFMLENBQWUsYUFBZixDQUFoQjtBQUNBLGVBQWEsb0JBQVUsa0JBQXZCLElBQTZDLGFBQTdDO0FBQ0Q7O0FBRUQsTUFBTTtBQUNKO0FBREksQ0FBTjtrQkFHZSxHOzs7Ozs7OztrQkNsQ1MsVzs7QUFIeEI7Ozs7QUFDQTs7Ozs7Ozs7QUFFZSxTQUFTLFdBQVQsR0FBdUI7QUFDcEMsTUFBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0EsTUFBSSxrQkFBa0IsbUJBQW1CLG9CQUFVLHlCQUE3QixDQUF0Qjs7QUFFQSxPQUFLLElBQUksTUFBTSxvQkFBVSxXQUF6QixFQUFzQyxPQUFPLG9CQUFVLFlBQXZELEVBQXFFLEtBQXJFLEVBQTRFO0FBQzFFLFFBQUksYUFBYSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBakI7QUFDQSxTQUFLLElBQUksU0FBUyxvQkFBVSxXQUE1QixFQUF5QyxVQUFVLG9CQUFVLFdBQTdELEVBQTBFLFFBQTFFLEVBQW9GO0FBQ2xGLFVBQUksT0FBTyxXQUFXLEdBQVgsRUFBZ0IsTUFBaEIsQ0FBWDtBQUNBLFdBQUssV0FBTCxDQUFpQixnQkFBZ0Isb0JBQVUscUJBQTFCLENBQWpCO0FBQ0EsV0FBSyxXQUFMLENBQWlCLGlCQUFpQixHQUFqQixFQUFzQixNQUF0QixFQUE4QixvQkFBVSxtQkFBeEMsRUFBNkQsb0JBQVUsc0JBQXZFLENBQWpCO0FBQ0EsaUJBQVcsV0FBWCxDQUF1QixJQUF2QjtBQUNEO0FBQ0QsVUFBTSxXQUFOLENBQWtCLFVBQWxCO0FBQ0Q7QUFDRCxrQkFBZ0IsV0FBaEIsQ0FBNEIsS0FBNUI7QUFDQSxNQUFJLGNBQWMsU0FBUyxnQkFBVCxDQUEwQixvQkFBVSxvQkFBcEMsQ0FBbEI7QUFDQSxpQ0FBK0IscUJBQVcsWUFBMUMsRUFBd0QsV0FBeEQ7QUFFRDs7QUFFRCxTQUFTLGtCQUFULENBQTRCLHVCQUE1QixFQUFxRDtBQUNuRCxTQUFPLFNBQVMsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBUDtBQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QjtBQUM1QixNQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVg7QUFDQSxPQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLE9BQW5CLFdBQW1DLEdBQW5DO0FBQ0EsT0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixPQUFuQixXQUFtQyxHQUFuQztBQUNBLFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVMsZUFBVCxDQUF5QixTQUF6QixFQUFvQztBQUNsQyxNQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVo7QUFDQSxRQUFNLFlBQU4sQ0FBbUIsTUFBbkIsRUFBMkIsTUFBM0I7QUFDQSxRQUFNLFlBQU4sQ0FBbUIsV0FBbkIsRUFBZ0MsQ0FBQyxTQUFqQztBQUNBLFFBQU0sU0FBTixDQUFnQixHQUFoQixDQUFvQixZQUFwQjtBQUNBLFNBQU8sS0FBUDtBQUNEOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsR0FBMUIsRUFBK0IsR0FBL0IsRUFBb0MsT0FBcEMsRUFBNkMsU0FBN0MsRUFBd0Q7QUFDdEQsTUFBSSxhQUFhLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFqQjtBQUNBLE1BQUksV0FBVyxZQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBZjtBQUNBLGFBQVcsWUFBWCxDQUF3QixNQUF4QixFQUFnQyxNQUFoQztBQUNBLGFBQVcsU0FBWCxDQUFxQixHQUFyQixDQUF5QixZQUF6QjtBQUNBLGFBQVcsWUFBWCxDQUF3QixTQUF4QixFQUFtQyxPQUFuQztBQUNBLGFBQVcsWUFBWCxDQUF3QixXQUF4QixFQUFxQyxDQUFDLFNBQXRDO0FBQ0EsYUFBVyxZQUFYLENBQXdCLGlCQUF4QixPQUE4QyxHQUE5QztBQUNBLGFBQVcsWUFBWCxDQUF3QixpQkFBeEIsT0FBOEMsR0FBOUM7QUFDQSxhQUFXLFlBQVgsQ0FBd0IsaUJBQXhCLE9BQThDLFFBQTlDOztBQUVBLFNBQU8sVUFBUDtBQUNEOztBQUVELFNBQVMsV0FBVCxDQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQjtBQUM3QixNQUFJLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBdkIsRUFBMEI7QUFDeEIsV0FBTyxDQUFQO0FBQ0QsR0FGRCxNQUVPLElBQUksT0FBTyxDQUFQLElBQVksTUFBTSxDQUFsQixJQUF1QixNQUFNLENBQWpDLEVBQW9DO0FBQ3pDLFdBQU8sQ0FBUDtBQUNELEdBRk0sTUFFQSxJQUFJLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBdkIsRUFBMEI7QUFDL0IsV0FBTyxDQUFQO0FBQ0QsR0FGTSxNQUVBLElBQUksTUFBTSxDQUFOLElBQVcsTUFBTSxDQUFqQixJQUFzQixPQUFPLENBQWpDLEVBQW9DO0FBQ3pDLFdBQU8sQ0FBUDtBQUNELEdBRk0sTUFFQSxJQUFJLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBakIsSUFBc0IsTUFBTSxDQUE1QixJQUFpQyxNQUFNLENBQTNDLEVBQThDO0FBQ25ELFdBQU8sQ0FBUDtBQUNELEdBRk0sTUFFQSxJQUFJLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBakIsSUFBc0IsT0FBTyxDQUFqQyxFQUFvQztBQUN6QyxXQUFPLENBQVA7QUFDRCxHQUZNLE1BRUEsSUFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLENBQXZCLEVBQTBCO0FBQy9CLFdBQU8sQ0FBUDtBQUNELEdBRk0sTUFFQSxJQUFJLE9BQU8sQ0FBUCxJQUFZLE1BQU0sQ0FBbEIsSUFBdUIsTUFBTSxDQUFqQyxFQUFvQztBQUN6QyxXQUFPLENBQVA7QUFDRCxHQUZNLE1BRUEsSUFBSSxPQUFPLENBQVAsSUFBWSxPQUFPLENBQXZCLEVBQTBCO0FBQy9CLFdBQU8sQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyw4QkFBVCxDQUF3QyxZQUF4QyxFQUFzRCxXQUF0RCxFQUFtRTtBQUNqRSw2Q0FBa0IsV0FBbEI7QUFDQSxjQUFZLE9BQVosQ0FBb0IsVUFBUyxLQUFULEVBQWdCO0FBQ2xDLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBaEM7QUFDRCxHQUZEO0FBR0Q7Ozs7Ozs7OztBQ25GRDs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLE1BQU0sRUFBVjs7QUFFQSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsRUFBNkI7O0FBRTNCLE1BQUkscUJBQXFCLElBQXJCLEVBQTJCLG9CQUFVLGFBQXJDLENBQUosRUFBeUQ7QUFDdkQscUJBQWdCLFVBQWhCLENBQTJCLElBQTNCO0FBQ0EsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxNQUFJLHFCQUFxQixJQUFyQixFQUEyQixvQkFBVSxhQUFyQyxDQUFKLEVBQXlEO0FBQ3ZELHFCQUFnQixVQUFoQixDQUEyQixJQUEzQjtBQUNBLFdBQU8sS0FBUDtBQUNEO0FBQ0QsTUFBSSxxQkFBcUIsSUFBckIsRUFBMkIsb0JBQVUsYUFBckMsQ0FBSixFQUF5RDtBQUN2RCxxQkFBZ0IsVUFBaEIsQ0FBMkIsSUFBM0I7QUFDQSxXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVMsa0JBQVQsQ0FBNEIsS0FBNUIsRUFBbUM7QUFDakMsU0FBTyxDQUFDLE1BQU0sV0FBVyxLQUFYLENBQU4sQ0FBRCxJQUE2QixTQUFTLEtBQVQsQ0FBcEM7QUFDRDs7QUFFRCxTQUFTLG9CQUFULENBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDO0FBQ3hDLE1BQUksYUFBYSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBakI7QUFDQSxNQUFJLGFBQWEsaUJBQWdCLGFBQWhCLE9BQWtDLElBQWxDLFVBQTJDLFVBQTNDLFFBQWpCO0FBQ0EsZUFBYSxpQkFBZ0IsZ0NBQWhCLENBQWlELFVBQWpELEVBQTZELElBQTdELENBQWI7O0FBRUEsU0FBTyxtQ0FBbUMsVUFBbkMsRUFBK0MsSUFBL0MsQ0FBUDtBQUNEOztBQUVELFNBQVMsa0NBQVQsQ0FBNEMsVUFBNUMsRUFBd0QsYUFBeEQsRUFBdUU7QUFDckUsTUFBSSxTQUFTLEtBQWI7QUFDQSxhQUFXLE9BQVgsQ0FBbUIsZ0JBQVE7QUFDekIsUUFBSSxLQUFLLEtBQUwsS0FBZSxjQUFjLEtBQWpDLEVBQXdDO0FBQ3RDLHVCQUFpQixJQUFqQjtBQUNBLGVBQVMsSUFBVDtBQUNEO0FBQ0YsR0FMRDtBQU1BLFNBQU8sTUFBUDtBQUNEOztBQUVELFNBQVMsZ0JBQVQsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFDOUIsTUFBSSxvQkFBVSxZQUFkLEVBQTRCO0FBQzFCLFNBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixlQUE5QjtBQUNBLFdBQU8sVUFBUCxDQUFrQixZQUFNO0FBQ3RCLFdBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixNQUExQixDQUFpQyxlQUFqQztBQUNELEtBRkQsRUFFRyxJQUZIO0FBR0Q7QUFDRjs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsS0FBdEIsRUFBNkI7QUFDM0IsTUFBSSxPQUFPLE1BQU0sTUFBakI7QUFDQSxNQUFJLEtBQUssS0FBTCxJQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQUksQ0FBQyxtQkFBbUIsS0FBSyxLQUF4QixDQUFMLEVBQXFDO0FBQ25DLHFCQUFnQixVQUFoQixDQUEyQixJQUEzQjtBQUNBLFdBQU8sS0FBUDtBQUNEOztBQUVELE1BQUksQ0FBQyxjQUFjLElBQWQsQ0FBTCxFQUEwQjtBQUN4QixxQkFBZ0IsVUFBaEIsQ0FBMkIsSUFBM0I7QUFDQSxXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOztBQUVBLE1BQU07QUFDTCw4QkFESztBQUVMLHdDQUZLO0FBR0wsNENBSEs7QUFJTDtBQUpLLENBQU47a0JBTWMsRzs7Ozs7Ozs7O0FDN0VmLElBQU0sTUFBTSxFQUFaOztBQUVBLElBQUkseUJBQUosR0FBZ0Msa0NBQWhDO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLENBQWxCO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLENBQWxCO0FBQ0EsSUFBSSxZQUFKLEdBQW1CLENBQW5CO0FBQ0EsSUFBSSxTQUFKLEdBQWdCLENBQWhCO0FBQ0EsSUFBSSx5QkFBSixHQUFnQyxFQUFoQztBQUNBLElBQUkscUJBQUosR0FBNEIsQ0FBNUI7QUFDQSxJQUFJLHNCQUFKLEdBQTZCLENBQTdCO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLEVBQWxCO0FBQ0EsSUFBSSxXQUFKLEdBQWtCLEVBQWxCO0FBQ0EsSUFBSSxnQkFBSixHQUF1QixFQUF2QjtBQUNBLElBQUksZ0JBQUosR0FBdUIsR0FBdkI7QUFDQSxJQUFJLGFBQUosR0FBb0IsQ0FBcEI7QUFDQSxJQUFJLGFBQUosR0FBb0IsaUJBQXBCO0FBQ0EsSUFBSSxhQUFKLEdBQW9CLGlCQUFwQjtBQUNBLElBQUksYUFBSixHQUFvQixpQkFBcEI7QUFDQSxJQUFJLG1CQUFKLEdBQTBCLFVBQTFCO0FBQ0EsSUFBSSx5QkFBSixHQUFnQyxrQ0FBaEM7QUFDQSxJQUFJLDBCQUFKLEdBQWlDLG1DQUFqQztBQUNBLElBQUksMEJBQUosR0FBaUMsbUNBQWpDO0FBQ0EsSUFBSSwwQkFBSixHQUFpQyxtQ0FBakM7QUFDQSxJQUFJLG9CQUFKLEdBQTJCLHNCQUEzQjtBQUNBLElBQUksb0JBQUosR0FBMkIsNkJBQTNCO0FBQ0EsSUFBSSx3QkFBSixHQUErQixpQ0FBL0I7QUFDQSxJQUFJLHlCQUFKLEdBQWdDLDZCQUFoQztBQUNBLElBQUksMEJBQUosR0FBaUMsbUNBQWpDO0FBQ0EsSUFBSSxrQkFBSixHQUF5QixRQUF6QjtBQUNBLElBQUksWUFBSixHQUFtQixLQUFuQjtBQUNBLElBQUksV0FBSixHQUFrQixDQUFsQjtBQUNBLElBQUksV0FBSixHQUFrQixDQUFsQjs7a0JBRWUsRyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5cclxubGV0IG9iaiA9IHt9XHJcblxyXG5mdW5jdGlvbiBnZXRDb2xsZWN0aW9uKGF0dHJpYnV0ZSkge1xyXG4gIHJldHVybiBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChhdHRyaWJ1dGUpXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlSW5zZXJ0ZWRDZWxsRnJvbUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgaW5zZXJ0ZWRDZWxsKSB7XHJcblxyXG4gIGxldCBpbnNlcnRlZENlbGxSb3cgPSBpbnNlcnRlZENlbGwuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5ST1dfQVRUUklCVVRFKTtcclxuICBsZXQgaW5zZXJ0ZWRDZWxsQ29sID0gaW5zZXJ0ZWRDZWxsLmdldEF0dHJpYnV0ZSh2YXJpYWJsZXMuQ09MX0FUVFJJQlVURSk7XHJcblxyXG4gIGxldCBjb2xsZWN0aW9uV2l0aG91dEluc2VydGVkVmFsdWUgPSBjb2xsZWN0aW9uLmZpbHRlcihjZWxsID0+IHtcclxuICAgIGxldCBjZWxsUm93ID0gY2VsbC5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLlJPV19BVFRSSUJVVEUpO1xyXG4gICAgbGV0IGNlbGxDb2wgPSBjZWxsLmdldEF0dHJpYnV0ZSh2YXJpYWJsZXMuQ09MX0FUVFJJQlVURSk7XHJcbiAgICByZXR1cm4gKGNlbGxSb3cgIT09IGluc2VydGVkQ2VsbFJvdyB8fCBjZWxsQ29sICE9PSBpbnNlcnRlZENlbGxDb2wpO1xyXG4gIH0pXHJcbiAgcmV0dXJuIGNvbGxlY3Rpb25XaXRob3V0SW5zZXJ0ZWRWYWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJWYWx1ZShjZWxsKSB7XHJcbiAgY2VsbC52YWx1ZSA9ICcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZUFuZFRpbWUoKSB7XHJcbiAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICBsZXQgZGQgPSB0b2RheS5nZXREYXRlKCk7XHJcbiAgbGV0IG1tID0gdG9kYXkuZ2V0TW9udGgoKSArIDE7XHJcbiAgbGV0IHl5eXkgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG4gIGxldCBoaCA9IHRvZGF5LmdldEhvdXJzKCk7XHJcbiAgbGV0IG1pbiA9IHRvZGF5LmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgZGQgPSBhZGQwdG9UaW1lVmFsdWUoZGQpXHJcbiAgbW0gPSBhZGQwdG9UaW1lVmFsdWUobW0pXHJcbiAgbWluID0gYWRkMHRvVGltZVZhbHVlKG1pbilcclxuICByZXR1cm4gYCR7eXl5eX0tJHttbX0tJHtkZH0gJHtoaH06JHttaW59YFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkMHRvVGltZVZhbHVlKHRpbWVWYWx1ZSkge1xyXG4gIHJldHVybiB0aW1lVmFsdWUgPCAxMCA/ICcwJyArIHRpbWVWYWx1ZSA6IHRpbWVWYWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJHYW1lKCkge1xyXG4gIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwidGV4dFwiXScpXHJcbiAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgIGlmKGVsZW1lbnQudmFsdWUpIHtcclxuICAgICAgZWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZihlbGVtZW50LmdldEF0dHJpYnV0ZSgncmVhZG9ubHknKSl7XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpXHJcbiAgICB9XHJcbiAgfSlcclxuICB2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkID0gZmFsc2U7XHJcbiAgcmV0dXJuXHJcbn1cclxuXHJcbm9iaiA9IHtcclxuICBnZXRDb2xsZWN0aW9uLFxyXG4gIHJlbW92ZUluc2VydGVkQ2VsbEZyb21Db2xsZWN0aW9uLFxyXG4gIGNsZWFyVmFsdWUsXHJcbiAgZ2V0Q3VycmVudERhdGVBbmRUaW1lLFxyXG4gIGNsZWFyR2FtZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvYmo7XHJcbiIsImltcG9ydCB2YXJpYWJsZXMgZnJvbSAnLi92YXJpYWJsZXMuanMnO1xyXG5sZXQgb2JqID0ge31cclxuXHJcbmZ1bmN0aW9uIGdldFNhdmVkR2FtZShwcm9wZXJ0eU5hbWUpIHtcclxuXHJcbiAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW3Byb3BlcnR5TmFtZV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwdXRTYXZlZFZhbHVlc0ludG9UYWJsZShyb3dQb3NpdGlvbixjb2xQb3NpdGlvbikge1xyXG4gIGxldCB2YWx1ZXMgPSBnZXRTYXZlZEdhbWUodmFyaWFibGVzLnByb3BJbkxvY2FsU3RvcmFnZSk7XHJcbiAgbGV0IHJvdztcclxuICBsZXQgY29sO1xyXG4gIGxldCB2YWx1ZTtcclxuICBsZXQgaW5wdXRGaWVsZDtcclxuICB2YWx1ZXMgPSB2YWx1ZXMudmFsdWVcclxuXHJcbiAgZm9yKGxldCB2YWx1ZSBpbiB2YWx1ZXMpIHtcclxuXHJcbiAgICByb3cgPSB2YWx1ZVt2YXJpYWJsZXMucm93UG9zaXRpb25dO1xyXG4gICAgY29sID0gdmFsdWVbdmFyaWFibGVzLmNvbFBvc2l0aW9uXTtcclxuICAgIGlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbJHt2YXJpYWJsZXMuUk9XX0FUVFJJQlVURX09XCIke3Jvd31cIl1bJHt2YXJpYWJsZXMuQ09MX0FUVFJJQlVURX09XCIke2NvbH1cIl1gKVxyXG5cclxuICAgIGlucHV0RmllbGQudmFsdWUgPSB2YWx1ZXNbdmFsdWVdXHJcbiAgICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCd0cnVlJylcclxuICB9XHJcbiAgdmFyaWFibGVzLmlzVGFibGVCdWlsZCA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydERhdGVTYXZlZEdhbWUoZWxlbWVudCwgZGF0ZSkge1xyXG4gIGVsZW1lbnQudmFsdWUgPSBkYXRlO1xyXG4gIHJldHVybjtcclxufVxyXG5cclxub2JqID0ge1xyXG4gIGdldFNhdmVkR2FtZSxcclxuICBwdXRTYXZlZFZhbHVlc0ludG9UYWJsZVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9ialxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGhlbHBlckZ1bmN0aW9uc30gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgbG9hZH0gZnJvbSAnLi9sb2FkJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIHZhbGlkYXRpb259IGZyb20gJy4vdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBwb3B1bGF0ZX0gZnJvbSAnLi9wb3B1bGF0ZSc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBzYXZlfSBmcm9tICcuL3NhdmUnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgdGFibGV9IGZyb20gJy4vdGFibGUnO1xyXG5cclxubGV0IHNhdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5TQVZFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuTkVXX0dBTUVfQlVUVE9OX1NFTEVDVE9SKTtcclxubGV0IGxvYWRHYW1lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2YXJpYWJsZXMuTE9BRF9HQU1FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBjbGVhckdhbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZhcmlhYmxlcy5DTEVBUl9HQU1FX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxldCBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuLy9jb25zb2xlLmxvZygndmFyaSAnK3ZhcmlhYmxlcylcclxudGFibGUoKVxyXG5cclxuc2F2ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsc2F2ZS5zYXZlSW5Mb2NhbFN0b3JhZ2UpO1xyXG5uZXdHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxwb3B1bGF0ZS5pbnNlcnRWYWx1ZXMpO1xyXG5sb2FkR2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsbG9hZC5wdXRTYXZlZFZhbHVlc0ludG9UYWJsZSk7XHJcbmNsZWFyR2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycscG9wdWxhdGUuaW5zZXJ0VmFsdWVzKTtcclxuY2xlYXJHYW1lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxoZWxwZXJGdW5jdGlvbnMuY2xlYXJHYW1lKVxyXG4iLCJpbXBvcnQgdmFyaWFibGVzIGZyb20gJy4vdmFyaWFibGVzLmpzJztcclxuaW1wb3J0IHtkZWZhdWx0IGFzIGhlbHBlckZ1bmN0aW9uc30gZnJvbSAnLi9oZWxwZXIuanMnO1xyXG5pbXBvcnQge2RlZmF1bHQgYXMgdmFsaWRhdGlvbn0gZnJvbSAnLi92YWxpZGF0aW9uJztcclxubGV0IG9iaiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VmFsdWVzKGlzVGFibGVCdWlsZCwgbWF4Q2VsbHNUb0JlUG9wdWxhdGVkLGlzSW5wdXRVbmlxZUZuLGNsZWFyVmFsdWVGbikge1xyXG4gIGlmKCF2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkKXtcclxuICAgIGxldCBwb3B1bGF0ZWRDZWxsc0NvdW50ZXIgPSAwO1xyXG4gICAgd2hpbGUgKHBvcHVsYXRlZENlbGxzQ291bnRlciA8IHZhcmlhYmxlcy5NQVhfQ0VMTFNfVE9fQkVfUE9QVUxBVEVEKSB7XHJcbiAgICAgIGxldCBjZWxsID0gaW5zZXJ0VmFsdWVJbnRvQ2VsbCgpXHJcbiAgICAgIGlmICh2YWxpZGF0aW9uLmlzSW5wdXRVbmlxdWUoY2VsbCkpIHtcclxuICAgICAgICBwb3B1bGF0ZWRDZWxsc0NvdW50ZXIrKztcclxuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCd0cnVlJylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHZhcmlhYmxlcy5pc1RhYmxlQnVpbGQgPSB0cnVlO1xyXG4gIH1cclxuICByZXR1cm47XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbnNlcnRWYWx1ZUludG9DZWxsKHN0YXJ0LGVuZCkge1xyXG4gIGxldCBjb2xOciA9IGdldFJhbmRvbUFyYml0cmFyeSh2YXJpYWJsZXMuVEFCTEVfU1RBUlQsIHZhcmlhYmxlcy5UQUJMRV9FTkQpXHJcbiAgbGV0IHJvd05yID0gZ2V0UmFuZG9tQXJiaXRyYXJ5KHZhcmlhYmxlcy5UQUJMRV9TVEFSVCwgdmFyaWFibGVzLlRBQkxFX0VORClcclxuICBsZXQgcmFuZG9tVmFsdWUgPSBnZXRSYW5kb21BcmJpdHJhcnkodmFyaWFibGVzLlRBQkxFX1NUQVJULCB2YXJpYWJsZXMuVEFCTEVfRU5EKTtcclxuXHJcbiAgbGV0IGNlbGwgPSBnZXRDZWxsKHJvd05yLCBjb2xOcik7XHJcblxyXG4gIGlmICghY2VsbC52YWx1ZSkge1xyXG4gICAgY2VsbC52YWx1ZSA9IHJhbmRvbVZhbHVlXHJcbiAgfVxyXG4gIHJldHVybiBjZWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21BcmJpdHJhcnkoc3RhcnRSYW5nZSwgZW5kUmFuZ2UpIHtcclxuICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGVuZFJhbmdlIC0gc3RhcnRSYW5nZSkgKyBzdGFydFJhbmdlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2VsbChyb3csIGNvbCxyb3dBdHRyaWJ1dGUsY29sQXR0cmlidXRlKSB7XHJcbiAgbGV0IGNlbGxzSW5Sb3cgPSBnZXRDb2xsZWN0aW9uKGBbJHt2YXJpYWJsZXMuUk9XX0FUVFJJQlVURX09XCIke3Jvd31cIl1gKTtcclxuICBsZXQgY2VsbHMgPSBjZWxsc0luUm93LmZpbHRlcihjZWxsSW5Sb3cgPT4ge1xyXG4gICAgcmV0dXJuIGNlbGxJblJvdy5nZXRBdHRyaWJ1dGUodmFyaWFibGVzLkNPTF9BVFRSSUJVVEUpID09IGNvbDtcclxuICB9KVxyXG4gIHJldHVybiBjZWxsc1swXTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbihhdHRyaWJ1dGUpIHtcclxuICByZXR1cm4gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYXR0cmlidXRlKV07XHJcbn1cclxuIG9iaiA9IHtcclxuICBpbnNlcnRWYWx1ZXNcclxufVxyXG5leHBvcnQgZGVmYXVsdCBvYmpcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBoZWxwZXJGdW5jdGlvbnN9IGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcblxyXG5sZXQgb2JqID0ge307XHJcbmxldCBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFyaWFibGVzLklOUFVUX0ZJRUxEX1NFTEVDVE9SKTtcclxuaW5wdXRGaWVsZHMgPSBbLi4uaW5wdXRGaWVsZHNdO1xyXG5cclxuZnVuY3Rpb24gZ2V0VmFsdWVzRnJvbUZpZWxkcygpIHtcclxuICBsZXQgb2JqV2l0aFZhbHVlcyA9IHt9O1xyXG4gIGxldCBvYmogPSB7fTtcclxuICBsZXQgcm93O1xyXG4gIGxldCBjb2w7XHJcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICBpbnB1dEZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkKSB7XHJcbiAgICBpZiAoZmllbGQudmFsdWUpIHtcclxuICAgICAgcm93ID0gZmllbGQuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5ST1dfQVRUUklCVVRFKTtcclxuICAgICAgY29sID0gZmllbGQuZ2V0QXR0cmlidXRlKHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKTtcclxuICAgICAgdmFsdWUgPSBmaWVsZC52YWx1ZTtcclxuICAgICAgb2JqV2l0aFZhbHVlc1tgcm93JHtyb3d9Y29sJHtjb2x9YF0gPSB2YWx1ZTtcclxuICAgIH1cclxuICB9KVxyXG4gIG9iai52YWx1ZSA9IG9ialdpdGhWYWx1ZXM7XHJcbiAgb2JqLmRhdGUgPSBoZWxwZXJGdW5jdGlvbnMuZ2V0Q3VycmVudERhdGVBbmRUaW1lKClcclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlSW5Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgbGV0IG9ialdpdGhWYWx1ZXMgPSBnZXRWYWx1ZXNGcm9tRmllbGRzKCk7XHJcbiAgb2JqV2l0aFZhbHVlcyA9IEpTT04uc3RyaW5naWZ5KG9ialdpdGhWYWx1ZXMpO1xyXG4gIGxvY2FsU3RvcmFnZVt2YXJpYWJsZXMucHJvcEluTG9jYWxTdG9yYWdlXSA9IG9ialdpdGhWYWx1ZXM7XHJcbn1cclxuXHJcbm9iaiA9IHtcclxuICBzYXZlSW5Mb2NhbFN0b3JhZ2VcclxufVxyXG5leHBvcnQgZGVmYXVsdCBvYmpcclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyB2YWxpZGF0aW9ufSBmcm9tICcuL3ZhbGlkYXRpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ3JlYXRlVGFibGUoKSB7XHJcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKTtcclxuICBsZXQgc3Vkb2t1Q29udGFpbmVyID0gZ2V0U3Vkb2t1Q29udGFpbmVyKHZhcmlhYmxlcy5TVURPS1VfQ09OVEFJTkVSX1NFTEVDVE9SKTtcclxuXHJcbiAgZm9yIChsZXQgcm93ID0gdmFyaWFibGVzLlRBQkxFX1NUQVJUOyByb3cgPD0gdmFyaWFibGVzLlRBQkxFX0hFSUdIVDsgcm93KyspIHtcclxuICAgIGxldCBjdXJyZW50Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxyXG4gICAgZm9yIChsZXQgY29sdW1uID0gdmFyaWFibGVzLlRBQkxFX1NUQVJUOyBjb2x1bW4gPD0gdmFyaWFibGVzLlRBQkxFX1dJRFRIOyBjb2x1bW4rKykge1xyXG4gICAgICBsZXQgY2VsbCA9IGNyZWF0ZUNlbGwocm93LCBjb2x1bW4pO1xyXG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGNyZWF0ZUhlbHBGaWVsZCh2YXJpYWJsZXMuTUFYX0xFTkdUSF9IRUxQX0ZJRUxEKSlcclxuICAgICAgY2VsbC5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEZpZWxkKHJvdywgY29sdW1uLCB2YXJpYWJsZXMuSU5QVVRfRklFTERfUEFUVEVSTiwgdmFyaWFibGVzLk1BWF9MRU5HVEhfSU5QVVRfRklFTEQpKVxyXG4gICAgICBjdXJyZW50Um93LmFwcGVuZENoaWxkKGNlbGwpXHJcbiAgICB9XHJcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChjdXJyZW50Um93KVxyXG4gIH1cclxuICBzdWRva3VDb250YWluZXIuYXBwZW5kQ2hpbGQodGFibGUpXHJcbiAgbGV0IGlucHV0RmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh2YXJpYWJsZXMuSU5QVVRfRklFTERfU0VMRUNUT1IpO1xyXG4gIGFkZEV2ZW50TGlzdGVuZXJzVG9JbnB1dEZpZWxkcyh2YWxpZGF0aW9uLmlzSW5wdXRWYWxpZCwgaW5wdXRGaWVsZHMpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3Vkb2t1Q29udGFpbmVyKHN1ZG9rdUNvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3Vkb2t1Q29udGFpbmVyU2VsZWN0b3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDZWxsKHJvdywgY29sKSB7XHJcbiAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2xhc3MnLCBgcm93LSR7cm93fWApO1xyXG4gIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2xhc3MnLCBgY29sLSR7Y29sfWApO1xyXG4gIHJldHVybiBjZWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIZWxwRmllbGQobWF4TGVuZ3RoKSB7XHJcbiAgbGV0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGZpZWxkLnNldEF0dHJpYnV0ZSgnbWF4TGVuZ3RoJywgK21heExlbmd0aCk7XHJcbiAgZmllbGQuY2xhc3NMaXN0LmFkZCgnaGVscC1maWVsZCcpO1xyXG4gIHJldHVybiBmaWVsZDtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUlucHV0RmllbGQocm93LCBjb2wsIHBhdHRlcm4sIG1heExlbmd0aCkge1xyXG4gIGxldCBpbnB1dEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICBsZXQgc3F1YXJlTnIgPSBnZXRTcXVhcmVOcihyb3csIGNvbCk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xyXG4gIGlucHV0RmllbGQuY2xhc3NMaXN0LmFkZCgnbWFpbi1maWVsZCcpO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdwYXR0ZXJuJywgcGF0dGVybik7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ21heExlbmd0aCcsICttYXhMZW5ndGgpO1xyXG4gIGlucHV0RmllbGQuc2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldC1yb3cnLCBgJHtyb3d9YCk7XHJcbiAgaW5wdXRGaWVsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0LWNvbCcsIGAke2NvbH1gKTtcclxuICBpbnB1dEZpZWxkLnNldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtc3FyJywgYCR7c3F1YXJlTnJ9YCk7XHJcblxyXG4gIHJldHVybiBpbnB1dEZpZWxkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTcXVhcmVOcihyb3csIGNvbCkge1xyXG4gIGlmIChyb3cgPD0gMyAmJiBjb2wgPD0gMykge1xyXG4gICAgcmV0dXJuIDE7XHJcbiAgfSBlbHNlIGlmIChyb3cgPD0gMyAmJiBjb2wgPiAzICYmIGNvbCA8IDcpIHtcclxuICAgIHJldHVybiAyO1xyXG4gIH0gZWxzZSBpZiAocm93IDw9IDMgJiYgY29sID49IDcpIHtcclxuICAgIHJldHVybiAzO1xyXG4gIH0gZWxzZSBpZiAocm93ID4gMyAmJiByb3cgPCA3ICYmIGNvbCA8PSAzKSB7XHJcbiAgICByZXR1cm4gNDtcclxuICB9IGVsc2UgaWYgKHJvdyA+IDMgJiYgcm93IDwgNyAmJiBjb2wgPiAzICYmIGNvbCA8IDcpIHtcclxuICAgIHJldHVybiA1O1xyXG4gIH0gZWxzZSBpZiAocm93ID4gMyAmJiByb3cgPCA3ICYmIGNvbCA+PSA3KSB7XHJcbiAgICByZXR1cm4gNlxyXG4gIH0gZWxzZSBpZiAocm93ID49IDcgJiYgY29sIDw9IDMpIHtcclxuICAgIHJldHVybiA3O1xyXG4gIH0gZWxzZSBpZiAocm93ID49IDcgJiYgY29sID4gMyAmJiBjb2wgPCA3KSB7XHJcbiAgICByZXR1cm4gODtcclxuICB9IGVsc2UgaWYgKHJvdyA+PSA3ICYmIGNvbCA+PSA3KSB7XHJcbiAgICByZXR1cm4gOTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzVG9JbnB1dEZpZWxkcyh2YWxpZGF0aW9uRm4sIGlucHV0RmllbGRzKSB7XHJcbiAgaW5wdXRGaWVsZHMgPSBbLi4uaW5wdXRGaWVsZHNdO1xyXG4gIGlucHV0RmllbGRzLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdmFsaWRhdGlvbkZuKVxyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0IHZhcmlhYmxlcyBmcm9tICcuL3ZhcmlhYmxlcy5qcyc7XHJcbmltcG9ydCB7ZGVmYXVsdCBhcyBoZWxwZXJGdW5jdGlvbnN9IGZyb20gJy4vaGVscGVyLmpzJztcclxuXHJcbmxldCBvYmogPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGlzSW5wdXRVbmlxdWUoY2VsbCkge1xyXG5cclxuICBpZiAoaXNVbmlxdWVJbkNvbGxlY3Rpb24oY2VsbCwgdmFyaWFibGVzLlJPV19BVFRSSUJVVEUpKSB7XHJcbiAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKGlzVW5pcXVlSW5Db2xsZWN0aW9uKGNlbGwsIHZhcmlhYmxlcy5DT0xfQVRUUklCVVRFKSkge1xyXG4gICAgaGVscGVyRnVuY3Rpb25zLmNsZWFyVmFsdWUoY2VsbCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIGlmIChpc1VuaXF1ZUluQ29sbGVjdGlvbihjZWxsLCB2YXJpYWJsZXMuU1FSX0FUVFJJQlVURSkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0lzSW5wdXROdW1iZXIoaW5wdXQpIHtcclxuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoaW5wdXQpKSAmJiBpc0Zpbml0ZShpbnB1dCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVW5pcXVlSW5Db2xsZWN0aW9uKGNlbGwsIGF0dHIpIHtcclxuICBsZXQgcm93QXR0clZhbCA9IGNlbGwuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gIGxldCBjb2xsZWN0aW9uID0gaGVscGVyRnVuY3Rpb25zLmdldENvbGxlY3Rpb24oYFske2F0dHJ9PVwiJHtyb3dBdHRyVmFsfVwiXWApO1xyXG4gIGNvbGxlY3Rpb24gPSBoZWxwZXJGdW5jdGlvbnMucmVtb3ZlSW5zZXJ0ZWRDZWxsRnJvbUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgY2VsbCk7XHJcblxyXG4gIHJldHVybiBkb2VzQ29sbGVjdGlvbkNvbnRhaW5JbnNlcnRlZFZhbHVlKGNvbGxlY3Rpb24sIGNlbGwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb2VzQ29sbGVjdGlvbkNvbnRhaW5JbnNlcnRlZFZhbHVlKGNvbGxlY3Rpb24sIGluc2VydGVkVmFsdWUpIHtcclxuICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgY29sbGVjdGlvbi5mb3JFYWNoKGNlbGwgPT4ge1xyXG4gICAgaWYgKGNlbGwudmFsdWUgPT09IGluc2VydGVkVmFsdWUudmFsdWUpIHtcclxuICAgICAgZ2l2ZUludmFsaWRDbGFzcyhjZWxsKTtcclxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdpdmVJbnZhbGlkQ2xhc3MoY2VsbCkge1xyXG4gIGlmICh2YXJpYWJsZXMuaXNUYWJsZUJ1aWxkKSB7XHJcbiAgICBjZWxsLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW52YWxpZC1maWVsZCcpXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNlbGwucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkLWZpZWxkJylcclxuICAgIH0sIDIwMDApO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNJbnB1dFZhbGlkKGV2ZW50KSB7XHJcbiAgbGV0IGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgaWYgKGNlbGwudmFsdWUgPT0gJycpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjaGVja0lzSW5wdXROdW1iZXIoY2VsbC52YWx1ZSkpIHtcclxuICAgIGhlbHBlckZ1bmN0aW9ucy5jbGVhclZhbHVlKGNlbGwpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFpc0lucHV0VW5pcXVlKGNlbGwpKSB7XHJcbiAgICBoZWxwZXJGdW5jdGlvbnMuY2xlYXJWYWx1ZShjZWxsKTtcclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuIG9iaiA9IHtcclxuICBpc0lucHV0VW5pcXVlLFxyXG4gIGNoZWNrSXNJbnB1dE51bWJlcixcclxuICBpc1VuaXF1ZUluQ29sbGVjdGlvbixcclxuICBpc0lucHV0VmFsaWRcclxufVxyXG5leHBvcnQgZGVmYXVsdCBvYmpcclxuIiwiXHJcbmNvbnN0IG9iaiA9IHt9O1xyXG5cclxub2JqLlNVRE9LVV9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwic3Vkb2t1LWNvbnRhaW5lclwiXSdcclxub2JqLlRBQkxFX1NUQVJUID0gMTtcclxub2JqLlRBQkxFX1dJRFRIID0gOTtcclxub2JqLlRBQkxFX0hFSUdIVCA9IDk7XHJcbm9iai5UQUJMRV9FTkQgPSA5O1xyXG5vYmouTUFYX0NFTExTX1RPX0JFX1BPUFVMQVRFRCA9IDIwO1xyXG5vYmouTUFYX0xFTkdUSF9IRUxQX0ZJRUxEID0gNjtcclxub2JqLk1BWF9MRU5HVEhfSU5QVVRfRklFTEQgPSAxO1xyXG5vYmouQVNDSUlfRk9SXzAgPSA0ODtcclxub2JqLkFTQ0lJX0ZPUl85ID0gNTc7XHJcbm9iai5BU0NJSV9GT1JfMF9ObUtwID0gOTY7XHJcbm9iai5BU0NJSV9GT1JfOV9ObUtwID0gMTA1O1xyXG5vYmouQVNDSUlfRk9SX1RhYiA9IDk7XHJcbm9iai5ST1dfQVRUUklCVVRFID0gJ2RhdGEtdGFyZ2V0LXJvdyc7XHJcbm9iai5DT0xfQVRUUklCVVRFID0gJ2RhdGEtdGFyZ2V0LWNvbCc7XHJcbm9iai5TUVJfQVRUUklCVVRFID0gJ2RhdGEtdGFyZ2V0LXNxcic7XHJcbm9iai5JTlBVVF9GSUVMRF9QQVRURVJOID0gJ1swLTldezF9Jztcclxub2JqLlNVRE9LVV9DT05UQUlORVJfU0VMRUNUT1IgPSAnW2RhdGEtdGFyZ2V0PVwic3Vkb2t1LWNvbnRhaW5lclwiXSc7XHJcbm9iai5CVE5fQ1JFQVRFX1NVRE9LVV9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJidG4tY3JlYXRlLXN1ZG9rdVwiXSc7XHJcbm9iai5WQUxJREFUSU9OX0JBTk5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJ2YWxpZGF0aW9uLWJhbm5lclwiXSc7XHJcbm9iai5WQUxJREFUSU9OX0JBTk5FUl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJ2YWxpZGF0aW9uLWJhbm5lclwiXSc7XHJcbm9iai5JTlBVVF9GSUVMRF9TRUxFQ1RPUiA9ICdbY2xhc3M9XCJtYWluLWZpZWxkXCJdJztcclxub2JqLlNBVkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLXRhcmdldD1cInNhdmUtYnV0dG9uXCJdJztcclxub2JqLk5FV19HQU1FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJuZXctZ2FtZS1idXR0b25cIl0nO1xyXG5vYmouTE9BRF9HQU1FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJsb2FkLWJ1dHRvblwiXSc7XHJcbm9iai5DTEVBUl9HQU1FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS10YXJnZXQ9XCJjbGVhci1nYW1lLWJ1dHRvblwiXSc7XHJcbm9iai5wcm9wSW5Mb2NhbFN0b3JhZ2UgPSAnU3Vkb2t1Jztcclxub2JqLmlzVGFibGVCdWlsZCA9IGZhbHNlO1xyXG5vYmoucm93UG9zaXRpb24gPSAzO1xyXG5vYmouY29sUG9zaXRpb24gPSA3O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2JqO1xyXG4iXX0=
