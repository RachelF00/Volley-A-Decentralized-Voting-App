require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  // networks: {
  //   ganache: { // This is a custom network name
  //     url: "http://localhost:8545",
  //     // If you have set any specific accounts in Ganache you want to use,
  //     // you can add their private keys here. For example:
  //     // accounts: ['0x...', '0x...']
  //     // Otherwise, Hardhat will automatically use the accounts provided by Ganache.
  //   }
  // }
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/bacfcbcb951e4305867e3b18d3f5da3a`,
      accounts: 
    }
  }
};
