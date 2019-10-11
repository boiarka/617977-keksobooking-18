'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var XHR_STATUS = 200;
  var ERROR_CONNECT = 'Произошла ошибка соединения';

  var createRequest = function (type, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    var isType = type === 'POST';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(ERROR_CONNECT);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(type, url);

    if (isType) {
      xhr.send(data);
    } else {
      xhr.send();
    }

    return xhr;
  };

  window.load = function (onSuccess, onError) {
    createRequest('GET', URL, onSuccess, onError);
  };

  window.upload = function (data, onSuccess, onError) {
    createRequest('POST', URL_UPLOAD, onSuccess, onError, data);
  };

})();
