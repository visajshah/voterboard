# Voterboard

A simple voting application developed using Solidity and React.

## Project Description

"Voterboard" is web based application developed using Ethereum Blockchain technology.

## Smart contracts

The project consists of two smart contracts

- Migration.sol: The Migrations contract is a basic
smart contract used primarily for migration tracking in
Truffle, the Ethereum development environment. Each time
a migration script is run (using Truffle), it deploys a new
instance of the Migrations.sol contract with an updated
last completed migration variable, signifying the completion
of a migration step.

- Voting.sol: The Voting contract serves as a voting
system, managing candidate information, voter registration,
and the voting process.

The frontend is designed using React framework.

## Getting Started

### 1. Clone the GitHub Repo

Clone the repo using ```git clone https://github.com/visajshah/voterboard.git```

### 2. Setup Blockchain instance

You either set up a local blockchain instance using Ganache or use any public test Ethereum network. (We had used Ethereum Sepolia Test Network)

### 3. Compile and Deploy smart contracts

Migrate the smart contract every time on the blockchain instance to start the election process again. 

```truffle migrate --reset --network sepolia```

### 4. Configure Metamask

Connect the metamask to the blockchain network RPC URL by creating a new custom network.

Note: Make sure that admin account has enough test ether before deploying it to the test network.

### 5. Initialize the front-end

```bash
cd client
npm install
npm start
```

Visit URL in your browser: <http://localhost:3000>
