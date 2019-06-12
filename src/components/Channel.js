import React from 'react';
import Step from'./Step';

export default function Channel ({channel, seq, stepChange}) {
	var index = 0;
	const sequence = seq;
	return (
		<div>
			{
				// This unfolds the input sequence of boolean checks into a loop creating Step components
				sequence.map((s) => (
					<Step
						key={""+channel+"-"+index}
						sequence={index}
						channel={channel}
						checked={sequence[index++]}
						stepChange={stepChange}
					/>
				))
			}
		</div>
	);

}