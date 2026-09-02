=== Simple Slider Block - Create Sliders From Core Blocks  ===
Contributors:      arkenon, alkesh7
Tags:              slider, slider block, carousel, gutenberg, block slider
Requires at least: 6.5
Tested up to:      7.1
Requires PHP:      7.4
Stable tag:        2.0.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Create beautiful, responsive sliders from core WordPress blocks using Slick Slider, no coding required, fully customizable in the block editor.

== Description ==

A Gutenberg block for creating a simple slider using Slick Slider with core blocks.

It is compatible with the core blocks like Cover, Image, and more.

Simple Slider Block Plugin uses Slick Slider to create sliders from core blocks.
You can convert your blocks to a slider with Simple Slider Block Plugin.
Just add a new Simple Slider Block or Simple Post Slider Block and start creating your own designs.

= Two blocks =

* **Simple Slider** - build slides by hand from any core blocks.
* **Simple Post Slider** - design one slide and it repeats for every post in a query. Works with Post Title, Featured Image, Excerpt and the rest of the post blocks, and can inherit the query of the archive template it sits in.

= Arrows and pagination =

Seven arrow icons, seven placements (outside, over the slider, above, below, split around the pagination), plus shape, size, border and hover colours. Pagination comes as dots, expanding bars, lines, numbers or a progress bar, and can sit below, above, over the slider or vertically along either edge.

= Templates =

Ten ready-made starting points - hero, testimonials, logo carousel, team cards, product cards, gallery and more - each one already styled, and all built from core blocks so everything stays editable.

== Installation ==

1. You have a couple options:
	* Go to Plugins &rarr; Add New and search for "Simple Slider Block". Once found, click "Install".
	* Download the Simple Slider Block from wordpress.org and make sure the folder us zipped. Then upload via Plugins &rarr; Add New &rarr; Upload.
      * Open the block inserter within the Block Editor (Gutenberg) and search for "simple slider". The plugin should appear and allow you to it install directly. Skip steps 2 and 3.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Search for the block within the Block Editor (Gutenberg) and begin using.

== Upgrade Notice ==

= 2.0.0 =
Arrows are now drawn as SVG icons instead of text characters, so existing sliders will look slightly different (and sharper) after updating. All of your settings are preserved. Requires WordPress 6.5 or later.

== Changelog ==

= 2.0.1 =
* Bumped WordPress tested-up-to version 7.1

= 2.0.0 =
* Added: Post Slider block - build a slider from a post query, with an optional "inherit the page query" mode for archive templates
* Added: Seven arrow icons, drawn as SVG instead of text characters
* Added: Seven arrow placements, including over the slider, above right, and split around the pagination
* Added: Pagination styles - dots, bars, lines, numbers and a progress bar
* Added: Seven pagination placements, including over the slider and vertically along either edge
* Added: Arrow border colour and width, hover colours, spacing and drop shadow settings
* Added: Ten slider templates with a searchable, filterable picker
* Improved: Settings are split into the editor's native Settings and Styles tabs instead of one long list
* Improved: Colours now use the theme palette and support transparency
* Improved: The editor previews arrows and pagination as you configure them
* Improved: Slick's CSS and JavaScript now load only on pages that contain a slider
* Fixed: The duplicated "Arrow Border Style" control, which silently overwrote itself
* Fixed: The "Simple Arrow" style, which had no styling at all
* Fixed: Arrow position could not be changed while pagination was enabled
* Fixed: Duplicate style attribute on the slider element
* Fixed: Inner block markup such as iframes and SVGs being stripped on the front end
* Fixed: Translations are now loaded for the editor interface
* Fixed: Block API version bumped to 3 so the editor renders correctly in WordPress 7.0's iframed block editor
* Fixed: Text domain now matches the plugin's WordPress.org slug so translations load correctly
* Improved: Code formatting and inline documentation brought in line with WordPress Coding Standards
* Added: New contributor (alkesh7)

= 1.2.4 =
* Tested: For WordPress 7.0 compatibility

= 1.2.3 =
* Tested: For WordPress 6.9 compatibility

= 1.2.2 =
* Fixed: The spelling mistake in the plugin name

= 1.2.1 =
* Fixed: Block wrapper attributes

= 1.2.0 =
* Tested up to: WordPress 6.8
* Added: Prebuild templates (patterns)
* Converted: Slick Slider Block into dynamic block
* Fixed: RTL support problem
* Added: Arrow options (color, size, position)

= 1.1.4 =
* Add: Automatic RTL support

= 1.1.3 =
* Fixed: Block validation error
* Fixed: Responsive settings reset problem

= 1.1.2 =
* Fixed: Center mode error
* Fixed: Add responsive settings for each blocks

= 1.1.1 =
* Fixed: Show Infinite loop option for slide to show 1

= 1.1.0 =
* Added block supports for blocks

= 1.0.9 =
* Successfully tested with WordPress version 6.5

= 1.0.8 =
* Successfully tested with WordPress version 6.4

= 1.0.7 =
* Added a new contributor

= 1.0.6 =
* Responsive settings added

= 1.0.5 =
* Successfully tested with WordPress version 6.3

= 1.0.4 =
* Removed padding of slider container.

= 1.0.3 =
* Error fixed: When calling init twice

= 1.0.2 =
* Error fixed: Block validation error
* Error fixed: Adding additional css classes

= 1.0.1 =
* Parent block styles changed
* Block error at console fixed
* Child block styles changed
* Block context added

= 1.0.0 =
* Initial release

== Resources ==

# Slick Slider
Copyright (c) 2013-2016 Kenwheeler Slick Slider
License: The MIT License (MIT),
Source : https://kenwheeler.github.io/slick/
