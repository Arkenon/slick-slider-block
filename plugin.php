<?php
/**
 * Plugin Name:       Simple Slider Block - Create Sliders From Core Blocks
 * Plugin URI:        https://wordpress.org/plugins/gb-for-slick-slider/
 * Description:       A Gutenberg block for creating a simple slider using Slick Slider with core blocks. It is compatible with the core blocks like Cover, Image, and more.
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Version:           2.0.1
 * Author:            Kadim Gültekin
 * Author URI:        https://profiles.wordpress.org/arkenon/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-for-slick-slider
 *
 * @package           Gutenberg Block for Slick Slider
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// CONSTANTS.
$gb_plugin_data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
define( 'GB_SLICK_SLIDER_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'GB_SLICK_SLIDER_BLOCK_VERSION', $gb_plugin_data['version'] );
define( 'GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

require_once GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH . 'includes/render-helpers.php';
require_once GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH . 'includes/patterns.php';

// Register front-end assets.
if ( ! function_exists( 'gb_slick_slider_block_register_assets' ) ) :

	/**
	 * Registers the front-end styles and scripts used by the slider.
	 *
	 * Nothing is enqueued here on purpose. The block render callbacks call
	 * gb_slick_enqueue_assets() so the Slick library only loads on pages that
	 * actually contain a slider.
	 *
	 * Registration runs on `init` rather than `wp_enqueue_scripts` because
	 * wp_enqueue_style() silently ignores handles that are not registered yet,
	 * and block rendering can happen before `wp_enqueue_scripts` fires (REST
	 * requests, block themes rendering the template canvas).
	 *
	 * @return void
	 */
	function gb_slick_slider_block_register_assets(): void {
		wp_register_style( 'slick', GB_SLICK_SLIDER_BLOCK_URL . 'assets/slick/slick.css', array(), GB_SLICK_SLIDER_BLOCK_VERSION );
		wp_register_style( 'slick-theme', GB_SLICK_SLIDER_BLOCK_URL . 'assets/slick/slick-theme.css', array( 'slick' ), GB_SLICK_SLIDER_BLOCK_VERSION );

		wp_register_script( 'slick-js', GB_SLICK_SLIDER_BLOCK_URL . 'assets/slick/slick.min.js', array( 'jquery' ), GB_SLICK_SLIDER_BLOCK_VERSION, true );
		wp_register_script( 'gb-slick-view', GB_SLICK_SLIDER_BLOCK_URL . 'assets/js/view.js', array( 'jquery', 'slick-js' ), GB_SLICK_SLIDER_BLOCK_VERSION, true );

		// Kept registered for backward compatibility: `custom-js` was the 1.x
		// init handle and some sites dequeue or depend on it by name.
		wp_register_script( 'custom-js', GB_SLICK_SLIDER_BLOCK_URL . 'assets/js/custom.js', array( 'gb-slick-view' ), GB_SLICK_SLIDER_BLOCK_VERSION, true );
	}

	add_action( 'init', 'gb_slick_slider_block_register_assets' );

endif;

// Opt-in to the pre-2.0.0 behaviour of loading the assets everywhere.
if ( ! function_exists( 'gb_slick_slider_block_maybe_force_enqueue' ) ) :

	/**
	 * Enqueues the slider assets on every front-end page when asked to.
	 *
	 * @return void
	 */
	function gb_slick_slider_block_maybe_force_enqueue(): void {
		/**
		 * Filters whether the slider assets should load on every front-end page.
		 *
		 * Before 2.0.0 they always did. They now load only on pages that render
		 * a slider, which this filter turns back off.
		 *
		 * @param bool $force Defaults to false.
		 */
		if ( apply_filters( 'gb_for_slick_slider_force_enqueue', false ) ) {
			gb_slick_enqueue_assets();
		}
	}

	add_action( 'wp_enqueue_scripts', 'gb_slick_slider_block_maybe_force_enqueue' );

endif;

// Register Blocks.
if ( ! function_exists( 'gb_slick_slider_block_init' ) ) :

	/**
	 * Registers the block types shipped by the plugin.
	 *
	 * @return void
	 */
	function gb_slick_slider_block_init(): void {
		register_block_type( GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH . 'build/slick-slider' );
		register_block_type( GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH . 'build/slick-slider-item' );
		register_block_type( GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH . 'build/post-slider' );
	}

	add_action( 'init', 'gb_slick_slider_block_init' );

endif;

// Translations.
if ( ! function_exists( 'gb_slick_slider_block_load_textdomain' ) ) :

	/**
	 * Loads the PHP translations.
	 *
	 * @return void
	 */
	function gb_slick_slider_block_load_textdomain(): void {
		load_plugin_textdomain( 'gb-for-slick-slider', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}

	add_action( 'init', 'gb_slick_slider_block_load_textdomain' );

endif;

// Editor-only data and JS translations.
if ( ! function_exists( 'gb_slick_slider_block_editor_assets' ) ) :

	/**
	 * Passes plugin URLs to the editor script and hooks up JS translations.
	 *
	 * @return void
	 */
	function gb_slick_slider_block_editor_assets(): void {
		$handles = array(
			'gb-for-slick-slider-slick-slider-editor-script',
			'gb-for-slick-slider-post-slider-editor-script',
		);

		wp_localize_script(
			$handles[0],
			'gbSlickSliderData',
			array(
				'pluginUrl' => GB_SLICK_SLIDER_BLOCK_URL,
				'assetsUrl' => GB_SLICK_SLIDER_BLOCK_URL . 'assets/',
			)
		);

		foreach ( $handles as $gb_handle ) {
			wp_set_script_translations( $gb_handle, 'gb-for-slick-slider', GB_SLICK_SLIDER_BLOCK_PLUGIN_PATH . 'languages' );
		}
	}

	add_action( 'enqueue_block_editor_assets', 'gb_slick_slider_block_editor_assets' );

endif;
