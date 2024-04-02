<script setup>
  import useWeb3 from "../hooks/useweb3.js";
  import { ref, onMounted } from "vue";
  const {web3, voteContract, contractAddress, getAccounts} = useWeb3();
  console.log(web3);
  console.log(voteContract);
  console.log("address is: ", contractAddress);

  const host = ref("");

  const votersAddress = ref("");

  const getHost = async () => {
    host.value = await voteContract.methods.host().call();
    console.log("host value is: ",host.value)
  };

  //mandate
  const mandating = async () => {
    const addr = eval(votersAddress.value);
    console.log("address are: " ,typeof(addr));
    const account = await getAccounts();
    console.log(account);
    // voteContract.methods.mandate(addr).send({from: account}).on('receipt', () => {
    //   console.log("mandate succeed");
    // })

    // await voteContract.methods.mandate(addr).on('receipt', () => {
    //   console.log("mandating succeed");
    // });

    voteContract.methods.mandate(addr).send({ from: host.value })
      .then(function(receipt){
      // This callback will be called once the transaction is confirmed
        console.log(receipt);
      }).catch(function(error){
        console.error(error);
      });


  }

  onMounted(async () => {
    await getHost();
  });

  /*
  0x2d60DA411B7A79518b01eA97e11F5E3D8781bEDD
  0x8546c1Dc726fCd46D334Ea28D34ff628D9cfAB8e
  0xFECb522dE794c6B6dF75F4bfEd4286Cf14c3f3f7
  0x168C56AF6309EcA3aa682714AFFaE90e9F4D4f6b
  ["0x8546c1Dc726fCd46D334Ea28D34ff628D9cfAB8e", "0xFECb522dE794c6B6dF75F4bfEd4286Cf14c3f3f7", "0x168C56AF6309EcA3aa682714AFFaE90e9F4D4f6b"]
  */
</script>

<template>
  <div class="block1">
      <van-divider>Mandate Page</van-divider>
      <div class="host">
          <p class="label"><van-icon name="manager"/>Host Address</p>
          <p class="address">{{host}}</p>
      </div>
      <div class="voter">
          <p class="label"><van-icon name="friends"/>Voter Address</p>
          <textarea class="voters" v-model="votersAddress"></textarea>
      </div>
      <div class="butn">
        <van-button block class="vote-butn" @click="mandating">Start Vote</van-button>

      </div>
  </div>
</template>

<style lang="less">
</style>