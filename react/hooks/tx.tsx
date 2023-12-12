import { createContext, ReactNode, useContext } from 'react'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx.js'
import {
  GasPrice,
  isDeliverTxSuccess,
  coins,
  DeliverTxResponse,
} from '@cosmjs/stargate'
import useToaster, { ToastPayload, ToastTypes } from './useToaster.js'
import useChain from '../client/useChain.js'
import useWallet from '../wallet/useWallet.js'

// Context to handle simple signingClient transactions
export interface Msg {
  typeUrl: string
  value: any
}

export interface TxOptions {
  gas?: number
  denom?: string
  toast?: {
    title?: ToastPayload['title']
    message?: ToastPayload['message']
    type?: ToastTypes
    actions?: JSX.Element
  }
}

export interface TxContext {
  tx: (msgs: Msg[], options: TxOptions, callback?: () => void) => Promise<void>
}

export const Tx = createContext<TxContext>({
  tx: () => new Promise(() => {}),
})

const calculateFee = (gas: number, gasDenom: string) => {
  const gasLimit = Math.round(gas * 1.5)
  const { denom, amount: gasPriceAmount } = GasPrice.fromString(
    `0.1${gasDenom}`
  )

  const amount = Math.ceil(
    gasPriceAmount.toFloatApproximation() * gasLimit
  ).toString()

  return {
    amount: coins(amount, denom),
    gas: String(gasLimit),
  }
}

export function TxProvider({ children }: { children: ReactNode }) {
  const { client } = useChain()
  const { refreshBalance } = useWallet()

  const toaster = useToaster()

  // Method to sign & broadcast transaction
  const tx = async (msgs: Msg[], options: TxOptions, callback?: () => void) => {
    // Simulate transaction and calculate gas
    const gas = await client.signingCosmWasmClient.simulate(
      client.wallet.wallet.address,
      msgs,
      ''
    )
    const fee = calculateFee(gas, options.denom || 'ujuno')

    let signed
    try {
      signed = await client.signingCosmWasmClient.sign(
        client.wallet.wallet.address,
        msgs,
        fee,
        ''
      )
    } catch (e) {
      console.log(e)
      return toaster.toast({
        title: 'Error',
        message: e.message,
        type: ToastTypes.Error,
      })
    }

    let broadcastToastId = ''

    broadcastToastId = toaster.toast(
      {
        title: 'Broadcasting transaction...',
        type: ToastTypes.Pending,
      },
      { duration: 999999 }
    )

    if (client?.signingCosmWasmClient && signed) {
      await client?.signingCosmWasmClient
        .broadcastTx(Uint8Array.from(TxRaw.encode(signed).finish()))
        .then((res) => {
          toaster.dismiss(broadcastToastId)
          if (isDeliverTxSuccess(res as DeliverTxResponse)) {
            // Run callback
            if (callback) callback()

            // Refresh balance
            refreshBalance()

            toaster.toast({
              title: options.toast?.title || 'Transaction Successful',
              type: options.toast?.type || ToastTypes.Success,
              dismissable: true,
              actions: options.toast?.actions || <></>,
              message: options.toast?.message || <></>,
            })
          } else {
            toaster.toast({
              title: 'Error',
              message: res.rawLog,
              type: ToastTypes.Error,
            })
          }
        })
    } else {
      toaster.dismiss(broadcastToastId)
    }
  }

  return <Tx.Provider value={{ tx }}>{children}</Tx.Provider>
}

export default (): TxContext => useContext(Tx)
