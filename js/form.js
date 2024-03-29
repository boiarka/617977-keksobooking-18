'use strict';

(function () {
  var roomСapacityElement = document.querySelector('#capacity');
  var roomNumberElement = document.querySelector('#room_number');
  var typeOfferElement = document.querySelector('#type');
  var priceOfferElement = document.querySelector('#price');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');
  var formElement = document.querySelector('.ad-form');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplate.cloneNode(true);
  var formResetElement = document.querySelector('.ad-form__reset');
  var mainElement = document.querySelector('main');

  var updateCapacityGuests = function (roomNumber) {
    var capacityOptions = roomСapacityElement.querySelectorAll('option');
    capacityOptions.forEach(function (option) {
      var currentCapacity = +option.value;
      if (roomNumber === 100) {
        option.disabled = true;
        if (currentCapacity === 0) {
          option.disabled = false;
          option.selected = true;
        }
      } else {
        if (currentCapacity === 0) {
          option.disabled = true;
        } else {
          if (currentCapacity > roomNumber) {
            option.disabled = true;
          }
          if (currentCapacity <= roomNumber) {
            option.disabled = false;
          }
          if (currentCapacity === roomNumber) {
            option.selected = true;
          }
        }
      }
    });
  };

  var updateRoomAvailability = function () {
    var roomOptions = roomNumberElement.querySelectorAll('option');
    var pickedRoomNumber;

    roomOptions.forEach(function (option) {
      option.disabled = false;
    });

    roomOptions.forEach(function (option) {
      if (option.selected) {
        pickedRoomNumber = +option.value;
      }
    });

    updateCapacityGuests(pickedRoomNumber);
  };

  var updateOfferType = function () {
    var typeOfferOptions = typeOfferElement.querySelectorAll('option');
    typeOfferOptions.forEach(function (option) {
      if (option.selected) {
        var id = option.value;
        priceOfferElement.min = window.typeOffer[id].validation.min;
        priceOfferElement.placeholder = window.typeOffer[id].validation.placeholder;
      }
    });
  };

  var makeInactive = function () {
    window.filter.reset();
    formElement.reset();
    window.pin.delete();
    window.map.inactive();
    window.clickOnMainPin();
    updateOfferType();
    updateRoomAvailability();
  };

  typeOfferElement.addEventListener('change', function () {
    updateOfferType();
  });

  roomNumberElement.addEventListener('change', function () {
    updateRoomAvailability();
  });

  timeInElement.addEventListener('change', function () {
    window.utils.syncSelectsValues(timeInElement, timeOutElement);
  });

  timeOutElement.addEventListener('change', function () {
    window.utils.syncSelectsValues(timeOutElement, timeInElement);
  });


  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formElement), function () {
      window.fragment.appendChild(successElement);
      mainElement.insertAdjacentElement('afterbegin', successElement);
      makeInactive();
    }, window.utils.error);

    successElement.addEventListener('click', function () {
      successElement.remove();
    });

    document.addEventListener('keydown', function (evtClick) {
      if (window.utils.isEscPressed(evtClick)) {
        successElement.remove();
      }
    });
  });

  formResetElement.addEventListener('click', makeInactive);
  updateOfferType();
  updateRoomAvailability();

})();
