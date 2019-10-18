'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.fragment = document.createDocumentFragment();
  window.errorsMessage = {
    ERROR: 'Произошла ошибка соединения',
    STATUS: 'Cтатус ответа: ',
    REQUEST_TIME: 'Запрос не успел выполниться за ',
    MS: 'мс',
    Z_INDEX: 999
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

  window.utils = {
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    syncSelectsValues: function (selectFrom, selectTo) {
      var selectedValue = selectFrom.value;
      if (selectedValue) {
        selectTo.value = selectedValue;
      }
    },
    isArrayContain: function (filteredData, featuresData) {
      var isContain = true;
      featuresData.forEach(function (item, i) {
        if (filteredData.includes(featuresData[i]) === false) {
          isContain = false;
        }
      });
      return isContain;
    },
    debounce: function (cb) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },
    error: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorElement = errorTemplate.cloneNode(true);
      var errorBlock = document.querySelector('.error');
      var errorTextElement = errorElement.querySelector('.error__message');
      var errorButtonElement = errorElement.querySelector('.error__button');
      errorElement.style.zIndex = window.errorsMessage.Z_INDEX;
      errorTextElement.textContent = errorMessage;
      window.fragment.appendChild(errorElement);
      document.body.insertAdjacentElement('afterbegin', errorElement);

      errorButtonElement.addEventListener('click', function () {
        errorBlock.remove();
      });

      errorBlock.addEventListener('click', function () {
        errorBlock.remove();
      });

      document.addEventListener('keydown', function (evtClick) {
        if (window.utils.isEscPressed(evtClick)) {
          errorBlock.remove();
        }
      });

      window.inactiveMap();
      window.clickOnMainPin();
    }
  };

})();
