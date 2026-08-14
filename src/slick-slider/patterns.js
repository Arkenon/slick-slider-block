/**
 * Ready-made slider templates offered when a Slick Slider block is inserted.
 *
 * Each entry carries both the slider settings and the slides, so picking a
 * template gives a finished starting point rather than an empty shell. Unlike
 * 1.x, every template also sets its arrow and pagination styling.
 *
 * Previews are drawn as schematics by the template picker instead of shipping
 * screenshots, so they always match the actual settings.
 */

import { __ } from '@wordpress/i18n';

const assetsUrl = window.gbSlickSliderData?.assetsUrl ?? '';
const sampleImage = assetsUrl
	? `${ assetsUrl }img/gb-for-slick-slider-sample-bg.jpg`
	: '';

/**
 * Default responsive ladder - identical to the block's attribute default.
 *
 * @param {number} laptop Slides shown on laptops.
 * @return {Array} Responsive settings.
 */
const responsive = ( laptop = 1 ) => [
	{
		breakpoint: 1024,
		settings: {
			slidesToShow: laptop,
			slidesToScroll: 1,
			arrows: true,
			dots: true,
		},
	},
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
		},
	},
	{
		breakpoint: 600,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
		},
	},
	{
		breakpoint: 480,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: true,
		},
	},
];

/**
 * Wraps content blocks in a slider item.
 *
 * @param {Array}  innerBlocks Slide content.
 * @param {number} slideMargin Horizontal margin.
 * @return {Object} Slide definition.
 */
const slide = ( innerBlocks, slideMargin = 0 ) => ( {
	name: 'gb-for-slick-slider/slick-slider-item',
	attributes: { slideMargin },
	innerBlocks,
} );

/**
 * Cover block with a heading and a paragraph on top.
 *
 * @param {string} heading   Heading text.
 * @param {string} text      Paragraph text.
 * @param {number} minHeight Cover height in pixels.
 * @param {number} dimRatio  Overlay strength.
 * @return {Object} Block definition.
 */
const cover = ( heading, text, minHeight = 520, dimRatio = 50 ) => ( {
	name: 'core/cover',
	attributes: {
		url: sampleImage,
		dimRatio,
		minHeight,
		minHeightUnit: 'px',
		align: 'full',
		contentPosition: 'center center',
	},
	innerBlocks: [
		{
			name: 'core/heading',
			attributes: { textAlign: 'center', level: 2, content: heading },
		},
		{
			name: 'core/paragraph',
			attributes: { align: 'center', fontSize: 'medium', content: text },
		},
	],
} );

/**
 * Image, heading and paragraph stacked as a card.
 *
 * @param {string} heading Card title.
 * @param {string} text    Card body.
 * @return {Array} Block definitions.
 */
const card = ( heading, text ) => [
	{ name: 'core/image', attributes: { url: sampleImage, sizeSlug: 'large' } },
	{ name: 'core/heading', attributes: { level: 3, content: heading } },
	{ name: 'core/paragraph', attributes: { content: text } },
];

