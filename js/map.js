'use strict';

(function () {
  window.addressElement = document.querySelector('#address');
  window.mapElement = document.querySelector('.map');
  window.mapPinMainElement = document.querySelector('.map__pin--main');
  window.isPageActive = false;

  var adFormElement = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form fieldset');
  var mapPinMainStyleLeft = window.mapPinMainElement.style.left;
  var mapPinMainStyleTop = window.mapPinMainElement.style.top;
  var avatarElement = document.querySelector('.ad-form-header__preview img');
  var previewOfferImageElement = document.querySelector('.ad-form__photo');

  var successHandler = function (offers) {
    window.offers = offers;
    window.pin.render(window.offers);
    window.filter.activate();
  };

  window.filter.reset();

  window.map = {
    start: function () {
      if (!window.isPageActive) {
        window.isPageActive = true;
        window.mapElement.classList.remove('map--faded');
        adFormElement.classList.remove('ad-form--disabled');
        adFormElements.forEach(function (element) {
          element.disabled = false;
        });
        window.backend.load(successHandler, window.utils.error);
      }
    },
    inactive: function () {
      var allPreviewOfferImages = document.querySelectorAll('img.ad-form__photo');
      window.isPageActive = false;
      window.mapElement.classList.add('map--faded');
      window.mapPinMainElement.style.left = mapPinMainStyleLeft;
      window.mapPinMainElement.style.top = mapPinMainStyleTop;
      adFormElement.classList.add('ad-form--disabled');
      adFormElements.forEach(function (element) {
        element.disabled = true;
      });
      avatarElement.src = 'img/muffin-grey.svg';
      previewOfferImageElement.classList.remove('hidden');
      allPreviewOfferImages.forEach(function (img) {
        img.remove();
      });
    }
  };

})();
