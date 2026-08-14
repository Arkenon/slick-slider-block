/**
 * Inspector controls shared by the Slick Slider and Post Slider blocks.
 *
 * Behavioural settings go in the native "Settings" tab, everything visual in
 * the native "Styles" tab, so the panel follows the same shape as core blocks
 * instead of the single flat list used in 1.x.
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	ToolbarGroup,
	ToolbarButton,
	/* eslint-disable @wordpress/no-unsafe-wp-apis -- Stable in practice since
	   WP 5.9 and used throughout core's own block inspectors. */
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	/* eslint-enable @wordpress/no-unsafe-wp-apis */
} from '@wordpress/components';

import ArrowIcon from './arrow-icon';
import {
	ARROW_ICON_LABELS,
	ARROW_POSITION_OPTIONS,
	ARROW_SHAPE_OPTIONS,
	DOT_STYLE_OPTIONS,
	DOT_POSITION_OPTIONS,
	BREAKPOINT_DEVICES,
} from './constants';

/**
 * Compact icon picker used for the arrow style.
 *
 * A ToggleGroupControl would squeeze seven options into one row; a wrapping
 * grid of icon buttons stays readable in the narrow inspector.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.value    Selected icon key.
 * @param {Function} props.onChange Change handler.
 * @return {Element} Icon grid.
 */
function ArrowIconPicker( { value, onChange } ) {
	return (
		<div className="gbss-icon-picker">
			{ Object.keys( ARROW_ICON_LABELS ).map( ( icon ) => (
				<Button
					key={ icon }
					className="gbss-icon-picker__button"
					isPressed={ value === icon }
					label={ ARROW_ICON_LABELS[ icon ] }
					showTooltip
					onClick={ () => onChange( icon ) }
				>
					<ArrowIcon icon={ icon } size={ 22 } />
				</Button>
			) ) }
		</div>
	);
}

/**
 * Toolbar shortcuts for the two settings people toggle most often.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @return {Element} Toolbar controls.
 */
export function SliderToolbarControls( { attributes, setAttributes } ) {
	const { arrows, dots } = attributes;

	return (
		<BlockControls group="other">
			<ToolbarGroup>
				<ToolbarButton
					isPressed={ arrows }
					onClick={ () => setAttributes( { arrows: ! arrows } ) }
				>
					{ __( 'Arrows', 'gb-for-slick-slider' ) }
				</ToolbarButton>
				<ToolbarButton
					isPressed={ dots }
					onClick={ () => setAttributes( { dots: ! dots } ) }
				>
					{ __( 'Dots', 'gb-for-slick-slider' ) }
				</ToolbarButton>
			</ToolbarGroup>
		</BlockControls>
	);
}

/**
 * Full inspector for a slider block.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {Element}  [props.children]    Block specific panels, rendered first
 *                                       in the Settings tab (e.g. query controls).
 * @return {Element} Inspector controls.
 */
