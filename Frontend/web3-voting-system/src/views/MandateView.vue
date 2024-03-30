<script setup>
  import useWeb3 from "../hooks/useweb3.js";
  import { ref, onMounted } from "vue";
  const {web3, voteContract, contractAddress} = useWeb3();
  console.log(web3);
  console.log(voteContract);
  console.log("address is: ", contractAddress);

  const host = ref("");

  const getHost = async () => {
    host.value = await voteContract.methods.host().call();
    // host.value = contractAddress;
  };

  onMounted(async () => {
    await getHost();
  });
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
          <textarea class="voters"></textarea>
      </div>
      <div class="butn">
        <van-button block class="vote-butn">Start Vote</van-button>

      </div>
  </div>
</template>

<style lang="less">
</style>