<h1 align='center'>InterchainInfo SDK</h1>
<p align='center'>By SparkIBC</p>

### Installation

```bash
npm install @interchaininfo/sdk
yarn add @interchaininfo/sdk
```

## Usage

### Contexts

To access chain-related data in your React components, use `useChain()`.

```js
import { useChain } from '@interchaininfo/sdk'

const { client } = useChain()
const { cosmWasmClient, junoClient, osmosisClient } = client

// Query a smart contract
cosmWasmClient.queryContractSmart()

// Query a user's balance
junoClient.cosmos.bank.v1beta1.balance()

// Query a tokenfactory denom's authority metadata
osmosisClient.tokenfactory.v1beta1.denomAuthorityMetadata()
```

To access user wallet data or trigger a wallet connect/disconnect, use `useWallet()`.

```js
import { useWallet } from '@interchaininfo/sdk'

const { wallet, connect, disconnect } = useWallet()

// Connect wallet (type is 'keplr' or 'leap')
connect('keplr')
```

### Creating a widget

```js
import { Widget, useWallet } from '@interchaininfo/sdk'
import { SemVer } from 'semver'

// Create a React component for your widget
const BalanceWidgetComponent = () => {
  const { wallet } = useWallet()
  return <div><p>Your balance is {wallet.balance} ujuno</div>
}

// Export the widget from your module
export default new Widget(BalanceWidgetComponent, {
  name: 'Balance Widget',
  author: 'Josef Leventon <josef.leventon@gmail.com>',
  copyright: '2023 Josef Leventon',
  version: new SemVer('1.0.0'),
})

```
