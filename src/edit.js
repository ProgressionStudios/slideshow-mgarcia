/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
useBlockProps, 
InspectorControls,
} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * WordPress dependencies
 */
import {
	SelectControl,
	PanelBody,
	Spinner,
	Placeholder,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes }) {

	const {
		columns,
		autoplay,
	} = attributes;

	const onChangeItemsPerPage = columns => {
		setAttributes( { columns : columns } );
	};

	const onChangeAutoplay = autoplay => {
		setAttributes( { autoplay : autoplay } );
		updateCarousel();
	};

	const inspectorControls = (
		<InspectorControls key="inspector">
				<PanelBody title={ __( 'Sorting and Filtering', 'slideshow-mgarcia' ) }>
						<SelectControl
						type="string"
						label={ __( 'Select Example' ) }
						value="test"
						options={ [
							{ label: 'Big', value: '100%' },
							{ label: 'Medium', value: '50%' },
							{ label: 'Small', value: '25%' },
						] }
						/>
						
						<ToggleControl
						label={ __( 'Enable Autoplay' ) }
						checked={ !! autoplay }
						onChange={ onChangeAutoplay }
					/>

						 <RangeControl
						label={ __( 'Carousel Columns' ) }
						value={ columns }
						onChange={ onChangeItemsPerPage }
						min={ 1 }
						max={ 6 }
						/>
				</PanelBody>
        </InspectorControls>
	);
	


    return (

		<div { ...useBlockProps() }>
			{ inspectorControls }

			{ __( 'Editor – hello from the editor!', 'slideshow-mgarcia' ) }


		</div>

	);
 

}



