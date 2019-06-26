import React from 'react'
import { Dialog, DialogTitle, Grid, Button, Typography } from '@material-ui/core'
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
				<Typography variant="body1">
							<br/>
							Hotdog Rhythm Station is a drum machine that Google cannot see...<br />
							Unstoppable drum patterns that cannot be censored...<br/>
							Patterns that cannot be lost..<br/>
							<span style={{display: "inline-block", marginTop: "0.5em", marginBottom: "0.75em"}}>Well.. unless you lose your wallet key ;-)</span>
				</Typography>
				<Button 
							variant="outlined" color="secondary"
							onClick={ ()=> window.open('https://tokens.arweave.org','_blank') }>
							Get a wallet with some tokens.
				</Button>
			</Grid>
    </Dialog>
	)
}