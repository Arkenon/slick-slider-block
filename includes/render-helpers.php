<?php
/**
 * Shared render pipeline for every slider block shipped by this plugin.
 *
 * Both `slick-slider` (manual slides) and `post-slider` (dynamic query) produce
 * the exact same shell markup, Slick options JSON, UI config JSON and CSS custom
 * properties. Everything that is common lives here so the two render.php files
 * stay thin.
 *
 * Markup contract produced by gb_slick_render_shell():
 *
 *     <div class="wp-block-… gbss gbss--arrows-sides gbss--dots-bottom-center" data-slick='…' data-slick-ui='…'>
 *         <div class="gbss__arrows" data-gbss-role="arrows"></div>   <- Slick appendArrows target
 *         <div class="gbss__viewport">…slides…</div>                 <- Slick is initialised here
 *         <div class="gbss__dots" data-gbss-role="dots"></div>       <- Slick appendDots target
 *     </div>
 *
 * @package Gutenberg Block for Slick Slider
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'gb_slick_get_defaults' ) ) :

	/**
	 * Canonical defaults for every slider attribute.
	 *
	 * Keys and values here must stay in sync with the `attributes` section of
	 * each block.json. The first block of entries is the original 1.x attribute
	 * set - names, types and defaults are frozen for backward compatibility.
	 *
	 * @return array Attribute name => default value.
	 */
	function gb_slick_get_defaults(): array {
		return array(
			// Original 1.x attributes - do not rename or change defaults.
			'dots'                      => false,
			'arrows'                    => true,
			'infinite'                  => false,
			'centerMode'                => false,
			'adaptiveHeight'            => false,
			'autoplay'                  => false,
			'autoplaySpeed'             => 1500,
			'fade'                      => false,
			'slidesToShow'              => 2,
			'slideSpeed'                => 1000,
			'slidesToScroll'            => 1,
			'slideMargin'               => 0,
			'arrowStyle'                => 'chevron',
			'arrowBorderStyle'          => 'circle',
			'arrowBackgroundColor'      => '#ffffff00',
			'arrowColor'                => '#d3d1d1',
			'arrowPosition'             => 'sides',
			'arrowFontSize'             => 20,
			'arrowHeight'               => 40,
			'responsive'                => array(),

			// Added in 2.0.0.
			'pauseOnHover'              => true,
			'arrowBorderColor'          => '#d3d1d1',
			'arrowBorderWidth'          => 1,
			// 40px arrow + 5px gap reproduces the fixed -45px offset used in 1.x.
			'arrowGap'                  => 5,
			'arrowHoverColor'           => '',
			'arrowHoverBackgroundColor' => '',
			'arrowShadow'               => false,
			'dotStyle'                  => 'dots',
			'dotPosition'               => 'bottom-center',
			'dotColor'                  => '#d3d1d1',
			'dotActiveColor'            => '#000000',
			'dotSize'                   => 10,
			'dotGap'                    => 8,
		);
	}

endif;

if ( ! function_exists( 'gb_slick_prepare_attributes' ) ) :

	/**
	 * Fills missing attributes with their defaults and normalises enum values.
	 *
	 * @param array $attributes Raw block attributes.
	 *
	 * @return array Complete, normalised attribute set.
	 */
	function gb_slick_prepare_attributes( array $attributes ): array {
		$prepared = array_merge( gb_slick_get_defaults(), $attributes );

		$prepared['arrowStyle']       = gb_slick_sanitize_choice( $prepared['arrowStyle'], gb_slick_arrow_icons(), 'chevron' );
		$prepared['arrowPosition']    = gb_slick_sanitize_choice( $prepared['arrowPosition'], gb_slick_arrow_positions(), 'sides' );
		$prepared['arrowBorderStyle'] = gb_slick_sanitize_choice( $prepared['arrowBorderStyle'], array( 'circle', 'rounded', 'square', 'none' ), 'circle' );
		$prepared['dotStyle']         = gb_slick_sanitize_choice( $prepared['dotStyle'], gb_slick_dot_styles(), 'dots' );
		$prepared['dotPosition']      = gb_slick_sanitize_choice( $prepared['dotPosition'], gb_slick_dot_positions(), 'bottom-center' );

		return $prepared;
	}

