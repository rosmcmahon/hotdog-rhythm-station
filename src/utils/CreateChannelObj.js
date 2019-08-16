export default CreateChannelObj =  () => {
	return Object.assign({}, {
		//numSteps: 16, //<- implied from sequence.length
		sample: {},
		arURL: '',
		name: '',
		sequence: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
		activeSteps: [],
		gain: 0.5,
	})
}


