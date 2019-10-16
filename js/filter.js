'use strict';

(function () {
  var MAX_NUM_PINS = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapFiltersElement = document.querySelector('.map__filters');

  var selectHousingTypeElement = document.querySelector('#housing-type');
  var selectHousingPriceElement = document.querySelector('#housing-price');
  var selectHousingRoomsElement = document.querySelector('#housing-rooms');
  var selectHousingGuestsElement = document.querySelector('#housing-guests');


  var filterPriceValues = {
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      max: 10000
    },
    high: {
      min: 50000
    }
  };


  var deleteAllPins = function () {
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

  // Проверка содержит ли массив нужный элемент другого массива
  var getFilteredFeatures = function (filteredData, featuresData) {
    var filteredDataOk = false;
    for (var i = 0; i < featuresData.length; i++) {
      if (filteredData.offer.features.indexOf(featuresData[i]) !== -1) {
        filteredDataOk = true;
      } else {
        filteredDataOk = false;
        return filteredDataOk;
      }
    }
    return filteredDataOk;
  };

  var checkPrice = function (price, offerPrice) {
    if (price === 'low') {
      return offerPrice <= filterPriceValues.low.max;
    } else if (price === 'middle') {
      return (offerPrice >= filterPriceValues.middle.min && offerPrice <= filterPriceValues.middle.max);
    } else if (price === 'high') {
      return offerPrice >= filterPriceValues.high.min;
    }
    return false;
  };

  var filterOffers = function () {
    var mapCheckboxElements = document.querySelectorAll('.map__checkbox:checked');
    var selectedFeatures = Array.from(mapCheckboxElements).map(function (checkbox) {
      return checkbox.value;
    });

    var filteredOffers = window.offers.filter(function (offerItem) {
      var type = selectHousingTypeElement.value;
      var price = selectHousingPriceElement.value;
      var rooms = selectHousingRoomsElement.value;
      var guests = selectHousingGuestsElement.value;

      var isTypeMatched = type === 'any' ? true : offerItem.offer.type === type;
      var isGuestsMatched = guests === 'any' ? true : offerItem.offer.guests === +guests;
      var isRoomsMatched = rooms === 'any' ? true : offerItem.offer.rooms === +rooms;
      var isPriceMatched = price === 'any' ? true : checkPrice(price, offerItem.offer.price);

      if (selectedFeatures.length > 0) {
        var isFeaturesMatched = getFilteredFeatures(offerItem, selectedFeatures);
        return isTypeMatched && isGuestsMatched && isRoomsMatched && isPriceMatched && isFeaturesMatched;
      }
      return isTypeMatched && isGuestsMatched && isRoomsMatched && isPriceMatched;
    });

    window.renderPins(filteredOffers);
  };

  var lastTimeout;
  mapFiltersElement.addEventListener('change', function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      deleteAllPins();
      filterOffers();
    }, 500);
  });

})();