export default function SliderInspectorControls( {
	attributes,
	setAttributes,
	children,
} ) {
	const {
		slidesToShow,
		slidesToScroll,
		slideMargin,
		slideSpeed,
		centerMode,
		fade,
		adaptiveHeight,
		autoplay,
		autoplaySpeed,
		pauseOnHover,
		infinite,
		arrows,
		dots,
		arrowStyle,
		arrowPosition,
		arrowBorderStyle,
		arrowFontSize,
		arrowHeight,
		arrowBorderWidth,
		arrowGap,
		arrowShadow,
		arrowColor,
		arrowBackgroundColor,
		arrowBorderColor,
		arrowHoverColor,
		arrowHoverBackgroundColor,
		dotStyle,
		dotPosition,
		dotSize,
		dotGap,
		dotColor,
		dotActiveColor,
		responsive,
	} = attributes;

	const breakpoints = responsive?.length ? responsive : [];
	const [ activeBreakpoint, setActiveBreakpoint ] = useState(
		breakpoints[ 0 ]?.breakpoint ?? BREAKPOINT_DEVICES[ 0 ].breakpoint
	);

	/**
	 * Slides-to-show drives two mutually exclusive options: fade only works
	 * with a single slide, center mode only with several. Kept from 1.x.
	 *
	 * @param {number} value New value.
	 */
	const handleSlidesToShow = ( value ) => {
		const next = { slidesToShow: value };

		if ( value === 1 ) {
			next.centerMode = false;
		} else {
			next.fade = false;
		}

		setAttributes( next );
	};

	/**
	 * Updates one setting of one breakpoint without changing the array shape.
	 *
	 * @param {number} breakpoint Breakpoint width.
	 * @param {string} key        Setting name.
	 * @param {*}      value      New value.
	 */
	const updateResponsive = ( breakpoint, key, value ) => {
		setAttributes( {
			responsive: breakpoints.map( ( item ) =>
				item.breakpoint === breakpoint
					? {
							...item,
							settings: { ...item.settings, [ key ]: value },
					  }
					: item
			),
		} );
	};

	const currentBreakpoint = breakpoints.find(
		( item ) => item.breakpoint === activeBreakpoint
	);

	return (
		<>
			<InspectorControls group="settings">
				{ children }

				<PanelBody
					title={ __( 'Layout', 'gb-for-slick-slider' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Slides to show', 'gb-for-slick-slider' ) }
						value={ slidesToShow }
						onChange={ ( value ) =>
							handleSlidesToShow( Number( value ) || 1 )
						}
						min={ 1 }
						max={ 8 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={ __(
							'Slides to scroll',
							'gb-for-slick-slider'
						) }
						value={ slidesToScroll }
						onChange={ ( value ) =>
							setAttributes( {
								slidesToScroll: Number( value ) || 1,
							} )
						}
						min={ 1 }
						max={ Math.max( 1, slidesToShow ) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={ __(
							'Gap between slides (px)',
							'gb-for-slick-slider'
						) }
						value={ slideMargin }
						onChange={ ( value ) =>
							setAttributes( {
								slideMargin: Number( value ) || 0,
							} )
						}
						min={ 0 }
						max={ 60 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					{ slidesToShow <= 1 && (
						<ToggleControl
							label={ __(
								'Fade between slides',
								'gb-for-slick-slider'
							) }
							help={ __(
								'Cross-fades instead of sliding. Single slide only.',
								'gb-for-slick-slider'
							) }
							checked={ fade }
							onChange={ ( value ) =>
								setAttributes( { fade: value } )
							}
							__nextHasNoMarginBottom
						/>
					) }
					{ slidesToShow > 1 && (
						<ToggleControl
							label={ __( 'Center mode', 'gb-for-slick-slider' ) }
							help={ __(
								'Highlights the middle slide and peeks the neighbours.',
								'gb-for-slick-slider'
							) }
							checked={ centerMode }
							onChange={ ( value ) =>
								setAttributes( { centerMode: value } )
							}
							__nextHasNoMarginBottom
						/>
					) }
					<ToggleControl
						label={ __( 'Adaptive height', 'gb-for-slick-slider' ) }
						help={ __(
							'Matches the slider height to the current slide.',
							'gb-for-slick-slider'
						) }
						checked={ adaptiveHeight }
						onChange={ ( value ) =>
							setAttributes( { adaptiveHeight: value } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Playback', 'gb-for-slick-slider' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Autoplay', 'gb-for-slick-slider' ) }
						checked={ autoplay }
						onChange={ ( value ) =>
							setAttributes( { autoplay: value } )
						}
						__nextHasNoMarginBottom
					/>
					{ autoplay && (
						<>
							<RangeControl
								label={ __(
									'Time on each slide (ms)',
									'gb-for-slick-slider'
								) }
								value={ autoplaySpeed }
								onChange={ ( value ) =>
									setAttributes( {
										autoplaySpeed: Number( value ) || 1500,
									} )
								}
								min={ 500 }
								max={ 10000 }
								step={ 100 }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
							<ToggleControl
								label={ __(
									'Pause on hover',
									'gb-for-slick-slider'
								) }
								checked={ pauseOnHover }
								onChange={ ( value ) =>
									setAttributes( { pauseOnHover: value } )
								}
								__nextHasNoMarginBottom
							/>
						</>
					) }
					<RangeControl
						label={ __(
							'Transition speed (ms)',
							'gb-for-slick-slider'
						) }
						value={ slideSpeed }
						onChange={ ( value ) =>
							setAttributes( {
								slideSpeed: Number( value ) || 0,
							} )
						}
						min={ 0 }
						max={ 3000 }
						step={ 50 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Loop infinitely', 'gb-for-slick-slider' ) }
						checked={ infinite }
						onChange={ ( value ) =>
							setAttributes( { infinite: value } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Navigation', 'gb-for-slick-slider' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show arrows', 'gb-for-slick-slider' ) }
						checked={ arrows }
						onChange={ ( value ) =>
							setAttributes( { arrows: value } )
						}
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show pagination', 'gb-for-slick-slider' ) }
						checked={ dots }
						onChange={ ( value ) =>
							setAttributes( { dots: value } )
						}
						__nextHasNoMarginBottom
					/>
					<p className="gbss-inspector__hint">
						{ __(
							'Arrow and pagination design lives in the Styles tab.',
							'gb-for-slick-slider'
						) }
					</p>
				</PanelBody>

				{ !! breakpoints.length && (
					<PanelBody
						title={ __( 'Responsive', 'gb-for-slick-slider' ) }
						initialOpen={ false }
					>
						<ToggleGroupControl
							label={ __( 'Screen size', 'gb-for-slick-slider' ) }
							value={ activeBreakpoint }
							onChange={ ( value ) =>
								setActiveBreakpoint( Number( value ) )
							}
							isBlock
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							{ breakpoints.map( ( item ) => {
								const device = BREAKPOINT_DEVICES.find(
									( entry ) =>
										entry.breakpoint === item.breakpoint
								);

								return (
									<ToggleGroupControlOption
										key={ item.breakpoint }
										value={ item.breakpoint }
										label={ `${ item.breakpoint }` }
										aria-label={
											device
												? device.label
												: `${ item.breakpoint }px`
										}
									/>
								);
							} ) }
						</ToggleGroupControl>

						{ currentBreakpoint && (
							<>
								<p className="gbss-inspector__hint">
									{ __(
										'Applies below',
										'gb-for-slick-slider'
									) }{ ' ' }
									{ currentBreakpoint.breakpoint }px
								</p>
								<RangeControl
									label={ __(
										'Slides to show',
										'gb-for-slick-slider'
									) }
									value={
										currentBreakpoint.settings.slidesToShow
									}
									onChange={ ( value ) =>
										updateResponsive(
											currentBreakpoint.breakpoint,
											'slidesToShow',
											Number( value ) || 1
										)
									}
									min={ 1 }
									max={ 8 }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
								<RangeControl
									label={ __(
										'Slides to scroll',
										'gb-for-slick-slider'
									) }
									value={
										currentBreakpoint.settings
											.slidesToScroll
									}
									onChange={ ( value ) =>
										updateResponsive(
											currentBreakpoint.breakpoint,
											'slidesToScroll',
											Number( value ) || 1
										)
									}
									min={ 1 }
									max={ Math.max(
										1,
										currentBreakpoint.settings.slidesToShow
									) }
									__next40pxDefaultSize
									__nextHasNoMarginBottom
								/>
								<ToggleControl
									label={ __(
										'Show arrows',
										'gb-for-slick-slider'
									) }
									checked={
										!! currentBreakpoint.settings.arrows
									}
									onChange={ ( value ) =>
										updateResponsive(
											currentBreakpoint.breakpoint,
											'arrows',
											value
										)
									}
									__nextHasNoMarginBottom
								/>
								<ToggleControl
									label={ __(
										'Show pagination',
										'gb-for-slick-slider'
									) }
									checked={
										!! currentBreakpoint.settings.dots
									}
									onChange={ ( value ) =>
										updateResponsive(
											currentBreakpoint.breakpoint,
											'dots',
											value
										)
									}
									__nextHasNoMarginBottom
								/>
							</>
						) }
					</PanelBody>
				) }
			</InspectorControls>

			<InspectorControls group="styles">
				{ arrows && (
					<PanelBody
						title={ __( 'Arrows', 'gb-for-slick-slider' ) }
						initialOpen={ true }
					>
						<p className="gbss-inspector__label">
							{ __( 'Icon', 'gb-for-slick-slider' ) }
						</p>
						<ArrowIconPicker
							value={ arrowStyle }
							onChange={ ( value ) =>
								setAttributes( { arrowStyle: value } )
							}
						/>
						<SelectControl
							label={ __( 'Position', 'gb-for-slick-slider' ) }
							value={ arrowPosition }
							options={ ARROW_POSITION_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { arrowPosition: value } )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<SelectControl
							label={ __( 'Shape', 'gb-for-slick-slider' ) }
							value={ arrowBorderStyle }
							options={ ARROW_SHAPE_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { arrowBorderStyle: value } )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __(
								'Button size (px)',
								'gb-for-slick-slider'
							) }
							value={ arrowHeight }
							onChange={ ( value ) =>
								setAttributes( {
									arrowHeight: Number( value ) || 40,
								} )
							}
							min={ 20 }
							max={ 100 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __(
								'Icon size (px)',
								'gb-for-slick-slider'
							) }
							value={ arrowFontSize }
							onChange={ ( value ) =>
								setAttributes( {
									arrowFontSize: Number( value ) || 20,
								} )
							}
							min={ 8 }
							max={ 100 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						{ arrowBorderStyle !== 'none' && (
							<RangeControl
								label={ __(
									'Border width (px)',
									'gb-for-slick-slider'
								) }
								value={ arrowBorderWidth }
								onChange={ ( value ) =>
									setAttributes( {
										arrowBorderWidth: Number( value ) || 0,
									} )
								}
								min={ 0 }
								max={ 8 }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						) }
						<RangeControl
							label={ __(
								'Distance from the slider (px)',
								'gb-for-slick-slider'
							) }
							value={ arrowGap }
							onChange={ ( value ) =>
								setAttributes( {
									arrowGap: Number( value ) || 0,
								} )
							}
							min={ 0 }
							max={ 80 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label={ __( 'Drop shadow', 'gb-for-slick-slider' ) }
							checked={ arrowShadow }
							onChange={ ( value ) =>
								setAttributes( { arrowShadow: value } )
							}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				) }

				{ arrows && (
					<PanelColorSettings
						title={ __( 'Arrow colours', 'gb-for-slick-slider' ) }
						initialOpen={ false }
						enableAlpha
						__experimentalIsRenderedInSidebar
						colorSettings={ [
							{
								label: __( 'Icon', 'gb-for-slick-slider' ),
								value: arrowColor,
								onChange: ( value ) =>
									setAttributes( {
										arrowColor: value || '',
									} ),
							},
							{
								label: __(
									'Background',
									'gb-for-slick-slider'
								),
								value: arrowBackgroundColor,
								onChange: ( value ) =>
									setAttributes( {
										arrowBackgroundColor: value || '',
									} ),
							},
							{
								label: __( 'Border', 'gb-for-slick-slider' ),
								value: arrowBorderColor,
								onChange: ( value ) =>
									setAttributes( {
										arrowBorderColor: value || '',
									} ),
							},
							{
								label: __(
									'Icon on hover',
									'gb-for-slick-slider'
								),
								value: arrowHoverColor,
								onChange: ( value ) =>
									setAttributes( {
										arrowHoverColor: value || '',
									} ),
							},
							{
								label: __(
									'Background on hover',
									'gb-for-slick-slider'
								),
								value: arrowHoverBackgroundColor,
								onChange: ( value ) =>
									setAttributes( {
										arrowHoverBackgroundColor: value || '',
									} ),
							},
						] }
					/>
				) }

				{ dots && (
					<PanelBody
						title={ __( 'Pagination', 'gb-for-slick-slider' ) }
						initialOpen={ ! arrows }
					>
						<SelectControl
							label={ __( 'Style', 'gb-for-slick-slider' ) }
							value={ dotStyle }
							options={ DOT_STYLE_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { dotStyle: value } )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<SelectControl
							label={ __( 'Position', 'gb-for-slick-slider' ) }
							value={ dotPosition }
							options={ DOT_POSITION_OPTIONS }
							onChange={ ( value ) =>
								setAttributes( { dotPosition: value } )
							}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __( 'Size (px)', 'gb-for-slick-slider' ) }
							value={ dotSize }
							onChange={ ( value ) =>
								setAttributes( {
									dotSize: Number( value ) || 10,
								} )
							}
							min={ 4 }
							max={ 30 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						{ dotStyle !== 'progress' && (
							<RangeControl
								label={ __(
									'Spacing (px)',
									'gb-for-slick-slider'
								) }
								value={ dotGap }
								onChange={ ( value ) =>
									setAttributes( {
										dotGap: Number( value ) || 0,
									} )
								}
								min={ 0 }
								max={ 40 }
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						) }
					</PanelBody>
				) }

				{ dots && (
					<PanelColorSettings
						title={ __(
							'Pagination colours',
							'gb-for-slick-slider'
						) }
						initialOpen={ false }
						enableAlpha
						__experimentalIsRenderedInSidebar
						colorSettings={ [
							{
								label: __( 'Inactive', 'gb-for-slick-slider' ),
								value: dotColor,
								onChange: ( value ) =>
									setAttributes( { dotColor: value || '' } ),
							},
							{
								label: __( 'Active', 'gb-for-slick-slider' ),
								value: dotActiveColor,
								onChange: ( value ) =>
									setAttributes( {
										dotActiveColor: value || '',
									} ),
							},
						] }
					/>
				) }
			</InspectorControls>
		</>
	);
}
