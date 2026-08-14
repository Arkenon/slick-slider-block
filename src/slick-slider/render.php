<?php
/**
 * Server-side rendering for the Slick Slider block.
 *
 * Slides come from the block's inner blocks. Everything else - the shell markup,
 * Slick options, UI config, CSS custom properties and asset enqueuing - is
 * shared with the Post Slider block and lives in includes/render-helpers.php.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the block content.
 *
 * @package Gutenberg Block for Slick Slider
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$gb_slides_html = '';

if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $gb_inner_block ) {
		// Inner blocks are rendered by the block API, which already escapes and
		// filters their output. Running it through wp_kses_post() again (as 1.x
		// did) silently strips legitimate markup such as iframes and SVGs.
		$gb_slides_html .= $gb_inner_block->render();
	}
}

echo gb_slick_render_shell( $attributes, $gb_slides_html ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Attributes are escaped in gb_slick_render_shell(); slide markup is rendered block output.
