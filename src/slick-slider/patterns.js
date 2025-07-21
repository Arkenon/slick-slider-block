 const patterns = [
	{
		id: 1,
		name: 'Pattern 1',
		preview: 'https://via.placeholder.com/150x80?text=Pattern+1',
		blocks: [
			{
				name: 'gb-for-slick-slider/slick-slider-item',
				attributes: {
					slideMargin: 2,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*xMuIOwjliGUPjkzukeWKfw.jpeg',
							dimRatio: 50,
							minHeight: 400,
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
					slideMargin: 2,
				},
				innerBlocks: [
					{
						name: 'core/cover',
						attributes: {
							url: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*xMuIOwjliGUPjkzukeWKfw.jpeg',
							dimRatio: 50,
							minHeight: 400,
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
			slideMargin: 2,
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
		name: 'Pattern 2',
		preview: 'https://via.placeholder.com/150x80?text=Pattern+2',
	},
	{
		id: 3,
		name: 'Pattern 3',
		preview: 'https://via.placeholder.com/150x80?text=Pattern+3',
	},
];

 export default patterns;
