import Eth from 'ethjs'

// FIXME se web3 0.20 version
export let getWeb3 = async () => new Promise((resolve, reject) => {
  // FIXME provider depends of the env .env.local | .env.prod
  const eth = new Eth(new Eth.HttpProvider(process.env.REACT_APP_ETHEREUM_PROVIDER))
  if (eth.currentProvider !== undefined) {
    resolve(eth)
  } else {
    // use constant for error message
    reject(new Error({ error: 'no web3' }))
  }
})
