import React from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
//import InputMask from 'react-input-mask'



export default class TempoField extends React.Component { 
	// ({ value, tempoChange }) {
	// onKeyDownCapture (event) {
	// 	let k = parseInt(event.keyCode); // only let through 48 <-> 57
	// 	console.log('onKeyDown: '
	// 		+' code: '+k
	// 	)
	// 	if( k<48 && k>57) {
	// 		console.log('PREVENT THIS')
	// 		event.stopPropagation();
	// 	}
	// }

	render(){
		return (
			<TextField
				id="outlined-number"
				label="Tempo"
				
				value={this.props.value}
				onChange={this.props.tempoChange}
				onKeyDownCapture={this.onKeyDownCapture}
				type="number"
				InputLabelProps={{
					shrink: true,
				}}
				margin="dense"
				variant="outlined"
				InputProps={{
					endAdornment: <InputAdornment position="end">BPM</InputAdornment>,
				}}
			>
				{/* <InputMask 
					mask="9??"
					formatChars={{ "9": "[0-9]", "?": "[0-9]" }}
					maskChar={null} 
				/> */}
			</TextField>
		)
	}
}