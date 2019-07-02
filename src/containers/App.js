import React from 'react'
import Image3dDog from '../assets/Image3dDog'
import { Grid, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import SendIcon from '@material-ui/icons/Send'
import './App.css'
import TempoField from '../components/TempoField'
import ChannelGrid from '../components/ChannelGrid'
import MusicEngine from '../components/MusicEngine'
import StatusBox from '../components/StatusBox';
import Login from '../components/Login'
import * as DataStorage from '../utils/DataStorage'
import { decode } from 'base64-arraybuffer';
import Samples from '../assets/Samples'

/* this is for toast popups */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
	position: "top-left", 
	autoClose: 10000
}) // toast.info('test') toast.success('test') toast.warning('test') toast.error('test')

const { TR909_kick_hi, 
	TR909_clap, 
	TR909_snare, 
	TR909_closedhat, 
	TR909_openhat, 
	TR909_rimshot, 
	TR909_ride, 
	TR909_tom_1 } = Samples

class App extends React.Component {
	constructor() {
		super();
		const numChannels = 8; 
		const numSteps = 16; 
		
		//init sequences with falses 
		let sequences = [];
		for(let i=0; i<numChannels; ++i){
			sequences[i] = Array(numSteps).fill(false); 
		}

		/* hardcode samples for release v1 - in future will be dynamically loaded from permaweb */
		// ***** NEED TO REWRITE THE SAMPLES/CHANNELS AS OBJECTS & GET RID OF ALL THE STUPID ARRAYS ****
		let gains = Array(numChannels).fill( 0.5 );
		let samples = Array(numChannels).fill(null);
		let names = Array(numChannels).fill("");
		samples[0] = decode(TR909_kick_hi)
		samples[1] = decode(TR909_clap)
		samples[2] = decode(TR909_snare)
		samples[3] = decode(TR909_closedhat)
		samples[4] = decode(TR909_openhat)
		samples[5] = decode(TR909_rimshot)
		samples[6] = decode(TR909_ride)
		samples[7] = decode(TR909_tom_1)
		names[0] = "TR909_kick_hi"
		names[1] = "TR909_clap"
		names[2] = "TR909_snare"
		names[3] = "TR909_closedhat"
		names[4] = "TR909_openhat"
		names[5] = "TR909_rimshot"
		names[6] = "TR909_ride"
		names[7] = "TR909_tom_1"


		// set app state
		this.state = {
			numChannels: numChannels,
			numSteps: numSteps,
			playing: false,
			playText: "PLAY",
			tempo: 140,
			sequences: sequences,
			samples: samples,
			gains: gains,
			names: names,
			status: "",
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
		this.onCloseLogin = this.onCloseLogin.bind(this);
		this.onChangeGain = this.onChangeGain.bind(this);
	}
	/* Event Handlers */
	onChangeGain (event, value) {
		let channel = event.target.id
		let gains = JSON.parse(JSON.stringify(this.state.gains))
		gains[channel] = value
		this.setState({ gains: gains })
	}
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
		
		//console.log(save)
		
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
		DataStorage.saveProject(name,save,wallet,this)
		.then( msg => this.setState({status:msg}) )
		.catch(e => this.setState({status:e}))

		this.setState({status:"Sending project to the permaweb..."})

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
		var audioCtx = window.reactMusicContext;
		if(audioCtx.state === 'suspended') { //Hack for Chrome
				audioCtx.resume().then( () => {
					if (!this.state.playing) { this.setState({ playing: true, playText: "STOP" }) }
					else { this.setState({ playing: false, playText: "PLAY" }) }
				});  
		}else{
			if (!this.state.playing) { this.setState({ playing: true, playText: "STOP" }) }
			else { this.setState({ playing: false, playText: "PLAY" }) }
		}
	}
	render() {
		return (
			<div className='App'>
				<header className="App-header">
					<Image3dDog />&nbsp;&nbsp;<h1>Hotdog Rhythm Station</h1>
					<Button margin="normal" variant="outlined" color="primary" onClick={this.onClickSignin}>{this.state.btnSigninText}</Button>
					<Login onClose={this.onCloseLogin} open={this.state.openLogin} onChangeFile={this.onChangeLogin} />
				</header>
				<StatusBox msg={this.state.status} />
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
							Save &nbsp;
						<SendIcon  />
						</Button>
						<Button variant="contained" size="medium"  onClick={this.onClickLoad}>
							Load &nbsp;
							<SaveIcon  />
						</Button>
					</Grid>
					<Grid item xs={10} >
						<ChannelGrid 
							sequencegrid={this.state.sequences} 
							gains={this.state.gains} 
							names={this.state.names} 
							stepChange={this.stepChange} 
							onChangeGain={this.onChangeGain} 
						/>
					</Grid>
				</Grid>
				<MusicEngine 
					playing={this.state.playing} 
					tempo={this.state.tempo}
					numSteps={this.state.numSteps}
					numChannels={this.state.numChannels}
					sequences={this.state.sequences}
					samples={this.state.samples}
					gains={this.state.gains}
				/>
			</div>
  	);
	}
}

export default App;
