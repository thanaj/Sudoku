(function(){
  'use strict'
  let Sudoku = window.Sudoku || {};

  function Variables() {
    const obj = {};
    obj.SUDOKU_CONTAINER_SELECTOR = '[data-target="sudoku-container"]'
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

    return obj;
  }

  Sudoku.Variables = Variables;
  window.Sudoku = Sudoku;
})(window)
