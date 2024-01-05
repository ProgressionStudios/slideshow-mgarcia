import { __ } from '@wordpress/i18n';
import { useBlockProps,  InspectorControls, } from '@wordpress/block-editor';
import './editor.scss';
import {useState, useEffect} from '@wordpress/element'
import { SelectControl, PanelBody, Spinner, Placeholder, RangeControl, ToggleControl, } from '@wordpress/components';
import classnames from 'classnames';

export default function Edit( { attributes, setAttributes }) {

	const {
		featuredImage,
		postExcerpt,
		postMeta,
		feedCount,
		jsonFeed,
		bulletNav,
		arrowNav,
		feedFrontEnd,
		autoplaySlider,
		autoplayDuration
	} = attributes;


	const onChangeItemsPerPage = feedCount => {
		setAttributes( { feedCount : feedCount } );
	};
	
	const onChangeItemsDuration = autoplayDuration => {
		setAttributes( { autoplayDuration : autoplayDuration } );
	};

	const inspectorControls = (
		<InspectorControls key="inspector">
				<PanelBody title={ __( 'Layout', 'slideshow-mgarcia' ) } initialOpen={ true }>
						<SelectControl
							label= { __( 'Posts Feed', 'slideshow-mgarcia' ) }
							value={ jsonFeed }
							options={ [
								{ label: 'WPTavern.com Feed', value: 'https://wptavern.com/wp-json/wp/v2/posts/?_embed' },
								{ label: 'WPDeveloper.com Feed', value: 'https://wpdeveloper.com/wp-json/wp/v2/posts/?_embed' },
								{ label: 'CSS-Tricks.com Feed', value: 'https://css-tricks.com/wp-json/wp/v2/posts/?_embed' },
								{ label: 'GutenbergTimes.com Feed', value: 'https://gutenbergtimes.com/wp-json/wp/v2/posts/?_embed' },
								{ label: 'GutenbergHub.com Feed', value: 'https://gutenberghub.com/wp-json/wp/v2/posts/?_embed' },
								{ label: __( 'Local Feed', 'slideshow-mgarcia' ), value: '/wp-json/wp/v2/posts/?_embed' },
							] }
							onChange={ ( value ) => setAttributes( { jsonFeed: value } ) }
						/>
						<ToggleControl
							label={ __( 'Display featured image', 'slideshow-mgarcia' ) }
							checked={ featuredImage }
							onChange={ ( value ) =>
								setAttributes( { featuredImage: value } )
							}
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
							onChange={ ( value ) =>
								setAttributes( { postExcerpt: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Display feed address', 'slideshow-mgarcia' ) }
							checked={ feedFrontEnd }
							onChange={ ( value ) =>
								setAttributes( { feedFrontEnd: value } )
							}
						/>
				</PanelBody>
				<PanelBody title={ __( 'Slideshow Options', 'slideshow-mgarcia' ) } initialOpen={ true }>
						<ToggleControl
							label={ __( 'Autoplay', 'slideshow-mgarcia' ) }
							checked={ autoplaySlider }
							onChange={ ( value ) =>
								setAttributes( { autoplaySlider: value } )
							}
						/>
						{ autoplaySlider == 1 && (
						<RangeControl
							label= { __( 'Autoplay Duration (milliseconds)', 'slideshow-mgarcia' ) }
							value={ autoplayDuration }
							onChange={ onChangeItemsDuration }
							min={ 1000 }
							max={ 10000 }
						/>
						) }
						<RangeControl
							label= { __( 'Post Count', 'slideshow-mgarcia' ) }
							value={ feedCount }
							onChange={ onChangeItemsPerPage }
							min={ 1 }
							max={ 10 }
						/>
						<ToggleControl
							label={ __( 'Display bullet navigation', 'slideshow-mgarcia' ) }
							checked={ bulletNav }
							onChange={ ( value ) =>
								setAttributes( { bulletNav: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Display arrow navigation', 'slideshow-mgarcia' ) }
							checked={ arrowNav }
							onChange={ ( value ) =>
								setAttributes( { arrowNav: value } )
							}
						/>
				</PanelBody>
        </InspectorControls>
	);


	const [posts, setPosts] = useState([])
	const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPosts() {
			setLoading(true);//Causes loading spinner each time jsonfeed is changed
			const response = await fetch( jsonFeed );
			if(!response.ok) {
					return; // oups! something went wrong
			}
			const posts = await response.json();
			setPosts(posts);
			setLoading(false);
        }
        loadPosts();
	}, [])
	
	console.log(posts)


	const postclasses = classnames( 'slideshow-mgarcia-container', {
        'has-featured': featuredImage,
		'has-meta': postMeta,
		'has-excerpt': postExcerpt,
		'has-bullet-nav': bulletNav,
		'has-arrow-nav': arrowNav,
		'has-feed-front-end': feedFrontEnd
    } );


    return (

		<div { ...useBlockProps() }>
			{ inspectorControls }

			<div className={ postclasses }>

			<div className="slideshow-mgarcia-feed-title"><h5>{ __( 'Feed address:', 'slideshow-mgarcia' ) } <span>{ jsonFeed }</span></h5></div>
			
			{isLoading ? (
				<Spinner />
        	) : (
				<div className="slideshow-mgarcia-edit-container">
				<ul className="slideshow-mgarcia-list">
				{posts.slice(0, feedCount ).map((post) => {
					const titleTrimmed = post.title.rendered.trim()
     				const cleanExcerpt = post.excerpt.rendered

					return (
						<li className="slideshow-mgarcia-list-item" id={"mg-slide-" + post.id}>
							<div className="slideshow-mgarcia-list-container">
							{ post._embedded['wp:featuredmedia'] ? (
								<div className="wp-block-post-featured-image">
										<a href="#!"><img src={post._embedded['wp:featuredmedia'][0].source_url}/>
										</a></div>
										//<a href={post.link} target="_blank"><img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}/> Used source image size instead as large image was missing from some feeds
								) : null
							}

							<h2 className="wp-block-post-title has-large-font-size"><a href="#!" dangerouslySetInnerHTML={{  __html: titleTrimmed }}></a></h2>
							
							<div className="slideshow-mgarcia-meta-list has-small-font-size">
								<span className="slideshow-mgarcia-date">{moment(post.date).format('MMMM Do, YYYY')}</span>
								<span className="slideshow-mgarcia-date-dash"> &ndash; </span>
								<span className="slideshow-mgarcia-author"> { __( 'By', 'slideshow-mgarcia' ) } <a href={post._embedded.author[0].link} target="_blank">{post._embedded.author[0].name}</a></span>
								<span className="slideshow-mgarcia-cat"> { __( 'in', 'slideshow-mgarcia' ) } <a href={post._embedded['wp:term'][0][0].link} target="_blank">{post._embedded['wp:term'][0][0].name}</a></span>
							</div>

							<div className="slideshow-mgarcia-meta-excerpt" dangerouslySetInnerHTML={{  __html: cleanExcerpt }}  />
							</div>
						</li>
				 	 )
					 
   				})}
				</ul>
				
				<ol className="slideshow-mgarcia-bullets">
					{posts.slice(0, feedCount ).map((post) => {
					return (
                        <li><a href={"#mg-slide-" + post.id}></a></li>
				 	 );
   				})}
				</ol>

				</div>
       		 )}

				<div className="slideshow-mgarcia-prev">&lsaquo;</div>
				<div className="slideshow-mgarcia-next">&rsaquo;</div>
			</div>
		</div>

	);
 

}