import React from 'react'
import './Footer.css'
import ArweavePng from '../assets/ArweavePng'
import GithubPng from '../assets/GithubPng'

export default Footer => {
	return (
		<footer className="footer">
			Github &nbsp;
			<a title="Github repo for this app" href="https://github.com/mcmonkeys1/hotdog-rhythm-station/" target="_blank" rel="noopener noreferrer">
				<GithubPng />
			</a> 
			&nbsp; Arweave &nbsp;
			<a title="Powered by arweave" href="https://www.arweave.org/" target="_blank" rel="noopener noreferrer">
				<ArweavePng />
			</a> 
			&nbsp;
			&nbsp;
		</footer>
	)
}



