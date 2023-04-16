import './storageFix.js'
import { useContext } from 'react'
import WalletContext from './WalletContext.js'

export default function useWallet() {
  const value = useContext(WalletContext)
  return value
}
