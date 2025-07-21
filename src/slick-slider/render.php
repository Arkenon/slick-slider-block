<?php
/**
 * Server-side rendering for the Slick Slider block
 *
 * @param array $attributes Block attributes.
 * @param string $content Block default content.
 * @param WP_Block $block Block instance.
 * @return string Returns the block content.
 */

// Extract attributes with defaults
$dots = $attributes['dots'] ?? false;
$arrows = $attributes['arrows'] ?? true;
$infinite = $attributes['infinite'] ?? false;
$center_mode = $attributes['centerMode'] ?? false;
$adaptive_height = $attributes['adaptiveHeight'] ?? false;
$autoplay = $attributes['autoplay'] ?? false;
$autoplay_speed = $attributes['autoplaySpeed'] ?? 1500;
$fade = $attributes['fade'] ?? false;
$slides_to_show = $attributes['slidesToShow'] ?? 2;
$slide_speed = $attributes['slideSpeed'] ?? 1000;
$slides_to_scroll = $attributes['slidesToScroll'] ?? 1;
$slide_margin = $attributes['slideMargin'] ?? 0;
$arrow_style = $attributes['arrowStyle'] ?? 'chevron';
$arrow_border_style = $attributes['arrowBorderStyle'] ?? 'rounded';
$responsive = $attributes['responsive'] ?? [];

// Build Slick options JSON
$slick_options = [
	'dots' => $dots,
	'arrows' => $arrows,
	'slidesToShow' => $slides_to_show,
	'slidesToScroll' => $slides_to_scroll,
	'infinite' => $infinite,
	'adaptiveHeight' => $adaptive_height,
	'autoplay' => $autoplay,
	'autoplaySpeed' => $autoplay_speed,
	'fade' => $fade,
	'speed' => $slide_speed,
	'centerMode' => $center_mode,
	'responsive' => $responsive
];

// Create arrow style class
$arrow_style_class = $arrow_style ? 'arrow-style-' . $arrow_style : '';
$arrow_border_class = $arrow_border_style ? 'arrow-border-style-' . $arrow_border_style : '';
$custom_arrow_class = $arrow_style_class . ' ' . $arrow_border_class;

// Get wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
	'class' => trim($custom_arrow_class),
	'data-slick' => wp_json_encode($slick_options)
]);

// Render inner blocks
$inner_blocks_content = '';
if (!empty($block->inner_blocks)) {
	foreach ($block->inner_blocks as $inner_block) {
		$inner_blocks_content .= $inner_block->render();
	}
}

// Render the block
?>
<section <?php echo $wrapper_attributes; ?>>
	<?php echo $inner_blocks_content; ?>
</section>
