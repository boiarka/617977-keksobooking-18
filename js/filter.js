'use strict';

(function () {
  var OFFER_LOW_PRICE = 10000;
  var OFFER_HIGH_PRICE = 50000;

  var mapFiltersElement = document.querySelector('.map__filters');
  var allFilterSelects = mapFiltersElement.querySelectorAll('select');
  var allFilterCheckbox = mapFiltersElement.querySelectorAll('input[type=checkbox]');

  var selectHousingTypeElement = document.querySelector('#housing-type');
  var selectHousingPriceElement = document.querySelector('#housing-price');
  var selectHousingRoomsElement = document.querySelector('#housing-rooms');
  var selectHousingGuestsElement = document.querySelector('#housing-guests');

  window.activateFilter = function () {
    allFilterSelects.forEach(function (select) {
      select.disabled = false;
    });

    allFilterCheckbox.forEach(function (checkbox) {
      checkbox.disabled = false;
    });
  };

  window.resetFilter = function () {
    allFilterSelects.forEach(function (select) {
      select.selectedIndex = 0;
      select.disabled = true;
    });

    allFilterCheckbox.forEach(function (checkbox) {
      checkbox.checked = false;
      checkbox.disabled = true;
    });
  };

  var checkPrice = function (price, offerPrice) {
    if (price === 'low') {
      return offerPrice <= OFFER_LOW_PRICE;
    } else if (price === 'middle') {
      return (offerPrice >= OFFER_LOW_PRICE && offerPrice <= OFFER_HIGH_PRICE);
    } else if (price === 'high') {
      return offerPrice >= OFFER_HIGH_PRICE;
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
        var isFeaturesMatched = window.isArrayContain(offerItem, selectedFeatures);
        return isTypeMatched && isGuestsMatched && isRoomsMatched && isPriceMatched && isFeaturesMatched;
      }
      return isTypeMatched && isGuestsMatched && isRoomsMatched && isPriceMatched;
    });

    window.renderPins(filteredOffers);
  };

  var formChangeHandler = window.debounce(function () {
    window.deleteAllPins();
    filterOffers();
  });
  mapFiltersElement.addEventListener('change', formChangeHandler);

})();
