import React from 'react'
import './Footer.css'
import ArweavePng from '../assets/ArweavePng'
import GithubPng from '../assets/GithubPng'
import { Button } from '@material-ui/core'

export default Footer => {
	const clickFullscreen = async () => {
		await document.body.requestFullscreen();
		//if(window.orientation){
			await window.screen.orientation.lock("landscape");
		// }
	}
	return (
		<>
			<footer className="app-footer">
				<a title="Github repo for this app" href="https://github.com/mcmonkeys1/hotdog-rhythm-station/" target="_blank" rel="noopener noreferrer">
					Github &nbsp;
					<GithubPng />
				</a> 
				<a title="Powered by arweave" href="https://www.arweave.org/" target="_blank" rel="noopener noreferrer">
					&nbsp; Arweave &nbsp;
					<ArweavePng />
				</a> 
				<div className='fullscreen-button'>
					<Button style={{marginBottom:'5px'}} variant='contained' onClick={clickFullscreen}>fullscreen</Button>
				</div>
			</footer>
		</>
	)
}



