import Eth from 'ethjs'

export let getWeb3 = async () => new Promise((resolve, reject) => {
  window.addEventListener('load', async () => {
    // FIXME use constant REACT process
    const eth = new Eth(window.web3)
    if (eth.currentProvider !== 'undefined') {
      resolve(eth)
    } else {
      reject({ error: 'no web3' })
    }
  })
})
