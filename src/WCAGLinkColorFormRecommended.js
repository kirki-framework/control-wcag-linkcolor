/* globals React */
/* eslint jsx-a11y/label-has-for: off */
import { HuePicker, CompactPicker } from 'react-color';
import reactCSS from 'reactcss';
import WCAGLinkColorIndicator from './WCAGLinkColorIndicator';

const WCAGLinkColorFormRecommended = ( props ) => {
	// Handle changes to the hue picker.
	const handleChangeCompleteHuePicker = ( color ) => {
		const val = props.control.getAutoColor( parseInt( color.hsl.h, 10 ) );
		wp.customize( props.customizerSetting.id ).set( val );
	};

	// Handle changes to the recommended picker.
	const handleChangeComplete = ( color ) => {
		wp.customize( props.customizerSetting.id ).set( color.hex );
	};

	// Styles.
	const styles = reactCSS( {
		default: {
			hueWrapper: {
				position: 'relative',
				padding: '12px 0'
			},

			pickerWrapper: {
        maxHeight: '200px',
				overflowX: 'hidden',
				overflowY: 'auto'
			}
		}
	} );

	return (
		<div>
			<div style={ styles.hueWrapper }>
				<HuePicker
					width="300"
					{ ...props.choices }
					color={ props.value }
					onChangeComplete={ handleChangeCompleteHuePicker }
				/>
			</div>
			<WCAGLinkColorIndicator { ...props } />
			<div style={ styles.pickerWrapper }>
				<CompactPicker
					width="300"
					{ ...props.choices }
					color={ props.value }
					colors={ props.recommendedColorsFlat }
					onChangeComplete={ handleChangeComplete }
				/>
			</div>
		</div>
	);
};

export default WCAGLinkColorFormRecommended;
