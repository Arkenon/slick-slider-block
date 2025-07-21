import {useState, useEffect} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import {useBlockProps, InspectorControls, useInnerBlocksProps} from '@wordpress/block-editor';
import {
	ToggleControl,
	Panel,
	__experimentalHeading as Heading,
	__experimentalDivider as Divider,
	PanelBody,
	PanelRow,
	__experimentalNumberControl as NumberControl,
	Button,
	Modal,
	Card,
	CardBody,
	SelectControl
} from '@wordpress/components';
import {useSelect, dispatch} from '@wordpress/data';
import './editor.scss';
import patterns from './patterns.js';

export default function Edit(props) {

	const {
		attributes: {
			slidesToShow,
			slideMargin,
			slidesToScroll,
			slideSpeed,
			dots,
			arrows,
			infinite,
			autoplay,
			autoplaySpeed,
			centerMode,
			adaptiveHeight,
			fade,
			responsive,
			arrowStyle,
			arrowBorderStyle
		}, setAttributes
	} = props;

	const blockProps = useBlockProps(props);

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: ['gb-for-slick-slider/slick-slider-item'],
			orientation: "horizontal"
		}
	);

	const [localResponsive, setLocalResponsive] = useState(responsive);
	const [isPatternModalOpen, setPatternModalOpen] = useState(false);
	const [isPatternSelected, setPatternSelected] = useState(false);

	useEffect(() => {
		setLocalResponsive(responsive);
	}, [responsive]);

	function updateResponsiveSettings(breakpoint, key, value) {
		const newResponsiveSettings = localResponsive.map((item) => {
			if (item.breakpoint === breakpoint) {
				return {
					...item,
					settings: {
						...item.settings,
						[key]: value
					}
				};
			}
			return item;
		});
		setLocalResponsive(newResponsiveSettings);
		setAttributes({responsive: newResponsiveSettings});
	}

	const handleSlidesToShow = (val) => {
		setAttributes({slidesToShow: val})
		if (val === 1) {
			setAttributes({centerMode: false});
		} else {
			setAttributes({fade: false});
		}
	}

	// Check if the block has inner blocks
	const hasInnerBlocks = useSelect(
		(select) => select('core/block-editor').getBlock(props.clientId)?.innerBlocks.length > 0,
		[props.clientId]
	);

	// Insert pattern blocks into the slider
	const insertPatternBlocks = (pattern) => {
		if (!pattern.blocks) return;
		const {clientId} = props;
		const {attributes} = pattern;

		// Use slider options from the pattern if available
		if (attributes) {
			Object.keys(attributes).forEach((key) => {
				setAttributes({[key]: attributes[key]});
			});
		}

		// Create inner blocks from the pattern
		const innerBlocks = pattern.blocks.map((block) => {
			const innerBlocksArray = block.innerBlocks ?
				block.innerBlocks.map(inner =>
					wp.blocks.createBlock(
						inner.name,
						inner.attributes,
						inner.innerBlocks ?
							inner.innerBlocks.map(i => wp.blocks.createBlock(i.name, i.attributes)) :
							[]
					)
				) : [];

			return wp.blocks.createBlock(block.name, block.attributes, innerBlocksArray);
		});

		// Add the inner blocks to the slider block
		dispatch('core/block-editor').replaceInnerBlocks(clientId, innerBlocks);
	}

	const handlePatternSelect = (pattern) => {
		setPatternSelected(true);
		setPatternModalOpen(false);
		if (pattern.id === 1) {
			insertPatternBlocks(pattern);
		}
	};

	return (
		<>
			{
				// First ask the user to select a pattern or use a blank template
				!hasInnerBlocks && !isPatternSelected && (
					<div style={{textAlign: 'center', padding: '40px 0', border: '1px dashed #ccc'}}>
						<Button variant="primary" onClick={() => setPatternModalOpen(true)} style={{marginRight: '10px'}}>
							{__('Select Pattern', 'gb-for-slick-slider')}
						</Button>
						<Button variant="secondary" onClick={() => setPatternSelected(true)}>
							{__('Use Blank Template', 'gb-for-slick-slider')}
						</Button>
					</div>
				)
			}

			{
				// If the user has selected to use prebuilt patterns, show the modal
				isPatternModalOpen && (
					<Modal
						title={__('Select a Pattern', 'gb-for-slick-slider')}
						onRequestClose={() => setPatternModalOpen(false)}
					>
						<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
							{patterns.map((pattern) => (
								<Card key={pattern.id} style={{cursor: 'pointer'}}
									  onClick={() => handlePatternSelect(pattern)}>
									<CardBody>
										<img src={pattern.preview} alt={pattern.name}
											 style={{width: '100%', marginBottom: '10px'}}/>
										<div style={{textAlign: 'center'}}>{pattern.name}</div>
									</CardBody>
								</Card>
							))}
						</div>
					</Modal>
				)}

			{
				// Else show the default blank block inserter
				(hasInnerBlocks || isPatternSelected) && (
					<section {...innerBlocksProps} />
				)
			}

			<InspectorControls>
				<Panel>
					<PanelBody title={__('General Settings', 'gb-for-slick-slider')} initialOpen={true}>
						<PanelRow>
							<NumberControl
								label="Gap between slides "
								value={slideMargin}
								onChange={(val) => setAttributes({slideMargin: Number(val)})}
								__next40pxDefaultSize
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label="Slides to show "
								value={slidesToShow}
								onChange={(val) => handleSlidesToShow(Number(val))}
								__next40pxDefaultSize
							/>
						</PanelRow>
						{slidesToShow <= 1 &&
							<PanelRow>
								<ToggleControl
									label="Fade"
									help={
										fade
											? 'Yes'
											: 'No'
									}
									checked={fade}
									onChange={(val) => setAttributes({fade: val})}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
						}
						{slidesToShow > 1 &&
							<PanelRow>
								<ToggleControl
									label="Center Mode"
									help={
										centerMode
											? 'Yes'
											: 'No'
									}
									checked={centerMode}
									__nextHasNoMarginBottom
									onChange={(val) => setAttributes({centerMode: val})}
								/>
							</PanelRow>
						}
						<PanelRow>
							<ToggleControl
								label="Infinite loop"
								help={
									infinite
										? 'Yes'
										: 'No'
								}
								checked={infinite}
								__nextHasNoMarginBottom
								onChange={(val) => setAttributes({infinite: val})}
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label="Slides to scroll "
								value={slidesToScroll}
								onChange={(val) => setAttributes({slidesToScroll: Number(val)})}
								__next40pxDefaultSize
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label="Slide speed"
								value={slideSpeed}
								onChange={(val) => setAttributes({slideSpeed: Number(val)})}
								__next40pxDefaultSize
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Dots"
								help={
									dots
										? 'Show dots'
										: 'Hide dots'
								}
								checked={dots}
								__nextHasNoMarginBottom
								onChange={(val) => setAttributes({dots: val})}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Arrows"
								help={
									arrows
										? 'Show arrows'
										: 'Hide arrows'
								}
								checked={arrows}
								__nextHasNoMarginBottom
								onChange={(val) => setAttributes({arrows: val})}
							/>
						</PanelRow>
						{arrows &&
							<PanelRow>
								<SelectControl
									label="Arrow Style"
									value={arrowStyle}
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									options={[
										{label: 'Chevron (< >)', value: 'chevron'},
										{label: 'Simple Arrow (← →)', value: 'simple-arrow'},
										{label: 'Solid Triangle (⮜ ⮞)', value: 'solid-triangle'},
										{label: 'Triangle (⯇ ⯈)', value: 'triangle'},
									]}
									onChange={(val) => setAttributes({arrowStyle: val})}
								/>
							</PanelRow>
						}
						{arrows &&
							<PanelRow>
								<SelectControl
									label="Arrow Border Style"
									value={arrowBorderStyle}
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									options={[
										{label: 'Rounded', value: 'rounded'},
										{label: 'Square', value: 'square'},
										{label: 'None', value: 'none'}
									]}
									onChange={(val) => setAttributes({arrowBorderStyle: val})}
								/>
							</PanelRow>
						}
						<PanelRow>
							<ToggleControl
								label="Autoplay"
								help={
									autoplay
										? 'Yes'
										: 'No'
								}
								checked={autoplay}
								__nextHasNoMarginBottom
								onChange={(val) => setAttributes({autoplay: val})}
							/>
						</PanelRow>
						{autoplay &&
							<PanelRow>
								<NumberControl
									label="Autoplay speed "
									value={autoplaySpeed}
									onChange={(val) => setAttributes({autoplaySpeed: Number(val)})}
									__next40pxDefaultSize
								/>
							</PanelRow>
						}
						<PanelRow>
							<ToggleControl
								label="Adaptive Height"
								help={
									adaptiveHeight
										? 'Yes'
										: 'No'
								}
								checked={adaptiveHeight}
								__nextHasNoMarginBottom
								onChange={(val) => setAttributes({adaptiveHeight: val})}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={__('Responsive Settings', 'gb-for-slick-slider')} initialOpen={false}>
						{localResponsive.map(function (breakpoint, index) {
							return (
								<div key={index}>
									<Divider/>
									<Heading level={2}>Breakpoint: {breakpoint.breakpoint}px</Heading>
									<Divider/>
									<PanelRow>
										<NumberControl
											label="Slides to show "
											value={breakpoint.settings.slidesToShow}
											onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'slidesToShow', Number(val))}
											__next40pxDefaultSize
										/>
									</PanelRow>
									<PanelRow>
										<NumberControl
											label="Slides to scroll "
											value={breakpoint.settings.slidesToScroll}
											onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'slidesToScroll', Number(val))}
											__next40pxDefaultSize
										/>
									</PanelRow>
									<PanelRow>
										<ToggleControl
											label="Show Arrows"
											help={
												breakpoint.settings.arrows
													? 'Show arrows'
													: 'Hide arrows'
											}
											checked={breakpoint.settings.arrows}
											__nextHasNoMarginBottom
											onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'arrows', val)}
										/>
									</PanelRow>
									<PanelRow>
										<ToggleControl
											label="Show Dots"
											help={
												breakpoint.settings.dots
													? 'Show dots'
													: 'Hide dots'
											}
											checked={breakpoint.settings.dots}
											__nextHasNoMarginBottom
											onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'dots', val)}
										/>
									</PanelRow>
								</div>
							)
						})}
					</PanelBody>
				</Panel>
			</InspectorControls>
		</>
	);
}

