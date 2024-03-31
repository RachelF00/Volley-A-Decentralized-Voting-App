import Web3 from "web3";
import VoteSystemJson from "../contracts/VoteSystem.json";
const useweb3 = () => {
    const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/bacfcbcb951e4305867e3b18d3f5da3a");
    const contractAddress = "0xF6Dd13490e476DE3dfaCdC507a61c19Bb7c17311"
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