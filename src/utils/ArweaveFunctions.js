/* This is not a React file. Arweave storage and retreval functions are in here */
import Arweave from 'arweave/web';
import React from 'react' /* I lied ;-) using some JSX below */

// Not sure why I hate global variables so much. Feels like failure :-/
const appName = "hotdog-rhythm-station"
const appVersion = "1.1.2"
console.log("USING App-Name: "+ appName )
console.log("USING App-Version: "+ appVersion)


const arweave = Arweave.init({
	host: 'arweave.net',// Hostname or IP address for a Arweave node
	port: 443,           // Port, defaults to 1984
	protocol: 'https',  // Network protocol http or https, defaults to http
	timeout: 20000,     // Network request timeouts in milliseconds
	logging: false,     // Enable network request logging
});

/* This one uses the Arweave-Id project to get a username if it exists */
export async function getArweaveID (wallet) {
	var address = await arweave.wallets.jwkToAddress(wallet)
	let query = {
		op: 'and',
		expr1: {
			op: 'and',
			expr1: { op: 'equals', expr1: 'App-Name', expr2: 'arweave-id' },
			expr2: { op: 'equals', expr1: 'from', expr2: address }
		},
		expr2: { op: 'equals', expr1: 'Type', expr2: 'name'}
	}
	const txids = await arweave.arql(query)
	if( txids.length===0 ) {
			return (
				<a title="Click here to set Arweave ID" href="https://arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0" target="_blank" rel="noopener noreferrer">
					No ArweaveID
				</a>
			)
		}
	const tx = await arweave.transactions.get(txids[0])
	const username = tx.get('data', {decode: true, string: true});

	return username
}

function getTxTagValue (tx, tagname) {
	const tags = {}
	tx.get('tags').forEach(tag => {
		let key = tag.get('name', { decode: true, string: true })
		let value = tag.get('value', { decode: true, string: true })
		//console.log('key:'+key+'\nval:'+value)
		tags[key] = value
	})
	return tags[tagname]
};

export async function saveProject (name, save, wallet, appObj) {
	console.log("entered saveProject ...")

	// Create Transaction & fill it with data and tags
	
	let tx = await arweave.createTransaction({
		data: Buffer.from(save,'utf-8')
	}, wallet)
	
	tx.addTag('App-Name', appName)
	tx.addTag('App-Version', appVersion)
	tx.addTag('File-Name', name)
	tx.addTag('Unix-Time', Date.now() )
	
	await arweave.transactions.sign(tx, wallet);
	var txid = tx.id
	console.log(txid)
	
	let response = await arweave.transactions.post(tx)
	
	console.log(response);

	// HTTP response codes (200 - ok, 400 - invalid transaction, 500 - error)
	if( response.status >= 400){
		throw new Error(JSON.stringify(response))
	}

	setInterval (async() => {
		let response = await arweave.transactions.getStatus(txid)
		const codes = {
			200: 'Permanently saved 😄',
			202: 'Pending ⛏',
			404: 'Not found (or not yet propagated, this can take a few seconds)',
			400: 'Invalid transaction',
			410: 'Transaction failed',
			500: 'Unknown error'
		}
		let msg = "Permaweb save status: " + codes[response.status]
		
		appObj.setState({status: msg }) //is it nicer to pass callback function from App.js?

	}, 10000);

	return `Save status ${response.statusText}. Please wait for confirmation`
}

export async function loadProject (wallet, state) {
	console.log("entered loadProject ...")

	/* For this initial proof of concept we are simply loading the last saved file */

	// Lets do some ArQL...
	var address = await arweave.wallets.jwkToAddress(wallet)

	let getAllProjects =
	{
		op: 'and',
		expr1: { op: 'equals', expr1: 'from', expr2: address },
		expr2: { op: 'equals', expr1: 'App-Id', expr2: appId	}
	}

	const txids = await arweave.arql(getAllProjects);
	//  console.log("Number of saved projects: " + txids.length)
	
	//get all the transactions for our IDs
	const txs = await Promise.all( txids.map( txid => arweave.transactions.get(txid) ) )
	// console.log(txs)
	
	//we're looking for the latest (biggest) date. We'll use reduce function
	const reducer = (latest, current) => {
		let t1 = parseInt( getTxTagValue(latest,'Unix-Time') )
		let t2 = parseInt( getTxTagValue(current,'Unix-Time') )
		return (t1 > t2) ? latest : current 
	}

	const txLatest = txs.reduce(reducer)
	//console.log(txLatest.id)

	const savedState = txLatest.get('data', {decode: true, string: true})


	return JSON.parse(savedState)
}