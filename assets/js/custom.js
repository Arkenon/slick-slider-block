(function ($) {
	$(".gb-for-slick-slider, .wp-block-gb-for-slick-slider-slick-slider")
		.not('.slick-initialized')
		.slick({
			rtl: $('body').hasClass('rtl'),
		});
})(window.jQuery);
