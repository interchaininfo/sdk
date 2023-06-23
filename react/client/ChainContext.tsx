import React from 'react'
import { ChainClient } from '../../core/index.js'

export default React.createContext<{
  client: ChainClient | null
  connectSigning: (
    walletType: 'keplr' | 'leap' | 'cosmostation',
    denom: string
  ) => Promise<void>
}>({
  client: null,
  connectSigning: async () => {},
})
