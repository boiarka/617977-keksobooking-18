'use strict';

(function () {
  window.addressElement = document.querySelector('#address');
  window.mapElement = document.querySelector('.map');
  window.mapPinMainElement = document.querySelector('.map__pin--main');

  window.isPageActive = false;

  var adFormElement = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var mainPinOffsetLeft = window.mapPinMainElement.offsetLeft;
  var mainPinOffsetTop = window.mapPinMainElement.offsetTop;
  var mapPinMainStyleLeft = window.mapPinMainElement.style.left;
  var mapPinMainStyleTop = window.mapPinMainElement.style.top;

  window.inactiveMap = function () {
    window.isPageActive = false;
    window.mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].disabled = true;
    }

    window.mapPinMainElement.style.left = mapPinMainStyleLeft;
    window.mapPinMainElement.style.top = mapPinMainStyleTop;
    window.addressElement.value = mainPinOffsetLeft + ', ' + mainPinOffsetTop;
  };

  window.errorHandler = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.style.zIndex = window.ERROR_Z_INDEX;
    var errorTextElement = errorElement.querySelector('.error__message');
    var errorButtonElement = errorElement.querySelector('.error__button');

    errorTextElement.textContent = errorMessage;
    window.fragment.appendChild(errorElement);
    document.body.insertAdjacentElement('afterbegin', errorElement);

    var errorBlock = document.querySelector('.error');

    errorButtonElement.addEventListener('click', function () {
      errorBlock.remove();
    });

    errorBlock.addEventListener('click', function () {
      errorBlock.remove();
    });

    document.addEventListener('keydown', function (evtClick) {
      if (window.isEscPressed(evtClick)) {
        errorBlock.remove();
      }
    });

    window.inactiveMap();
    window.clickOnMainPin();
  };

  var successHandler = function (offers) {
    window.offers = offers;
    window.renderPins(window.offers);
    window.activateFilter();
  };

  window.resetFilter();
  window.startMap = function () {
    if (!window.isPageActive) {
      window.isPageActive = true;
      window.mapElement.classList.remove('map--faded');
      adFormElement.classList.remove('ad-form--disabled');
      adFormElements.forEach(function (element) {
        element.disabled = false;
      });
      window.load(successHandler, window.errorHandler);
      window.addressElement.value = mainPinOffsetLeft + ', ' + mainPinOffsetTop;
    }
  };

})();
