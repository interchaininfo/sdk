import React from 'react'
import { WalletInfo } from '../../core/wallet/types.js'

type WalletContextValue = {
  wallet?: WalletInfo
  login: (
    walletType: 'keplr' | 'leap' | 'cosmostation',
    denom: string
  ) => Promise<WalletInfo | void>
  logout: () => void
  refreshBalance: () => void
}

const WalletContext = React.createContext<WalletContextValue>({
  wallet: undefined,
  login: async () => {},
  logout: () => {},
  refreshBalance: () => {},
})
export default WalletContext