endif;

if ( ! function_exists( 'gb_slick_sanitize_choice' ) ) :

	/**
	 * Returns the value when it is part of the allowed set, the fallback otherwise.
	 *
	 * @param mixed  $value    Value to check.
	 * @param array  $allowed  Allowed values.
	 * @param string $fallback Value used when $value is not allowed.
	 *
	 * @return string
	 */
	function gb_slick_sanitize_choice( $value, array $allowed, string $fallback ): string {
		return in_array( $value, $allowed, true ) ? (string) $value : $fallback;
	}

endif;

if ( ! function_exists( 'gb_slick_arrow_icons' ) ) :

	/**
	 * Arrow icon keys understood by view.js.
	 *
	 * `chevron` and `simple-arrow` existed in 1.x; the rest are new in 2.0.0.
	 *
	 * @return string[]
	 */
	function gb_slick_arrow_icons(): array {
		return array( 'chevron', 'simple-arrow', 'chevron-thin', 'arrow-long', 'caret', 'triangle', 'angle-double' );
	}

endif;

if ( ! function_exists( 'gb_slick_arrow_positions' ) ) :

	/**
	 * Arrow placement presets. `sides` and `bottom` existed in 1.x.
	 *
	 * @return string[]
	 */
	function gb_slick_arrow_positions(): array {
		return array( 'sides', 'bottom', 'sides-inside', 'top-right', 'bottom-left', 'bottom-right', 'split-bottom' );
	}

endif;

if ( ! function_exists( 'gb_slick_dot_styles' ) ) :

	/**
	 * Pagination indicator styles.
	 *
	 * @return string[]
	 */
	function gb_slick_dot_styles(): array {
		return array( 'dots', 'bars', 'lines', 'numbers', 'progress' );
	}

endif;

