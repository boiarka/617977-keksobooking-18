'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;

  window.mapElement = document.querySelector('.map');
  window.mapPinMainElement = document.querySelector('.map__pin--main');

  window.typeOffer = {
    'flat': {
      translation: 'Квартира',
      validation: {
        min: '1000',
        placeholder: '1000'
      }
    },
    'bungalo': {
      translation: 'Бунгало',
      validation: {
        min: '0',
        placeholder: '0'
      }
    },
    'house': {
      translation: 'Дом',
      validation: {
        min: '5000',
        placeholder: '5000'
      }
    },
    'palace': {
      translation: 'Дворец',
      validation: {
        min: '10000',
        placeholder: '10000'
      }
    }
  };


  window.getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.getRandomLengthArray = function (array, max) {
    var newArray = [];
    for (var i = 0; i < window.getRandomInteger(1, max); i++) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  window.mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
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

      var pinCurrentY = window.mapPinMainElement.offsetTop - shift.y;
      var pinCurrentX = window.mapPinMainElement.offsetLeft - shift.x;
      var maxWidthX = window.mapElement.clientWidth - window.mapPinMainElement.clientWidth;

      if (pinCurrentY < 630 && pinCurrentY > 130 && pinCurrentX > 0 && pinCurrentX < maxWidthX) {
        window.mapPinMainElement.style.top = (window.mapPinMainElement.offsetTop - shift.y) + 'px';
        window.mapPinMainElement.style.left = (window.mapPinMainElement.offsetLeft - shift.x) + 'px';
      }

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
