// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VoteSystem{

    struct Voter{
        uint256 weight; //vote number
        bool isVoted;
        address delegator;
        uint256 cryptoId; //cryptocurrency Id voter votes
    }

    //vote board
    struct Board{
        string crypto;
        uint256 totalAmount;
    }

    address public host;
    mapping(address => Voter) public voters;
    Board[] public board;
    address[] public votedVoters;

    event voteSuccess(string);

    constructor(string[] memory nameList){
        host = msg.sender;
        voters[host].weight = 1;
        for(uint256 i = 0; i < nameList.length; i++){
            Board memory boardItem = Board(nameList[i], 0);
            board.push(boardItem);
        }
    }

    function getBoardInfo() public view returns(Board[] memory){
        return board;
    }

    function mandate(address[] calldata addressList) public{
        //only host can use this method
        // require(msg.sender == host, "Only host can mandate the votes");
        for(uint256 i = 0; i < addressList.length; i++){
            if(!voters[addressList[i]].isVoted){
                voters[addressList[i]].weight = 1;
            }
        }
    }

    function vote(uint256 cryptoId) public{
        Voter storage sender = voters[msg.sender];
        //require(sender.weight != 0, "You don't have enough votes.");
        require(!sender.isVoted, "You have voted already.");
        require(cryptoId < board.length, "Invalid Crypto ID."); //crypto id starts with 1
        sender.isVoted = true;
        votedVoters.push(msg.sender);
        sender.cryptoId = cryptoId;
        board[cryptoId].totalAmount += sender.weight;
        emit voteSuccess("Vote successfully.");
    }

    function delegate(address to) public{
        Voter storage sender = voters[msg.sender];
        require(!voters[msg.sender].isVoted, "You have voted, no need to delegate your votes to others.");
        require(msg.sender != to, "Can't delegate to self.");
        
        while(voters[to].delegator != address(0)){
            to = voters[to].delegator;
            require(to != msg.sender, "delegate loop.");
        }

        sender.isVoted = true;
        sender.delegator = to;

        Voter storage delegator_ = voters[to];
        if(delegator_.isVoted){
            board[delegator_.cryptoId].totalAmount += sender.weight;
        } else{
            delegator_.weight += sender.weight;
        }
    }

    function getVotedVoters() public view returns (address[] memory) {
        return votedVoters;
    }


    function getWinner() public view returns (string[] memory winnerList){
        uint winnerVoteCount = 0;
        uint equalCount = 0;
        uint winner;
        winnerList = new string[](board.length);
        for(uint i = 0; i < board.length; i++){
            if(board[i].totalAmount == winnerVoteCount){
                equalCount++;
                winnerList[equalCount-1] = board[i].crypto; 
            }else if(board[i].totalAmount > winnerVoteCount){
                winnerVoteCount = board[i].totalAmount;
                winner = i;
                equalCount = 1; 
                winnerList = new string[](board.length-i);
                winnerList[equalCount-1] = board[i].crypto; 
            }
        }
    }

}

