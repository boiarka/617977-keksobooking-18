'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var XHR_STATUS = 200;

  var createRequest = function (type, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(window.errorsMessage.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(window.errorsMessage.ERROR);
    });
    xhr.addEventListener('timeout', function () {
      onError(window.errorsMessage.REQUEST_TIME + xhr.timeout + window.errorsMessage.MS);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(type, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }

    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      createRequest('GET', URL_LOAD, onSuccess, onError);
    },
    upload: function (data, onSuccess, onError) {
      createRequest('POST', URL_UPLOAD, onSuccess, onError, data);
    }
  };

})();
