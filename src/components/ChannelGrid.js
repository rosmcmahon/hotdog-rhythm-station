import React from 'react';
import Channel from'./Channel';

export default function ChannelGrid ({chans, stepChange, onChangeGain}) {
	let i = 0; //we're using the map like a for-loop
	return (
		<div style={{ width: 900, overflow: 'auto', textAlign: 'initial' }}>
			{
				chans.map(() => (
					<React.Fragment key={""+i}> 
						<Channel 
							gain={chans[i].gain}
							name={chans[i].name}
							channel={i} 
							seq={chans[i++].sequence} 
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