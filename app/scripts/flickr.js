$('#flickr-gallery').each(function() {
	var $gallery = $(this),
			galleryId = $gallery.data('set');

	$.ajax({
		method: 'GET',
		url: 'https://flickr.com/services/rest',
		dataType: 'jsonp',
		data: {
			method: 'flickr.photosets.getPhotos',
			api_key: 'f712681f1e81bd3ab43bb63f6cee1c1a',
			photoset_id: galleryId,
			format: 'json',
		}
	});
});

var jsonFlickrApi = function (data) {
	for(var i = 0; i < data.photoset.photo.length; i++) {
		var photo = data.photoset.photo[i];
		var baseUrl = 'https://c2.staticflickr.com/' + photo.farm + '/' + photo.server + '/' + photo.id + '_' + photo.secret;
		var thumbUrl = baseUrl + '_q.jpg';
		var fullUrl = baseUrl + '_b.jpg';
		var $link = $('<a/>')
			.attr('href', fullUrl)
			.addClass('gallery-link')
			.addClass('col-xs-6')
			.addClass('col-sm-4')
			.addClass('col-md-3')
			.addClass('col-lg-2');

		var $img = $('<img/>')
			.attr('src', thumbUrl)
			.attr('alt', photo.title)
			.addClass('gallery-thumb');

		$link.append($img);
		$('#flickr-gallery').append($link);
	}

	$('#flickr-gallery-loading').fadeOut();
	$('.gallery-link').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
}
