import {useBlockProps, useInnerBlocksProps, useEffect} from '@wordpress/block-editor';
import {getBlockTypes} from '@wordpress/blocks';
import './editor.scss';

export default function Edit(props) {

	const { attributes, setAttributes } = props;
	const { slideMargin } = attributes;

	const {context} = props;

	const _slideMargin = context["gb-for-slick-slider/slideMargin"];
	const _slidesToShow = context["gb-for-slick-slider/slidesToShow"];

	const blockStyles = {
		minWidth: (100 / _slidesToShow) + '%',
		marginRight: _slideMargin + 'px',
		marginLeft: _slideMargin + 'px',
	}

	setAttributes({slideMargin: _slideMargin})

	const blockProps = useBlockProps({
		style: blockStyles
	});

	const _blockTypes = getBlockTypes();

	const ALLOWED_BLOCKS = [''];

	_blockTypes.forEach(function (blockType) {

		if (blockType.name !== "gb-for-slick-slider/slick-slider" && blockType.name !== "gb-for-slick-slider/slick-slider-item") {
			ALLOWED_BLOCKS.push(blockType.name);
		}

	});

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: ALLOWED_BLOCKS,
		}
	);

	return (
		<div
			{...innerBlocksProps}
		/>
	);

}

