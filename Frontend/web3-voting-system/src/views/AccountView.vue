<script setup>
/*import useWeb3 from "../hooks/useweb3.js";
import { ref, onMounted} from "vue";
const { Web3, voteContract, getAccounts} = useWeb3();
const voterInfo = ref({});

const getVoteInfo = async () => {
  const account = await getAccounts();
  voterInfo.value = await voteContract.methods.voters(account).call();
}

onMounted(async () => {
  await getVoteInfo();
  console.log("Voter Info is",voterInfo.value);
});
*/
</script>

<template>
  <div class="block2">
    <van-divider
  :style="{ color: '#888888', borderColor: '#888888'}"
  >
    Account Info
    </van-divider>
    <div class="Adr">
      <p class="label">Address</p>
      <p class="address">aa</p>
    </div>
    <div class="Quantity">
      <p class="label">Quantity</p>
      <p class="address">1</p>
    </div>
    <div class="Delegator">
      <p class="label">Delegator</p>
      <textarea v-show="isVisible" class="delAddress"></textarea>
    </div>
    <div v-show="isVisible" class="butn">
        <van-button size="small" block class="del-butn">Confirm</van-button>
    </div>
    <div class="Status">
      <p class="label">Status</p>
      <p class="address">Voted or Not Voted</p>
    </div>
    <div class="TargetID">
      <p class="label">Target ID</p>
      <p class="address">02</p>
    </div>
  </div>
  <van-button size="mini" block class="toggle" @click="toggleVisibility">Adding Delegator</van-button>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false, // Control the visibility of the textarea and confirm button
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible; // Toggle the visibility state
    }
  }
}
</script>

<style lang="less">
</style>