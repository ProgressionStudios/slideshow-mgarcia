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
	register_block_type(  __DIR__ . '/build', array(
        'render_callback' => 'slideshow_mgarcia_render_post_list',
    ) );
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

// Render front-end block
function slideshow_mgarcia_render_post_list ($attributes) {
	
	$selectedFeed = $attributes['jsonFeed'] . "/wp-json/wp/v2/posts/?_embed&per_page=" . $attributes['feedCount']; 
	$request = wp_remote_get( $selectedFeed ,  array(
		'timeout'     => 20,
	));
	if( is_wp_error( $request ) ) { return "<h5>" . $attributes['missingPosts'] . "</h5>"; }
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
						if($attributes['feedFrontEnd'] == '1' ){ echo ' has-feed-title'; }
					?>
				">

					<h5 class="feed-title-slideshow-mgarcia">
						<?php echo esc_html__( 'Feed Address: ', 'slideshow-mgarcia' ) ?><span><?php echo esc_url($attributes['jsonFeed']); ?>/wp-json/wp/v2/posts/</span>
					</h5>

					<div class="carousel-slideshow-mgarcia" data-flickity='{ 
						"autoPlay" : <?php if(  $attributes['autoplaySlider'] == 0 ) : ?>false<?php else: ?>"<?php echo esc_attr($attributes['autoplayDuration']) ?>"<?php endif; ?>,
						"adaptiveHeight": true, 
						"imagesLoaded": true,
						"prevNextButtons": <?php if ( $attributes['arrowNav'] == 0 )  { echo "false"; } else { echo "true"; } ?>, 
						"pageDots": <?php if ( $attributes['bulletNav'] == 0 )  { echo "false"; } else { echo "true"; } ?>, 
						"wrapAround": <?php if ( $attributes['infiniteLoop'] == 0 )  { echo "false"; } else { echo "true"; } ?>, 
						"groupCells": <?php echo esc_attr($attributes['columnsCount']); ?> }
					'>
						<?php foreach($feed as $post) { ?>
							
							<div class="carousel-cell-mgarcia-<?php echo esc_attr($attributes['columnsCount']); ?>">
								<div class="content-container-slideshow-mgarcia">

									<?php if( $post->featured_media != '0' ): 
										$featuredImageSource= $post->_embedded->{'wp:featuredmedia'}[0]->source_url; 
										$featuredImageAlt= $post->_embedded->{'wp:featuredmedia'}[0]->title->rendered;
									?>
										<div class="wp-block-post-featured-image">
											<a href="<?php echo esc_url($post->link) ?>">
											<img src="<?php echo esc_html($featuredImageSource) ?>" alt="<?php echo esc_html($featuredImageAlt) ?>">
											</a>
										</div><!-- close .wp-block-post-featured-image -->
									<?php endif; ?>

									<h2 class="wp-block-post-title has-large-font-size">
										<a href="<?php echo esc_url($post->link) ?>"><?php echo esc_html($post->title->rendered); ?></a>
									</h2>

									<div class="meta-list-slideshow-mgarcia has-small-font-size">
										<span class="date-slideshow-mgarcia">
											<?php $postDate= $post->date; echo esc_html(gmdate("F jS Y", strtotime($postDate))); ?>
										</span>
										<?php if( isset($post->_embedded->author[0]->name) && ($post->_embedded->author[0]->name !== null) ) : ?>
											<span class="dash-slideshow-mgarcia"> &ndash; </span>
											<span class="author-slideshow-mgarcia"> 
												<?php echo esc_html__( 'By', 'slideshow-mgarcia' ); ?> 
												<a href="<?php echo esc_url($post->_embedded->author[0]->link); ?>">
													<?php echo esc_html($post->_embedded->author[0]->name); ?>
												</a>
											</span>
										<?php endif; ?>
										<span class="cat-slideshow-mgarcia"> 
											<?php echo esc_html__( 'in', 'slideshow-mgarcia' ); ?> 
											<a href="<?php echo esc_url($post->_embedded->{'wp:term'}[0][0]->link); ?>">
												<?php echo esc_html($post->_embedded->{'wp:term'}[0][0]->name); ?>
											</a>
										</span>
									</div>
									
									<div class="excerpt-slideshow-mgarcia"><?php echo wp_kses($post->excerpt->rendered, true); ?></div>

								</div><!-- close .content-container-slideshow-mgarcia -->
							</div><!-- close .carousel-cell-mgarcia- -->
						<?php }?>

					</div><!-- close .carousel-slideshow-mgarcia -->
				</div><!-- .slideshow-mgarcia-container -->
			</div>
		<?php } ?>
	<?php return ob_get_clean(); 
}