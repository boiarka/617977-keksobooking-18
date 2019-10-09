'use strict';

(function () {
  var MAP_PIN_X = 600;
  var MAP_PIN_Y = 428;

  var adFormElement = document.querySelector('.ad-form');
  var allAdFormElements = document.querySelectorAll('.ad-form__element');
  var addressElement = document.querySelector('#address');

  window.startMap = function () {
    window.mapElement.classList.remove('map--faded');

    window.renderPins(window.dataArray);

    adFormElement.classList.remove('ad-form--disabled');
    for (var i = 0; i < allAdFormElements.length; i++) {
      allAdFormElements[i].disabled = false;
    }
    addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
  };

})();
