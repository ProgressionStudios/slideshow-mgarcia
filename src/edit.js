import { __ } from '@wordpress/i18n';
import { useBlockProps,  InspectorControls, } from '@wordpress/block-editor';
import {useState, useEffect} from '@wordpress/element';
import { PanelBody, Spinner, RangeControl, ToggleControl, __experimentalInputControl as InputControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';
import Flickity from 'react-flickity-component';

export default function Edit( { attributes, setAttributes }) {

	const {
		featuredImage,
		postExcerpt,
		postMeta,
		feedCount,
		jsonFeed,
		missingPosts,
		bulletNav,
		arrowNav,
		feedFrontEnd,
		autoplaySlider,
		autoplayDuration,
		columnsCount,
		infiniteLoop
	} = attributes;

	const inspectorControls = (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'General', 'slideshow-mgarcia' ) } initialOpen={ true }>
				<h2 class="title-compare-mgarcia">{__('Get posts from:', 'slideshow-mgarcia')}</h2>
				<InputControl
					value={jsonFeed}
					placeholder="Ex: https://yourwebsite.com"
					type="url"
					onChange={ (value) => setAttributes({ jsonFeed: value }) }
				/>
				<NumberControl
					label={__('Post Count', 'slideshow-mgarcia')}
					value={feedCount}
					onChange={ (value) => setAttributes({ feedCount: value }) }
					min={1}
					max={15}
				/>
				<ToggleControl
					label={__('Display feed address', 'slideshow-mgarcia')}
					checked={feedFrontEnd}
					onChange={ (value) => setAttributes({ feedFrontEnd: value }) }
				/>
				<ToggleControl
					label={ __( 'Display featured image', 'slideshow-mgarcia' ) }
					checked={ featuredImage }
					onChange={ ( value ) => setAttributes( { featuredImage: value }) }
				/>
				<ToggleControl
					label={ __( 'Display post meta', 'slideshow-mgarcia' ) }
					checked={ postMeta }
					onChange={ ( value ) =>
						setAttributes( { postMeta: value } )
					}
				/>
				<ToggleControl
					label={ __( 'Display post excerpt', 'slideshow-mgarcia' ) }
					checked={ postExcerpt }
					onChange={ ( value ) => setAttributes( { postExcerpt: value }) }
				/>
				<h2 class="title-compare-mgarcia">{__('No posts message:', 'slideshow-mgarcia')}</h2>
				<InputControl
					value={missingPosts}
					type="text"
					onChange={ (value) => setAttributes({ missingPosts: value }) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Slideshow Options', 'slideshow-mgarcia' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Autoplay', 'slideshow-mgarcia' ) }
					checked={ autoplaySlider }
					onChange={ ( value ) => setAttributes( { autoplaySlider: value } ) }
				/>
				{ autoplaySlider == 1 && (
				<RangeControl
					label= { __( 'Autoplay duration (milliseconds)', 'slideshow-mgarcia' ) }
					value={ autoplayDuration }
					onChange={ ( value ) => setAttributes( { autoplayDuration: value } ) }
					min={ 1000 }
					max={ 10000 }
				/>
				) }
				<RangeControl
					label={__('Columns', 'slideshow-mgarcia')}
					value={columnsCount}
					onChange={(value) => setAttributes({ columnsCount: value }) }
					min={1}
					max={4}
				/>
				<ToggleControl
					label={__('Infinite loop', 'slideshow-mgarcia')}
					checked={infiniteLoop}
					onChange={(value) => setAttributes({ infiniteLoop: value }) }
				/>
				<ToggleControl
					label={ __( 'Display bullet navigation', 'slideshow-mgarcia' ) }
					checked={ bulletNav }
					onChange={ ( value ) => setAttributes( { bulletNav: value } ) }
				/>
				<ToggleControl
					label={ __( 'Display arrow navigation', 'slideshow-mgarcia' ) }
					checked={ arrowNav }
					onChange={ ( value ) => setAttributes( { arrowNav: value } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const [posts, setPosts] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [feedFailed, setFeedError] = useState(false)

	useEffect(() => {
		async function loadPosts() {
			setLoading(true);//Causes loading spinner each time jsonfeed is changed
			setFeedError(false);//Error check
			try {
				const updateURL = `${jsonFeed}/wp-json/wp/v2/posts/?_embed&per_page=${feedCount}`;
				const response = await fetch(updateURL);
				if (response.ok) {
					const posts = await response.json();
					setPosts(posts);
				}
			} catch (err) {
				setFeedError(true);
			} finally {
				setLoading(false);
			}
		}
		loadPosts();
	}, [feedCount, jsonFeed, autoplaySlider, infiniteLoop])
	
	const flickityOptions = {
		adaptiveHeight: true,
		imagesLoaded: true,
		groupCells: true,
		prevNextButtons: true,
		pageDots: true,
		autoPlay: autoplaySlider ? autoplayDuration : false,
		wrapAround: infiniteLoop ? true : false,
	}

	const postclasses = classnames('slideshow-mgarcia-container', {
		'has-featured': featuredImage,
		'has-meta': postMeta,
		'has-excerpt': postExcerpt,
		'has-bullet-nav': bulletNav,
		'has-arrow-nav': arrowNav,
		'has-feed-title': feedFrontEnd,
		'has-nav-btns': arrowNav,
		'has-bullets': bulletNav
	});

	let listPosts = posts.map((post) => {
		const titleTrimmed = post.title.rendered.trim();
		const cleanExcerpt = post.excerpt.rendered;
		const postDate = moment(post.date).format('MMMM Do, YYYY');
		const postAuthor = post._embedded.author[0].name;
		const postCat = post._embedded['wp:term'][0][0].name;
		return (
			<div className={"carousel-cell-mgarcia-" + columnsCount} key={"mg-slide-" + post.id}>
				<div className="content-container-slideshow-mgarcia">
					{post._embedded['wp:featuredmedia'] &&
						<div className="wp-block-post-featured-image"><img src={post._embedded['wp:featuredmedia'][0].source_url} /></div>
					}
					<h2 className="wp-block-post-title has-large-font-size"><a href="#!" dangerouslySetInnerHTML={{ __html: titleTrimmed }}></a></h2>
					<div className="meta-list-slideshow-mgarcia has-small-font-size">
						<span className="date-slideshow-mgarcia">{postDate}</span>
						<span className="dash-slideshow-mgarcia"> &ndash; </span>
						<span className="author-slideshow-mgarcia"> {__('By', 'slideshow-mgarcia')} <a href="#!">{postAuthor}</a></span>
						<span className="cat-slideshow-mgarcia"> {__('in', 'slideshow-mgarcia')} <a href="#!">{postCat}</a></span>
					</div>
					<div className="excerpt-slideshow-mgarcia" dangerouslySetInnerHTML={{ __html: cleanExcerpt }} />
				</div>
			</div>
		)
	})

	return (
		<div { ...useBlockProps() }>
			{ inspectorControls }
			<div className={postclasses}>
				<h5 className="feed-title-slideshow-mgarcia">{__('Feed address: ', 'slideshow-mgarcia')}<span>{jsonFeed}/wp-json/wp/v2/posts/</span></h5>
				{isLoading ? (<Spinner />) : (
					<>
					{feedFailed ? (<h5>{missingPosts}</h5>) : (
						<Flickity
							className={'carousel-slideshow-mgarcia'} 
							elementType={'div'}
							options={flickityOptions}
							disableImagesLoaded
							reloadOnUpdate={true}
							static
						>
						{listPosts}
						</Flickity>
					)}
					</>
				)}
			</div>
		</div>

	);
}