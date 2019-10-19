'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var liTemplate = document.createElement('li');

  var renderPhotos = function (photos, element) {
    photos.forEach(function (photo) {
      var clonedPhoto = element.querySelector('.popup__photo').cloneNode(true);
      clonedPhoto.src = photo;
      element.querySelector('.popup__photos').appendChild(clonedPhoto);
    });
    element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
  };

  var renderFeatures = function (features, element) {
    var featuresElement = element.querySelector('.popup__features');
    featuresElement.innerHTML = '';
    features.forEach(function (feature) {
      var item = liTemplate.cloneNode(true);
      item.classList.add('popup__feature', 'popup__feature--' + feature);
      window.fragment.appendChild(item);
    });
    featuresElement.appendChild(window.fragment);
  };

  window.renderCards = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.typeOffer[card.offer.type].translation;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__features').innerHTML = renderFeatures(card.offer.features, cardElement);
    renderFeatures(card.offer.features, cardElement);
    renderPhotos(card.offer.photos, cardElement);
    return cardElement;
  };

})();
