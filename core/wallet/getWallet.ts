import { WalletInfo } from './types.js'

export default async function getWallet(
  chainId: string,
  walletType: 'keplr' | 'leap'
): Promise<WalletInfo | null> {
  window.wallet = null

  switch (walletType) {
    case 'keplr':
      if ('keplr' in window) window.wallet = window.keplr
      break
    case 'leap':
      if ('leap' in window) window.wallet = window.leap
      break
  }

  const wallet = window.wallet

  if (!wallet) {
    return null
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
  const walletInfo = await wallet.getKey(chainId)

  return {
    address: walletInfo.bech32Address,
    name: walletInfo.name,
  }
}
