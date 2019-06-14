import React from 'react';
import Step from'./Step';

export default function Channel ({channel, seq, stepChange}) {
	var index = 0;
	return (
		<div>
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
		</div>
	);

}