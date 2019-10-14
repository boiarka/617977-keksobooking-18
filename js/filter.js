'use strict';

(function () {
  var MAX_NUM_PINS = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapFiltersElement = document.querySelector('.map__filters');
  var mapCheckboxElements = document.querySelectorAll('.map__checkbox');

  var selectHousingTypeElement = document.querySelector('#housing-type');
  var selectHousingPriceElement = document.querySelector('#housing-price');
  var selectHousingRoomsElement = document.querySelector('#housing-rooms');
  var selectHousinggGuestsElement = document.querySelector('#housing-guests');


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

  // Тип
  var getFilteredOffers = function (offers) {
    var selected = selectHousingTypeElement.value;
    var data = offers.filter(function (offerItem) {
      return offerItem.offer.type === selected;
    });
    return data;
  };


  // Цена
  var getFilteredPrice = function (offers) {
    var selected = selectHousingPriceElement.value;

    var data = offers.filter(function (offerItem) {
      if (selected === 'low') {
        return offerItem.offer.price <= filterPriceValues.low.max;
      } else if (selected === 'middle') {
        return (offerItem.offer.price >= filterPriceValues.middle.min && offerItem.offer.price <= filterPriceValues.middle.max);
      } else if (selected === 'high') {
        return (offerItem.offer.price >= filterPriceValues.high.min);
      }
      return false;
    });
    return data;
  };

  // Кол-во комнат
  var getFilteredRooms = function (offers) {
    var selected = +selectHousingRoomsElement.value;
    var data = offers.filter(function (offerItem) {
      return offerItem.offer.rooms === selected;
    });
    return data;
  };

  // Кол-во гостей
  var getFilteredGuests = function (offers) {
    var selected = +selectHousinggGuestsElement.value;
    var data = offers.filter(function (offerItem) {
      return offerItem.offer.guests === selected;
    });
    return data;
  };

  // есть ли в массиве нужный элемент
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

  var filterOffers = function () {
    var selectedType = selectHousingTypeElement.value;
    var filteredTypes = selectedType === 'any' ? window.offers : getFilteredOffers(window.offers);

    var selectedPrice = selectHousingPriceElement.value;
    var filteredPrice = selectedPrice === 'any' ? filteredTypes : getFilteredPrice(filteredTypes);

    var selectedRoom = selectHousingRoomsElement.value;
    var filteredRooms = selectedRoom === 'any' ? filteredPrice : getFilteredRooms(filteredPrice);

    var selectedGuests = selectHousinggGuestsElement.value;
    var filteredGuests = selectedGuests === 'any' ? filteredRooms : getFilteredGuests(filteredRooms);

    var data = filteredGuests; // массив с отфильтрованными офферами
    var dataCheckbox = []; // массив с выбранными чекбоксами
    for (var i = 0; i < mapCheckboxElements.length; i++) {
      if (mapCheckboxElements[i].checked) {
        dataCheckbox.push(mapCheckboxElements[i].value);
      }
    }

    if (dataCheckbox.length > 0) {
      // проверяем совпадение массива оффера с выбранными удобствами (чекбоксами)
      var newData = [];
      for (var y = 0; y < data.length; y++) {
        if (getFilteredFeatures(data[y], dataCheckbox) === true) {
          newData.push(data[y]);
        }
      }
      window.renderPins(newData);
    } else {
      window.renderPins(data);
    }
  };

  mapFiltersElement.addEventListener('change', function (evt) {
    deleteAllPins();
    filterOffers(evt.target.value);
  });


})();
