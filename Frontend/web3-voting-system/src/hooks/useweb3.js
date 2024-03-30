import Web3 from "web3";
import VoteSystemJson from "../contracts/VoteSystem.json";
const useweb3 = () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const voteContract = new web3.eth.Contract(VoteSystemJson.abi, contractAddress);

    return {
        web3, 
        voteContract, 
        contractAddress,
    }
}

export default useweb3;