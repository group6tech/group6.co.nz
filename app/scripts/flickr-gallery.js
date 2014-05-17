$(function () {
  $('#flickr-gallery').each(function () {
    var $gallery = $(this),
        setId = $gallery.data('set'),
        query = {
          method: 'flickr.photosets.getPhotos',
          api_key: '482e3ea520088f57888f3e4d96a8750e',
          photoset_id: setId,
          format: 'json',
          nojsoncallback: 1
        };

    $.getJSON('https://api.flickr.com/services/rest/', query, function (result) {
      $(result.photoset.photo).each(function () {
        var url = 'http://farm' + this.farm +
                '.staticflickr.com/' + this.server +
                '/' + this.id + '_' + this.secret,
            thumbnail = url + '.jpg',
            large = url + '_b.jpg';

        var item = '<div class="item">' +
                      '<a href="' + large + '" title="' + this.title + '" data-gallery>' +
                        '<img src="' + thumbnail + '" alt="' + this.title + '">' +
                      '</a>' +
                    '</div>';

        $gallery.append(item)
      });

      $gallery.imagesLoaded( function() {
        $gallery.masonry();
        $('#flickr-gallery-loading').fadeOut();
      });
    });
  });
});
