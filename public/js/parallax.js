function parallax_height() {
  var header_height = $(".sample-header-section").outerHeight();
  $(".sample-section").css({ "margin-top": header_height-100 });
}

parallax_height();
$(window).scroll(function () {
  parallax_height();
});
$(window).resize(function () {
  parallax_height();
});