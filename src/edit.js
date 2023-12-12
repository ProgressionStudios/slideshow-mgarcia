import { __ } from '@wordpress/i18n';
import { useBlockProps,  InspectorControls, } from '@wordpress/block-editor';
import './editor.scss';
import {useState, useEffect} from '@wordpress/element'
import { SelectControl, PanelBody, Spinner, Placeholder, RangeControl, ToggleControl, } from '@wordpress/components';
import classnames from 'classnames';
import { useSelect } from '@wordpress/data';

export default function Edit( { attributes, setAttributes }) {

	const {
		featuredImage,
		postExcerpt,
		postMeta,
		columns,
		jsonFeed
	} = attributes;


	const onChangeItemsPerPage = columns => {
		setAttributes( { columns : columns } );
	};

	const inspectorControls = (
		<InspectorControls key="inspector">
				<PanelBody title={ __( 'Slideshow Settings', 'slideshow-mgarcia' ) } initialOpen={ true }>
						<SelectControl
							label= { __( 'News Feed', 'slideshow-mgarcia' ) }
							value={ jsonFeed }
							options={ [
								{ label: 'WPTavern.com Feed', value: 'https://wptavern.com/wp-json/wp/v2/posts/?_embed' },
								{ label: __( 'Local Feed', 'slideshow-mgarcia' ), value: 'http://localhost:8888/gutenberg/wp-json/wp/v2/posts/?_embed' },
								{ label: 'CSS-Tricks.com Feed', value: 'https://css-tricks.com/wp-json/wp/v2/posts/?_embed' },
								{ label: 'rtcamp.com Feed', value: 'https://rtcamp.com/wp-json/wp/v2/posts/?_embed' },
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
				</PanelBody>
				<PanelBody title={ __( 'Carousel Options', 'slideshow-mgarcia' ) } initialOpen={ true }>
						<RangeControl
							label= { __( 'Carousel Columns', 'slideshow-mgarcia' ) }
							value={ columns }
							onChange={ onChangeItemsPerPage }
							min={ 1 }
							max={ 10 }
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
                // oups! something went wrong
                return;
            }
    
            const posts = await response.json();
            setPosts(posts);

			setLoading(false)

        }
    
        loadPosts();
		
	}, [attributes.jsonFeed])

   	console.log( posts )

	const postclasses = classnames( 'slideshow-mgarcia-list', {
        'has-featured': featuredImage,
		'has-meta': postMeta,
		'has-excerpt': postExcerpt
    } );

    return (

		<div { ...useBlockProps() }>
			{ inspectorControls }

			<div class="slideshow-mgarcia-feed-title"><h5>{ __( 'Feed address:', 'slideshow-mgarcia' ) } <span>{ jsonFeed }</span></h5></div>

			{isLoading ? (
				<Spinner />
        	) : (
				<ul className={ postclasses }>


				{posts.map((post) => {
					const titleTrimmed = post.title.rendered.trim();
     				const cleanExcerpt = post.excerpt.rendered.replace(/\[([^\[])*(\])/g, '...');

					return (
						<li class="slideshow-mgarcia-list-item" id={ post.id }>

							{ post._embedded['wp:featuredmedia'] ? (
								<div class="wp-block-post-featured-image">
										<a href={post.link} target="_blank"><img src={post._embedded['wp:featuredmedia'][0].source_url}/>
										</a></div>
										//<a href={post.link} target="_blank"><img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}/> Used source image size instead as large image was not used globally
								) : null
							}


							<h2 class="wp-block-post-title has-large-font-size"><a href={post.link} target="_blank" dangerouslySetInnerHTML={{  __html: titleTrimmed }}></a></h2>
							
							<div className="slideshow-mgarcia-meta-list">
								<span class="slideshow-mgarcia-date">{moment(post.date).format('MMMM Do, YYYY')}</span>
								<span class="slideshow-mgarcia-date-dash"> &ndash; </span>
								<span class="slideshow-mgarcia-author"> { __( 'By', 'slideshow-mgarcia' ) } <a href={post._embedded.author[0].link} target="_blank">{post._embedded.author[0].name}</a></span>
								<span class="slideshow-mgarcia-cat"> { __( 'in', 'slideshow-mgarcia' ) } <a href={post._embedded['wp:term'][0][0].link} target="_blank">{post._embedded['wp:term'][0][0].name}</a></span>
							</div>

							<div class="slideshow-mgarcia-meta-excerpt" dangerouslySetInnerHTML={{  __html: cleanExcerpt }}  />
						</li>
				 	 );
					 
   				})}

				</ul>
       		 )}
		</div>

	);
 

}