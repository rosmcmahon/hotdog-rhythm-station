import React from 'react'
import './App.css'
import Header from './Header'
import Footer from '../components/Footer'
import { Grid, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import SendIcon from '@material-ui/icons/Send'
import TempoField from '../components/TempoField'
import ChannelGrid from '../components/ChannelGrid'
import MusicEngine from '../components/MusicEngine'
import StatusBox from '../components/StatusBox';
import * as DataStorage from '../utils/ArweaveFunctions'
import { decode } from 'base64-arraybuffer';
import Samples from '../assets/Samples'
import {CreateChannelObj} from '../utils/CreateChannelObj'

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

		/* hardcode samples for release v1 - in future will be dynamically loaded from permaweb */
		let chans = []
		chans.push( CreateChannelObj( decode(TR909_kick_hi), "TR909_kick_hi" ) )
		chans.push( CreateChannelObj( decode(TR909_clap), "TR909_clap" ) )
		chans.push( CreateChannelObj( decode(TR909_snare), "TR909_snare" ) )
		chans.push( CreateChannelObj( decode(TR909_closedhat), "TR909_closedhat" ) )
		chans.push( CreateChannelObj( decode(TR909_openhat), "TR909_openhat" ) )
		chans.push( CreateChannelObj( decode(TR909_rimshot), "TR909_rimshot" ) )
		chans.push( CreateChannelObj( decode(TR909_ride), "TR909_ride" ) )
		chans.push( CreateChannelObj( decode(TR909_tom_1), "TR909_tom_1" ) )

		// set app state
		this.state = {
			playing: false,
			tempo: 140,
			chans: chans,
			status: "",
			//arweave stuff
			userWallet: {},
		}
		this.stepChange = this.stepChange.bind(this);
		this.tempoChange = this.tempoChange.bind(this);
		this.playClick = this.playClick.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
		this.onClickLoad = this.onClickLoad.bind(this);
		this.onChangeGain = this.onChangeGain.bind(this);
		this.onLoadWallet = this.onLoadWallet.bind(this);
	}
	/* Event Handlers */
	onChangeGain = channel => (event, value) => {
		this.setState( ({chans}) => {
			channel = parseInt(channel)
			let o = Object.assign({}, chans[channel])
			o.gain = value
			return { chans: [
				...chans.slice(0,channel),
				o,
				...chans.slice(channel+1)
			]}
		})
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
	onLoadWallet(wallet) {
		this.setState({ userWallet: wallet })
	}
	stepChange (event) {
		let check = event.target.checked
		let step = event.target.id
		let channel = parseInt(event.target.value)

		this.setState(({chans}) => {
			let o = Object.assign({}, chans[channel])
			o.sequence[step] = check
			return { chans: [
				...chans.slice(0,channel),
				o,
				...chans.slice(channel+1,chans.length)
			]}
		})
	}
	tempoChange (event) {
		let newText = event.target.value
	
		if (newText !== "") {
			let newNum = parseInt(newText)
			this.setState({ tempo: newNum });
		}
	}
	playClick () {
		var audioCtx = window.reactMusicContext; //Hack for Chrome
		if(audioCtx.state === 'suspended') { 
				audioCtx.resume().then( () => {
					if (!this.state.playing) { this.setState({ playing: true }) }
					else { this.setState({ playing: false }) }
				});  
		}else{
			if (!this.state.playing) { this.setState({ playing: true }) }
			else { this.setState({ playing: false }) }
		}
	}
	render() {
		return (
			<div className='App'><div className="content-wrap">
				<Header onLoadWallet={this.onLoadWallet} />
				<StatusBox msg={this.state.status} />			
				<Grid
					container
					direction="row"
					justify="center"
				>
					<Grid item xs={12} md={4} >
						<Button 
							variant="outlined"
							margin="normal"
							color="secondary"
							size="large"
							onClick={this.playClick}
						>
							{this.state.playing ? "STOP" : "PLAY"}
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
					<Grid item xs={12} md={8} >
						<ChannelGrid 
							chans={this.state.chans} 
							stepChange={this.stepChange} 
							onChangeGain={this.onChangeGain} 
						/>
					</Grid>
				</Grid>
				<MusicEngine 
					playing={this.state.playing} 
					tempo={this.state.tempo}
					chans={this.state.chans}
				/>
				<Footer />
			</div></div>
  	);
	}
}

export default App;
