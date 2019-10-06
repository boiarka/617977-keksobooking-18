'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');

  window.addPinHandlers = function (pin, id) {

    pin.addEventListener('click', function () {
      window.openPopup(id);
      window.addPopupHandlers();
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        window.openPopup(id);
        window.addPopupHandlers();
      }
    });
  };

  window.openPopup = function (id) {
    var popup = window.fragment.appendChild(window.renderCards(window.dataArray[id]));
    var oldPopup = document.querySelector('.popup');
    if (oldPopup) {
      oldPopup.remove();
    }
    mapPinsElement.appendChild(popup);
  };

  window.addPopupHandlers = function () {
    var popupClose = document.querySelector('.popup__close');
    var newPopup = document.querySelector('.popup');
    popupClose.addEventListener('click', function () {
      newPopup.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        newPopup.classList.add('hidden');
      }
    });
  };

})();
