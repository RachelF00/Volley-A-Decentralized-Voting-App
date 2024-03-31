const { expect } = require("chai");

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Vote System", function () {

  async function deployVoteFixture() {
    const [host, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    let voteSystem = await ethers.getContractFactory("VoteSystem");
    voteSystem = await voteSystem.deploy(["SHIB", "DOGE", "RON"]);
    await voteSystem.waitForDeployment();
    console.log("VoteSystem deployed to:", voteSystem.target);
    return {voteSystem, host, addr1, addr2, addr3, addr4};
  }

  describe("Test", function () {
    it("Should set the right host", async function () {
      const { voteSystem, host } = await loadFixture(deployVoteFixture);
      expect(await voteSystem.host()).to.equal(host.address);
    });

    it("Should return correct board information", async function () {
      const {voteSystem} = await loadFixture(deployVoteFixture);
      const board = await voteSystem.getBoardInfo();
      expect(board.length).to.equal(3);
      expect(board[0].crypto).to.equal("SHIB");
      expect(board[1].crypto).to.equal("DOGE");
      expect(board[2].crypto).to.equal("RON");
    });

    it("Should mandate votes correctly", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      const voter1 = await voteSystem.voters(addr1.address);
      const voter2 = await voteSystem.voters(addr2.address);
      const voter3 = await voteSystem.voters(addr3.address);
      expect(voter1.weight).to.equal(1);
      expect(voter2.weight).to.equal(1);
      expect(voter3.weight).to.equal(1);
      expect(voter1.isVoted).to.be.false;
      expect(voter2.isVoted).to.be.false;
      expect(voter3.isVoted).to.be.false;
    });

    it("Only host can mandate the votes", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await expect(voteSystem.connect(addr1).mandate([addr1.address, addr2.address, addr3.address])).to.be.revertedWith("Only host can mandate the votes");
    });

    it("Should vote correctly", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).vote(0);
      await voteSystem.connect(addr2).vote(0);
      await voteSystem.connect(addr3).vote(1);
      const voter1 = await voteSystem.voters(addr1.address);
      const voter2 = await voteSystem.voters(addr2.address);
      const voter3 = await voteSystem.voters(addr3.address);
      const board = await voteSystem.getBoardInfo();
      expect(board[0].totalAmount).to.equal(2);
      expect(board[1].totalAmount).to.equal(1);
      expect(board[2].totalAmount).to.equal(0);
      expect(voter1.isVoted).to.be.true;
      expect(voter2.isVoted).to.be.true;
      expect(voter3.isVoted).to.be.true;
      const votedVoters = await voteSystem.getVotedVoters();
      expect(votedVoters).to.include(addr1.address);
      expect(votedVoters).to.include(addr2.address);
      expect(votedVoters).to.include(addr3.address);
    });

    it("You have voted already.", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).vote(0);
      await expect(voteSystem.connect(addr1).vote(1)).to.be.revertedWith("You have voted already.");
    });

    it("Invalid Crypto ID.", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await expect(voteSystem.connect(addr3).vote(4)).to.be.revertedWith("Invalid Crypto ID.");
    });


    it("Should delegate votes correctly I", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).delegate(addr2.address);
      const voter1 = await voteSystem.voters(addr1.address);
      expect(voter1.isVoted).to.be.true;
      expect(voter1.delegator).to.equal(addr2.address);
      const delegator = await voteSystem.voters(addr2.address);
      expect(delegator.weight).to.equal(2);
    });

    it("Should delegate votes correctly II", async function () {
      const {voteSystem, host, addr1, addr2, addr3, addr4} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address, addr4.address]);
      await voteSystem.connect(addr1).delegate(addr2.address);
      await voteSystem.connect(addr2).delegate(addr3.address);
      await voteSystem.connect(addr4).delegate(addr2.address);
      const voter1 = await voteSystem.voters(addr1.address);
      const voter2 = await voteSystem.voters(addr2.address);
      const voter3 = await voteSystem.voters(addr3.address);
      const voter4 = await voteSystem.voters(addr4.address);
      expect(voter1.isVoted).to.be.true;
      expect(voter2.isVoted).to.be.true;
      expect(voter3.isVoted).to.be.false;
      expect(voter4.isVoted).to.be.true;
      expect(voter1.delegator).to.equal(addr2.address);
      expect(voter2.delegator).to.equal(addr3.address);
      expect(voter4.delegator).to.equal(addr3.address);
      const delegator = await voteSystem.voters(addr3.address);
      expect(delegator.weight).to.equal(4);
    });

    it("You have voted, no need to delegate your votes to others.", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).vote(0);
      await expect(voteSystem.connect(addr1).delegate(addr2.address)).to.be.revertedWith("You have voted, no need to delegate your votes to others.");
    });
    
    it("Can't delegate to self.", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await expect(voteSystem.connect(addr1).delegate(addr1.address)).to.be.revertedWith("Can't delegate to self.");
    });

    it("delegate loop.", async function () {
      const {voteSystem, host, addr1, addr2, addr3, addr4} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).delegate(addr2.address);
      await voteSystem.connect(addr2).delegate(addr3.address);
      await voteSystem.connect(addr3).delegate(addr4.address);
      await expect(voteSystem.connect(addr4).delegate(addr2.address)).to.be.revertedWith("delegate loop.");
    });

    it("Should get correct winner", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).vote(0);
      await voteSystem.connect(addr2).vote(1);
      await voteSystem.connect(addr3).vote(2);
      const winnerList = await voteSystem.getWinner();
      expect(winnerList).to.include("SHIB");
      expect(winnerList).to.include("DOGE");
      expect(winnerList).to.include("RON");
    });

    it("Should get correct winner", async function () {
      const {voteSystem, host, addr1, addr2, addr3} = await loadFixture(deployVoteFixture);
      await voteSystem.connect(host).mandate([addr1.address, addr2.address, addr3.address]);
      await voteSystem.connect(addr1).vote(0);
      await voteSystem.connect(addr2).vote(0);
      await voteSystem.connect(addr3).vote(2);
      const winnerList = await voteSystem.getWinner();
      expect(winnerList).to.include("SHIB");
    });

  });
});