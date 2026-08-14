/**
 * Template picker shown when an empty Slick Slider block is inserted.
 *
 * Replaces the 1.x modal, which offered four screenshots in a two column grid
 * with no way to filter or search. Previews are schematics generated from each
 * template's own settings, so they cannot drift out of date.
 */

import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import {
	Button,
	Placeholder,
	SearchControl,
	/* eslint-disable @wordpress/no-unsafe-wp-apis -- Stable in practice since
	   WP 5.9 and used throughout core's own block inspectors. */
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	/* eslint-enable @wordpress/no-unsafe-wp-apis */
} from '@wordpress/components';

import templates, { TEMPLATE_CATEGORIES } from './patterns';
import ArrowIcon from '../shared/arrow-icon';

/**
 * Draws a small schematic of what a template looks like.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.template Template definition.
 * @return {Element} Preview element.
 */
function TemplatePreview( { template } ) {
	const {
		slides = 1,
		arrows,
		dots,
		center,
		tall,
		progress,
	} = template.preview ?? {};
	const columns = Math.min( 6, Math.max( 1, slides ) );

	// Navigation is drawn on top of the slide strip. When a preset puts it
	// below the slider rather than over it, the strip gives up the space.
	const reservesSpace =
		( dots && 'overlay-bottom' !== dots ) ||
		[ 'bottom', 'split-bottom', 'bottom-left', 'bottom-right' ].includes(
			arrows
		);

	const classes = [
		'gbss-template__preview',
		tall ? 'is-tall' : '',
		reservesSpace ? 'has-bottom-nav' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div className={ classes } aria-hidden="true">
			{ arrows && (
				<span className={ `gbss-template__arrows is-${ arrows }` }>
					{ [ 'prev', 'next' ].map( ( direction ) => (
						<span
							key={ direction }
							className={ `gbss-template__arrow is-${ direction }` }
						>
							<ArrowIcon
								icon={
									template.attributes?.arrowStyle ?? 'chevron'
								}
								size={ 10 }
							/>
						</span>
					) ) }
				</span>
			) }

			<span className="gbss-template__slides">
				{ Array.from( { length: columns } ).map( ( _, index ) => (
					<span
						key={ index }
						className={
							'gbss-template__slide' +
							( center && index === Math.floor( columns / 2 )
								? ' is-active'
								: '' )
						}
					/>
				) ) }
			</span>

			{ dots && (
				<span className={ `gbss-template__dots is-${ dots }` }>
					{ progress ? (
						<span className="gbss-template__progress" />
					) : (
						Array.from( { length: 3 } ).map( ( _, index ) => (
							<span
								key={ index }
								className={
									'gbss-template__dot' +
									( index === 0 ? ' is-active' : '' )
								}
							/>
						) )
					) }
				</span>
			) }
		</div>
	);
}

/**
 * @param {Object}   props          Component props.
 * @param {Function} props.onSelect Called with the chosen template.
 * @param {Function} props.onSkip   Called when the user starts from scratch.
 * @return {Element} Picker.
 */
export default function TemplatePicker( { onSelect, onSkip } ) {
	const [ category, setCategory ] = useState( 'all' );
	const [ search, setSearch ] = useState( '' );

	const visible = useMemo( () => {
		const needle = search.trim().toLowerCase();

		return templates.filter( ( template ) => {
			const matchesCategory =
				'all' === category || template.category === category;
			const matchesSearch =
				! needle ||
				template.name.toLowerCase().includes( needle ) ||
				( template.description ?? '' ).toLowerCase().includes( needle );

			return matchesCategory && matchesSearch;
		} );
	}, [ category, search ] );

	return (
		<Placeholder
			className="gbss-template-picker"
			label={ __( 'Choose a slider template', 'gb-for-slick-slider' ) }
			instructions={ __(
				'Every template is made of core blocks, so you can edit anything afterwards.',
				'gb-for-slick-slider'
			) }
		>
			<div className="gbss-template-picker__filters">
				<ToggleGroupControl
					label={ __( 'Category', 'gb-for-slick-slider' ) }
					hideLabelFromVision
					value={ category }
					onChange={ setCategory }
					isBlock
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				>
					{ TEMPLATE_CATEGORIES.map( ( item ) => (
						<ToggleGroupControlOption
							key={ item.value }
							value={ item.value }
							label={ item.label }
						/>
					) ) }
				</ToggleGroupControl>

				<SearchControl
					label={ __( 'Search templates', 'gb-for-slick-slider' ) }
					value={ search }
					onChange={ setSearch }
					__nextHasNoMarginBottom
				/>
			</div>

			{ visible.length ? (
				<ul className="gbss-template-picker__grid">
					{ visible.map( ( template ) => (
						<li key={ template.id }>
							<Button
								className="gbss-template"
								onClick={ () => onSelect( template ) }
							>
								<TemplatePreview template={ template } />
								<span className="gbss-template__name">
									{ template.name }
								</span>
								<span className="gbss-template__description">
									{ template.description }
								</span>
							</Button>
						</li>
					) ) }
				</ul>
			) : (
				<p className="gbss-template-picker__empty">
					{ __(
						'No templates match your search.',
						'gb-for-slick-slider'
					) }
				</p>
			) }

			<Button variant="tertiary" onClick={ onSkip }>
				{ __( 'Start from scratch', 'gb-for-slick-slider' ) }
			</Button>
		</Placeholder>
	);
}
