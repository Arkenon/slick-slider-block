/**
 * Query panel for the Post Slider block.
 *
 * Reuses core's QueryControls component (the one behind core/latest-posts) for
 * the ordering, count, category and author fields, and adds a post type picker
 * on top of it.
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	QueryControls,
} from '@wordpress/components';

/**
 * Post types a slider can loop over.
 *
 * @return {Array} SelectControl options.
 */
function usePostTypeOptions() {
	return useSelect( ( select ) => {
		const types = select( coreStore ).getPostTypes( { per_page: -1 } );

		if ( ! types ) {
			return [];
		}

		return types
			.filter( ( type ) => type.viewable && 'attachment' !== type.slug )
			.map( ( type ) => ( {
				value: type.slug,
				label: type.labels.singular_name,
			} ) );
	}, [] );
}

/**
 * @param {Object}   props          Component props.
 * @param {Object}   props.query    Query attribute.
 * @param {Function} props.onChange Called with the patched query object.
 * @return {Element} Panel.
 */
export default function PostSliderQueryControls( { query, onChange } ) {
	const postTypes = usePostTypeOptions();

	const categories = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecords( 'taxonomy', 'category', {
				per_page: -1,
			} ),
		[]
	);
	const authors = useSelect(
		( select ) =>
			select( coreStore ).getUsers( { who: 'authors', per_page: -1 } ),
		[]
	);

	const patch = ( changes ) => onChange( { ...query, ...changes } );
	const supportsCategories = 'post' === query.postType;

	return (
		<PanelBody
			title={ __( 'Query', 'gb-for-slick-slider' ) }
			initialOpen={ true }
		>
			<ToggleControl
				label={ __( 'Inherit the page query', 'gb-for-slick-slider' ) }
				help={ __(
					'On archive and search templates, show the posts that page is already listing.',
					'gb-for-slick-slider'
				) }
				checked={ !! query.inherit }
				onChange={ ( value ) => patch( { inherit: value } ) }
				__nextHasNoMarginBottom
			/>

			{ ! query.inherit && (
				<>
					<SelectControl
						label={ __( 'Content type', 'gb-for-slick-slider' ) }
						value={ query.postType }
						options={
							postTypes.length
								? postTypes
								: [
										{
											value: 'post',
											label: __(
												'Post',
												'gb-for-slick-slider'
											),
										},
								  ]
						}
						onChange={ ( value ) =>
							patch( { postType: value, categories: [] } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>

					<QueryControls
						order={ query.order }
						orderBy={ query.orderBy }
						onOrderChange={ ( value ) => patch( { order: value } ) }
						onOrderByChange={ ( value ) =>
							patch( { orderBy: value } )
						}
						numberOfItems={ query.perPage }
						onNumberOfItemsChange={ ( value ) =>
							patch( { perPage: value } )
						}
						maxItems={ 30 }
						minItems={ 1 }
						categorySuggestions={
							supportsCategories && categories
								? categories.reduce(
										( accumulator, category ) => {
											accumulator[ category.name ] =
												category;
											return accumulator;
										},
										{}
								  )
								: undefined
						}
						selectedCategories={
							supportsCategories ? query.categories : undefined
						}
						onCategoryChange={
							supportsCategories
								? ( value ) => patch( { categories: value } )
								: undefined
						}
						authorList={ authors ?? undefined }
						selectedAuthorId={
							query.author ? Number( query.author ) : undefined
						}
						onAuthorChange={ ( value ) =>
							patch( { author: value } )
						}
					/>

					<RangeControl
						label={ __(
							'Skip first posts',
							'gb-for-slick-slider'
						) }
						help={ __(
							'Useful when another block already shows the latest posts.',
							'gb-for-slick-slider'
						) }
						value={ query.offset ?? 0 }
						onChange={ ( value ) =>
							patch( { offset: Number( value ) || 0 } )
						}
						min={ 0 }
						max={ 20 }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>

					<ToggleControl
						label={ __(
							'Exclude the current post',
							'gb-for-slick-slider'
						) }
						checked={ !! query.excludeCurrent }
						onChange={ ( value ) =>
							patch( { excludeCurrent: value } )
						}
						__nextHasNoMarginBottom
					/>
				</>
			) }
		</PanelBody>
	);
}
