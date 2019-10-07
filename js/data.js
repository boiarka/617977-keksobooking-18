'use strict';
(function () {
  var COUNT_OFFERS = 8;
  var MAX_COUNT_ROOMS = 5;
  window.mapPinMainElement = document.querySelector('.map__pin--main');

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomLengthArray = function (array, max) {
    var newArray = [];
    for (var i = 0; i < getRandomInteger(1, max); i++) {
      newArray.push(array[i]);
    }
    return newArray;
  };

  window.generateData = function (prices, types, checkins, checkouts, features, photos) {
    var data = [];
    var mapPinWidth = window.mapElement.clientWidth;
    var pinWidth = window.mapPinMainElement.querySelector('img').width;

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
  };
})();
