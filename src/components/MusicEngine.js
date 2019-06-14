import React from 'react'
import { Song, Sequencer, Sampler } from 'react-music';

export default class MusicEngine extends React.Component {
	// ({ playing, tempo, numSteps, numChannels, sequences, samples}) {
	render() {
		let numSteps = this.props.numSteps
		let numChannels = this.props.numChannels
		let activeSteps = [];
		for(let j=0; j<numChannels; ++j) {
			let steps = this.props.sequences[j];
			let newSteps = [];
			for(let i=0; i<numSteps; ++i) {
				if(steps[i]){
					newSteps.push(i);
				}
			}
			activeSteps[j] = newSteps;
			console.log("activeSteps["+j+"] = " + activeSteps[j])
			console.log("this.props.samples["+j+"]: " + this.props.samples[j])
		}
		
		let channel = 0; //use this in mapping below
		
		return (
			<div>
				<Song 
					playing={this.props.playing}
					tempo={this.props.tempo}
				>
					<Sequencer
						resolution={this.props.numSteps}
						bars={1} // hardcoded ...for now
					>
						{ this.props.sequences.map((s) => (
								<Sampler
									key={channel}
									sample={this.props.samples[channel]}
									steps={activeSteps[channel++]}
								/>
						))}
					</Sequencer>
				</Song>
			</div>
		)//end return
	}//end render
}//end class