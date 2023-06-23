import { ReactNode, useCallback, useEffect, useState } from 'react'
import { WalletInfo } from '../../core/wallet/types.js'
import useChain from '../client/useChain.js'
import WalletContext from './WalletContext.js'

export default function WalletProvider({ children }: { children: ReactNode }) {
  const { client } = useChain()
  const [wallet, setWallet] = useState<WalletInfo>()

  const logout = useCallback(async () => {
    setWallet(undefined)
    await client?.disconnectSigning()
  }, [client])

  const login = useCallback(
    async (walletType: 'keplr' | 'leap' | 'cosmostation', denom: string) => {
      await client?.connect()
      await client?.connectSigning(walletType, denom)

      const w = client?.wallet
      if (w?.wallet) setWallet(w.wallet)

      return w.wallet
    },
    [client]
  )

  // Keplr Wallet Changed
  useEffect(() => {
    window.addEventListener('keplr_keystorechange', () => {
      console.log(
        'Key store in Keplr is changed. You may need to refetch the account info.'
      )

      logout()
    })
  }, [logout])

  // Leap Wallet Changed
  useEffect(() => {
    window.addEventListener('leap_keystorechange', () => {
      console.log(
        'Key store in Leap is changed. You may need to refetch the account info.'
      )

      logout()
    })
  }, [logout])

  async function refreshBalance() {
    const newBalance = await client?.wallet?.getBalance()

    if (client?.wallet?.wallet) {
      setWallet({
        ...client.wallet.wallet,
        balance: newBalance,
      })
    }
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        refreshBalance,
        login,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
