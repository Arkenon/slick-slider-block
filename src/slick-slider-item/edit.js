import { useEffect } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getBlockTypes } from '@wordpress/blocks';
import './editor.scss';

const PLUGIN_BLOCKS = [
	'gb-for-slick-slider/slick-slider',
	'gb-for-slick-slider/slick-slider-item',
	'gb-for-slick-slider/post-slider',
];

export default function Edit( props ) {
	const { attributes, setAttributes, context } = props;

	const parentSlideMargin = context[ 'gb-for-slick-slider/slideMargin' ] ?? 0;
	const parentSlidesToShow =
		context[ 'gb-for-slick-slider/slidesToShow' ] ?? 1;

	// The gap is configured on the parent slider; mirror it into this block's
	// own attribute so save.js can write it into the stored markup.
	useEffect( () => {
		if ( attributes.slideMargin !== parentSlideMargin ) {
			setAttributes( { slideMargin: parentSlideMargin } );
		}
	}, [ parentSlideMargin, attributes.slideMargin, setAttributes ] );

	const blockProps = useBlockProps( {
		style: {
			flex: `0 0 calc(${ 100 / Math.max( 1, parentSlidesToShow ) }% - ${
				parentSlideMargin * 2
			}px)`,
			marginRight: `${ parentSlideMargin }px`,
			marginLeft: `${ parentSlideMargin }px`,
		},
	} );

	const allowedBlocks = getBlockTypes()
		.map( ( blockType ) => blockType.name )
		.filter( ( name ) => ! PLUGIN_BLOCKS.includes( name ) );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks,
	} );

	return <div { ...innerBlocksProps } />;
}
