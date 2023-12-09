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
		columns
	} = attributes;

	const onChangeItemsPerPage = columns => {
		setAttributes( { columns : columns } );
	};

	const inspectorControls = (
		<InspectorControls key="inspector">
				<PanelBody title={ __( 'Slideshow Options', 'slideshow-mgarcia' ) }>
						<SelectControl
						type="string"
						label= { __( 'News Feed', 'slideshow-mgarcia' ) }
						value="https://wptavern.com/wp-json/wp/v2/posts"
						options={ [
							{ label: 'Local Feed', value: 'http://localhost:8888/gutenberg/wp-json/wp/v2/posts/?_embed' },
							{ label: 'WP Tavern', value: 'https://wptavern.com/wp-json/wp/v2/posts' },
							{ label: 'CSS Tricks', value: 'https://css-tricks.com/wp-json/wp/v2/posts/?_embed' },
						] }
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
            const response = await fetch('http://localhost:8888/gutenberg/wp-json/wp/v2/posts/?_embed');
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const posts = await response.json();
            setPosts(posts);

			setLoading(false)

        }
    
        loadPosts();
	}, [])


   	console.log( posts )


	const blockProps = useBlockProps( {
		className: classnames( {
			'has-image': featuredImage,
		} ),
	} );

	const postclasses = classnames( 'slideshow-mgarcia-list', {
        'has-featured': featuredImage,
		'has-meta': postMeta,
		'has-excerpt': postExcerpt
    } );


    return (

		<div { ...useBlockProps() }>
			{ inspectorControls }
			
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
										<a href={post.link} target="_blank"><img src={post._embedded['wp:featuredmedia'][0].source_url}/></a></div>
								) : null
							}

							<h2 class="wp-block-post-title has-large-font-size"><a href={post.link} target="_blank" dangerouslySetInnerHTML={{  __html: titleTrimmed }}></a></h2>
							
							<div className="slideshow-mgarcia-meta-list">
								<span class="slideshow-mgarcia-date">{moment(post.date).format('MMMM Do, YYYY')}</span>
								<span class="slideshow-mgarcia-date-dash"> &ndash; </span>
								<span className="slideshow-mgarcia-date"> { __( 'By', 'slideshow-mgarcia' ) } <a href={post._embedded.author[0].link} target="_blank">{post._embedded.author[0].name}</a></span>
								<span className="slideshow-mgarcia-date"> { __( 'in', 'slideshow-mgarcia' ) } <a href={post._embedded['wp:term'][0][0].link}>{post._embedded['wp:term'][0][0].name}</a></span>
							</div>

							<div className="slideshow-mgarcia-meta-excerpt" dangerouslySetInnerHTML={{  __html: cleanExcerpt }}  />
						</li>
				 	 );
					 
   				})}

				</ul>
       		 )}
		</div>

	);
 

}