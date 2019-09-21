'use strict';
var COUNT_OFFERS = 8;
var AVATARS = [1, 2, 3, 4, 5, 6, 7, 8];
var PRICES = [100, 200, 300, 400, 500, 600, 700, 800];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateData(avatars, prices, types, checkins, checkouts, features, photos) {
  var data = [];
  for (var i = 0; i < COUNT_OFFERS; i++) {
    var obj = {
      'author': {
        'avatar': 'img/avatars/user0' + avatars[i] + '.png'
      },
      'offer': {
        'title': 'Квартира ' + avatars[i],
        'address': '600, 350',
        'price': prices[i],
        'type': types[randomInteger(0, 3)],
        'rooms': randomInteger(1, 5),
        'guests': randomInteger(1, 5),
        'checkin': checkins[randomInteger(0, 2)],
        'checkout': checkouts[randomInteger(0, 2)],
        'features': features[randomInteger(0, 5)],
        'description': 'Квартира описание ' + avatars[i],
        'photos': photos[randomInteger(1, 5)]
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

mapElement.classList.remove('map--faded');

var dataArray = generateData(AVATARS, PRICES, TYPES, CHECKINS, CHECKOUTS, FEATURES, PHOTOS);
var fragment = document.createDocumentFragment();

for (var i = 0; i < dataArray.length; i++) {
  fragment.appendChild(renderPins(dataArray[i]));
}
mapPinsElement.appendChild(fragment);
