async function main() {
    const VoteSystem = await ethers.getContractFactory("VoteSystem");

    // Example names to be voted on. Replace these with your actual options.
    const nameList = ["Apple", "Banana", "Peach"];

    // Deploy the contract with the nameList as the argument
    const voteSystem = await VoteSystem.deploy(nameList);

    await voteSystem.waitForDeployment();
    
    console.log("VoteSystem deployed to:", voteSystem.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
