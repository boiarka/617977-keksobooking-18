'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatarElement = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatarElement = document.querySelector('.ad-form-header__preview img');
  var fileChooserImageElement = document.querySelector('.ad-form__upload input[type=file]');
  var previewOfferImageElement = document.querySelector('.ad-form__photo');
  var imgTemplate = document.createElement('img');

  var addImage = function (file, isPhotoes) {
    if (isPhotoes) {
      previewOfferImageElement.classList.add('hidden');
    }
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (isPhotoes) {
          var image = imgTemplate.cloneNode(true);
          image.src = reader.result;
          image.classList.add('ad-form__photo');
          previewOfferImageElement.after(image);
        } else {
          previewAvatarElement.src = reader.result;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  // Фото к офферу
  fileChooserImageElement.addEventListener('change', function () {
    var files = Array.from(fileChooserImageElement.files);
    files.forEach(function (file) {
      addImage(file, true);
    });
  });

  // Аватарка
  fileChooserAvatarElement.addEventListener('change', function () {
    var file = fileChooserAvatarElement.files[0];
    addImage(file, false);
  });
})();
