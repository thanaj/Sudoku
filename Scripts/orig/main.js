import variables from './variables.js';
import {default as helperFunctions} from './helper.js';
import {default as load} from './load';
import {default as validation} from './validation';
import {default as populate} from './populate';
import {default as save} from './save';
import {default as table} from './table';

let saveButton = document.querySelector(variables.SAVE_BUTTON_SELECTOR);
let newGameButton = document.querySelector(variables.NEW_GAME_BUTTON_SELECTOR);
let loadGameButton = document.querySelector(variables.LOAD_GAME_BUTTON_SELECTOR);
let clearGameButton = document.querySelector(variables.CLEAR_GAME_BUTTON_SELECTOR);
let clearSaveutton = document.querySelector(variables.CLEAR_SAVE_SELECTOR);
let localStorage = window.localStorage;

//console.log('vari '+variables)
table()

saveButton.addEventListener('click',save.saveInLocalStorage);
newGameButton.addEventListener('click',populate.insertValues);
loadGameButton.addEventListener('click',load.putSavedValuesIntoTable);
//clearGameButton.addEventListener('click',populate.insertValues);
clearGameButton.addEventListener('click',helperFunctions.clearGame)
clearSaveutton.addEventListener('click',helperFunctions.clearSave)
