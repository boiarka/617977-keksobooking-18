'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserOfferImages = document.querySelector('.ad-form__upload input[type=file]');
  var previewOfferImage = document.querySelector('.ad-form__photo');
  var imgTemplate = document.createElement('img');

  var addImages = function (file) {
    previewOfferImage.classList.add('hidden');
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var image = imgTemplate.cloneNode(true);
        image.src = reader.result;
        image.classList.add('ad-form__photo');
        previewOfferImage.after(image);
      });
      reader.readAsDataURL(file);
    }
  };


  fileChooserOfferImages.addEventListener('change', function () {
    var files = Array.from(fileChooserOfferImages.files);
    files.forEach(function (file) {
      addImages(file);
    });
  });

  // Аватарка
  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
