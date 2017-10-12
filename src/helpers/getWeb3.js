import Eth from 'ethjs'

export let getWeb3 = async () => new Promise((resolve, reject) => {
  const eth = new Eth(window.web3)
  if (eth.currentProvider !== undefined) {
    resolve(eth)
  } else {
    // use constant for error message
    reject({ error: 'no web3' })
  }
})
