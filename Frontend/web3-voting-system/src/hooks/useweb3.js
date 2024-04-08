import Web3 from 'web3';
import VoteSystemJson from '../contracts/VoteSystem.json'; // adjust the path to match your file structure

let web3;
let voteContract;
let contractAddress = "0x22941e3a04a291879F61c38aE059Cf4F904A4b24";

if (window.ethereum) {
    try {
        // Request account access if needed
        window.ethereum.enable();
        web3 = new Web3(window.ethereum);
    } catch (error) {
        console.error("User denied account access");
    }
} else if (window.web3) {
    // Legacy dapp browsers
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

if (web3) {
    voteContract = new web3.eth.Contract(VoteSystemJson.abi, contractAddress);
}

const getAccount = async () => {
    let accounts;
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error("Error requesting accounts:", error);
    }
    return accounts ? accounts[0] : null;
};

export {
    web3,
    voteContract,
    getAccount,
    contractAddress,
};




// import Web3 from "web3";
// import VoteSystemJson from "../contracts/VoteSystem.json";
// const useweb3 = () => {

//     const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/bacfcbcb951e4305867e3b18d3f5da3a");
//     const contractAddress = "0x41502269251aFF399d1046C22222198f288403c8"
//     // const contractAddress = "0x460Dabef9D03e465c9289726a6271Ee36bf35634"
//     const voteContract = new web3.eth.Contract(VoteSystemJson.abi, contractAddress);



//     const getAccount = async () => {
//         let accounts;
//         try {
//             accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         } catch (error) {
//             console.error("Error requesting accounts:", error);
//         }
//         return accounts ? accounts[0] : null;
//     };


//     return {
//         web3,
//         voteContract,
//         contractAddress,
//         getAccount,
//     }
// }

// export default useweb3;