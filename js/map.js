'use strict';

(function () {
  var MAP_PIN_X = 600;
  var MAP_PIN_Y = 428;

  var adFormElement = document.querySelector('.ad-form');
  var allAdFormElements = document.querySelectorAll('.ad-form__element');
  var addressElement = document.querySelector('#address');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.mapElement = document.querySelector('.map');
  window.mapPinMainElement = document.querySelector('.map__pin--main');

  var successHandler = function (offers) {
    window.renderPins(offers);
    window.dataArray = offers;
  };

  window.errorHandler = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    window.fragment.appendChild(errorElement);
    document.body.insertAdjacentElement('afterbegin', errorElement);
    var errorTextElement = document.querySelector('.error__message');
    errorTextElement.innerHTML = errorMessage;
    var errorButtonElement = document.querySelector('.error__button');
    var errorDiv = document.querySelector('.error');

    errorButtonElement.addEventListener('click', function () {
      errorDiv.remove();
    });

    errorDiv.addEventListener('click', function () {
      errorDiv.remove();
    });

    document.addEventListener('keydown', function (evtClick) {
      if (evtClick.keyCode === window.ESC_KEYCODE) {
        errorDiv.remove();
      }
    });

  };

  window.startMap = function () {
    window.mapElement.classList.remove('map--faded');

    window.load(successHandler, window.errorHandler);

    adFormElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < allAdFormElements.length; i++) {
      allAdFormElements[i].disabled = false;
    }
    addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
  };

})();
