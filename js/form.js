'use strict';

(function () {
  var roomСapacityElement = document.querySelector('#capacity');
  var roomNumberElement = document.querySelector('#room_number');
  var allCapacityOptions = roomСapacityElement.querySelectorAll('option');
  var allRoomOptions = roomNumberElement.querySelectorAll('option');
  var typeOfferElement = document.querySelector('#type');
  var priceOfferElement = document.querySelector('#price');
  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var updateRoomAvailability = function () {
    for (var i = 0; i < allRoomOptions.length; i++) {
      allRoomOptions[i].disabled = false;
    }

    for (i = 0; i < allRoomOptions.length; i++) {
      if (allRoomOptions[i].selected === true) {
        var pickedRoomNumbers = +allRoomOptions[i].value;
      }
    }

    for (i = 0; i < allCapacityOptions.length; i++) {
      var currentCapacity = +allCapacityOptions[i].value;
      if (pickedRoomNumbers === 100) {
        allCapacityOptions[i].disabled = true;
        if (currentCapacity === 0) {
          allCapacityOptions[i].disabled = false;
          allCapacityOptions[i].selected = true;
        }
      } else {
        if (currentCapacity === 0) {
          allCapacityOptions[i].disabled = true;
        } else {
          if (currentCapacity > pickedRoomNumbers) {
            allCapacityOptions[i].disabled = true;
          }
          if (currentCapacity <= pickedRoomNumbers) {
            allCapacityOptions[i].disabled = false;
          }
          if (currentCapacity === pickedRoomNumbers) {
            allCapacityOptions[i].selected = true;
          }
        }
      }
    }
  };


  var updateOfferType = function () {
    var typeOfferOptions = typeOfferElement.querySelectorAll('option');
    for (var i = 0; i < typeOfferOptions.length; i++) {
      if (typeOfferOptions[i].selected === true) {
        var id = typeOfferOptions[i].value;
        priceOfferElement.min = window.typeOffer[id].validation.min;
        priceOfferElement.placeholder = window.typeOffer[id].validation.placeholder;
      }
    }
  };

  updateOfferType();
  typeOfferElement.addEventListener('change', function () {
    updateOfferType();
  });

  timeInElement.addEventListener('change', function () {
    window.syncSelectsValues(timeInElement, timeOutElement);

  });

  timeOutElement.addEventListener('change', function () {
    window.syncSelectsValues(timeOutElement, timeInElement);
  });

  updateRoomAvailability();
  roomNumberElement.addEventListener('change', function () {
    updateRoomAvailability();
  });
})();
