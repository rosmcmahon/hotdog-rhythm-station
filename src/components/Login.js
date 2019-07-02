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
							Hotdog Rhythm Station is a drum machine that lives on the permaweb. Your drum patterns are saved to the permaweb forever.<br/>
							Permanent saves take some time to process, please be patient and pay attention to in app messages<br/>
							Remember, when your project is sent to the permaweb it is available forever...
							<span style={{display: "inline-block", marginTop: "0.5em", marginBottom: "0.75em"}}>...so be careful what you save! ;-)</span>
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