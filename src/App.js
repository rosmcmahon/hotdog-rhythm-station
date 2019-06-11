import React from 'react';
import logo from './assets/hotdog.png';
import './App.css';
import Channel from './Channel';
//import update from 'immutability-helper';


class App extends React.Component {
	constructor() {
		super();
		const numChannels = 6;
		const numSteps = 16;
		let sequences = [];

		//init seq with falses 
		for(let i=0; i<numChannels; ++i){
			sequences[i] = Array(numSteps).fill(false); //it's OK we're being careful
		}

		// set app state
		this.state = {
			playing: false,
			sequences: sequences,
		}
		this.stepChange = this.stepChange.bind(this);
	}

	stepChange (event) {
		let step = event.target
		let check = step.checked;
		let seq = step.id;
		let channel = step.value;
		console.log(
			'check: '+check
			+' seq: '+seq
			+' channel: '+channel
		)

		const newState = JSON.parse(JSON.stringify(this.state))
		newState.sequences[channel][seq] = check;
		this.setState(newState);
	}
	render() {
		return (
			<div className='App'>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="hotdog logo" />&nbsp;&nbsp;<h1>Hotdog Rhythm Station</h1>
				</header>
				<Channel num={0} seq={this.state.sequences[0]} stepChange={this.stepChange}/>
				<Channel num={1} seq={this.state.sequences[1]} stepChange={this.stepChange}/>
				<Channel num={2} seq={this.state.sequences[2]} stepChange={this.stepChange}/>
				<Channel num={3} seq={this.state.sequences[3]} stepChange={this.stepChange}/>
				<Channel num={4} seq={this.state.sequences[4]} stepChange={this.stepChange}/>
				<Channel num={5} seq={this.state.sequences[5]} stepChange={this.stepChange}/>
			</div>
  	);
	}
}

export default App;
