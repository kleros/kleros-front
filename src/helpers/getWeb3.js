import Web3 from 'web3'

export let getWeb3 = async () => new Promise((resolve, reject) => {
  // FIXME provider depends of the env .env.local | .env.prod
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_PROVIDER))
  if (web3.currentProvider !== undefined) {
    resolve(web3)
  } else {
    // use constant for error message
    reject(new Error({ error: 'no web3' }))
  }
})
