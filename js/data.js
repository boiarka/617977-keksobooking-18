'use strict';
(function () {
  var COUNT_OFFERS = 8;
  var MAX_COUNT_ROOMS = 5;

  window.generateData = function (prices, types, checkins, checkouts, features, photos) {
    var data = [];
    var mapPinWidth = window.mapElement.clientWidth;
    var pinWidth = window.mapPinMainElement.querySelector('img').width;

    for (var i = 0; i < COUNT_OFFERS; i++) {
      var cordinateX = window.getRandomInteger(pinWidth, mapPinWidth - pinWidth);
      var cordinateY = window.getRandomInteger(130, 630);
      var obj = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'Квартира ' + i,
          'address': '600, 350',
          'price': prices[i],
          'type': types[window.getRandomInteger(0, types.length - 1)],
          'rooms': window.getRandomInteger(1, MAX_COUNT_ROOMS),
          'guests': window.getRandomInteger(1, MAX_COUNT_ROOMS),
          'checkin': checkins[window.getRandomInteger(0, 2)],
          'checkout': checkouts[window.getRandomInteger(0, 2)],
          'features': window.getRandomLengthArray(features, features.length - 1),
          'description': 'Квартира описание ' + i,
          'photos': window.getRandomLengthArray(photos, photos.length)
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
