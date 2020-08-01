import React from 'react'
import { Paper } from '@material-ui/core';


export default function StatusBox ({msg}) {
	let visible = (msg==="")?'none':''

	let styleVariable = {
		margin: 0,
		padding: 10,
		top: 10,
		left: 10,
		right: 'auto',
		bottom: 'auto',
		position: 'fixed', 
		backgroundColor: '#07bc0c',
		width: '95%',
		display: visible,
	};


	return (
		<Paper style={styleVariable} > {msg} </Paper>
	)
}

