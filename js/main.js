'use strict';
var COUNT_OFFERS = 8;
var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
  for (var i = 1; i < COUNT_OFFERS; i++) {
    var obj = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
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

  if (card.offer.type === 'flat') {
    var typeOffer = 'Квартира';
  } else if (card.offer.type === 'bungalo') {
    var typeOffer = 'Бунгало';
  } else if (card.offer.type === 'house') {
    var typeOffer = 'Дом';
  } else {
    var typeOffer = 'Дворец';
  }


  cardElement.querySelector('.popup__type').textContent = typeOffer;

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

mapElement.classList.remove('map--faded');

var dataArray = generateData(PRICES, TYPES, CHECKINS, CHECKOUTS, FEATURES, PHOTOS);
var fragment = document.createDocumentFragment();

for (var i = 0; i < dataArray.length; i++) {
  fragment.appendChild(renderPins(dataArray[i]));
}
mapPinsElement.appendChild(fragment);

fragment.appendChild(renderCards(dataArray[0]));
mapFiltersContainer.before(fragment);