const templates = [
	{
		id: 'single-item',
		name: __( 'Single item', 'gb-for-slick-slider' ),
		description: __(
			'One full-width slide at a time, on autoplay.',
			'gb-for-slick-slider'
		),
		category: 'basic',
		preview: { slides: 1, arrows: 'sides', dots: 'bottom-center' },
		attributes: {
			align: 'full',
			slidesToShow: 1,
			slidesToScroll: 1,
			slideMargin: 0,
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 4000,
			fade: false,
			arrowStyle: 'chevron',
			arrowPosition: 'sides-inside',
			arrowBorderStyle: 'circle',
			dotStyle: 'dots',
			dotPosition: 'bottom-center',
			responsive: responsive( 1 ),
		},
		blocks: [
			slide( [
				cover(
					__( 'Your headline', 'gb-for-slick-slider' ),
					__( 'A short supporting sentence.', 'gb-for-slick-slider' )
				),
			] ),
			slide( [
				cover(
					__( 'Second slide', 'gb-for-slick-slider' ),
					__(
						'Swap the images and text for your own.',
						'gb-for-slick-slider'
					)
				),
			] ),
		],
	},
	{
		id: 'multiple-items',
		name: __( 'Multiple items', 'gb-for-slick-slider' ),
		description: __(
			'Two slides side by side with a gap.',
			'gb-for-slick-slider'
		),
		category: 'basic',
		preview: { slides: 2, arrows: 'sides', dots: 'bottom-center' },
		attributes: {
			slidesToShow: 2,
			slidesToScroll: 1,
			slideMargin: 5,
			dots: true,
			arrows: true,
			infinite: true,
			arrowStyle: 'chevron',
			arrowPosition: 'sides',
			arrowBorderStyle: 'circle',
			dotStyle: 'dots',
			dotPosition: 'bottom-center',
			responsive: responsive( 2 ),
		},
		blocks: [
			slide( [ cover( __( 'One', 'gb-for-slick-slider' ), '' ) ], 5 ),
			slide( [ cover( __( 'Two', 'gb-for-slick-slider' ), '' ) ], 5 ),
			slide( [ cover( __( 'Three', 'gb-for-slick-slider' ), '' ) ], 5 ),
			slide( [ cover( __( 'Four', 'gb-for-slick-slider' ), '' ) ], 5 ),
		],
	},
	{
		id: 'center-mode',
		name: __( 'Center mode', 'gb-for-slick-slider' ),
		description: __(
			'Highlights the middle slide and peeks the neighbours.',
			'gb-for-slick-slider'
		),
		category: 'basic',
		preview: {
			slides: 3,
			arrows: 'sides',
			dots: 'bottom-center',
			center: true,
		},
		attributes: {
			slidesToShow: 3,
			slidesToScroll: 1,
			slideMargin: 5,
			centerMode: true,
			dots: true,
			arrows: true,
			infinite: true,
			arrowStyle: 'chevron-thin',
			arrowPosition: 'sides',
			arrowBorderStyle: 'circle',
			dotStyle: 'bars',
			dotPosition: 'bottom-center',
			responsive: responsive( 2 ),
		},
		blocks: [
			slide( [ cover( __( 'One', 'gb-for-slick-slider' ), '' ) ], 5 ),
			slide( [ cover( __( 'Two', 'gb-for-slick-slider' ), '' ) ], 5 ),
			slide( [ cover( __( 'Three', 'gb-for-slick-slider' ), '' ) ], 5 ),
			slide( [ cover( __( 'Four', 'gb-for-slick-slider' ), '' ) ], 5 ),
		],
	},
	{
		id: 'fade',
		name: __( 'Fade', 'gb-for-slick-slider' ),
		description: __(
			'Cross-fades between full-width slides.',
			'gb-for-slick-slider'
		),
		category: 'basic',
		preview: { slides: 1, arrows: 'sides-inside', dots: 'overlay-bottom' },
		attributes: {
			align: 'full',
			slidesToShow: 1,
			slidesToScroll: 1,
			slideMargin: 0,
			fade: true,
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			arrowStyle: 'arrow-long',
			arrowPosition: 'sides-inside',
			arrowBorderStyle: 'none',
			arrowColor: '#ffffff',
			dotStyle: 'lines',
			dotPosition: 'overlay-bottom',
			dotColor: '#ffffff80',
			dotActiveColor: '#ffffff',
			responsive: responsive( 1 ),
		},
		blocks: [
			slide( [
				cover( __( 'Fade in', 'gb-for-slick-slider' ), '', 600, 60 ),
			] ),
			slide( [
				cover( __( 'Fade out', 'gb-for-slick-slider' ), '', 600, 60 ),
			] ),
		],
	},
	{
		id: 'hero',
		name: __( 'Hero', 'gb-for-slick-slider' ),
		description: __(
			'Tall full-width banner with overlaid controls.',
			'gb-for-slick-slider'
		),
		category: 'media',
		preview: {
			slides: 1,
			arrows: 'sides-inside',
			dots: 'overlay-bottom',
			tall: true,
		},
		attributes: {
			align: 'full',
			slidesToShow: 1,
			slidesToScroll: 1,
			slideMargin: 0,
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 6000,
			slideSpeed: 700,
			arrowStyle: 'angle-double',
			arrowPosition: 'sides-inside',
			arrowBorderStyle: 'circle',
			arrowColor: '#ffffff',
			arrowBorderColor: '#ffffff66',
			arrowHoverBackgroundColor: '#ffffff26',
			arrowHeight: 52,
			dotStyle: 'bars',
			dotPosition: 'overlay-bottom',
			dotColor: '#ffffff80',
			dotActiveColor: '#ffffff',
			responsive: responsive( 1 ),
		},
		blocks: [
			slide( [
				cover(
					__( 'Build something great', 'gb-for-slick-slider' ),
					__(
						'Replace this with your own message.',
						'gb-for-slick-slider'
					),
					640,
					55
				),
			] ),
			slide( [
				cover(
					__( 'Tell your story', 'gb-for-slick-slider' ),
					__(
						'Every slide is made of core blocks.',
						'gb-for-slick-slider'
					),
					640,
					55
				),
			] ),
		],
	},
	{
		id: 'testimonials',
		name: __( 'Testimonials', 'gb-for-slick-slider' ),
		description: __(
			'One quote at a time with subtle pagination.',
			'gb-for-slick-slider'
		),
		category: 'content',
		preview: { slides: 1, arrows: 'split-bottom', dots: 'bottom-center' },
		attributes: {
			slidesToShow: 1,
			slidesToScroll: 1,
			slideMargin: 0,
			dots: true,
			arrows: true,
			infinite: true,
			adaptiveHeight: true,
			arrowStyle: 'simple-arrow',
			arrowPosition: 'split-bottom',
			arrowBorderStyle: 'circle',
			arrowHeight: 44,
			dotStyle: 'dots',
			dotPosition: 'bottom-center',
			responsive: responsive( 1 ),
		},
		blocks: [
			slide( [
				{
					name: 'core/quote',
					attributes: {
						citation: __( 'Customer name', 'gb-for-slick-slider' ),
					},
					innerBlocks: [
						{
							name: 'core/paragraph',
							attributes: {
								content: __(
									'Something kind a customer said about you.',
									'gb-for-slick-slider'
								),
							},
						},
					],
				},
			] ),
			slide( [
				{
					name: 'core/quote',
					attributes: {
						citation: __(
							'Another customer',
							'gb-for-slick-slider'
						),
					},
					innerBlocks: [
						{
							name: 'core/paragraph',
							attributes: {
								content: __(
									'A second testimonial goes here.',
									'gb-for-slick-slider'
								),
							},
						},
					],
				},
			] ),
		],
	},
	{
		id: 'logo-carousel',
		name: __( 'Logo carousel', 'gb-for-slick-slider' ),
		description: __(
			'Five logos scrolling continuously, no pagination.',
			'gb-for-slick-slider'
		),
		category: 'media',
		preview: { slides: 5, arrows: 'sides', dots: false },
		attributes: {
			slidesToShow: 5,
			slidesToScroll: 1,
			slideMargin: 15,
			dots: false,
			arrows: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			slideSpeed: 600,
			arrowStyle: 'caret',
			arrowPosition: 'sides',
			arrowBorderStyle: 'none',
			arrowHeight: 32,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						arrows: true,
						dots: false,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: false,
						dots: false,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: false,
						dots: false,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						arrows: false,
						dots: false,
					},
				},
			],
		},
		blocks: Array.from( { length: 6 } ).map( () =>
			slide(
				[
					{
						name: 'core/image',
						attributes: { url: sampleImage, sizeSlug: 'thumbnail' },
					},
				],
				15
			)
		),
	},
	{
		id: 'team-cards',
		name: __( 'Team cards', 'gb-for-slick-slider' ),
		description: __(
			'Three portrait cards per view.',
			'gb-for-slick-slider'
		),
		category: 'content',
		preview: { slides: 3, arrows: 'top-right', dots: false },
		attributes: {
			slidesToShow: 3,
			slidesToScroll: 1,
			slideMargin: 12,
			dots: false,
			arrows: true,
			infinite: false,
			arrowStyle: 'chevron',
			arrowPosition: 'top-right',
			arrowBorderStyle: 'circle',
			arrowHeight: 36,
			responsive: responsive( 2 ),
		},
		blocks: [
			slide(
				card(
					__( 'Team member', 'gb-for-slick-slider' ),
					__( 'Role or short bio.', 'gb-for-slick-slider' )
				),
				12
			),
			slide(
				card(
					__( 'Team member', 'gb-for-slick-slider' ),
					__( 'Role or short bio.', 'gb-for-slick-slider' )
				),
				12
			),
			slide(
				card(
					__( 'Team member', 'gb-for-slick-slider' ),
					__( 'Role or short bio.', 'gb-for-slick-slider' )
				),
				12
			),
			slide(
				card(
					__( 'Team member', 'gb-for-slick-slider' ),
					__( 'Role or short bio.', 'gb-for-slick-slider' )
				),
				12
			),
		],
	},
	{
		id: 'product-cards',
		name: __( 'Product cards', 'gb-for-slick-slider' ),
		description: __(
			'Four cards per view with a call to action.',
			'gb-for-slick-slider'
		),
		category: 'content',
		preview: { slides: 4, arrows: 'bottom-right', dots: 'bottom-left' },
		attributes: {
			slidesToShow: 4,
			slidesToScroll: 2,
			slideMargin: 10,
			dots: true,
			arrows: true,
			infinite: false,
			arrowStyle: 'chevron',
			arrowPosition: 'bottom-right',
			arrowBorderStyle: 'square',
			arrowHeight: 36,
			dotStyle: 'numbers',
			dotPosition: 'bottom-left',
			responsive: responsive( 3 ),
		},
		blocks: Array.from( { length: 6 } ).map( () =>
			slide(
				[
					...card(
						__( 'Product name', 'gb-for-slick-slider' ),
						__( 'A one line description.', 'gb-for-slick-slider' )
					),
					{
						name: 'core/buttons',
						innerBlocks: [
							{
								name: 'core/button',
								attributes: {
									text: __( 'View', 'gb-for-slick-slider' ),
								},
							},
						],
					},
				],
				10
			)
		),
	},
	{
		id: 'gallery',
		name: __( 'Gallery', 'gb-for-slick-slider' ),
		description: __(
			'Three images per view with a progress bar.',
			'gb-for-slick-slider'
		),
		category: 'media',
		preview: {
			slides: 3,
			arrows: 'sides-inside',
			dots: 'bottom-center',
			progress: true,
		},
		attributes: {
			slidesToShow: 3,
			slidesToScroll: 1,
			slideMargin: 8,
			dots: true,
			arrows: true,
			infinite: true,
			arrowStyle: 'chevron-thin',
			arrowPosition: 'sides-inside',
			arrowBorderStyle: 'circle',
			arrowBackgroundColor: '#ffffffcc',
			arrowColor: '#111111',
			dotStyle: 'progress',
			dotPosition: 'bottom-center',
			responsive: responsive( 2 ),
		},
		blocks: Array.from( { length: 6 } ).map( () =>
			slide(
				[
					{
						name: 'core/image',
						attributes: { url: sampleImage, sizeSlug: 'large' },
					},
				],
				8
			)
		),
	},
];

export const TEMPLATE_CATEGORIES = [
	{ value: 'all', label: __( 'All', 'gb-for-slick-slider' ) },
	{ value: 'basic', label: __( 'Basic', 'gb-for-slick-slider' ) },
	{ value: 'content', label: __( 'Content', 'gb-for-slick-slider' ) },
	{ value: 'media', label: __( 'Media', 'gb-for-slick-slider' ) },
];

export default templates;
