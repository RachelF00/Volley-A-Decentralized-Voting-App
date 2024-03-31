import Web3 from "web3";
import VoteSystemJson from "../contracts/VoteSystem.json";
const useweb3 = () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contractAddress = "0xd30C9237499904726c936a2aCE58d1C942D6072E"
    const voteContract = new web3.eth.Contract(VoteSystemJson.abi, contractAddress);

    const getAccounts = async() => {
        const accounts = await web3.eth.requestAccounts();
        return accounts[0];
    };

    return {
        web3, 
        voteContract, 
        contractAddress,
        getAccounts,
    }
}

export default useweb3;