'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');

  var openOfferCard = function (id) {
    var popup = window.fragment.appendChild(window.renderCards(window.dataArray[id]));
    var oldPopup = document.querySelector('.popup');
    if (oldPopup) {
      oldPopup.remove();
    }
    mapPinsElement.appendChild(popup);
  };

  window.mapElement.addEventListener('click', function (evt) {
    if (evt.target.closest('.map__pin')) {
      if (evt.target.dataset.id) {
        var id = evt.target.dataset.id;
        openOfferCard(id);
        addPopupHandlers();
      }
    }
  });


  window.mapElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      if (evt.target.closest('.map__pin')) {
        if (evt.target.dataset.id) {
          var id = evt.target.dataset.id;
          openOfferCard(id);
          addPopupHandlers();
        }
      }
    }
  });

  var addPopupHandlers = function () {
    var popupClose = document.querySelector('.popup__close');
    var newPopup = document.querySelector('.popup');
    popupClose.addEventListener('click', function () {
      newPopup.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        newPopup.classList.add('hidden');
      }
    });
  };

  window.renderPins = function (pinsArray) {
    for (var i = 0; i < pinsArray.length; i++) {
      var pin = pinsArray[i];
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      pinElement.querySelector('img').dataset.id = i;
      pinElement.dataset.id = i;
      window.fragment.appendChild(pinElement);
    }
    mapFiltersContainer.before(window.fragment);
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

  window.mapPinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.mapPinMainElement.style.zIndex = 999;
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
