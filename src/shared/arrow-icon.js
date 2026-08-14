/**
 * Renders an arrow icon in the editor, using the same path data as the
 * front-end (assets/js/view.js).
 */

import { ARROW_ICON_PATHS } from './constants';

/**
 * The `gbss__arrow-icon` class is not decorative: style.scss mirrors the single
 * left pointing path with it to produce the "next" arrow, so it must be present
 * here exactly as view.js emits it or both editor arrows point the same way.
 *
 * @param {Object} props           Component props.
 * @param {string} props.icon      Icon key.
 * @param {number} props.size      Pixel size.
 * @param {string} props.className Extra classes.
 * @return {Element} SVG element.
 */
export default function ArrowIcon( { icon, size = 20, className = '' } ) {
	const spec = ARROW_ICON_PATHS[ icon ] || ARROW_ICON_PATHS.chevron;

	const paint = spec.fill
		? { fill: 'currentColor', stroke: 'none' }
		: {
				fill: 'none',
				stroke: 'currentColor',
				strokeWidth: spec.width,
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
		  };

	return (
		<svg
			className={ `gbss__arrow-icon ${ className }`.trim() }
			viewBox="0 0 24 24"
			width={ size }
			height={ size }
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d={ spec.d } { ...paint } />
		</svg>
	);
}
