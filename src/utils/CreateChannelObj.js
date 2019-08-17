export const CreateChannelObj =  (sample, name) => {
	return Object.assign({}, { 
		sample: sample,
		arURL: '',
		name: name,
		sequence: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
		activeSteps: [],
		gain: 0.5,
	})
}


