/**
 * Front-end initialisation for every slider rendered by this plugin.
 *
 * Slick is initialised on `.gbss__viewport` rather than on the block wrapper so
 * that the arrow and dot containers can live inside the block without Slick
 * turning them into slides. All behavioural options arrive in `data-slick`
 * (unchanged since 1.x); everything presentational arrives in `data-slick-ui`.
 */
( function ( $ ) {
	'use strict';

	if ( ! $ || ! $.fn || ! $.fn.slick ) {
		return;
	}

	/**
	 * Arrow icon paths, drawn pointing left ("previous").
	 *
	 * The "next" arrow reuses the same path and is mirrored with CSS, which
	 * keeps the two arrows perfectly symmetrical and halves the markup.
	 */
	var ARROW_ICONS = {
		chevron: { d: 'M15 4 L7 12 L15 20', width: 2 },
		'chevron-thin': { d: 'M15 4 L7 12 L15 20', width: 1.25 },
		'simple-arrow': { d: 'M20 12 H4 M10 6 L4 12 L10 18', width: 1.75 },
		'arrow-long': { d: 'M22 12 H2 M8 6 L2 12 L8 18', width: 1.25 },
		caret: { d: 'M14 6 L8 12 L14 18', width: 3.25 },
		'angle-double': { d: 'M17 4 L9 12 L17 20 M11 4 L3 12 L11 20', width: 2 },
		triangle: { d: 'M16 4 L6 12 L16 20 Z', width: 0, fill: true }
	};

	/**
	 * Builds the SVG markup for an arrow icon.
	 *
	 * @param {string} icon Icon key from ARROW_ICONS.
	 * @return {string} SVG markup.
	 */
	function arrowIcon( icon ) {
		var spec = ARROW_ICONS[ icon ] || ARROW_ICONS.chevron;
		var paint = spec.fill
			? 'fill="currentColor" stroke="none"'
			: 'fill="none" stroke="currentColor" stroke-width="' +
			  spec.width +
			  '" stroke-linecap="round" stroke-linejoin="round"';

		return (
			'<svg class="gbss__arrow-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
			'xmlns="http://www.w3.org/2000/svg"><path d="' +
			spec.d +
			'" ' +
			paint +
			' /></svg>'
		);
	}

	/**
	 * Builds one arrow button.
	 *
	 * The `slick-prev` / `slick-next` class names are preserved because Slick's
	 * own stylesheet and plenty of user CSS target them.
	 *
	 * @param {string} direction "prev" or "next".
	 * @param {Object} ui        Parsed `data-slick-ui` payload.
	 * @return {string} Button markup.
	 */
	function arrowMarkup( direction, ui ) {
		var strings = ui.i18n || {};
		var label = 'prev' === direction ? strings.prev || 'Previous' : strings.next || 'Next';

		return (
			'<button type="button" class="gbss__arrow gbss__arrow--' +
			direction +
			' slick-' +
			direction +
			'" aria-label="' +
			escapeAttr( label ) +
			'">' +
			arrowIcon( ui.arrowIcon ) +
			'</button>'
		);
	}

	/**
	 * Escapes a string for use inside a double quoted HTML attribute.
	 *
	 * @param {string} value Raw value.
	 * @return {string} Escaped value.
	 */
	function escapeAttr( value ) {
		return String( value )
			.replace( /&/g, '&amp;' )
			.replace( /"/g, '&quot;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' );
	}

	/**
	 * Returns a Slick `customPaging` callback for the requested dot style.
	 *
	 * @param {Object} ui Parsed `data-slick-ui` payload.
	 * @return {Function} customPaging implementation.
	 */
	function pagingFn( ui ) {
		var strings = ui.i18n || {};
		var template = strings.goTo || 'Go to slide %d';

		return function ( slider, i ) {
			var label = template.replace( '%d', i + 1 );
			var $button = $( '<button type="button" />' ).attr( 'aria-label', label );

			if ( 'numbers' === ui.dotStyle ) {
				$button.text( i + 1 );
			}

			return $button;
		};
	}

	/**
	 * Renders and keeps a progress bar in sync with the current slide.
	 *
	 * Used instead of individual indicators when `dotStyle` is "progress".
	 *
	 * @param {jQuery} $wrapper  Block wrapper.
	 * @param {jQuery} $viewport Slick element.
	 * @return {void}
	 */
	function initProgress( $wrapper, $viewport ) {
		var $dots = $wrapper.find( '.gbss__dots' ).first();

		if ( ! $dots.length ) {
			return;
		}

		var $fill = $( '<span class="gbss__progress-fill" />' );
		$dots.append( $( '<span class="gbss__progress" role="presentation" />' ).append( $fill ) );

		var update = function () {
			var slick = $viewport.slick( 'getSlick' );
			var total = slick.getDotCount() + 1;
			var current = Math.round( slick.currentSlide / Math.max( 1, slick.options.slidesToScroll ) ) + 1;

			$fill.css( 'width', Math.min( 100, ( current / total ) * 100 ) + '%' );
		};

		$viewport.on( 'afterChange.gbss init.gbss reInit.gbss', update );
		update();
	}

	/**
	 * Initialises a single slider block.
	 *
	 * @param {HTMLElement} element Block wrapper element.
	 * @return {void}
	 */
	function initSlider( element ) {
		var $wrapper = $( element );
		var $viewport = $wrapper.children( '.gbss__viewport' ).first();

		if ( ! $viewport.length || $viewport.hasClass( 'slick-initialized' ) ) {
			return;
		}

		var options = $wrapper.data( 'slick' ) || {};
		var ui = $wrapper.data( 'slick-ui' ) || {};
		var useProgress = 'progress' === ui.dotStyle;

		var settings = $.extend( {}, options, {
			rtl: $( 'body' ).hasClass( 'rtl' ),
			// Slick wraps every slide in two extra divs when `rows` is 1 (its
			// default). Nothing here needs that, and it flattens the DOM.
			rows: 0,
			appendArrows: $wrapper.children( '.gbss__arrows' ),
			appendDots: $wrapper.children( '.gbss__dots' ),
			prevArrow: arrowMarkup( 'prev', ui ),
			nextArrow: arrowMarkup( 'next', ui ),
			customPaging: pagingFn( ui )
		} );

		// The progress bar replaces the individual indicators entirely.
		if ( useProgress ) {
			settings.dots = false;
		}

		$viewport.slick( settings );

		if ( useProgress ) {
			initProgress( $wrapper, $viewport );
		}
	}

	/**
	 * Initialises every slider that is not yet initialised.
	 *
	 * Safe to call repeatedly, which makes it usable after AJAX driven content
	 * updates: `jQuery( document ).trigger( 'gbss:init' )`.
	 *
	 * @param {HTMLElement|Document} [scope] Optional container to search within.
	 * @return {void}
	 */
	function initAll( scope ) {
		$( '.gbss', scope || document ).each( function () {
			initSlider( this );
		} );
	}

	$( function () {
		initAll();
	} );

	$( document ).on( 'gbss:init', function ( event, scope ) {
		initAll( scope );
	} );

	window.gbSlickSlider = window.gbSlickSlider || {};
	window.gbSlickSlider.init = initAll;
	window.gbSlickSlider.initSlider = initSlider;
} )( window.jQuery );
