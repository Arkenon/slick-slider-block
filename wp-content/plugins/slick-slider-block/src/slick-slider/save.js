import {useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';
import './style.scss';

export default function save(props) {

	const blockProps = useBlockProps.save(props);
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	const attr = props.attributes;

	const options = `{"dots":${attr.dots},` +
		`"arrows":${attr.arrows},` +
		`"slidesToShow":${attr.slidesToShow},` +
		`"slidesToScroll":${attr.slidesToScroll},` +
		`"infinite":${attr.infinite},` +
		`"adaptiveHeight":${attr.adaptiveHeight},` +
		`"autoplay":${attr.autoplay},` +
		`"autoplaySpeed":${attr.autoplaySpeed},` +
		`"fade":${attr.fade},` +
		`"speed":${attr.slideSpeed},` +
		`"centerMode":${attr.infinite},` +
		`"responsive": [ {"breakpoint": 1920, "settings": {"slidesToShow": ${attr.slidesToShow}, "slidesToScroll": ${attr.slidesToScroll}}}, {"breakpoint": 768, "settings": {"slidesToShow": 2, "slidesToScroll": 1}}, {"breakpoint": 600, "settings": {"slidesToShow": 1, "slidesToScroll": 1,"arrows":false,"dots":true}}]` +
		`}`;


	return <section
		className='gb-for-slick-slider'
		data-slick={options}
		{...innerBlocksProps}
	/>
}
