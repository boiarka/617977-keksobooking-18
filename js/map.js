'use strict';

(function () {
  var adFormElement = document.querySelector('.ad-form');
  var allAdFormElements = document.querySelectorAll('.ad-form__element');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.addressElement = document.querySelector('#address');
  window.mapElement = document.querySelector('.map');
  window.mapPinMainElement = document.querySelector('.map__pin--main');

  var mainPinOffsetLeft = window.mapPinMainElement.offsetLeft;
  var mainPinOffsetTop = window.mapPinMainElement.offsetTop;
  var mapPinMainStyleLeft = window.mapPinMainElement.style.left;
  var mapPinMainStyleTop = window.mapPinMainElement.style.top;


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
      if (window.isEscPressed(evtClick)) {
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
    window.addressElement.value = mainPinOffsetLeft + ', ' + mainPinOffsetTop;
  };

  window.inactiveMap = function () {
    window.mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    for (var i = 0; i < allAdFormElements.length; i++) {
      allAdFormElements[i].disabled = true;
    }

    window.mapPinMainElement.style.left = mapPinMainStyleLeft;
    window.mapPinMainElement.style.top = mapPinMainStyleTop;
    window.addressElement.value = mainPinOffsetLeft + ', ' + mainPinOffsetTop;
  };

})();
