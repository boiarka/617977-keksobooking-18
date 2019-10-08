'use strict';

(function () {
  var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var AVAILABLE_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MAP_PIN_X = 600;
  var MAP_PIN_Y = 428;

  var adFormElement = document.querySelector('.ad-form');
  var allAdFormElements = document.querySelectorAll('.ad-form__element');
  var addressElement = document.querySelector('#address');

  window.dataArray = window.generateData(PRICES, TYPES, AVAILABLE_TIMES, AVAILABLE_TIMES, FEATURES, PHOTOS);

  window.startMap = function () {
    window.mapElement.classList.remove('map--faded');

    window.renderPins(window.dataArray);

    adFormElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < allAdFormElements.length; i++) {
      allAdFormElements[i].disabled = false;
    }
    addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
  };

  // Клики по главному пину, добавление и удаление обработчиков
  window.mapPinMainElement.addEventListener('mousedown', window.startMap);
  window.mapPinMainElement.addEventListener('mouseup', function () {
    window.mapPinMainElement.removeEventListener('mousedown', window.startMap);
    window.mapPinMainElement.removeEventListener('keydown', pinKeyDown);
  });

  var pinKeyDown = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.startMap();
    }
  };

  window.mapPinMainElement.addEventListener('keydown', pinKeyDown);

  window.mapPinMainElement.addEventListener('keyup', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.mapPinMainElement.removeEventListener('keydown', pinKeyDown);
      window.mapPinMainElement.removeEventListener('mousedown', window.startMap);
    }
  });

})();
