import { InnerBlocks } from '@wordpress/block-editor';

/**
 * The block is dynamic: render.php builds the slides. Only the slide template
 * needs to be serialised into the post content.
 *
 * @return {Element} Saved markup.
 */
export default function save() {
	return <InnerBlocks.Content />;
}
