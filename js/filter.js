'use strict';

(function () {
  var MAX_NUM_PINS = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');
  var selectHousingTypeElement = document.querySelector('#housing-type');
  var allOptionsHousingType = selectHousingTypeElement.querySelectorAll('option');

  var deleteAllPins = function () {
    // удалить метки и карточку активного объявления
    var allPins = document.querySelectorAll('.map__pin');
    for (var z = 0; z < allPins.length; z++) {
      if (allPins[z].dataset.id) {
        allPins[z].remove();
      }
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
    return window.renderedPins;
  };

  var filterTypePins = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    for (var i = 0; i < allOptionsHousingType.length; i++) {
      var selectedType = allOptionsHousingType[i].value;
      if (allOptionsHousingType[i].selected === true && selectedType !== 'any') {
        var filteredHousingPins = window.pins.filter(function (pin) {
          return pin.offer.type === selectedType;
        });

        if (filteredHousingPins.length > 0) {
          deleteAllPins();
          window.renderPins(filteredHousingPins);
        } else if (filteredHousingPins.length === 0) {
          deleteAllPins();
        }

      } else if (selectedType === 'any') {
        deleteAllPins();
        window.renderPins(window.pins);
      }
    }
  };


  selectHousingTypeElement.addEventListener('change', function () {
    filterTypePins();
  });

  var successHandler = function (offers) {
    window.pins = offers;
    return window.pins;
  };

  window.load(successHandler, window.errorHandler);
})();
