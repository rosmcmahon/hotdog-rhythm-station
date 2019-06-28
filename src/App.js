import React from 'react'
import logo from './assets/3d-dog.png'
import { Grid, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import './App.css'
import TempoField from './components/TempoField'
import ChannelGrid from './components/ChannelGrid'
import MusicEngine from './components/MusicEngine'
import Login from './components/Login'
import * as DataStorage from './utils/DataStorage'

/* this is for toast popups */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
	position: "top-left", 
	autoClose: 10000
})

// toast.info('test.')
// toast.success('test.')
// toast.warning('test.')
// toast.error('test.')





class App extends React.Component {
	constructor() {
		super();
		const numChannels = 10; 
		const numSteps = 16; 
		
		//init sequences with falses 
		let sequences = [];
		for(let i=0; i<numChannels; ++i){
			sequences[i] = Array(numSteps).fill(false); 
		}

		//hardcode samples for release v1
		let samples = Array(numChannels).fill(null);
		// samples[0] = 'http://arweave.net/XkfltfSIO7s2jQFh53Xa6oMeXGB09QJv0Mx8M432DPY'
		samples[0] = 'http://localhost:3000/assets/TR909_kick_hi.wav'
		//samples[0] = 'assets/TR909_kick_hi.wav'
		samples[1] = 'assets/TR909_snare.wav'
		samples[2] = 'assets/TR909_clap.wav'
		samples[3] = 'assets/TR909_closedhat.wav'
		samples[4] = 'assets/TR909_openhat.wav'
		samples[5] = 'assets/TR909_rimshot.wav'
		samples[6] = 'assets/TR909_ride.wav'
		samples[7] = 'assets/TR909_crash.wav'
		samples[8] = 'assets/TR909_tom_1.wav'
		samples[9] = 'assets/TR909_tom_2.wav'


		// set app state
		this.state = {
			numChannels: numChannels,
			numSteps: numSteps,
			playing: false,
			playText: "PLAY",
			tempo: 140,
			sequences: sequences,
			samples: samples,
			//arweave stuff
			userWallet: {},
			btnSigninText: "Sign In",
			openLogin: false
		}
		this.stepChange = this.stepChange.bind(this);
		this.tempoChange = this.tempoChange.bind(this);
		this.playClick = this.playClick.bind(this);
		this.onClickSignin = this.onClickSignin.bind(this);
		this.onChangeLogin = this.onChangeLogin.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
		this.onClickLoad = this.onClickLoad.bind(this);
	}
	/* Event Handlers */
	onClickLoad (){
		const wallet = this.state.userWallet

		if( Object.entries(wallet).length === 0 && wallet.constructor === Object ) { //check if object empty (use lodash?)
			return toast.error('Error, please sign in') 
		}

		DataStorage.loadProject(wallet, this.state)
		.then((savedState) => {
			this.setState(savedState);
			toast.success('Saved Project Loaded')
		})
		.catch((e)=> {
			console.error(e)
			toast.error(JSON.stringify(e))
		})
	}
	onClickSave () {
		const wallet = this.state.userWallet

		if( Object.entries(wallet).length === 0 && wallet.constructor === Object ) { //check if object empty (use lodash?)
			return toast.error('Error, please sign in') 
		}

		var save = JSON.stringify(this.state) // create copy of react state
		//lets be careful with the user's wallet
		save = JSON.parse(save)
		delete save.userWallet
		save = JSON.stringify(save) //good to go
		
		console.log(save)
		
		var name = "FirstLoop" // we better do something with this later
		//TODO: ask for user input - FileDialog?
		/* Lets standardize the dialog for reuse as much as possible:
			e.g.:
			<FileDialog
    		extensions={['md']}
    		onChange={FileObject => ( << do something with File object >> )}
    		onError={errMsg => ( << do something with err msg string >>)
			/>
			Use selectable List from material-ui
		*/

		/* THIS IS AN ASYNC FUNCTION  */
		DataStorage.saveProject(name,save,wallet)
		.then( (msg) => {

			toast.success(msg) 
		})
		.catch((e)=>toast.error(e))

		toast.info("Saving to the premaweb... Please wait for updates")

	}
	onClickSignin () {
		this.setState({ openLogin: true })
	}
	onChangeLogin (event) {
		var wallet = {}
		var fr = new FileReader()
		fr.onload = (ev) => {
			try {
				wallet = JSON.parse(ev.target.result)
					
				this.setState({ userWallet: wallet, btnSigninText: "Signed In"})

			} catch (err) {
					alert('Error logging in: ' + err)
			}
		}
		fr.readAsText( event.target.files[0] )
		this.setState({openLogin: false})
	}
	stepChange (event) {
		let step = event.target
		let check = step.checked;
		let seq = step.id;
		let channel = step.value;

		const newSequences = JSON.parse(JSON.stringify(this.state.sequences))
		newSequences[channel][seq] = check;
		this.setState({ sequences: newSequences });
	}
	tempoChange (event) {
		let newText = event.target.value
	
		if (newText !== "") {
			let newNum = parseInt(newText)
			this.setState({ tempo: newNum });
		}
	}
	playClick () {
		if (!this.state.playing) { this.setState({ playing: true, playText: "STOP" }) }
		else { this.setState({ playing: false, playText: "PLAY" }) }
	}
	render() {
		return (
			<div className='App'>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="hotdog logo" />&nbsp;&nbsp;<h1>Hotdog Rhythm Station</h1>
					<Button margin="normal" variant="outlined" color="primary" onClick={this.onClickSignin}>{this.state.btnSigninText}</Button>
					<Login onClose={this.onLoginClose} open={this.state.openLogin} onChangeFile={this.onChangeLogin} />
				</header>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					wrap="nowrap"
				>
					<Grid item xs={2}  >
						<Button 
							variant="outlined"
							margin="normal"
							color="secondary"
							size="large"
							onClick={this.playClick}
						>
							{this.state.playText}
						</Button>
						<TempoField value={this.state.tempo} tempoChange={this.tempoChange} />
						<Button variant="contained" size="medium" onClick={this.onClickSave}>
							Save
							<SaveIcon  />
						</Button>
						<Button variant="contained" size="medium"  onClick={this.onClickLoad}>
							Load
							<SaveIcon  />
						</Button>
					</Grid>
					<Grid item xs={10} >
						<ChannelGrid sequencegrid={this.state.sequences} stepChange={this.stepChange} />
					</Grid>
				</Grid>
				<MusicEngine 
					playing={this.state.playing}
					tempo={this.state.tempo}
					numSteps={this.state.numSteps}
					numChannels={this.state.numChannels}
					sequences={this.state.sequences}
					samples={this.state.samples}
				/>
			</div>
  	);
	}
}

export default App;
