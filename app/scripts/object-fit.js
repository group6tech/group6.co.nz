$(function() {
	if (!$('html').hasClass('no-object-fit')) {
		return;
	}

	$('img', '.card-img').each(function() {
		fitImage($(this));
	});

	$('img', '.jumbotron-image').each(function() {
		fitImage($(this));
	});

	function fitImage($image) {
		var src = $image.attr('src');
		$image.parent().css('background-image', 'url(' + src + ')');

		$image.remove();
	}
});
