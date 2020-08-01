import React from 'react';
import { TextField, InputAdornment  } from '@material-ui/core';
// import InputMask from 'react-input-mask'



export default class TempoField extends React.Component { 

	render(){
		return (
			<TextField
				id="outlined-number"
				label="Tempo"
				value={this.props.value}
				onChange={this.props.tempoChange}
				onKeyDownCapture={this.onKeyDownCapture}
				type="number"
				InputLabelProps={{ shrink: true }}
				margin="dense"
				variant="outlined"
				InputProps={{
					endAdornment: <InputAdornment position="end">BPM</InputAdornment>,
				}}
				style={styleTempo}
			>
			</TextField>
		)
	}
}

const styleTempo = {
	width: 125,
	marginBottom: 0,
	marginTop: 12,
}