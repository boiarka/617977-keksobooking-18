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
    return window.dataArray;
  };

  var errorHandler = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    window.fragment.appendChild(errorElement);
    document.body.insertAdjacentElement('afterbegin', errorElement);
    var errorTextElement = document.querySelector('.error__message');
    errorTextElement.innerHTML = errorMessage;
    var errorButtonElement = document.querySelector('.error__button');
    errorButtonElement.addEventListener('click', function () {
      var errorDiv = document.querySelector('.error');
      errorDiv.remove();
    });
  };

  window.startMap = function () {
    window.mapElement.classList.remove('map--faded');

    window.load(successHandler, errorHandler);

    adFormElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < allAdFormElements.length; i++) {
      allAdFormElements[i].disabled = false;
    }
    addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
  };

})();
