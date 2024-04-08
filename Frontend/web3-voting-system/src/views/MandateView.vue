<script setup>
  //import useWeb3 from "../hooks/useweb3.js";
  import { web3, voteContract, getAccount, contractAddress } from '../hooks/useweb3.js'; // adjust the path to match your file structure
  import { ref, onMounted } from "vue";
  //const {web3, voteContract, contractAddress, getAccount} = useWeb3();
  console.log(web3);
  console.log(voteContract); 
  console.log("contract address is: ", contractAddress);

  const host = ref("");

  const voterAddress = ref("");

  const getHost = async () => {
    //host.value = await voteContract.methods.host().call();
    host.value = await getAccount();
    console.log("host value is: ",host.value)
  };

  // const mandate = async () => {
  //   const arr = eval(voterAddress.value); //string to array
  //   console.log("arr is: ", arr);
  //   // voteContract.methods.mandate(arr).send({from:)
  //   const account = await getAccount();
  //   voteContract.methods
  //     .mandate(arr)
  //     .send({ from: account })
  //     .on("receipt", () => {
  //       console.log("mandate success");
  //     });
  // };


 const mandate = async () => {
  try {
    const arr = JSON.parse(voterAddress.value); // safer way to convert string to array
    console.log("arr is: ", arr);
    const account = await getAccount();
    if (!account) {
      throw new Error("Account not found");
    }
    if (!voteContract.methods.mandate) {
      throw new Error("mandate method not found in voteContract");
    }
    voteContract.methods
      .mandate(arr)
      .send({ from: account })
      .on("receipt", () => {
        console.log("mandate success");
      })
      .on("error", (error) => {
        console.error("Error in transaction: ", error);
      });
  } catch (error) {
    console.error("Error in mandate: ", error);
  }
};

  onMounted(async () => {
    await getHost();
  });

  /*
  主持人：0x9bB61dcD1A458fFa2d976c78f4a2Aae4f81Da0cc

  0xd4a099108681e45977F90fC27655045b40F33ead

  0x8546c1Dc726fCd46D334Ea28D34ff628D9cfAB8e
  0xFECb522dE794c6B6dF75F4bfEd4286Cf14c3f3f7
  0x168C56AF6309EcA3aa682714AFFaE90e9F4D4f6b
  ["0x8546c1Dc726fCd46D334Ea28D34ff628D9cfAB8e", "0xFECb522dE794c6B6dF75F4bfEd4286Cf14c3f3f7", "0x168C56AF6309EcA3aa682714AFFaE90e9F4D4f6b"]
  */

 /* Rui's testing accounts with SepoliaEth
 host:0xF9936A7A8814A20Fe9698a089dA3fABAE1366F8D
 account1:0xDc0418Cb07E0773f306Bb209426e082185aeCB6C
 account2:0xBFb79f1d72ae48cA3FCe79D1169379F77a8699f8
 ["0xDc0418Cb07E0773f306Bb209426e082185aeCB6C", "0xBFb79f1d72ae48cA3FCe79D1169379F77a8699f8"]
  

 */

</script>

<template>
  <div class="block1">
    <van-divider
  :style="{ color: '#888888', borderColor: '#888888'}"
  >
    Mandate Page
    </van-divider>
      <div class="host">
          <p class="label"><van-icon name="manager"/>Host Address</p>
          <p class="address">{{host}}</p>
      </div>
      <div class="voter">
          <p class="label"><van-icon name="friends"/>Voter Address</p>
          <textarea class="voters" v-model="voterAddress"></textarea>
      </div>
      <div class="butn">
        <van-button block class="vote-butn" @click="mandate">Start Vote</van-button>
      </div>
  </div>
</template>

<style lang="less">
</style>