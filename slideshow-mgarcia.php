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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function slideshow_mgarcia_slideshow_mgarcia_block_init() {
	register_block_type(  __DIR__ . '/build', array(
        'render_callback' => 'slideshow_mgarcia_render_post_list',
    ) );

}
add_action( 'init', 'slideshow_mgarcia_slideshow_mgarcia_block_init' );


//Add new block category https://gutenberghub.com/how-to-create-custom-block-category/
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


// Render Front-end Block
function slideshow_mgarcia_render_post_list ($attributes) {
	
	if( $attributes['customFeed'] == '1' ) {
		$selectedFeed = $attributes['customFeedAddress'] . "/wp-json/wp/v2/posts/?_embed&per_page=" . $attributes['feedCount']; 
	} else {
		$selectedFeed = $attributes['jsonFeed'] . "?_embed&per_page=" . $attributes['feedCount']; 
	}
	$request = wp_remote_get( $selectedFeed ,  array(
		'timeout'     => 20,
	));
	if( is_wp_error( $request ) ) { return false; }
	$body = wp_remote_retrieve_body( $request );
	$feed = json_decode( $body );

	ob_start(); ?>
	<?php if(is_array($feed)) { ?>
	<div <?php echo get_block_wrapper_attributes(); ?>>
		<div class="slideshow-mgarcia-container
		<?php
				if($attributes['featuredImage'] == '1' ){ echo ' has-featured'; }
				if($attributes['postMeta'] == '1' ){ echo ' has-meta'; }
				if($attributes['postExcerpt'] == '1' ){ echo ' has-excerpt'; }
				if($attributes['bulletNav'] == '1' ){ echo ' has-bullet-nav'; }
				if($attributes['arrowNav'] == '1' ){ echo ' has-arrow-nav'; }
				if($attributes['feedFrontEnd'] == '1' ){ echo ' has-feed-front-end'; }
		?>" <?php if( $attributes['autoplaySlider'] == '1' ): ?>duration="<?php echo esc_attr($attributes['autoplayDuration']) ?>"<?php endif; ?>>

		<div class="slideshow-mgarcia-feed-title">
			<h5>
			<?php echo esc_html__( 'Feed Address:', 'slideshow-mgarcia' ) ?> 
			<span>
				<?php if( $attributes['customFeed'] == '0' ): ?>	
					<?php $selectedFeed = $attributes['jsonFeed'];  echo $selectedFeed; ?>
				<?php else: ?>
					<?php $customFeed = $attributes['customFeedAddress'];  echo $customFeed; ?>/wp-json/wp/v2/posts/
				<?php endif; ?>
			</span>
			
			</h5>
		</div>

		<ul class="slideshow-mgarcia-list">

		<?php 
			foreach($feed as $post) {
				$postID= $post->id; 
				$title= $post->title->rendered;
				$postLink= $post->link;
				$postDate= $post->date;
				$new_date = gmdate("F jS Y", strtotime($postDate));
				$authorName= $post->_embedded->author[0]->name;
				$authorLink= $post->_embedded->author[0]->link;
				$postCategory= $post->_embedded->{'wp:term'}[0][0]->name;
				$postCategoryLink= $post->_embedded->{'wp:term'}[0][0]->link;
				$excerptPost= $post->excerpt->rendered;
		
				if( $post->featured_media != '0' ):
					$featuredImageSource= $post->_embedded->{'wp:featuredmedia'}[0]->source_url;
					//$featuredImageSource= $post->_embedded->{'wp:featuredmedia'}[0]->media_details->sizes->{'large'}->source_url; Used source image size instead as large image was not used globally
					$featuredImageAlt= $post->_embedded->{'wp:featuredmedia'}[0]->title->rendered;
				endif;
		?>

			<li class="slideshow-mgarcia-list-item" id="mg-slide-<?php echo esc_attr($postID); ?>">

				<div class="slideshow-mgarcia-list-container">
				<?php if( $post->featured_media != '0' ): ?>
					<div class="wp-block-post-featured-image"><a href="<?php echo esc_url($postLink) ?>" target="_blank"><img src="<?php echo esc_html($featuredImageSource) ?>" loading="lazy" alt="<?php echo esc_html($featuredImageAlt) ?>"></a></div>
				<?php endif; ?>

				<h2 class="wp-block-post-title has-large-font-size"><a href="<?php echo esc_url($postLink) ?>" target="_blank"><?php echo esc_html($title); ?></a></h2>

				<div class="slideshow-mgarcia-meta-list has-small-font-size">
					<span class="slideshow-mgarcia-date"><?php echo esc_html($new_date); ?></span>
					<span class="slideshow-mgarcia-date-dash"> &ndash; </span>
					<span class="slideshow-mgarcia-author"> <?php echo esc_html__( 'By', 'slideshow-mgarcia' ); ?> <a href="<?php echo esc_url($authorLink); ?>" target="_blank"><?php echo esc_html($authorName); ?></a></span>
					<span class="slideshow-mgarcia-cat"> <?php echo esc_html__( 'in', 'slideshow-mgarcia' ); ?> <a href="<?php echo esc_url($postCategoryLink); ?>" target="_blank"><?php echo esc_html($postCategory); ?></a></span>
				</div>
				<div class="slideshow-mgarcia-meta-excerpt"><?php echo wp_kses($excerptPost, true); ?></div>
				</div>
			</li>
			<?php
			}?>
		</ul>	
		
		<!-- Bullet Navigation -->
		<ol class="slideshow-mgarcia-bullets">
			<?php 
			foreach($feed as $post)  {
				$postID= $post->id; 	
			?>
				<li><a href="#mg-slide-<?php echo esc_attr($postID); ?>"></a></li>
			<?php
			} ?>
  		</ol>

		<!-- Arrow Navigation -->
		<div class="slideshow-mgarcia-prev">&lsaquo;</div>
  		<div class="slideshow-mgarcia-next">&rsaquo;</div>

		</div><!-- close .slideshow-mgarcia-container -->
		<?php
			} else { ?>
			<div class="slideshow-mgarcia-nofeed"><h5><?php echo esc_html__( 'No posts were found', 'slideshow-mgarcia' ); ?></h5</div>
		<?php } ?>
	</div>

	<?php return ob_get_clean(); 
}