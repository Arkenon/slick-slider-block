<?php
/**
 * Plugin Name:       Gutenberg Block for Slick Slider
 * Description:       This is a very simple slider block. Gutenberg Block for Slick Slider uses Slick Slider to create sliders from core blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.0.8
 * Author:            Kadim Gültekin
 * Author URI:        https://github.com/Arkenon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-for-slick-slider
 *
 * @package           Gutenberg Block for Slick Slider
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*--------------------------------------------------------------
# CONSTANTS
--------------------------------------------------------------*/
define( 'GB_SLICK_SLIDER_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'GB_SLICK_SLIDER_BLOCK_VERSION', '1.0.8' );

/*--------------------------------------------------------------
# Enqueue Styles
--------------------------------------------------------------*/
if ( ! function_exists( 'gb_slick_slider_block_enque_styles_and_scripts' ) ) :

	function gb_slick_slider_block_enque_styles_and_scripts() {
		wp_register_style( 'slick', GB_SLICK_SLIDER_BLOCK_URL . '/assets/slick/slick.css', [],GB_SLICK_SLIDER_BLOCK_VERSION );
		wp_register_style( 'slick-theme', GB_SLICK_SLIDER_BLOCK_URL . '/assets/slick/slick-theme.css', [],GB_SLICK_SLIDER_BLOCK_VERSION );
		wp_register_style( 'custom-css', GB_SLICK_SLIDER_BLOCK_URL . '/assets/css/custom.css', [],GB_SLICK_SLIDER_BLOCK_VERSION );

		wp_enqueue_style( 'custom-css' );
		wp_enqueue_style( 'slick' );
		wp_enqueue_style( 'slick-theme' );

		wp_register_script( 'slick-js', GB_SLICK_SLIDER_BLOCK_URL . '/assets/slick/slick.min.js', [ 'jquery' ], GB_SLICK_SLIDER_BLOCK_VERSION, false );
		wp_register_script( 'custom-js', GB_SLICK_SLIDER_BLOCK_URL . '/assets/js/custom.js', [ 'jquery', 'slick-js' ], GB_SLICK_SLIDER_BLOCK_VERSION, true );
		wp_enqueue_script( 'slick-js' );
		wp_enqueue_script( 'custom-js' );
	}

	add_action( 'wp_enqueue_scripts', 'gb_slick_slider_block_enque_styles_and_scripts' );

endif;

/*--------------------------------------------------------------
# Register Blocks
--------------------------------------------------------------*/
if ( ! function_exists( 'gb_slick_slider_block_init' ) ) :

	function gb_slick_slider_block_init() {
		register_block_type( __DIR__ . '/build/slick-slider' );
		register_block_type( __DIR__ . '/build/slick-slider-item' );
	}

	add_action( 'init', 'gb_slick_slider_block_init' );

endif;
