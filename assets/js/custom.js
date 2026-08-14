/**
 * Backward compatibility shim for the 1.x `custom-js` handle.
 *
 * Slider initialisation moved to assets/js/view.js in 2.0.0. This file is kept
 * so sites that enqueue, dequeue or depend on the `custom-js` handle by name do
 * not break; it simply re-runs the (idempotent) initialiser.
 */
( function () {
	'use strict';

	if ( window.gbSlickSlider && typeof window.gbSlickSlider.init === 'function' ) {
		window.gbSlickSlider.init();
	}
} )();
