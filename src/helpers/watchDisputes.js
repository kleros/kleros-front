import { Kleros } from 'kleros-api'
import { getWeb3 } from './getWeb3'

export const watchDisputes = async () => {
  try {
    let web3 = await getWeb3()

    const provider = web3.currentProvider

    let KlerosInstance = new Kleros(provider, process.env.REACT_APP_STORE_PROVIDER)
    KlerosInstance.disputes.watchForDisputes(process.env.REACT_APP_ARBITRATOR_ADDRESS)
  } catch (e) {
    throw e
  }
}
