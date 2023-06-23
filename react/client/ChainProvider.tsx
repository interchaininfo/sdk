import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { TxProvider } from '../hooks/tx.js'
import { ChainClient } from '../../core/index.js'
import WalletProvider from '../wallet/WalletProvider.js'
import ChainContext from './ChainContext.js'

export default function ChainProvider({
  client,
  children,
}: {
  client: ChainClient
  children: ReactNode
}) {
  const [, updateState] = useState<{}>()
  const forceUpdate = useCallback(() => updateState({}), [])

  const connectSigning = useCallback(
    async (walletType: 'keplr' | 'leap' | 'cosmostation', denom: string) => {
      if (!client) return
      await client?.connectSigning(walletType, denom)
      forceUpdate()
    },
    [client, forceUpdate]
  )

  // Connect client
  useEffect(() => {
    // Unsigned Client
    async function connectClient() {
      await client?.connect()
      forceUpdate()
    }

    connectClient()
  }, [client, forceUpdate])

  return (
    <ChainContext.Provider
      value={{
        client,
        connectSigning,
      }}
    >
      <Toaster position="top-right" />
      <WalletProvider>
        <TxProvider>{children}</TxProvider>
      </WalletProvider>
    </ChainContext.Provider>
  )
}
