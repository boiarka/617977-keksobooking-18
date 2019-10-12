'use strict';

(function () {
  var Z_INDEX = 999;

  window.mapElement.addEventListener('click', function (evt) {
    var id = evt.target.dataset.id;
    var isPin = evt.target.closest('.map__pin');
    if (isPin && id) {
      window.openOfferCard(id);
    }
  });

  window.mapElement.addEventListener('keydown', function (evt) {
    var id = evt.target.dataset.id;
    var isPin = evt.target.closest('.map__pin');
    var isEnter = window.isEnterPressed(evt);
    if (isEnter && isPin && id) {
      window.openOfferCard(id);
    }
  });

  // Клики по главному пину, добавление и удаление обработчиков

  window.clickOnMainPin = function () {
    window.mapPinMainElement.addEventListener('mousedown', window.startMap);
    window.mapPinMainElement.addEventListener('mouseup', function () {
      window.mapPinMainElement.removeEventListener('mousedown', window.startMap);
      window.mapPinMainElement.removeEventListener('keydown', pinKeyDown);
    });

    var pinKeyDown = function (evt) {
      if (window.isEnterPressed(evt)) {
        window.startMap();
      }
    };

    window.mapPinMainElement.addEventListener('keydown', pinKeyDown);

    window.mapPinMainElement.addEventListener('keyup', function (evt) {
      if (window.isEnterPressed(evt)) {
        window.mapPinMainElement.removeEventListener('keydown', pinKeyDown);
        window.mapPinMainElement.removeEventListener('mousedown', window.startMap);
      }
    });
  };

  window.clickOnMainPin();


  window.mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.mapPinMainElement.style.zIndex = Z_INDEX;
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
      var maxWidthX = window.mapElement.clientWidth - window.mapPinMainElement.clientWidth;

      if (pinCurrentY < window.MAX_PIN_Y && pinCurrentY > window.MAX_PIN_X && pinCurrentX > 0 && pinCurrentX < maxWidthX) {
        window.mapPinMainElement.style.top = pinCurrentY + 'px';
        window.mapPinMainElement.style.left = pinCurrentX + 'px';
      }

      window.addressElement.value = pinCurrentX + ', ' + pinCurrentY;
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
