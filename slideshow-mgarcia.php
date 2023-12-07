<?php
/**
 * Plugin Name:       Slideshow Mgarcia
 * Description:       Slideshow Block for WordPress Posts
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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function slideshow_mgarcia_slideshow_mgarcia_block_init() {
	register_block_type(  __DIR__ . '/build', array(
        //'render_callback' => 'slideshow_mgarcia_render_post_list'
    ) );

}
add_action( 'init', 'slideshow_mgarcia_slideshow_mgarcia_block_init' );

function slideshow_mgarcia_render_post_list () {
	

	
}


//Add new block category https://gutenberghub.com/how-to-create-custom-block-category/
add_filter( 'block_categories_all' , function( $categories ) {

    // Adding a new category.
	$categories[] = array(
		'slug'  => 'michaels-blocks',
		'title' => 'Michaels Blocks'
	);

	return $categories;
} );