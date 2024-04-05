import Web3 from "web3";
import VoteSystemJson from "../contracts/VoteSystem.json";
const useweb3 = () => {
    
    const web3 = new Web3(Web3.givenProvider || "https://sepolia.infura.io/v3/bacfcbcb951e4305867e3b18d3f5da3a");
    const contractAddress = "0x460Dabef9D03e465c9289726a6271Ee36bf35634"
    const voteContract = new web3.eth.Contract(VoteSystemJson.abi, contractAddress);

    const getAccount = async () => {
        let accounts;
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("Error requesting accounts:", error);
        }
        return accounts ? accounts[0] : null;
    };
    

    return {
        web3, 
        voteContract, 
        contractAddress,
        getAccount,
    }
}

export default useweb3;