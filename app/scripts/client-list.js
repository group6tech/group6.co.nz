/*global $:true */
$(function() {
	$('.card-img').each(function() {
		$(this).css('background-image', 'url(' + $(this).data('src') + ')');
	});
});
