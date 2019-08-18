import React from 'react'
import './Footer.css'

export default Footer => {
	return (
		<footer className="footer">
			Github &nbsp;
			<a title="Github repo for this app" href="https://github.com/mcmonkeys1/hotdog-rhythm-station/" target="_blank" rel="noopener noreferrer">
				<img className="icon-frame" src="../assets/github.png" alt="github" />
			</a> 
			&nbsp; Arweave &nbsp;
			<a title="Powered by arweave" href="https://www.arweave.org/" target="_blank" rel="noopener noreferrer">
				<img className="icon-frame" src="../assets/arweave.png" alt="arweave" />
			</a> 
			&nbsp;
			&nbsp;
		</footer>
	)
}



