export let getWeb3 = async () => new Promise((resolve, reject) => {
  window.addEventListener('load', async () => {
    // FIXME use constant REACT process
    const web3 = await window.web3
    if (web3.currentProvider !== 'undefined') {
      resolve(web3)
    } else {
      reject({ error: 'no web3' })
    }
  })
})
