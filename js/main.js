'use strict';

var ENTER_KEYCODE = 13; 

var COUNT_OFFERS = 8;
var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP_PIN_X = 600;
var MAP_PIN_Y = 428;

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
  return pinElement;
}

function renderCards(card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

  var typeOffer = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  cardElement.querySelector('.popup__type').textContent = typeOffer[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  for (var j = 0; j < card.offer.photos.length; j++) {
    var clonedPhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
    clonedPhoto.src = card.offer.photos[j];
    cardElement.querySelector('.popup__photos').appendChild(clonedPhoto);
  }
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  return cardElement;
}

function startMap() {
  mapElement.classList.remove('map--faded');

  var dataArray = generateData(PRICES, TYPES, CHECKINS, CHECKOUTS, FEATURES, PHOTOS);
  var fragment = document.createDocumentFragment();
  
  for (var i = 0; i < dataArray.length; i++) {
    fragment.appendChild(renderPins(dataArray[i]));
  }
  mapPinsElement.appendChild(fragment);
  
  fragment.appendChild(renderCards(dataArray[0]));
  mapFiltersContainer.before(fragment);

  adFormElement.classList.remove('ad-form--disabled');
  
  for(var i = 0; i < allAdFormElements.length; i++) {
    allAdFormElements[i].disabled = false;
  }
  addressElement.value = 'x: ' + MAP_PIN_X + ', y: ' + MAP_PIN_Y;
}



mapPinMainElement.addEventListener('mousedown', startMap);
mapPinMainElement.addEventListener('keydown', function(evt) {
  if(evt.keyCode === ENTER_KEYCODE) {
    startMap();
  }
})

roomСapacityElement.addEventListener('change', function() {
  var allCapacityOptions = roomСapacityElement.querySelectorAll('option');
  var allRoomOptions = roomNumberElement.querySelectorAll('option');
  for(var i = 0; i < allRoomOptions.length; i++){
    allRoomOptions[i].disabled = false;
  }

  for(var i = 0; i < allCapacityOptions.length; i++){
    if(allCapacityOptions[i].selected == true) {
      var pickedCapacity = allCapacityOptions[i].value;
    }
  }


  for(var i = 0; i < allRoomOptions.length; i++){
    if(allRoomOptions[i].value === pickedCapacity) {
      allRoomOptions[i].selected = true;
    }
    if(allRoomOptions[i].value < +pickedCapacity) {
      allRoomOptions[i].disabled = true;
    }
  }

  console.log('capacity: ' + pickedCapacity);

})


// roomNumberElement

// Соответствие кол-ва гостей и комнат

