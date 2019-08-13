import React from 'react'
import './Header.css'
import Image3dDog from '../assets/Image3dDog'
import Login from '../components/Login'
import { Button } from '@material-ui/core'

export default class Header extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			btnSigninText: "Sign In",
			openLogin: false
		}

		this.onClickSignin = this.onClickSignin.bind(this);
		this.onCloseLogin = this.onCloseLogin.bind(this);
		this.onChangeLogin = this.onChangeLogin.bind(this);
	}
	onClickSignin () {
		this.setState({ openLogin: true })
	}
	onCloseLogin () {
		this.setState({ openLogin: false })
	}
	onChangeLogin (event) {
		var wallet = {}
		var fr = new FileReader()
		fr.onload = (ev) => {
			try {
				wallet = JSON.parse(ev.target.result)
					
				this.setState({ btnSigninText: "Signed In"})

				this.props.onLoadWallet(wallet)

			} catch (err) {
					alert('Error logging in: ' + err)
			}
		}
		fr.readAsText( event.target.files[0] )
		this.setState({openLogin: false})
	}
	render() {
		return (
			<header className="App-header">
				<Image3dDog />&nbsp;&nbsp;<h1>Hotdog Rhythm Station</h1>
				<Button margin="normal" variant="outlined" color="primary" onClick={this.onClickSignin}>{this.state.btnSigninText}</Button>
				<Login onClose={this.onCloseLogin} open={this.state.openLogin} onChangeFile={this.onChangeLogin} />
			</header>
		)
	}
}
