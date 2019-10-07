'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  window.typeOffer = {
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

  var renderPhotos = function (photos, element) {
    for (var i = 0; i < photos.length; i++) {
      var clonedPhoto = element.querySelector('.popup__photo').cloneNode(true);
      clonedPhoto.src = photos[i];
      element.querySelector('.popup__photos').appendChild(clonedPhoto);
    }
    element.querySelector('.popup__photos').removeChild(element.querySelector('.popup__photo'));
  };

  window.renderCards = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.typeOffer[card.offer.type].translation;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' , выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = card.offer.features;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    renderPhotos(card.offer.photos, cardElement);
    return cardElement;
  };

})();
