'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var COUNT_OFFERS = 8;
var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_X = 600;
var MAP_PIN_Y = 428;

var typeOffer = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
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
var timeinElement = document.querySelector('#timein');
var timeoutElement = document.querySelector('#timeout');
var timeinOptions = timeinElement.querySelectorAll('option');
var timeoutOptions = timeoutElement.querySelectorAll('option');

var dataArray = generateData(PRICES, TYPES, CHECKINS, CHECKOUTS, FEATURES, PHOTOS);
var fragment = document.createDocumentFragment();

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomArrayLength(array, max) {
  var newArray = [];
  for (var i = 0; i < randomInteger(1, max); i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

function generateData(prices, types, checkins, checkouts, features, photos) {
  var data = [];
  for (var i = 0; i < COUNT_OFFERS; i++) {
    var obj = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'id': i,
        'title': 'Квартира ' + i,
        'address': '600, 350',
        'price': prices[i],
        'type': types[randomInteger(0, 3)],
        'rooms': randomInteger(1, 5),
        'guests': randomInteger(1, 5),
        'checkin': checkins[randomInteger(0, 2)],
        'checkout': checkouts[randomInteger(0, 2)],
        'features': randomArrayLength(features, 5),
        'description': 'Квартира описание ' + i,
        'photos': randomArrayLength(photos, 3)
      },
      'location': {
        'x': randomInteger(40, 1160),
        'y': randomInteger(130, 630)
      }
    };
    data.push(obj);
  }
  return data;
}

function renderPins(pins) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pins.location.x + 'px';
  pinElement.style.top = pins.location.y + 'px';
  pinElement.querySelector('img').src = pins.author.avatar;
  pinElement.querySelector('img').alt = pins.offer.title;
  pinPopup(pinElement, pins.offer.id);
  return pinElement;
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
  cardElement.querySelector('.popup__type').textContent = typeOffer[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  renderPhotos(card.offer.photos, cardElement);
  return cardElement;
}

function pinPopup(pin, id) {
  pin.addEventListener('click', function () {
    openPopup();
    closePopup();
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
      closePopup();
    }
  });


  function openPopup() {
    var oldPopup = document.querySelector('.popup');
    if (oldPopup) {
      oldPopup.remove();
    }
    var popup = fragment.appendChild(renderCards(dataArray[id]));
    mapPinsElement.appendChild(popup);
  }
}


function closePopup() {
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

  for (var i = 0; i < dataArray.length; i++) {
    fragment.appendChild(renderPins(dataArray[i]));
  }
  mapFiltersContainer.before(fragment);

  adFormElement.classList.remove('ad-form--disabled');

  for (i = 0; i < allAdFormElements.length; i++) {
    allAdFormElements[i].disabled = false;
  }
  addressElement.value = MAP_PIN_X + ', ' + MAP_PIN_Y;
}

function roomNumberToCapacity() {
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


function offerType() {
  var typeOfferOptions = typeOfferElement.querySelectorAll('option');
  for (var i = 0; i < typeOfferOptions.length; i++) {
    if (typeOfferOptions[i].selected === true) {
      if (typeOfferOptions[i].value === 'bungalo') {
        priceOfferElement.min = '0';
        priceOfferElement.placeholder = '0';
      }
      if (typeOfferOptions[i].value === 'flat') {
        priceOfferElement.min = '1000';
        priceOfferElement.placeholder = '1000';
      }
      if (typeOfferOptions[i].value === 'house') {
        priceOfferElement.min = '5000';
        priceOfferElement.placeholder = '5000';
      }
      if (typeOfferOptions[i].value === 'palace') {
        priceOfferElement.min = '10000';
        priceOfferElement.placeholder = '10000';
      }
    }
  }
}

typeOfferElement.addEventListener('change', function () {
  offerType();
});


function checkTimeIn() {
  for (var i = 0; i < timeinOptions.length; i++) {
    if (timeinOptions[i].selected === true) {
      var timeinOptionSelected = timeinOptions[i].value;
      for (i = 0; i < timeoutOptions.length; i++) {
        if (timeoutOptions[i].value === timeinOptionSelected) {
          timeoutOptions[i].selected = true;
        }
      }
    }
  }
}

function checkTimeOut() {
  for (var i = 0; i < timeoutOptions.length; i++) {
    if (timeoutOptions[i].selected === true) {
      var timeoutOptionSelected = timeoutOptions[i].value;
      for (i = 0; i < timeinOptions.length; i++) {
        if (timeinOptions[i].value === timeoutOptionSelected) {
          timeinOptions[i].selected = true;
        }
      }
    }
  }
}

timeinElement.addEventListener('change', function () {
  checkTimeIn();
});

timeoutElement.addEventListener('change', function () {
  checkTimeOut();
});


mapPinMainElement.addEventListener('mousedown', startMap);
mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    startMap();
  }
});


roomNumberToCapacity();
roomNumberElement.addEventListener('change', function () {
  roomNumberToCapacity();
});
