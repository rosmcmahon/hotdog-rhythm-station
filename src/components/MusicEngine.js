
import React from 'react'
import { Song, Sequencer, Sampler } from 'react-music';

export default class MusicEngine extends React.Component {
	// ({ playing, tempo, chans}) {
	render() {
		let numSteps = this.props.chans[0].sequence.length
		let numChannels = this.props.chans.length
		/* The following converts our boolean step arrays into step number array for react-music to parse.
			This is very inefficient, the Sequencer should be using these directly and scheduling the notes 
			just in time for them to be played by the AudioContext. Currently the whole bar is set. This is 
			also causing audio glitching during live playback. */
		for(let j=0; j<numChannels; ++j) {
			let steps = this.props.chans[j].sequence;
			let newSteps = [];
			for(let i=0; i<numSteps; ++i) {
				if(steps[i]){
					newSteps.push(i);
				}
			}
			this.props.chans[j].activeSteps = newSteps; ///////////////////////////<- this.setState ????
		}		
		let channel = 0; //use this in mapping below
		
		return (
			<Song 
				playing={this.props.playing}
				tempo={this.props.tempo}
			>
				<Sequencer
					resolution={this.props.numSteps}
					bars={1} // hardcoded ...for now
				>
					{ this.props.chans.map((s) => (
						<Sampler
							gain={this.props.chans[channel].gain}
							key={channel}
							sample={this.props.chans[channel].sample}
							steps={this.props.chans[channel++].activeSteps}
						/>
					))}
				</Sequencer>
			</Song>
		)//end return
	}//end render
}//end class