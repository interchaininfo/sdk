import type { WalletInfo } from './types.js'
import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import getWallet from './getWallet.js'

export default class Wallet {
  cosmWasmClient: CosmWasmClient
  chainId: string
  denom: string

  private _walletInfo: WalletInfo | null = null

  constructor({
    cosmWasmClient,
    chainId,
  }: {
    cosmWasmClient: CosmWasmClient
    chainId: string
  }) {
    this.cosmWasmClient = cosmWasmClient
    this.chainId = chainId
  }

  public async getBalance() {
    if (this._walletInfo && this.address) {
      this._walletInfo.balance = await this.cosmWasmClient.getBalance(
        this.address,
        this.denom
      )
    }

    return this.balance
  }

  public async getWallet(
    walletType: 'keplr' | 'leap' | 'cosmostation',
    denom: string
  ) {
    if (!this._walletInfo) {
      const wallet = await getWallet(this.chainId, walletType)
      this._walletInfo = wallet
      this.denom = denom

      await this.getBalance()
    }

    return this._walletInfo
  }

  public get wallet(): WalletInfo | null {
    return this._walletInfo
  }

  public get address(): string {
    return this._walletInfo?.address ?? ''
  }

  public get name() {
    return this._walletInfo?.name
  }

  public get balance() {
    return this._walletInfo?.balance
  }

  public get type() {
    return this._walletInfo?.type
  }

  public set address(address: string) {
    this._walletInfo = {
      ...this._walletInfo,
      address,
    }
  }
}
