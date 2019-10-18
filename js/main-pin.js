'use strict';

(function () {
  var PIN_Z_INDEX = 998;
  var MAX_PIN_Y = 630;
  var MIN_PIN_Y = 130;

  window.pinWidth = window.mapPinMainElement.clientWidth;
  window.pinHeight = window.mapPinMainElement.clientHeight;

  window.clickOnMainPin = function () {
    var pinKeyDown = function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        window.map.start();
      }
    };
    window.mapPinMainElement.addEventListener('mousedown', window.map.start);
    window.mapPinMainElement.addEventListener('keydown', pinKeyDown);
  };

  window.clickOnMainPin();
  window.addressElement.value = Math.floor(window.mainPinOffsetLeft + window.pinWidth / 2) + ', ' + Math.floor(window.mainPinOffsetTop + window.pinHeight / 2);

  window.mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var minX = Math.floor(0 - window.pinWidth / 2);
    var maxX = Math.floor(window.mapElement.clientWidth - window.pinWidth / 2);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.mapPinMainElement.style.zIndex = PIN_Z_INDEX;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCurrentY = window.mapPinMainElement.offsetTop - shift.y;
      var pinCurrentX = window.mapPinMainElement.offsetLeft - shift.x;

      if (pinCurrentY < (MAX_PIN_Y - window.pinHeight) && pinCurrentY > (MIN_PIN_Y - window.pinWidth) && pinCurrentX > minX && pinCurrentX < maxX) {
        window.mapPinMainElement.style.top = pinCurrentY + 'px';
        window.mapPinMainElement.style.left = pinCurrentX + 'px';
      }

      window.addressElement.value = Math.ceil(pinCurrentX + window.pinWidth / 2) + ', ' + Math.ceil(pinCurrentY + window.pinHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
