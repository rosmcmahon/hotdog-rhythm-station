import React from 'react';
import logo from './assets/hotdog.png';
import { Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import './App.css';
import TempoField from './components/TempoField';
import ChannelGrid from './components/ChannelGrid';

class App extends React.Component {
	constructor() {
		super();
		const numChannels = 6; //currently hardcoded, can be set
		const numSteps = 16; //currently hardcoded, can be set
		let sequences = [];

		//init sequences with falses 
		for(let i=0; i<numChannels; ++i){
			sequences[i] = Array(numSteps).fill(false); 
		}

		// set app state
		this.state = {
			playing: false,
			playText: "PLAY",
			tempo: 140,
			sequences: sequences,
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
			this.setState({ tempo: newText });
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
			</div>
  	);
	}
}

export default App;
