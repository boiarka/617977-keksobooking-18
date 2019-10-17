'use strict';

(function () {
  window.Z_INDEX = 998;
  window.ERROR_Z_INDEX = 999;
  window.fragment = document.createDocumentFragment();

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.errorsMessage = {
    ERROR: 'Произошла ошибка соединения',
    STATUS: 'Cтатус ответа: ',
    REQUEST_TIME: 'Запрос не успел выполниться за ',
    MS: 'мс'
  };

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

  // Синхронизация двух select
  window.syncSelectsValues = function (selectFrom, selectTo) {
    var selectedValue = selectFrom.value;
    if (selectedValue) {
      selectTo.value = selectedValue;
    }
  };

  window.isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };
  window.isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  // Проверка: содержит ли массив нужный элемент другого массива
  window.isArrayContain = function (filteredData, featuresData) {
    var isContain = false;
    for (var i = 0; i < featuresData.length; i++) {
      if (filteredData.offer.features.indexOf(featuresData[i]) !== -1) {
        isContain = true;
      } else {
        isContain = false;
        return isContain;
      }
    }
    return isContain;
  };

})();
