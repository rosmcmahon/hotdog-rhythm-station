import React from 'react';
import { Checkbox } from '@material-ui/core';

export default function Step ({ channel, sequence, checked, stepChange }){
	//const note, gain;
	return (
		<Checkbox 
			id={sequence.toString()}
			value={channel}
			checked={checked}
			onChange={stepChange}
			indeterminate
			style={styleStep}
		/>
	);
}

const styleStep = {
	width: 25,
	height: 25,
}