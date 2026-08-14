<?php
/**
 * Server-side rendering for the Post Slider block.
 *
 * The block's inner blocks are a template for a single slide. They are rendered
 * once per query result with that post's context, which is what makes core
 * blocks such as Post Title and Featured Image resolve to the right post.
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

if ( empty( $block->parsed_block['innerBlocks'] ) ) {
	return;
}

$gb_query_settings = isset( $attributes['query'] ) && is_array( $attributes['query'] ) ? $attributes['query'] : array();
$gb_query          = new WP_Query( gb_slick_build_query_args( $gb_query_settings ) );

if ( ! $gb_query->have_posts() ) {
	wp_reset_postdata();
	return;
}

$gb_slides_html = '';

while ( $gb_query->have_posts() ) {
	// the_post() sets the global $post, which post blocks such as Post Title
	// read through get_the_title() without arguments. Passing only the context
	// is not enough. Same approach as core's Post Template block.
	$gb_query->the_post();

	// Rendering the parsed block with `dynamic => false` renders only its inner
	// blocks, which avoids recursing back into this file.
	$gb_slide_content = ( new WP_Block(
		$block->parsed_block,
		array(
			'postType' => get_post_type(),
			'postId'   => get_the_ID(),
		)
	) )->render( array( 'dynamic' => false ) );

	$gb_slides_html .= '<div class="gbss-slide">' . $gb_slide_content . '</div>';
}

wp_reset_postdata();

echo gb_slick_render_shell( $attributes, $gb_slides_html, array( 'gbss--dynamic' ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Attributes are escaped in gb_slick_render_shell(); slide markup is rendered block output.
