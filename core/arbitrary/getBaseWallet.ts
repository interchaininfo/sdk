import type { Keplr } from '@keplr-wallet/types'

export default async function getBaseWallet(
  walletType: 'keplr' | 'leap' | 'cosmostation'
): Promise<Keplr | null> {
  switch (walletType) {
    case 'keplr':
      window.wallet = window.keplr
      break
    case 'leap':
      window.wallet = window.leap
      break
    case 'cosmostation':
      window.wallet = window.cosmostation.providers.keplr
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

  return wallet
}
