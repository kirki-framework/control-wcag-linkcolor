/* globals React, Color */
import reactCSS from 'reactcss';

const WCAGLinkColorIndicator = ( props ) => {

	// Get WCAG contrast with background.
	const getContrastBackground = () => {
		return Math.round( Color( props.value ).getDistanceLuminosityFrom( Color( props.backgroundColor ) ) * 100 ) / 100;
	};

	// Get WCAG contrast with surrounding text.
	const getContrastSurroundingText = () => {
		return Math.round( Color( props.value ).getDistanceLuminosityFrom( Color( props.textColor ) ) * 100 ) / 100;
	};

	// Get rating.
	const getRating = () => {
		const underlined = props.control.params.choices.linksUnderlined;
		const contrastBg = getContrastBackground();
		const contrastSt = getContrastSurroundingText();

		if ( 7 <= contrastBg && ( underlined || 3 <= contrastSt ) ) {
			return 'AAA';
		} else if ( 4.5 <= contrastBg && ( underlined || 3 <= contrastSt ) ) {
			return 'AA';
		} else if ( 3 <= contrastBg && ( underlined || 3 <= contrastSt ) ) {
			return 'A';
		}
		return '-';
	};

	const getRatingBackgroundColor = () => {
		const rating = getRating();
		switch ( rating ) {
			case 'AAA':
				return '#46B450';
			case 'AA':
				return '#00a0d2';
			case 'A':
				return '#ffb900';
			default:
				return '#dc3232';
		}
	};

	// Styles.
	const styles = reactCSS( {
		default: {
			selectedColorWrapper: {
				paddingBottom: '12px',
				display: 'grid',
				gridTemplateColumns: 'max-content 1fr',
				gridGap: '12px'
			},

			selectedColorIndicator: {
				width: '30px',
				height: '30px',
				borderRadius: '50%',
				display: 'block',
				backgroundColor: props.value,
				boxShadow: '#000 2px 2px 5px -3px inset'
			},

			selectedColorIndicatorWrapper: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column'
			},

			selectedColorIndicatorText: {
				fontSize: '10px',
				fontWeight: '700',
				fontFamily: 'Menlo, Consolas, monaco, monospace',
				width: 'max-content'
			},

			ratingIndicator: {
				borderRadius: '3px',
				padding: '3px 10px',
				backgroundColor: getRatingBackgroundColor(),
				color: '#fff',
				fontWeight: '700',
				fontSize: '10px'
			},

			table: {
				fontSize: '10px',
				width: '100%',
				lineHeight: '1'
			},

			td: {
				padding: '3px'
			}
		}
	} );

	return (
		<div style={ styles.selectedColorWrapper }>
			<div style={ styles.selectedColorIndicatorWrapper }>
				<div style={ styles.selectedColorIndicator }></div>
				<p style={ styles.selectedColorIndicatorText }>{ props.value }</p>
			</div>
			<table style={ styles.table }>
				<tbody>
					<tr>
						<td style={ styles.td }>{ props.i18n.a11yRating }</td>
						<td style={ styles.td }><span style={ styles.ratingIndicator }>{ getRating() }</span></td>
					</tr>
					<tr>
						<td style={ styles.td }>{ props.i18n.contrastBg }</td>
						<td style={ styles.td }>{ getContrastBackground() }</td>
					</tr>
					<tr>
						<td style={ styles.td }>{ props.i18n.contrastSt }</td>
						<td style={ styles.td }>{ getContrastSurroundingText() }</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default WCAGLinkColorIndicator;
