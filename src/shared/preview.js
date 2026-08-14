/**
 * Editor-side mirror of the PHP render pipeline.
 *
 * The editor reuses the front-end stylesheet, so producing the same class list
 * and CSS custom properties as includes/render-helpers.php means arrow and dot
 * settings are previewed accurately while editing.
 */

import { __ } from '@wordpress/i18n';
import ArrowIcon from './arrow-icon';

/**
 * Builds the wrapper class list. Mirrors gb_slick_build_classes().
 *
 * @param {Object} a Block attributes.
 * @return {string} Class list.
 */
export function getSliderClassName( a ) {
	return [
		'gbss',
		`gbss--arrow-icon-${ a.arrowStyle }`,
		`gbss--arrow-shape-${ a.arrowBorderStyle }`,
		`gbss--arrows-${ a.arrowPosition }`,
		`gbss--dot-style-${ a.dotStyle }`,
		`gbss--dots-${ a.dotPosition }`,
		`arrow-style-${ a.arrowStyle }`,
		`arrow-border-style-${ a.arrowBorderStyle }`,
		`arrow-position-${ a.arrowPosition }`,
		a.arrows ? 'gbss--has-arrows' : '',
		a.dots ? 'gbss--has-dots' : '',
		a.arrowShadow ? 'gbss--arrow-shadow' : '',
	]
		.filter( Boolean )
		.join( ' ' );
}

/**
 * Builds the inline CSS custom properties. Mirrors gb_slick_build_css_vars().
 *
 * @param {Object} a Block attributes.
 * @return {Object} React style object.
 */
export function getSliderStyle( a ) {
	return {
		'--arrow-bg-color': a.arrowBackgroundColor,
		'--arrow-color': a.arrowColor,
		'--arrow-font-size': `${ a.arrowFontSize }px`,
		'--arrow-height': `${ a.arrowHeight }px`,
		'--gbss-arrow-bg': a.arrowBackgroundColor,
		'--gbss-arrow-color': a.arrowColor,
		'--gbss-arrow-hover-color': a.arrowHoverColor || a.arrowColor,
		'--gbss-arrow-hover-bg':
			a.arrowHoverBackgroundColor || a.arrowBackgroundColor,
		// Neither name contains "border-color" or "border-width" on purpose:
		// see gb_slick_build_css_vars().
		'--gbss-arrow-stroke-color': a.arrowBorderColor,
		'--gbss-arrow-stroke': `${ a.arrowBorderWidth }px`,
		'--gbss-arrow-size': `${ a.arrowHeight }px`,
		'--gbss-arrow-icon-size': `${ a.arrowFontSize }px`,
		'--gbss-arrow-gap': `${ a.arrowGap }px`,
		'--gbss-dot-color': a.dotColor,
		'--gbss-dot-active-color': a.dotActiveColor,
		'--gbss-dot-size': `${ a.dotSize }px`,
		'--gbss-dot-gap': `${ a.dotGap }px`,
		'--gbss-slide-gap': `${ a.slideMargin }px`,
	};
}

/**
 * Static, non-interactive arrow preview.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @return {Element|null} Arrow container.
 */
export function ArrowsPreview( { attributes } ) {
	if ( ! attributes.arrows ) {
		return null;
	}

	return (
		<div className="gbss__arrows" aria-hidden="true">
			<span className="gbss__arrow gbss__arrow--prev slick-prev">
				<ArrowIcon
					icon={ attributes.arrowStyle }
					size={ attributes.arrowFontSize }
				/>
			</span>
			<span className="gbss__arrow gbss__arrow--next slick-next">
				<ArrowIcon
					icon={ attributes.arrowStyle }
					size={ attributes.arrowFontSize }
				/>
			</span>
		</div>
	);
}

/**
 * Static, non-interactive pagination preview.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {number} props.count      Number of slides.
 * @return {Element|null} Dots container.
 */
export function DotsPreview( { attributes, count } ) {
	if ( ! attributes.dots ) {
		return null;
	}

	if ( 'progress' === attributes.dotStyle ) {
		return (
			<div className="gbss__dots" aria-hidden="true">
				<span className="gbss__progress">
					<span
						className="gbss__progress-fill"
						style={ { width: '35%' } }
					/>
				</span>
			</div>
		);
	}

	const total = Math.max( 1, Math.min( 8, count || 3 ) );

	return (
		<div className="gbss__dots" aria-hidden="true">
			<ul className="slick-dots">
				{ Array.from( { length: total } ).map( ( _, index ) => (
					<li
						key={ index }
						className={ index === 0 ? 'slick-active' : undefined }
					>
						<button type="button" tabIndex={ -1 }>
							{ 'numbers' === attributes.dotStyle
								? index + 1
								: '' }
						</button>
					</li>
				) ) }
			</ul>
		</div>
	);
}

/**
 * Placeholder text shown when a dynamic slider has no results.
 *
 * @return {string} Message.
 */
export function noResultsMessage() {
	return __( 'No posts found for this query.', 'gb-for-slick-slider' );
}
