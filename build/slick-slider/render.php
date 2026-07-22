<?php
/**
 * Server-side rendering for the Slick Slider block.
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

// Extract attributes with defaults.
$gb_dots                   = $attributes['dots'] ?? false;
$gb_arrows                 = $attributes['arrows'] ?? true;
$gb_infinite               = $attributes['infinite'] ?? false;
$gb_center_mode            = $attributes['centerMode'] ?? false;
$gb_adaptive_height        = $attributes['adaptiveHeight'] ?? false;
$gb_autoplay               = $attributes['autoplay'] ?? false;
$gb_autoplay_speed         = $attributes['autoplaySpeed'] ?? 1500;
$gb_fade                   = $attributes['fade'] ?? false;
$gb_slides_to_show         = $attributes['slidesToShow'] ?? 2;
$gb_slide_speed            = $attributes['slideSpeed'] ?? 1000;
$gb_slides_to_scroll       = $attributes['slidesToScroll'] ?? 1;
$gb_slide_margin           = $attributes['slideMargin'] ?? 0;
$gb_arrow_style            = $attributes['arrowStyle'] ?? 'chevron';
$gb_arrow_border_style     = $attributes['arrowBorderStyle'] ?? 'circle';
$gb_arrow_background_color = $attributes['arrowBackgroundColor'] ?? '#ffffff00';
$gb_arrow_color            = $attributes['arrowColor'] ?? '#d3d1d1';
$gb_arrow_position         = $attributes['arrowPosition'] ?? 'sides';
$gb_arrow_font_size        = $attributes['arrowFontSize'] ?? 20;
$gb_arrow_height           = $attributes['arrowHeight'] ?? 40;
$gb_responsive             = $attributes['responsive'] ?? array();

// Build Slick options JSON.
$gb_slick_options = array(
	'dots'           => $gb_dots,
	'arrows'         => $gb_arrows,
	'slidesToShow'   => $gb_slides_to_show,
	'slidesToScroll' => $gb_slides_to_scroll,
	'infinite'       => $gb_infinite,
	'adaptiveHeight' => $gb_adaptive_height,
	'autoplay'       => $gb_autoplay,
	'autoplaySpeed'  => $gb_autoplay_speed,
	'fade'           => $gb_fade,
	'speed'          => $gb_slide_speed,
	'centerMode'     => $gb_center_mode,
	'responsive'     => $gb_responsive,
);

// Create arrow style classes.
$gb_arrow_style_class    = $gb_arrow_style ? 'arrow-style-' . $gb_arrow_style : '';
$gb_arrow_border_class   = $gb_arrow_border_style ? 'arrow-border-style-' . $gb_arrow_border_style : '';
$gb_arrow_position_class = $gb_arrow_position ? 'arrow-position-' . $gb_arrow_position : '';
$gb_custom_arrow_class   = trim( $gb_arrow_style_class . ' ' . $gb_arrow_border_class . ' ' . $gb_arrow_position_class );

// Create CSS custom properties for dynamic styling.
$gb_inline_styles = sprintf(
	'style="--arrow-bg-color: %s;--arrow-color: %s; --arrow-font-size: %dpx; --arrow-height: %dpx;"',
	esc_attr( $gb_arrow_background_color ),
	esc_attr( $gb_arrow_color ),
	esc_attr( intval( $gb_arrow_font_size ) ),
	esc_attr( intval( $gb_arrow_height ) )
);

// Get wrapper attributes.
$gb_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'      => trim( $gb_custom_arrow_class ),
		'data-slick' => wp_json_encode( $gb_slick_options ),
	)
);

// Render inner blocks.
$gb_inner_blocks_content = '';
if ( ! empty( $block->inner_blocks ) ) {
	foreach ( $block->inner_blocks as $gb_inner_block ) {
		$gb_inner_blocks_content .= $gb_inner_block->render();
	}
}

// Render the block.
?>
<section <?php echo $gb_wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes its output. ?> <?php echo $gb_inline_styles; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- every value interpolated above is already passed through esc_attr(). ?>>
	<?php echo wp_kses_post( $gb_inner_blocks_content ); ?>
</section>
