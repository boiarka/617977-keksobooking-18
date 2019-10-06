'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var COUNT_OFFERS = 8;
var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AVAILABLE_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_X = 600;
var MAP_PIN_Y = 428;
var MAX_COUNT_ROOMS = 5;

var typeOffer = {
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

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mapPinMainElement = document.querySelector('.map__pin--main');
var adFormElement = document.querySelector('.ad-form');
var allAdFormElements = document.querySelectorAll('.ad-form__element');
var addressElement = document.querySelector('#address');
var roomСapacityElement = document.querySelector('#capacity');
var roomNumberElement = document.querySelector('#room_number');
var allCapacityOptions = roomСapacityElement.querySelectorAll('option');
var allRoomOptions = roomNumberElement.querySelectorAll('option');
var typeOfferElement = document.querySelector('#type');
var priceOfferElement = document.querySelector('#price');
var timeInElement = document.querySelector('#timein');
var timeOutElement = document.querySelector('#timeout');

var dataArray = generateData(PRICES, TYPES, AVAILABLE_TIMES, AVAILABLE_TIMES, FEATURES, PHOTOS);
var fragment = document.createDocumentFragment();

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomLengthArray(array, max) {
  var newArray = [];
  for (var i = 0; i < getRandomInteger(1, max); i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

function generateData(prices, types, checkins, checkouts, features, photos) {
  var data = [];
  var mapPinWidth = mapElement.clientWidth;
  var pinWidth = mapPinMainElement.querySelector('img').width;

  for (var i = 0; i < COUNT_OFFERS; i++) {
    var cordinateX = getRandomInteger(pinWidth, mapPinWidth - pinWidth);
    var cordinateY = getRandomInteger(130, 630);
    var obj = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Квартира ' + i,
        'address': '600, 350',
        'price': prices[i],
        'type': types[getRandomInteger(0, types.length - 1)],
        'rooms': getRandomInteger(1, MAX_COUNT_ROOMS),
        'guests': getRandomInteger(1, MAX_COUNT_ROOMS),
        'checkin': checkins[getRandomInteger(0, 2)],
        'checkout': checkouts[getRandomInteger(0, 2)],
        'features': getRandomLengthArray(features, features.length - 1),
        'description': 'Квартира описание ' + i,
        'photos': getRandomLengthArray(photos, photos.length)
      },
      'location': {
        'x': cordinateX,
        'y': cordinateY
      }
    };
    data.push(obj);
  }
  return data;
}

function renderPins(pinsArray) {
  for (var i = 0; i < pinsArray.length; i++) {
    var pin = pinsArray[i];
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    addPinHandlers(pinElement, i);
    fragment.appendChild(pinElement);
  }
  mapFiltersContainer.before(fragment);
}

function renderPhotos(photos, element) {
  for (var i = 0; i < photos.length; i++) {
    var clonedPhoto = element.querySelector('.popup__photo').cloneNode(true);
    clonedPhoto.src = photos[i];
    element.querySelector('.popup__photos').appendChild(clonedPhoto);
  }
  element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
}

function renderCards(card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typeOffer[card.offer.type].translation;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  renderPhotos(card.offer.photos, cardElement);
  return cardElement;
}

function addPinHandlers(pin, id) {

  pin.addEventListener('click', function () {
    openPopup(id);
    addPopupHandlers();
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(id);
      addPopupHandlers();
    }
  });
}

function openPopup(id) {
  var popup = fragment.appendChild(renderCards(dataArray[id]));
  var oldPopup = document.querySelector('.popup');
  if (oldPopup) {
    oldPopup.remove();
  }
  mapPinsElement.appendChild(popup);
}

function addPopupHandlers() {
  var popupClose = document.querySelector('.popup__close');
  var newPopup = document.querySelector('.popup');
  popupClose.addEventListener('click', function () {
    newPopup.classList.add('hidden');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      newPopup.classList.add('hidden');
    }
  });
}

function startMap() {
  mapElement.classList.remove('map--faded');

  renderPins(dataArray);

  adFormElement.classList.remove('ad-form--disabled');
  for (var i = 0; i < allAdFormElements.length; i++) {
    allAdFormElements[i].disabled = false;
  }
  addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
}

function updateRoomAvailability() {
  for (var i = 0; i < allRoomOptions.length; i++) {
    allRoomOptions[i].disabled = false;
  }

  for (i = 0; i < allRoomOptions.length; i++) {
    if (allRoomOptions[i].selected === true) {
      var pickedRoomNumbers = +allRoomOptions[i].value;
    }
  }

  for (i = 0; i < allCapacityOptions.length; i++) {
    var currentCapacity = +allCapacityOptions[i].value;
    if (pickedRoomNumbers === 100) {
      allCapacityOptions[i].disabled = true;
      if (currentCapacity === 0) {
        allCapacityOptions[i].disabled = false;
        allCapacityOptions[i].selected = true;
      }
    } else {
      if (currentCapacity === 0) {
        allCapacityOptions[i].disabled = true;
      } else {
        if (currentCapacity > pickedRoomNumbers) {
          allCapacityOptions[i].disabled = true;
        }
        if (currentCapacity <= pickedRoomNumbers) {
          allCapacityOptions[i].disabled = false;
        }
        if (currentCapacity === pickedRoomNumbers) {
          allCapacityOptions[i].selected = true;
        }
      }
    }
  }
}


function updateOfferType() {
  var typeOfferOptions = typeOfferElement.querySelectorAll('option');
  for (var i = 0; i < typeOfferOptions.length; i++) {
    if (typeOfferOptions[i].selected === true) {
      var id = typeOfferOptions[i].value;
      priceOfferElement.min = typeOffer[id].validation.min;
      priceOfferElement.placeholder = typeOffer[id].validation.placeholder;
    }
  }
}

typeOfferElement.addEventListener('change', function () {
  updateOfferType();
});


function syncSelectsValues(selectFrom, selectTo) {
  var selectedValue = selectFrom.value;
  if (selectedValue) {
    selectTo.value = selectedValue;
  }
}


timeInElement.addEventListener('change', function () {
  syncSelectsValues(timeInElement, timeOutElement);

});

timeOutElement.addEventListener('change', function () {
  syncSelectsValues(timeOutElement, timeInElement);
});


mapPinMainElement.addEventListener('mousedown', startMap);
mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    startMap();
  }
});


updateRoomAvailability();
roomNumberElement.addEventListener('change', function () {
  updateRoomAvailability();
});
