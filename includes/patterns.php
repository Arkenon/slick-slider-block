<?php
/**
 * Block pattern category for the bundled slider templates.
 *
 * The templates themselves are defined in src/slick-slider/patterns.js so the
 * in-editor template picker and the inserter stay in sync from a single source;
 * this file only makes sure the category exists.
 *
 * @package Gutenberg Block for Slick Slider
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'gb_slick_register_pattern_category' ) ) :

	/**
	 * Registers the "Sliders" pattern category.
	 *
	 * @return void
	 */
	function gb_slick_register_pattern_category(): void {
		if ( ! function_exists( 'register_block_pattern_category' ) ) {
			return;
		}

		register_block_pattern_category(
			'gb-for-slick-slider',
			array( 'label' => __( 'Sliders', 'gb-for-slick-slider' ) )
		);
	}

	add_action( 'init', 'gb_slick_register_pattern_category' );

endif;
