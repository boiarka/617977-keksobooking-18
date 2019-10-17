'use strict';

(function () {
  var MAX_NUM_PINS = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');

  window.deletePopapAndPins = function () {
    var popup = document.querySelector('.popup');
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (popup) {
      popup.remove();
    }
    allPins.forEach(function (pin) {
      pin.remove();
    });
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

})();
