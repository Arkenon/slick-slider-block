import { useState } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';

import SliderInspectorControls, {
	SliderToolbarControls,
} from '../shared/slider-inspector';
import {
	getSliderClassName,
	getSliderStyle,
	ArrowsPreview,
	DotsPreview,
} from '../shared/preview';
import TemplatePicker from './template-picker';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gb-for-slick-slider/slick-slider-item' ];

/**
 * Recursively turns a plain template definition into real blocks.
 *
 * @param {Array} definitions Template block definitions.
 * @return {Array} Block instances.
 */
function createBlocksFromTemplate( definitions ) {
	return ( definitions || [] ).map( ( definition ) =>
		createBlock(
			definition.name,
			definition.attributes || {},
			createBlocksFromTemplate( definition.innerBlocks )
		)
	);
}

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;

	const [ isTemplateDismissed, setTemplateDismissed ] = useState( false );

	const slideCount = useSelect(
		( select ) =>
			select( blockEditorStore ).getBlock( clientId )?.innerBlocks
				.length ?? 0,
		[ clientId ]
	);

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	const blockProps = useBlockProps( {
		className: getSliderClassName( attributes ),
		style: getSliderStyle( attributes ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'gbss__viewport' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'horizontal',
		}
	);

	/**
	 * Applies a template: its slider settings first, then its slides.
	 *
	 * @param {Object} template Template definition.
	 */
	const applyTemplate = ( template ) => {
		setTemplateDismissed( true );

		if ( template.attributes ) {
			setAttributes( template.attributes );
		}

		if ( template.blocks?.length ) {
			replaceInnerBlocks(
				clientId,
				createBlocksFromTemplate( template.blocks ),
				false
			);
		}
	};

	const showTemplatePicker = ! slideCount && ! isTemplateDismissed;

	return (
		<>
			<SliderToolbarControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<SliderInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div { ...blockProps }>
				{ showTemplatePicker ? (
					<TemplatePicker
						onSelect={ applyTemplate }
						onSkip={ () => setTemplateDismissed( true ) }
					/>
				) : (
					<>
						<ArrowsPreview attributes={ attributes } />
						<div { ...innerBlocksProps } />
						<DotsPreview
							attributes={ attributes }
							count={ slideCount }
						/>
					</>
				) }
			</div>
		</>
	);
}
