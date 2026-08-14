/**
 * Editor for the Post Slider block.
 *
 * Follows the same shape as core's post-template block: the inner blocks are a
 * template for a single slide, the first result is editable and the remaining
 * results are rendered as read-only previews bound to their own post context.
 */

import { __ } from '@wordpress/i18n';
import { useState, useMemo, memo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockContextProvider,
	/* eslint-disable @wordpress/no-unsafe-wp-apis -- The only available way to
	   render a read-only preview of blocks; core's post-template uses it too. */
	__experimentalUseBlockPreview as useBlockPreview,
	/* eslint-enable @wordpress/no-unsafe-wp-apis */
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';

import SliderInspectorControls, {
	SliderToolbarControls,
} from '../shared/slider-inspector';
import {
	getSliderClassName,
	getSliderStyle,
	ArrowsPreview,
	DotsPreview,
} from '../shared/preview';
import PostSliderQueryControls from './query-controls';
import './editor.scss';

const SLIDE_TEMPLATE = [
	[ 'core/post-featured-image', { isLink: true } ],
	[ 'core/post-title', { level: 3, isLink: true } ],
	[ 'core/post-excerpt', {} ],
];

/**
 * Read-only render of the slide template for one post.
 *
 * @param {Object}   props          Component props.
 * @param {Array}    props.blocks   Slide template blocks.
 * @param {Object}   props.style    Inline style.
 * @param {Function} props.onSelect Called when the preview is activated.
 * @return {Element} Preview element.
 */
function SlidePreview( { blocks, style, onSelect } ) {
	const blockPreviewProps = useBlockPreview( {
		blocks,
		props: { className: 'gbss-slide', style },
	} );

	return (
		<div
			{ ...blockPreviewProps }
			role="button"
			tabIndex={ 0 }
			onClick={ onSelect }
			onKeyDown={ ( event ) => {
				if ( 'Enter' === event.key || ' ' === event.key ) {
					event.preventDefault();
					onSelect();
				}
			} }
		/>
	);
}

// Re-rendering every preview on each keystroke inside the editable slide is
// expensive; only the blocks and the post context matter.
const MemoizedSlidePreview = memo( SlidePreview );

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { query, slidesToShow, slideMargin } = attributes;

	const [ activePostId, setActivePostId ] = useState();

	const { posts, isResolving, slideBlocks } = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving: isResolvingSelector } =
				select( coreStore );

			const queryArgs = {
				per_page: query.perPage,
				offset: query.offset || 0,
				order: query.order,
				orderby: query.orderBy,
				status: 'publish',
				_embed: true,
			};

			if ( query.categories?.length ) {
				queryArgs.categories = query.categories.map(
					( item ) => item.id ?? item
				);
			}
			if ( query.author ) {
				queryArgs.author = query.author;
			}
			if ( query.search ) {
				queryArgs.search = query.search;
			}

			const selectorArgs = [ 'postType', query.postType, queryArgs ];

			return {
				posts: getEntityRecords( ...selectorArgs ),
				isResolving: isResolvingSelector(
					'getEntityRecords',
					selectorArgs
				),
				slideBlocks: select( blockEditorStore ).getBlocks( clientId ),
			};
		},
		[ query, clientId ]
	);

	const blockContexts = useMemo(
		() =>
			( posts ?? [] ).map( ( post ) => ( {
				postType: post.type,
				postId: post.id,
			} ) ),
		[ posts ]
	);

	const blockProps = useBlockProps( {
		className: `${ getSliderClassName( attributes ) } gbss--dynamic`,
		style: getSliderStyle( attributes ),
	} );

	const slideStyle = {
		flex: `0 0 calc(${ 100 / Math.max( 1, slidesToShow ) }% - ${
			slideMargin * 2
		}px)`,
		marginInline: `${ slideMargin }px`,
	};

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'gbss-slide', style: slideStyle },
		{ template: SLIDE_TEMPLATE }
	);

	// The editable slide follows the post the user last clicked, falling back
	// to the first result.
	const activeContext =
		blockContexts.find( ( context ) => context.postId === activePostId ) ??
		blockContexts[ 0 ];

	const inspector = (
		<>
			<SliderToolbarControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<SliderInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				<PostSliderQueryControls
					query={ query }
					onChange={ ( value ) => setAttributes( { query: value } ) }
				/>
			</SliderInspectorControls>
		</>
	);

	if ( query.inherit ) {
		return (
			<>
				{ inspector }
				<div { ...blockProps }>
					<p className="gbss-post-slider__notice">
						{ __(
							'This slider inherits the query of the template it is placed in. Its slides are shown on the front end.',
							'gb-for-slick-slider'
						) }
					</p>
					<div className="gbss__viewport">
						<BlockContextProvider value={ {} }>
							<div { ...innerBlocksProps } />
						</BlockContextProvider>
					</div>
				</div>
			</>
		);
	}

	if ( isResolving && ! posts ) {
		return (
			<>
				{ inspector }
				<div { ...blockProps }>
					<Spinner />
				</div>
			</>
		);
	}

	if ( ! blockContexts.length ) {
		return (
			<>
				{ inspector }
				<div { ...blockProps }>
					<p className="gbss-post-slider__notice">
						{ __(
							'No posts found for this query.',
							'gb-for-slick-slider'
						) }
					</p>
				</div>
			</>
		);
	}

	return (
		<>
			{ inspector }
			<div { ...blockProps }>
				<ArrowsPreview attributes={ attributes } />

				<div className="gbss__viewport">
					{ blockContexts.map( ( context ) => (
						<BlockContextProvider
							key={ context.postId }
							value={ context }
						>
							{ context.postId === activeContext.postId ? (
								<div { ...innerBlocksProps } />
							) : (
								<MemoizedSlidePreview
									blocks={ slideBlocks }
									style={ slideStyle }
									onSelect={ () =>
										setActivePostId( context.postId )
									}
								/>
							) }
						</BlockContextProvider>
					) ) }
				</div>

				<DotsPreview
					attributes={ attributes }
					count={ blockContexts.length }
				/>
			</div>
		</>
	);
}
