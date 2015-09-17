/*global $:true */
$(function() {
	$('[data-src]').each(function() {
		$(this).css('background-image', 'url(' + $(this).data('src') + ')');
	});
});
