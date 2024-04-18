import {__} from '@wordpress/i18n';
import {useBlockProps, InspectorControls, useInnerBlocksProps} from '@wordpress/block-editor';
import {
	ToggleControl,
	Panel,
	__experimentalHeading as Heading,
	__experimentalDivider as Divider,
	PanelBody,
	PanelRow,
	__experimentalNumberControl as NumberControl
} from '@wordpress/components';
import './editor.scss';

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
			responsive
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

	function updateResponsiveSettings(breakpoint, key, value) {
		const newResponsiveSettings = [...responsive];
		const item = newResponsiveSettings.find(
			a => a.breakpoint === breakpoint
		);

		if (item) {
			item.settings[key] = value;
			setAttributes({responsive: newResponsiveSettings});
		}
	}

	const handleSlidesToShow = (val) => {
		setAttributes({slidesToShow: Number(val)})
		if (Number(val) === 1) {
			console.log(val)
			setAttributes({centerMode: false});
		}
	}

	return (
		<>
			<section {...innerBlocksProps} />

			<InspectorControls>
				<Panel>
					<PanelBody title={__('General Settings', 'gb-for-slick-slider')} initialOpen={true}>
						<PanelRow>
							<NumberControl
								label="Gap between slides "
								value={slideMargin}
								onChange={(val) => setAttributes({slideMargin: Number(val)})}
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label="Slides to show "
								value={slidesToShow}
								onChange={handleSlidesToShow}
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
								onChange={(val) => setAttributes({infinite: val})}
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label="Slides to scroll "
								value={slidesToScroll}
								onChange={(val) => setAttributes({slidesToScroll: Number(val)})}
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label="Slide speed"
								value={slideSpeed}
								onChange={(val) => setAttributes({slideSpeed: Number(val)})}
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
								onChange={(val) => setAttributes({arrows: val})}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Autoplay"
								help={
									autoplay
										? 'Yes'
										: 'No'
								}
								checked={autoplay}
								onChange={(val) => setAttributes({autoplay: val})}
							/>
						</PanelRow>
						{autoplay &&
							<PanelRow>
								<NumberControl
									label="Autoplay speed "
									value={autoplaySpeed}
									onChange={(val) => setAttributes({autoplaySpeed: Number(val)})}
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
								onChange={(val) => setAttributes({adaptiveHeight: val})}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>

				<Panel>
					<PanelBody title={__('Responsive Settings', 'gb-for-slick-slider')} initialOpen={false}>
						{responsive.map(function (breakpoint, index) {
							return (
								<div key={index}>
									<Divider/>
									<Heading level={2}>Breakpoint: {breakpoint.breakpoint}px</Heading>
									<Divider/>
									<PanelRow>
										<NumberControl
											label="Slides to show "
											value={breakpoint.settings.slidesToShow}
											onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'slidesToShow', val)}
										/>
									</PanelRow>
									<PanelRow>
										<NumberControl
											label="Slides to scroll "
											value={breakpoint.settings.slidesToScroll}
											onChange={(val) => updateResponsiveSettings(breakpoint.breakpoint, 'slidesToScroll', val)}
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