if ( ! function_exists( 'gb_slick_dot_positions' ) ) :

	/**
	 * Pagination placement presets.
	 *
	 * @return string[]
	 */
	function gb_slick_dot_positions(): array {
		return array( 'bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'overlay-bottom', 'right-vertical', 'left-vertical' );
	}

endif;

if ( ! function_exists( 'gb_slick_build_options' ) ) :

	/**
	 * Builds the Slick core options that are serialised into `data-slick`.
	 *
	 * The key set is intentionally frozen at the 1.x shape: third-party code and
	 * user snippets read this attribute. Anything purely presentational belongs
	 * in gb_slick_build_ui_config() instead.
	 *
	 * @param array $a Prepared attributes.
	 *
	 * @return array
	 */
	function gb_slick_build_options( array $a ): array {
		return array(
			'dots'           => (bool) $a['dots'],
			'arrows'         => (bool) $a['arrows'],
			'slidesToShow'   => max( 1, (int) $a['slidesToShow'] ),
			'slidesToScroll' => max( 1, (int) $a['slidesToScroll'] ),
			'infinite'       => (bool) $a['infinite'],
			'adaptiveHeight' => (bool) $a['adaptiveHeight'],
			'autoplay'       => (bool) $a['autoplay'],
			'autoplaySpeed'  => max( 100, (int) $a['autoplaySpeed'] ),
			'fade'           => (bool) $a['fade'],
			'speed'          => max( 0, (int) $a['slideSpeed'] ),
			'centerMode'     => (bool) $a['centerMode'],
			'pauseOnHover'   => (bool) $a['pauseOnHover'],
			'responsive'     => is_array( $a['responsive'] ) ? array_values( $a['responsive'] ) : array(),
		);
	}

endif;

if ( ! function_exists( 'gb_slick_build_ui_config' ) ) :

	/**
	 * Builds the presentational config consumed by view.js (`data-slick-ui`).
	 *
	 * @param array $a Prepared attributes.
	 *
	 * @return array
	 */
	function gb_slick_build_ui_config( array $a ): array {
		return array(
			'arrowIcon'     => $a['arrowStyle'],
			'arrowPosition' => $a['arrowPosition'],
			'dotStyle'      => $a['dotStyle'],
			'dotPosition'   => $a['dotPosition'],
			// Accessible labels are translated here so view.js can stay a plain,
			// dependency-free jQuery file.
			'i18n'          => array(
				'prev' => __( 'Previous slide', 'gb-for-slick-slider' ),
				'next' => __( 'Next slide', 'gb-for-slick-slider' ),
				/* translators: %d: slide number. */
				'goTo' => __( 'Go to slide %d', 'gb-for-slick-slider' ),
			),
		);
	}

endif;

if ( ! function_exists( 'gb_slick_build_css_vars' ) ) :

	/**
	 * Builds the inline CSS custom properties that drive arrow and dot styling.
	 *
	 * The legacy `--arrow-*` names from 1.x are emitted alongside the namespaced
	 * `--gbss-*` ones so that user CSS written against the old names keeps working.
	 *
	 * @param array $a Prepared attributes.
	 *
	 * @return string Semicolon separated declarations, ready for a style attribute.
	 */
	function gb_slick_build_css_vars( array $a ): string {
		$arrow_size   = max( 0, (int) $a['arrowHeight'] );
		$icon_size    = max( 0, (int) $a['arrowFontSize'] );
		$hover_color  = '' !== $a['arrowHoverColor'] ? $a['arrowHoverColor'] : $a['arrowColor'];
		$hover_bg     = '' !== $a['arrowHoverBackgroundColor'] ? $a['arrowHoverBackgroundColor'] : $a['arrowBackgroundColor'];
		$border_width = max( 0, (int) $a['arrowBorderWidth'] );

		$vars = array(
			// Legacy names kept for backward compatible user CSS.
			'--arrow-bg-color'          => $a['arrowBackgroundColor'],
			'--arrow-color'             => $a['arrowColor'],
			'--arrow-font-size'         => $icon_size . 'px',
			'--arrow-height'            => $arrow_size . 'px',

			// 2.0.0 namespaced names.
			'--gbss-arrow-bg'           => $a['arrowBackgroundColor'],
			'--gbss-arrow-color'        => $a['arrowColor'],
			'--gbss-arrow-hover-color'  => $hover_color,
			'--gbss-arrow-hover-bg'     => $hover_bg,
			/*
			 * These two are the arrow border, but they must not be *named* after
			 * it: core's block supports stylesheet carries
			 * `html :where([style*=border-color])` and `[style*=border-width]`,
			 * which match on the raw attribute text. A custom property whose name
			 * contains either string is enough to paint a default
			 * `border-style: solid` on the wrapper itself.
			 */
			'--gbss-arrow-stroke-color' => $a['arrowBorderColor'],
			'--gbss-arrow-stroke'       => $border_width . 'px',
			'--gbss-arrow-size'         => $arrow_size . 'px',
			'--gbss-arrow-icon-size'    => $icon_size . 'px',
			'--gbss-arrow-gap'          => max( 0, (int) $a['arrowGap'] ) . 'px',
			'--gbss-dot-color'          => $a['dotColor'],
			'--gbss-dot-active-color'   => $a['dotActiveColor'],
			'--gbss-dot-size'           => max( 1, (int) $a['dotSize'] ) . 'px',
			'--gbss-dot-gap'            => max( 0, (int) $a['dotGap'] ) . 'px',
			'--gbss-slide-gap'          => max( 0, (int) $a['slideMargin'] ) . 'px',
		);

		$declarations = array();
		foreach ( $vars as $name => $value ) {
			$value = trim( (string) $value );
			if ( '' === $value ) {
				continue;
			}
			// Colors arrive from a color picker; reject anything with CSS syntax characters.
			if ( preg_match( '/[;{}<>()]/', $value ) ) {
				continue;
			}
			$declarations[] = $name . ':' . $value;
		}

		return implode( ';', $declarations );
	}

endif;

if ( ! function_exists( 'gb_slick_build_classes' ) ) :

	/**
	 * Builds the wrapper class list.
	 *
	 * The 1.x `arrow-style-*`, `arrow-border-style-*` and `arrow-position-*`
	 * classes are still emitted so existing user CSS keeps matching.
	 *
	 * @param array $a Prepared attributes.
	 *
	 * @return string Space separated class list.
	 */
	function gb_slick_build_classes( array $a ): string {
		$classes = array(
			'gbss',
			'gbss--arrow-icon-' . $a['arrowStyle'],
			'gbss--arrow-shape-' . $a['arrowBorderStyle'],
			'gbss--arrows-' . $a['arrowPosition'],
			'gbss--dot-style-' . $a['dotStyle'],
			'gbss--dots-' . $a['dotPosition'],

			// Legacy 1.x classes.
			'arrow-style-' . $a['arrowStyle'],
			'arrow-border-style-' . $a['arrowBorderStyle'],
			'arrow-position-' . $a['arrowPosition'],
		);

		if ( $a['arrows'] ) {
			$classes[] = 'gbss--has-arrows';
		}
		if ( $a['dots'] ) {
			$classes[] = 'gbss--has-dots';
		}
		if ( $a['arrowShadow'] ) {
			$classes[] = 'gbss--arrow-shadow';
		}

		return implode( ' ', array_map( 'sanitize_html_class', $classes ) );
	}

endif;

if ( ! function_exists( 'gb_slick_build_query_args' ) ) :

	/**
	 * Translates the Post Slider's `query` attribute into WP_Query arguments.
	 *
	 * @param array $query The block's query attribute.
	 *
	 * @return array WP_Query arguments.
	 */
	function gb_slick_build_query_args( array $query ): array {
		$post_type = isset( $query['postType'] ) ? sanitize_key( $query['postType'] ) : 'post';
		$per_page  = isset( $query['perPage'] ) ? (int) $query['perPage'] : 9;

		// Inheriting means "show what this archive already lists", so the main
		// query's vars are reused and only the post count is capped.
		if ( ! empty( $query['inherit'] ) ) {
			global $wp_query;

			$args = is_object( $wp_query ) && ! empty( $wp_query->query_vars ) ? $wp_query->query_vars : array();

			$args['posts_per_page']  = max( 1, min( 50, $per_page ) );
			$args['post_status']     = 'publish';
			$args['ignore_sticky_posts'] = true;
			$args['paged']           = 1;

			return $args;
		}

		$args = array(
			'post_type'              => post_type_exists( $post_type ) ? $post_type : 'post',
			'post_status'            => 'publish',
			'posts_per_page'         => max( 1, min( 50, $per_page ) ),
			'offset'                 => max( 0, (int) ( $query['offset'] ?? 0 ) ),
			'order'                  => 'asc' === strtolower( (string) ( $query['order'] ?? 'desc' ) ) ? 'ASC' : 'DESC',
			'orderby'                => gb_slick_sanitize_choice(
				strtolower( (string) ( $query['orderBy'] ?? 'date' ) ),
				array( 'date', 'title', 'modified', 'rand', 'menu_order', 'comment_count' ),
				'date'
			),
			'ignore_sticky_posts'    => true,
			'no_found_rows'          => true,
			'update_post_term_cache' => false,
		);

		if ( ! empty( $query['categories'] ) && is_array( $query['categories'] ) ) {
			$category_ids = array();

			foreach ( $query['categories'] as $category ) {
				// The editor stores either a term object or a bare id.
				$category_ids[] = is_array( $category ) ? (int) ( $category['id'] ?? 0 ) : (int) $category;
			}

			$category_ids = array_filter( $category_ids );

			if ( $category_ids ) {
				$args['category__in'] = $category_ids;
			}
		}

		if ( ! empty( $query['author'] ) ) {
			$args['author'] = (int) $query['author'];
		}

		if ( ! empty( $query['search'] ) ) {
			$args['s'] = sanitize_text_field( $query['search'] );
		}

		if ( ! empty( $query['excludeCurrent'] ) && is_singular() ) {
			$args['post__not_in'] = array( get_the_ID() );
		}

		return $args;
	}

endif;

if ( ! function_exists( 'gb_slick_needs_nav' ) ) :

	/**
	 * Whether an arrow or dot container has to be rendered.
	 *
	 * A responsive breakpoint can switch navigation back on for small screens
	 * even when it is off at full width - the stock attribute defaults do
	 * exactly that for dots - so the container must exist for Slick to append to.
	 *
	 * @param array  $a    Prepared attributes.
	 * @param string $type Either 'arrows' or 'dots'.
	 *
	 * @return bool
	 */
	function gb_slick_needs_nav( array $a, string $type ): bool {
		if ( ! empty( $a[ $type ] ) ) {
			return true;
		}

		if ( empty( $a['responsive'] ) || ! is_array( $a['responsive'] ) ) {
			return false;
		}

		foreach ( $a['responsive'] as $breakpoint ) {
			if ( ! empty( $breakpoint['settings'][ $type ] ) ) {
				return true;
			}
		}

		return false;
	}

endif;

if ( ! function_exists( 'gb_slick_enqueue_assets' ) ) :

	/**
	 * Enqueues the Slick vendor assets and the view script.
	 *
	 * Called from the block render callbacks so the assets only load on pages
	 * that actually contain a slider. Handles are registered in plugin.php.
	 *
	 * @return void
	 */
	function gb_slick_enqueue_assets(): void {
		wp_enqueue_style( 'slick' );
		wp_enqueue_style( 'slick-theme' );
		wp_enqueue_script( 'slick-js' );
		wp_enqueue_script( 'gb-slick-view' );
	}

endif;

if ( ! function_exists( 'gb_slick_render_shell' ) ) :

	/**
	 * Wraps pre-rendered slides in the slider shell.
	 *
	 * @param array  $attributes  Raw block attributes.
	 * @param string $slides_html Already rendered slide markup.
	 * @param array  $extra_class Additional wrapper classes.
	 *
	 * @return string Complete block markup.
	 */
	function gb_slick_render_shell( array $attributes, string $slides_html, array $extra_class = array() ): string {
		if ( '' === trim( $slides_html ) ) {
			return '';
		}

		gb_slick_enqueue_assets();

		$a = gb_slick_prepare_attributes( $attributes );

		$classes = trim( gb_slick_build_classes( $a ) . ' ' . implode( ' ', array_map( 'sanitize_html_class', $extra_class ) ) );

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'         => $classes,
				'style'         => gb_slick_build_css_vars( $a ),
				'data-slick'    => wp_json_encode( gb_slick_build_options( $a ) ),
				'data-slick-ui' => wp_json_encode( gb_slick_build_ui_config( $a ) ),
			)
		);

		$arrows_container = gb_slick_needs_nav( $a, 'arrows' ) ? '<div class="gbss__arrows" data-gbss-role="arrows"></div>' : '';
		$dots_container   = gb_slick_needs_nav( $a, 'dots' ) ? '<div class="gbss__dots" data-gbss-role="dots"></div>' : '';

		return sprintf(
			'<div %1$s>%2$s<div class="gbss__viewport">%3$s</div>%4$s</div>',
			$wrapper_attributes,
			$arrows_container,
			$slides_html,
			$dots_container
		);
	}

endif;
