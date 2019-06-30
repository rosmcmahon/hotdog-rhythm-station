import React from 'react'
import { Paper } from '@material-ui/core';


export default function StatusBox ({msg}) {
	let visible = (msg==="")?'none':''
	const style = {
		margin: 0,
		padding: 20,
		top: 20,
		right: 'auto',
		bottom: 'auto',
		left: 20,
		position: 'fixed', 
		backgroundColor: '#07bc0c',
		width: 320,
		display: visible,
	};
	return (
		<Paper style={style} > {msg} </Paper>
	)
}