<?php
/**
 * Plugin Name:       Slideshow Mgarcia
 * Description:       Slideshow that fetches blog Posts via the REST API
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Michael Garcia
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slideshow-mgarcia
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function slideshow_mgarcia_slideshow_mgarcia_block_init() {
	register_block_type(  __DIR__ . '/build');
}
add_action( 'init', 'slideshow_mgarcia_slideshow_mgarcia_block_init' );

function enqueue_editor_content_assets_slideshow_mgarcia() {
        wp_enqueue_script(
            'flickity-js',
            plugins_url( 'assets/js/flickity.pkgd.min.js', __FILE__ ),
        );
		wp_enqueue_style(
            'flickity-css',
            plugins_url( 'assets/css/flickity.min.css', __FILE__ ),
        );
}
add_action( 'enqueue_block_assets', 'enqueue_editor_content_assets_slideshow_mgarcia' );

//Add new block category
if ( ! function_exists('filter_block_categories_mgarcia')) {
	function filter_block_categories_mgarcia( $block_categories, $editor_context ) {
		if ( ! empty( $editor_context->post ) ) {
			array_push(
				$block_categories,
				array(
					'slug'  => 'michaels-blocks',
					'title' => __( 'Michaels Blocks', 'slideshow-mgarcia' ),
					'icon'  => null,
				)
			);
		}
		return $block_categories;
	}
	add_filter( 'block_categories_all', 'filter_block_categories_mgarcia', 10, 2 );
}
