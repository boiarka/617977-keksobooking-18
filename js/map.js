'use strict';

(function () {
  window.addressElement = document.querySelector('#address');
  window.mapElement = document.querySelector('.map');
  window.mapPinMainElement = document.querySelector('.map__pin--main');
  window.mainPinOffsetLeft = window.mapPinMainElement.offsetLeft;
  window.mainPinOffsetTop = window.mapPinMainElement.offsetTop;
  window.isPageActive = false;

  var adFormElement = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var mapPinMainStyleLeft = window.mapPinMainElement.style.left;
  var mapPinMainStyleTop = window.mapPinMainElement.style.top;

  var successHandler = function (offers) {
    window.offers = offers;
    window.pin.render(window.offers);
    window.filter.activate();
  };

  window.filter.reset();

  window.map = {
    start: function () {
      if (!window.isPageActive) {
        window.isPageActive = true;
        window.mapElement.classList.remove('map--faded');
        adFormElement.classList.remove('ad-form--disabled');
        adFormElements.forEach(function (element) {
          element.disabled = false;
        });
        window.backend.load(successHandler, window.utils.error);
        window.addressElement.value = Math.floor(window.mainPinOffsetLeft + window.pinWidth / 2) + ', ' + Math.floor(window.mainPinOffsetTop + window.pinHeight / 2);
      }
    },
    inactive: function () {
      window.isPageActive = false;
      window.mapElement.classList.add('map--faded');
      window.mapPinMainElement.style.left = mapPinMainStyleLeft;
      window.mapPinMainElement.style.top = mapPinMainStyleTop;
      adFormElement.classList.add('ad-form--disabled');
      adFormElements.forEach(function (element) {
        element.disabled = true;
      });
    }
  };

})();
