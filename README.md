# Token Watcher

![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

### Repository Goals

![Repo Size](https://img.shields.io/github/repo-size/fs-public/ib-analyzer) ![Refactoring Overload](https://img.shields.io/badge/refactoring-overload-purple)

Refactoring challenge. How much can I optimize the source of this repository in metrics of LOC and bundle size? Let's find out!

Readability is still relevant, but secondary.

```plaintext
| Date       | Version | SLOC | Src Files | Repo size* ** | Bundle size* | Notes                               |
|------------|---------|------|-----------|---------------|--------------|-------------------------------------|
| 2022-ish   | 0.1.0   | 1512 | 35        | 720 kB        | 6 193 kB     | Original version                    |
| 29.05.2023 | 0.1.1   | 1515 | 33        | 722 kB        | 2 077 kB     | Compilable, remove sourcemaps       |
| 29.05.2023 | 0.2.0   | 1101 | 23        | 159 kB        | 1 519 kB     | Replace assets with iconify & grads |
| 30.05.2023 | 0.2.1   | 943  | 23        | 136 kB        | 1 519 kB     | Prettier, Tailwind config, fixes    |
| 30.05.2023 | 0.2.2   | 868  | 22        | 133 kB        | 1 487 kB     | Replace Redux with Zustand, fixes   |
|            |         |      |           |               |              |                                     |
```

\* as measured locally on a Windows machine. Including assets.
\*\* Without package-lock.json,.

### User-level description

**Dai Transfer Watcher** is a simple dapp giving you insight into the latest movements of the [Dai token](https://etherscan.io/address/0x6B175474E89094C44Da98b954EedeAC495271d0F) on Ethereum Mainnet. The features include:

- Showing the latest 100 transfers of Dai and all new transfers happening while the dapp is opened (including a little red dot to accentuate the latest added transfers)
- Filtering by sender and recipient (and reloading the 100 latest, even for addresses that were active three years ago!)
- Sorting the results by timestamp and amount, descending or ascending
- Links to etherscan for all transactions and addresses, convenient copy-to-clipboard buttons
- Nice UI inspired by the [Oasis App](https://oasis.app), the main dapp offered by Dai
- Optimized for mobile phones

Note that even so-called _internal_ transfers are shown – if you swap a token for ETH, and it is routed through token-DAI and DAI-ETH pools, the app will notify you about these transfers as well!

### Technical overview

**Installation**

Development:

```
npm install
npm start
```

Production:

```
npm run build
npm install -g serve
serve -s build
```

**Technologies used and their rationale**

- **React** as the go-to frontend framework
- **Redux** as one of the simplest and most battle-tested state management libraries, well-suited for the simple data structure of our application (used for global states to reduce prop drilling)
- **Web3js** for connecting to the blockchain (choice between web3js and ethers is mostly based on personal preference)
- **Typescript** (strict) to constrain runtime errors related to types and improve development experience
- **Tailwind** as preferred CSS library (styled.components might be equally fitting)
- **eslint, prettier** for standardization

**Overview of the source structure**

- **[abi]**: JSONs with contract interfaces
- **[assets]**: images, predominantly svg
- **[components]**
  -- **ColumnFilterable.tsx**: clickable column header with a filter icon and expanding filter input
  -- **ColumnSortable.tsx**: clickable column header with a sort icon
  -- **DaiTable.tsx**: main and non-generic component referencing DaiTableHead and DaiTableBody, including loading indication
  -- **DaiTableBody.tsx**: non-generic component rendering the table contents
  -- **DaiTableHead.tsx**: non-generic component rendering the table head
  -- **EtherscanLink.tsx**: displays hex linking to etherscan and copy-to-clipboard button
- **[hooks]**
  -- **useDaiData.tsx**: web3 logic fetching the first 100 transfers, refetches on filter change
  -- **useDaiEventListener.tsx**: web3 logic subscribing to events from the block following the latest block of useDaiData
  -- **useWeb3.tsx**: saves web3 and dai contracts as state (suboptimal, should be refactored) and provides the binary search utility (see Limitations)
- **[models] / DaiTransfer.tsx**: describes the basic Object type of DaiTransfer and two utilities for its handling
- **[state]**
  -- **ApplicationSlice.tsx**: holds Redux data important to the whole app (filters, blocknumber cutoff, sorting rules)
  -- **DaiTransferSlice.tsx**: holds Redux data of all displayed Dai transfers
  -- **store.tsx**: Redux store
- **[types] / types.tsx**: types for sort states and column keys
- **[views] / Home.tsx**: main page view
- **App.tsx**: App as per React conventions
- **index.tsx**: index as per React conventions
- **constants.tsx**: links, keys, behavior settings (e.g. use web3 vs use mock data)
- **utils.tsx**: utilities

**Limitations**

- **RPC**: most RPC providers constrain the maximum block span for event retrieval. Infura does not have this problem, but requires authentication. Error handling has been tailored to Infura error messages. I implemented a simple binary search to find `fromBlock` yielding between `DESIRED_NUMBER_OF_ENTRIES=100` and `10000` results (Infura limit), or the maximum number of results in case less than 100 results are available across Ethereum existence.
- **Generic components**: components, hooks, and reducers with `Dai` in the name are tailored to the specific use-case. They might be extended in the future to support more diverse applications through props.
- **Performance**: web3 data retrieval is the biggest performance bottleneck in the project. Specifically, the binary search takes excessive amount of time for highly active addresses which do not yield over 100 transfers in the last two blocks, and timestamp retrieval. Improvements in the logic and techniques such as caching (data, timestamps) and indexing (blocks) might improve the performance by a large margin.
- **Maintainability**: if the dapp was to be extended and built upon, more custom hooks (e.g. for selectors), localizing some states (e.g. sort rules), and making the components more generic might be beneficial.
- **Testing and comments**: considering the scope of the project, tests (Jest, Cypress) were deprioritized. Should definitely be regarded as technical debt and alleviated before production environment.
