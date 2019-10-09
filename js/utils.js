'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  window.MAX_PIN_Y = 630;
  window.MAX_PIN_X = 130;

  window.typeOffer = {
    'flat': {
      translation: 'Квартира',
      validation: {
        min: '1000',
        placeholder: '1000'
      }
    },
    'bungalo': {
      translation: 'Бунгало',
      validation: {
        min: '0',
        placeholder: '0'
      }
    },
    'house': {
      translation: 'Дом',
      validation: {
        min: '5000',
        placeholder: '5000'
      }
    },
    'palace': {
      translation: 'Дворец',
      validation: {
        min: '10000',
        placeholder: '10000'
      }
    }
  };


  window.getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.getRandomLengthArray = function (array, max) {
    var newArray = [];
    for (var i = 0; i < window.getRandomInteger(1, max); i++) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  window.syncSelectsValues = function (selectFrom, selectTo) {
    var selectedValue = selectFrom.value;
    if (selectedValue) {
      selectTo.value = selectedValue;
    }
  };
})();
