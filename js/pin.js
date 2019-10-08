'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  window.fragment = document.createDocumentFragment();

  window.renderPins = function (pinsArray) {
    for (var i = 0; i < pinsArray.length; i++) {
      var pin = pinsArray[i];
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      window.addPinHandlers(pinElement, i);
      window.fragment.appendChild(pinElement);
    }
    mapFiltersContainer.before(window.fragment);
  };


})();
