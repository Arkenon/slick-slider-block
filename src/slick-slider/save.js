import {useBlockProps, useInnerBlocksProps} from '@wordpress/block-editor';
import './style.scss';

/**
 * NOTE: this block is dynamic - the front-end markup comes from render.php and
 * the output below is never displayed. It is kept byte-for-byte as it was in 1.x
 * on purpose: this markup is already stored in the post content of every
 * existing installation, and changing it would invalidate those blocks. Do not
 * "modernise" this function; add a `deprecated` entry first if it ever must change.
 */
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
		`"centerMode":${attr.centerMode},` +
		`"responsive": ${JSON.stringify(attr.responsive)}` +
		`}`;


	return <section
		className='gb-for-slick-slider'
		data-slick={options}
		{...innerBlocksProps}
	/>
}
