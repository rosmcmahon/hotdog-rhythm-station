import React from 'react'
import { Dialog, DialogTitle, Grid } from '@material-ui/core'
import InputFile from './InputFile'


export default function Login ({onClose, open, onChangeFile}) {

	return (
		<Dialog 
			open={open} 
			onClose={onClose} 
			fullWidth={true}
			maxWidth={'md'}
		>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '80vh' }}
			>
				<DialogTitle >Sign in with Arweave wallet key file</DialogTitle>
				<InputFile onChangeFile={onChangeFile} />
			</Grid>
    </Dialog>
	)
}