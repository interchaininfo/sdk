// import {
//   AminoTypes,
//   createGovAminoConverters,
//   createBankAminoConverters,
//   createStakingAminoConverters,
//   createDistributionAminoConverters,
// } from '@cosmjs/stargate'
import {
  // createWasmAminoConverters,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'
import { gasPrice } from '../config/gas.js'
import type { ChainInfo } from '@keplr-wallet/types'

export default async function getSigningCosmWasmClient(
  chainInfo: ChainInfo,
  walletType: 'keplr' | 'leap'
): Promise<SigningCosmWasmClient | null> {
  if (!chainInfo) {
    throw new Error('No Chain Info provided to connect CosmWasmClient')
  }

  switch (walletType) {
    case 'keplr':
      window.wallet = window.keplr
      break
    case 'leap':
      window.wallet = window.leap
      break
  }

  const wallet = window.wallet

  if (!wallet) {
    throw new Error('Wallet not available.')
  }

  // @ts-ignore
  if (window.wallet) {
    // @ts-ignore
    window.wallet.defaultOptions = {
      sign: {
        preferNoSetFee: true,
      },
    }
  }
  await wallet.experimentalSuggestChain(chainInfo)
  await wallet.enable(chainInfo.chainId)

  // get offline signer for signing txs
  const offlineSigner = await wallet.getOfflineSignerAuto(chainInfo.chainId)

  // make client

  // const customAminoTypes = new AminoTypes({
  //   ...createWasmAminoConverters(),
  //   ...createGovAminoConverters(),
  //   ...createBankAminoConverters(),
  //   ...createStakingAminoConverters('ujuno'),
  //   ...createDistributionAminoConverters(),
  // })

  const client = await SigningCosmWasmClient.connectWithSigner(
    chainInfo.rpc,
    offlineSigner,
    {
      gasPrice,
    }
  )

  return client
}
