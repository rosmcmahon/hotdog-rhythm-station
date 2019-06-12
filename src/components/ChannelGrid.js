import React from 'react';
import Channel from'./Channel';

export default function ChannelGrid ({sequencegrid, stepChange}) {
	let index = 0; //we're using the map like a for-loop
	const sequences = sequencegrid
	return (
		<div>
			{
				sequences.map(() => (
				<Channel 
					key={""+index}  // React wants this for internal use
					channel={index} 
					seq={sequences[index++]} 
					stepChange={stepChange}
				/>
				))
			}
		<br />
		</div>
	)


}