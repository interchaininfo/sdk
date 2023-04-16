import type { ChainInfo, Keplr } from '@keplr-wallet/types'
import type {
  CosmWasmClient,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import getCosmWasmClient from './cosmwasm/getCosmWasmClient.js'
import getSigningCosmWasmClient from './cosmwasm/getSigningCosmWasmClient.js'
import Wallet from './wallet/index.js'

import { juno, osmosis } from 'juno-network'

declare global {
  interface Window {
    wallet: Keplr
    keplr: Keplr
    leap: Keplr
  }
}

export interface ChainClientConstructor {
  chainInfo: ChainInfo
}

export class ChainClient {
  private _cosmWasmClient: CosmWasmClient | null = null
  public signingCosmWasmClient: SigningCosmWasmClient | null = null

  public api: Awaited<
    ReturnType<typeof juno.ClientFactory.createLCDClient>
  > | null = null

  public osmosisClient: Awaited<
    ReturnType<typeof osmosis.ClientFactory.createRPCQueryClient>
  > | null = null
  public junoClient: Awaited<
    ReturnType<typeof juno.ClientFactory.createRPCQueryClient>
  > | null = null

  public chainInfo: ChainInfo

  private _wallet: Wallet | null = null

  constructor({ chainInfo }: ChainClientConstructor) {
    this.chainInfo = chainInfo
  }

  public async connect() {
    if (this._cosmWasmClient) {
      return
    }

    this._cosmWasmClient = await getCosmWasmClient(this.chainInfo.rpc)
    this.api = await juno.ClientFactory.createLCDClient({
      restEndpoint: this.chainInfo.rest,
    })

    this.osmosisClient = await osmosis.ClientFactory.createRPCQueryClient({
      rpcEndpoint: this.chainInfo.rpc,
    })
    this.junoClient = await juno.ClientFactory.createRPCQueryClient({
      rpcEndpoint: this.chainInfo.rpc,
    })
  }

  public async connectSigning(walletType: 'keplr' | 'leap', denom: string) {
    try {
      await this.connectSigningClient(walletType)

      if (!this.cosmWasmClient) throw new Error('Could not load CosmWasmClient')

      if (!this.signingCosmWasmClient)
        throw new Error('Could not load SigningCosmWasmClient')

      const wallet = await this.wallet.getWallet(walletType, denom)

      return wallet
    } catch (e) {
      console.error(e)
    }
  }

  public async disconnectSigning() {
    this.signingCosmWasmClient?.disconnect()
    this._wallet = null
    window.wallet = null
  }

  public async connectSigningClient(walletType: 'keplr' | 'leap') {
    this.signingCosmWasmClient = await getSigningCosmWasmClient(
      this.chainInfo,
      walletType
    )
    return this.signingCosmWasmClient
  }

  public get cosmWasmClient(): CosmWasmClient {
    return this._cosmWasmClient as CosmWasmClient
  }

  public get wallet(): Wallet {
    if (!this.cosmWasmClient) throw new Error('Could not find CosmWasmClient')

    if (this._wallet) {
      return this._wallet
    }

    // Create wallet
    this._wallet = new Wallet({
      cosmWasmClient: this.cosmWasmClient,
      chainId: this.chainInfo.chainId,
    })

    return this._wallet
  }
}
