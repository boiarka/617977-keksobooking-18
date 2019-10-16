'use strict';

(function () {
  var MAX_NUM_PINS = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');

  window.deleteAllPins = function () {
    // удалить попап
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    // удалить метки и карточку активного объявления
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
  };


  var addPopupHandlers = function () {
    var popupClose = document.querySelector('.popup__close');
    var newPopup = document.querySelector('.popup');
    popupClose.addEventListener('click', function () {
      newPopup.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (window.isEscPressed(evt)) {
        newPopup.classList.add('hidden');
      }
    });
  };

  window.openOfferCard = function (id) {
    var popup = window.fragment.appendChild(window.renderCards(window.renderedPins[id]));
    var oldPopup = document.querySelector('.popup');
    if (oldPopup) {
      oldPopup.remove();
    }
    mapPinsElement.appendChild(popup);
    addPopupHandlers();
  };

  window.renderPins = function (pinsArray) {
    window.renderedPins = pinsArray;
    var takeNumber = pinsArray.length > MAX_NUM_PINS ? MAX_NUM_PINS : pinsArray.length;
    for (var i = 0; i < takeNumber; i++) {
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
    var pinKeyDown = function (evt) {
      if (window.isEnterPressed(evt)) {
        window.startMap();
      }
    };
    window.mapPinMainElement.addEventListener('mousedown', window.startMap);
    window.mapPinMainElement.addEventListener('keydown', pinKeyDown);
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
      window.mapPinMainElement.style.zIndex = window.Z_INDEX;
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
