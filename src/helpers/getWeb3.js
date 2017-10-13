import Eth from 'ethjs'

// FIXME se web3 0.20 version
export let getWeb3 = async () => new Promise((resolve, reject) => {
  // FIXME provider depends of the env .env.local | .env.prod
  const eth = new Eth(new Eth.HttpProvider('http://localhost:8545'))
  if (eth.currentProvider !== undefined) {
    resolve(eth)
  } else {
    // use constant for error message
    reject({ error: 'no web3' })
  }
})
