import React from 'react'
import './Header.css'
import imgSrcHotdog from '../assets/icon.png'
import Login from '../components/Login'
import { Button } from '@material-ui/core'
import * as ArweaveId from '../utils/ArweaveFunctions'

export default class Header extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			btnSigninText: "Sign In",
			openLogin: false,
			username: '',
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
				
				ArweaveId.getArweaveID(wallet).then((username)=>this.setState({username}))

			} catch (err) {
					alert('Error logging in: ' + err)
			}
		}
		fr.readAsText( event.target.files[0] )
		this.setState({openLogin: false})
	}
	render() {
		return (
			<header className="app-header">
				<img src={imgSrcHotdog} height='50'/>
				<h1>Hotdog Rhythm Station</h1>
				<Button margin="normal" variant="outlined" color="primary" onClick={this.onClickSignin}>{this.state.btnSigninText}</Button>
				<Login onClose={this.onCloseLogin} open={this.state.openLogin} onChangeFile={this.onChangeLogin} />
				<h3>{this.state.username}</h3>
			</header>
		)
	}
}
