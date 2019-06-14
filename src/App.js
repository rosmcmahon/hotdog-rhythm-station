import React from 'react';
import logo from './assets/3d-dog.png';
import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import './App.css';
import TempoField from './components/TempoField';
import ChannelGrid from './components/ChannelGrid';
import MusicEngine from './components/MusicEngine'


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
		samples[0] = 'assets/TR909_kick_hi.wav'
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
			samples: samples
		}
		this.stepChange = this.stepChange.bind(this);
		this.tempoChange = this.tempoChange.bind(this);
		this.playClick = this.playClick.bind(this);
	}

	stepChange (event) {
		let step = event.target
		let check = step.checked;
		let seq = step.id;
		let channel = step.value;

		const newState = JSON.parse(JSON.stringify(this.state))
		newState.sequences[channel][seq] = check;
		this.setState(newState);
	}
	tempoChange (event) {
		let field = event.target;
		let newText = field.value
		//let oldText = this.state.tempo
		
		console.log(
			'tempoChange: '
			+' newText: '+newText
			+' this.state.tempo: '+this.state.tempo
		)
		if (newText !== "") {
			let newNum = parseInt(newText)
			this.setState({ tempo: newNum });
			console.log('tempo updated!')
		}
		console.log('this.state.tempo: '+this.state.tempo)
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
						<Button variant="contained" size="medium" >
							Save
							<SaveIcon  />
						</Button>
						<Button variant="contained" size="medium" >
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
