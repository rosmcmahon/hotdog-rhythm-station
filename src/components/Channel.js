import React from 'react';
import Step from'./Step';
import { Paper, Slider } from '@material-ui/core';



export default function Channel ({channel, seq, stepChange, gain, name, onChangeGain}) {
	var index = 0;
	return (
		<span>
			<span>
			{
				// This unfolds the input sequence of boolean checks into a loop creating Step components
				seq.map((s) => (
					<Step
						key={""+channel+"-"+index}
						sequence={index}
						channel={channel}
						checked={seq[index++]}
						stepChange={stepChange}
					/>
				))
			}
			</span>
			<Paper component="span" style={{padding: 5}}>
				<Slider 
					value={gain} 
					onChange={onChangeGain(channel)} 
					min={0.0}
					max={1.0}
					step={0.01}
					style={{width: 50, padding: 5}}
				/>
				<span >{name}</span>
			</Paper>
		</span>
	);

}