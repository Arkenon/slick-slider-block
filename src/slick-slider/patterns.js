import {__} from '@wordpress/i18n';

const patterns = [
	{
		id: 1,
		name: __('Single Item', 'gb-for-slick-slider'),
		preview:  window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-single-item.jpg' : '',
		blocks: [
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 0,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 0,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
							style: {color: {duotone: ['#111111', '#FFFFFF']}},
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
		],
		attributes: {
			dots: true,
			infinite: true,
			autoplay: true,
			fade: true,
			slidesToShow: 1,
			slideMargin: 0,
			align: 'full',
			responsive: [
				{breakpoint: 1024, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: true, dots: true}},
				{breakpoint: 768, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
				{breakpoint: 600, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
				{breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
			],
			slideSpeed: 1000,
			arrows: true,
			adaptiveHeight: false,
			autoplaySpeed: 1500,
			centerMode: false,
			slidesToScroll: 1,
		},
	},
	{
		id: 2,
		name: __('Multiple Item', 'gb-for-slick-slider'),
		preview:  window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-multiple-item.jpg' : '',
		blocks: [
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
							style: {color: {duotone: ['#111111', '#FFFFFF']}},
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
							style: {color: {duotone: ['#111111', '#FFFFFF']}},
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
		],
		attributes: {
			dots: true,
			infinite: true,
			autoplay: true,
			fade: false,
			slidesToShow: 2,
			slideMargin: 5,
			align: 'full',
			responsive: [
				{breakpoint: 1024, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: true, dots: true}},
				{breakpoint: 768, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
				{breakpoint: 600, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
				{breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
			],
			slideSpeed: 1000,
			arrows: true,
			adaptiveHeight: false,
			autoplaySpeed: 1500,
			centerMode: false,
			slidesToScroll: 1,
		},
	},
	{
		id: 3,
		name: __('Center Mode', 'gb-for-slick-slider'),
		preview:  window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-center-mode.jpg' : '',
		blocks: [
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
							style: {color: {duotone: ['#111111', '#FFFFFF']}},
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 5,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: window.gbSlickSliderData ? window.gbSlickSliderData.assetsUrl + 'img/gb-for-slick-slider-sample-bg.jpg' : '',
							dimRatio: 50,
							minHeight: 600,
							minHeightUnit: 'px',
							align: 'full',
							style: {color: {duotone: ['#111111', '#FFFFFF']}},
						},
						innerBlocks: [
							{
								name: 'core/paragraph',
								attributes: {
									align: 'center',
									fontSize: 'large',
								},
							},
						],
					},
				],
			},
		],
		attributes: {
			dots: true,
			infinite: true,
			autoplay: true,
			fade: false,
			slidesToShow: 3,
			slideMargin: 5,
			align: 'full',
			responsive: [
				{breakpoint: 1024, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: true, dots: true}},
				{breakpoint: 768, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
				{breakpoint: 600, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
				{breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true}},
			],
			slideSpeed: 1000,
			arrows: true,
			adaptiveHeight: false,
			autoplaySpeed: 1500,
			centerMode: true,
			slidesToScroll: 1,
		},
	},
];

 export default patterns;
