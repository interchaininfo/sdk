import { useContext } from 'react'
import ChainContext from './ChainContext.js'

export default function useChain() {
  const client = useContext(ChainContext)
  return client
}
