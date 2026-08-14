/**
 * Option sets shared by every slider block.
 *
 * Keep these in sync with the whitelists in includes/render-helpers.php
 * (gb_slick_arrow_icons(), gb_slick_arrow_positions(), gb_slick_dot_styles(),
 * gb_slick_dot_positions()) - PHP rejects anything not listed there.
 */

import { __ } from '@wordpress/i18n';

/**
 * Arrow icon paths, drawn pointing left.
 *
 * Duplicated in assets/js/view.js, which is a plain jQuery file and cannot
 * import from here. Update both when adding an icon.
 */
export const ARROW_ICON_PATHS = {
	chevron: { d: 'M15 4 L7 12 L15 20', width: 2 },
	'chevron-thin': { d: 'M15 4 L7 12 L15 20', width: 1.25 },
	'simple-arrow': { d: 'M20 12 H4 M10 6 L4 12 L10 18', width: 1.75 },
	'arrow-long': { d: 'M22 12 H2 M8 6 L2 12 L8 18', width: 1.25 },
	caret: { d: 'M14 6 L8 12 L14 18', width: 3.25 },
	'angle-double': { d: 'M17 4 L9 12 L17 20 M11 4 L3 12 L11 20', width: 2 },
	triangle: { d: 'M16 4 L6 12 L16 20 Z', width: 0, fill: true },
};

export const ARROW_ICON_LABELS = {
	chevron: __( 'Chevron', 'gb-for-slick-slider' ),
	'chevron-thin': __( 'Chevron (thin)', 'gb-for-slick-slider' ),
	'simple-arrow': __( 'Arrow', 'gb-for-slick-slider' ),
	'arrow-long': __( 'Long arrow', 'gb-for-slick-slider' ),
	caret: __( 'Caret', 'gb-for-slick-slider' ),
	'angle-double': __( 'Double angle', 'gb-for-slick-slider' ),
	triangle: __( 'Triangle', 'gb-for-slick-slider' ),
};

export const ARROW_POSITION_OPTIONS = [
	{
		value: 'sides',
		label: __( 'Sides, outside the slider', 'gb-for-slick-slider' ),
	},
	{
		value: 'sides-inside',
		label: __( 'Sides, over the slider', 'gb-for-slick-slider' ),
	},
	{ value: 'bottom', label: __( 'Below, centred', 'gb-for-slick-slider' ) },
	{ value: 'bottom-left', label: __( 'Below, left', 'gb-for-slick-slider' ) },
	{
		value: 'bottom-right',
		label: __( 'Below, right', 'gb-for-slick-slider' ),
	},
	{ value: 'top-right', label: __( 'Above, right', 'gb-for-slick-slider' ) },
	{
		value: 'split-bottom',
		label: __( 'Below, split around the dots', 'gb-for-slick-slider' ),
	},
];

export const ARROW_SHAPE_OPTIONS = [
	{ value: 'circle', label: __( 'Circle', 'gb-for-slick-slider' ) },
	{ value: 'rounded', label: __( 'Rounded', 'gb-for-slick-slider' ) },
	{ value: 'square', label: __( 'Square', 'gb-for-slick-slider' ) },
	{ value: 'none', label: __( 'No border', 'gb-for-slick-slider' ) },
];

export const DOT_STYLE_OPTIONS = [
	{ value: 'dots', label: __( 'Dots', 'gb-for-slick-slider' ) },
	{
		value: 'bars',
		label: __( 'Bars (active expands)', 'gb-for-slick-slider' ),
	},
	{ value: 'lines', label: __( 'Lines', 'gb-for-slick-slider' ) },
	{ value: 'numbers', label: __( 'Numbers', 'gb-for-slick-slider' ) },
	{ value: 'progress', label: __( 'Progress bar', 'gb-for-slick-slider' ) },
];

export const DOT_POSITION_OPTIONS = [
	{
		value: 'bottom-center',
		label: __( 'Below, centred', 'gb-for-slick-slider' ),
	},
	{ value: 'bottom-left', label: __( 'Below, left', 'gb-for-slick-slider' ) },
	{
		value: 'bottom-right',
		label: __( 'Below, right', 'gb-for-slick-slider' ),
	},
	{
		value: 'top-center',
		label: __( 'Above, centred', 'gb-for-slick-slider' ),
	},
	{
		value: 'overlay-bottom',
		label: __( 'Over the slider, bottom', 'gb-for-slick-slider' ),
	},
	{
		value: 'right-vertical',
		label: __( 'Over the slider, right (vertical)', 'gb-for-slick-slider' ),
	},
	{
		value: 'left-vertical',
		label: __( 'Over the slider, left (vertical)', 'gb-for-slick-slider' ),
	},
];

/**
 * Breakpoints exposed in the responsive panel.
 *
 * These mirror the four entries stored in the `responsive` attribute, whose
 * shape is frozen for backward compatibility.
 */
export const BREAKPOINT_DEVICES = [
	{ breakpoint: 1024, label: __( 'Laptop', 'gb-for-slick-slider' ) },
	{ breakpoint: 768, label: __( 'Tablet', 'gb-for-slick-slider' ) },
	{ breakpoint: 600, label: __( 'Large phone', 'gb-for-slick-slider' ) },
	{ breakpoint: 480, label: __( 'Phone', 'gb-for-slick-slider' ) },
];
