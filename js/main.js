'use strict';

var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AVAILABLE_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_X = 600;
var MAP_PIN_Y = 428;

window.mapElement = document.querySelector('.map');
var adFormElement = document.querySelector('.ad-form');
var allAdFormElements = document.querySelectorAll('.ad-form__element');
var addressElement = document.querySelector('#address');

var dataArray = window.generateData(PRICES, TYPES, AVAILABLE_TIMES, AVAILABLE_TIMES, FEATURES, PHOTOS);

function startMap() {
  window.mapElement.classList.remove('map--faded');

  window.renderPins(dataArray);

  adFormElement.classList.remove('ad-form--disabled');
  for (var i = 0; i < allAdFormElements.length; i++) {
    allAdFormElements[i].disabled = false;
  }
  addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
}

window.mapPinMainElement.addEventListener('mousedown', startMap);
window.mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.ENTER_KEYCODE) {
    startMap();
  }
});
