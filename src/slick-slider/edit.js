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
	SelectControl,
	ColorPicker
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
			arrowBorderStyle,
			arrowBackgroundColor,
			arrowColor,
			arrowPosition,
			arrowFontSize,
			arrowHeight
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
		// Tüm pattern'ler için blocks varsa ekle
		if (pattern.blocks && pattern.blocks.length > 0) {
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
				<div className="gb-for-slick-slider-inspector">
					<Panel>
						<PanelBody title={__('General Settings', 'gb-for-slick-slider')} initialOpen={true}>
							<PanelRow>
								<NumberControl
									label={__('Gap between slides (px)', 'gb-for-slick-slider')}
									min={0}
									value={slideMargin}
									onChange={(val) => setAttributes({slideMargin: Number(val)})}
									__next40pxDefaultSize
								/>
							</PanelRow>
							<PanelRow>
								<NumberControl
									label={__('Slides to show', 'gb-for-slick-slider')}
									min={1}
									value={slidesToShow}
									onChange={(val) => handleSlidesToShow(Number(val))}
									__next40pxDefaultSize
								/>
							</PanelRow>
							{slidesToShow <= 1 &&
								<PanelRow>
									<ToggleControl
										label={__('Fade', 'gb-for-slick-slider')}
										checked={fade}
										onChange={(val) => setAttributes({fade: val})}
										__nextHasNoMarginBottom
									/>
								</PanelRow>
							}
							{slidesToShow > 1 &&
								<PanelRow>
									<ToggleControl
										label={__('Center Mode', 'gb-for-slick-slider')}
										checked={centerMode}
										__nextHasNoMarginBottom
										onChange={(val) => setAttributes({centerMode: val})}
									/>
								</PanelRow>
							}
							<PanelRow>
								<NumberControl
									label={__('Slides to scroll', 'gb-for-slick-slider')}
									value={slidesToScroll}
									onChange={(val) => setAttributes({slidesToScroll: Number(val)})}
									__next40pxDefaultSize
								/>
							</PanelRow>
							<PanelRow>
								<NumberControl
									label={__('Slide speed', 'gb-for-slick-slider')}
									value={slideSpeed}
									onChange={(val) => setAttributes({slideSpeed: Number(val)})}
									__next40pxDefaultSize
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Autoplay', 'gb-for-slick-slider')}
									checked={autoplay}
									__nextHasNoMarginBottom
									onChange={(val) => setAttributes({autoplay: val})}
								/>
							</PanelRow>
							{autoplay &&
								<PanelRow>
									<NumberControl
										label={__('Autoplay speed', 'gb-for-slick-slider')}
										value={autoplaySpeed}
										onChange={(val) => setAttributes({autoplaySpeed: Number(val)})}
										__next40pxDefaultSize
									/>
								</PanelRow>
							}
							<PanelRow>
								<ToggleControl
									label={__('Infinite loop', 'gb-for-slick-slider')}
									checked={infinite}
									__nextHasNoMarginBottom
									onChange={(val) => setAttributes({infinite: val})}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Show Dots', 'gb-for-slick-slider')}
									checked={dots}
									__nextHasNoMarginBottom
									onChange={(val) => setAttributes({dots: val})}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Adaptive Height', 'gb-for-slick-slider')}
									checked={adaptiveHeight}
									__nextHasNoMarginBottom
									onChange={(val) => setAttributes({adaptiveHeight: val})}
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
					<Panel>
						<PanelBody title={__('Arrow Settings', 'gb-for-slick-slider')} initialOpen={false}>
							<PanelRow>
								<ToggleControl
									label={__('Show Arrows', 'gb-for-slick-slider')}
									help={
										arrows
											? __('Show arrows', 'gb-for-slick-slider')
											: __('Hide arrows', 'gb-for-slick-slider')
									}
									checked={arrows}
									__nextHasNoMarginBottom
									onChange={(val) => setAttributes({arrows: val})}
								/>
							</PanelRow>
							{arrows &&
								<PanelRow>
									<SelectControl
										label={__('Arrow Style', 'gb-for-slick-slider')}
										value={arrowStyle}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
										options={[
											{label: __('Chevron (< >)', 'gb-for-slick-slider'), value: 'chevron'},
											{
												label: __('Simple Arrow (← →)', 'gb-for-slick-slider'),
												value: 'simple-arrow'
											}
										]}
										onChange={(val) => setAttributes({arrowStyle: val})}
									/>
								</PanelRow>
							}
							{arrows && !dots &&
								<PanelRow>
									<SelectControl
										label={__('Arrow Position', 'gb-for-slick-slider')}
										value={arrowPosition}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
										options={[
											{label: __('Sides (Default)', 'gb-for-slick-slider'), value: 'sides'},
											{label: __('Bottom Center', 'gb-for-slick-slider'), value: 'bottom'}
										]}
										onChange={(val) => setAttributes({arrowPosition: val})}
									/>
								</PanelRow>
							}
							{arrows &&
								<>
									<PanelRow>
										<NumberControl
											label={__('Arrow font size (px)', 'gb-for-slick-slider')}
											value={arrowFontSize}
											min={10}
											max={100}
											onChange={(val) => setAttributes({arrowFontSize: Number(val)})}
											__next40pxDefaultSize
										/>
									</PanelRow>
									<PanelRow>
										<NumberControl
											label={__('Arrow Height (px)', 'gb-for-slick-slider')}
											value={arrowHeight}
											min={40}
											max={100}
											onChange={(val) => setAttributes({arrowHeight: Number(val)})}
											__next40pxDefaultSize
										/>
									</PanelRow>
									<PanelRow>
										<SelectControl
											label={__('Arrow Border Style', 'gb-for-slick-slider')}
											value={arrowBorderStyle}
											__next40pxDefaultSize
											__nextHasNoMarginBottom
											options={[
												{label: __('Circle', 'gb-for-slick-slider'), value: 'circle'},
												{label: __('Rounded', 'gb-for-slick-slider'), value: 'rounded'},
												{label: __('Square', 'gb-for-slick-slider'), value: 'square'},
												{label: __('None', 'gb-for-slick-slider'), value: 'none'}
											]}
											onChange={(val) => setAttributes({arrowBorderStyle: val})}
										/>
									</PanelRow>
									<PanelRow>
										<SelectControl
											label={__('Arrow Border Style', 'gb-for-slick-slider')}
											value={arrowBorderStyle}
											__next40pxDefaultSize
											__nextHasNoMarginBottom
											options={[
												{label: __('Rounded', 'gb-for-slick-slider'), value: 'rounded'},
												{label: __('Square', 'gb-for-slick-slider'), value: 'square'},
												{label: __('None', 'gb-for-slick-slider'), value: 'none'}
											]}
											onChange={(val) => setAttributes({arrowBorderStyle: val})}
										/>
									</PanelRow>
									<PanelRow>
										<div style={{marginBottom: '16px'}}>
											<label style={{display: 'block', marginBottom: '8px', fontWeight: 500}}>
												{__('Arrow Background Color', 'gb-for-slick-slider')}
											</label>
											<ColorPicker
												color={arrowBackgroundColor}
												onChangeComplete={(color) => setAttributes({arrowBackgroundColor: color.hex})}
											/>
										</div>
									</PanelRow>
									<PanelRow>
										<div style={{marginBottom: '16px'}}>
											<label style={{display: 'block', marginBottom: '8px', fontWeight: 500}}>
												{__('Arrow Color', 'gb-for-slick-slider')}
											</label>
											<ColorPicker
												color={arrowColor}
												onChangeComplete={(color) => setAttributes({arrowColor: color.hex})}
											/>
										</div>
									</PanelRow>
								</>
							}
						</PanelBody>
					</Panel>

					<Panel>
						<PanelBody title={__('Responsive Settings', 'gb-for-slick-slider')} initialOpen={false}>
							{localResponsive.map(function (breakpoint, index) {
								return (
									<div key={index}>
										<Divider/>
										<Heading
											level={2}>{__('Breakpoint', 'gb-for-slick-slider')}: {breakpoint.breakpoint}px</Heading>
										<Divider/>
										<PanelRow>
											<NumberControl
												label={__('Slides to show', 'gb-for-slick-slider')}
												value={breakpoint.settings.slidesToShow}
												onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'slidesToShow', Number(val))}
												__next40pxDefaultSize
											/>
										</PanelRow>
										<PanelRow>
											<NumberControl
												label={__('Slides to scroll', 'gb-for-slick-slider')}
												value={breakpoint.settings.slidesToScroll}
												onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'slidesToScroll', Number(val))}
												__next40pxDefaultSize
											/>
										</PanelRow>
										<PanelRow>
											<ToggleControl
												label={__('Show Arrows', 'gb-for-slick-slider')}
												help={
													breakpoint.settings.arrows
														? __('Show arrows', 'gb-for-slick-slider')
														: __('Hide arrows', 'gb-for-slick-slider')
												}
												checked={breakpoint.settings.arrows}
												__nextHasNoMarginBottom
												onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'arrows', val)}
											/>
										</PanelRow>
										<PanelRow>
											<ToggleControl
												label={__('Show Dots', 'gb-for-slick-slider')}
												help={
													breakpoint.settings.dots
														? __('Show dots', 'gb-for-slick-slider')
														: __('Hide dots', 'gb-for-slick-slider')
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
				</div>
			</InspectorControls>
		</>
	);
}

