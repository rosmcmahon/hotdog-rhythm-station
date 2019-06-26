/* This is not a React file. Arweave storage and retreval functions are in here */
import Arweave from 'arweave/web';


console.log('entering DataStorage.js...')

const arweave = Arweave.init({
	host: 'arweave.net',// Hostname or IP address for a Arweave node
	port: 80,           // Port, defaults to 1984
	protocol: 'https',  // Network protocol http or https, defaults to http
	timeout: 20000,     // Network request timeouts in milliseconds
	logging: false,     // Enable network request logging
});

export function saveProject (name, state, wallet) {
	console.log("entered saveProject ...")
	var result = "Nothing was done."

	return result
}

export function getProjects (wallet) {
	console.log("entered getProjects ...")
	var projects = "Nothing was done"

	return projects
}