import React from 'react';
import Channel from'./Channel';

export default function ChannelGrid ({sequencegrid, stepChange, gains, names, onChangeGain}) {
	let index = 0; //we're using the map like a for-loop
	const sequences = sequencegrid
	return (
		<div style={{ width: 900, overflow: 'auto', textAlign: 'initial' }}>
			{
				sequences.map(() => (
					<React.Fragment key={""+index}> 
						<Channel 
							gain={gains[index]}
							name={names[index]}
							channel={index} 
							seq={sequences[index++]} 
							stepChange={stepChange}
							onChangeGain={onChangeGain}
						/>
						<br />
					</React.Fragment>
				))
			}
		</div>
	)


}