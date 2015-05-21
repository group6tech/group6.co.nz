$(function () {
  'use strict';

  var $clientList = $('#client-list');
  $clientList.imagesLoaded(function() {
    $clientList.masonry();
  });
});
