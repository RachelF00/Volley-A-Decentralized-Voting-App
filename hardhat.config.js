require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {

    sepolia: {
      url: `https://sepolia.infura.io/v3/bacfcbcb951e4305867e3b18d3f5da3a`,
      accounts: [`2c02bc078bc2f0702f1bbbd1e32d56e3ad8fcc317bc83c1856e34f0528f437a8`]
    }

    // localhost: {
    //   url: `http://localhost:8082/`,
    //   accounts: [`2c02bc078bc2f0702f1bbbd1e32d56e3ad8fcc317bc83c1856e34f0528f437a8`]
    // }
  }
};
