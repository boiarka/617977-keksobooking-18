'use strict';

(function () {
  var PIN = {
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 81,
    Z_INDEX: 998,
    MAX_Y: 630,
    MIN_Y: 130
  };

  var pinMain = document.querySelector('.map__pin--main');
  var minX = 0 - Math.floor(PIN.WIDTH / 2);
  var maxX = 1200 - Math.floor(PIN.WIDTH / 2);
  var minY = PIN.MIN_Y - PIN.FULL_HEIGHT;
  var maxY = PIN.MAX_Y - PIN.FULL_HEIGHT;

  pinMain.style.zIndex = PIN.Z_INDEX;

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
  window.addressElement.value = Math.floor(pinMain.offsetLeft + PIN.WIDTH / 2) + ', ' + Math.floor(pinMain.offsetTop + PIN.HEIGHT / 2);

  window.mapPinMainElement.addEventListener('mousedown', function (dragEvt) {
    dragEvt.preventDefault();

    var startCoords = {
      x: dragEvt.clientX,
      y: dragEvt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCurrentTop = pinMain.offsetTop - shift.y;
      var pinCurrentLeft = pinMain.offsetLeft - shift.x;

      if (pinCurrentLeft < minX) {
        pinCurrentLeft = minX;
      }

      if (pinCurrentLeft > maxX) {
        pinCurrentLeft = maxX;
      }

      if (pinCurrentTop < minY) {
        pinCurrentTop = minY;
      }

      if (pinCurrentTop > maxY) {
        pinCurrentTop = maxY;
      }

      pinMain.style.top = pinCurrentTop + 'px';
      pinMain.style.left = pinCurrentLeft + 'px';
      window.addressElement.value = Math.floor(pinCurrentLeft + (pinMain.clientWidth / 2)) + ', ' + Math.floor(pinCurrentTop + 81);
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
