<script setup>
  import useWeb3 from "../hooks/useweb3.js";
  const {web3, voteContract, contractAddress} = useWeb3();
  console.log(web3);
  console.log(voteContract)
  console.log("address is: ", contractAddress)
</script>

<template>
  <div class="block1">
      <van-divider>Mandate Page</van-divider>
      <div class="host">
          <p class="label"><van-icon name="manager"/>Host Address</p>
          <p class="address">Host</p>
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