<script setup>

import useWeb3 from "../hooks/useweb3.js";
import { ref, onMounted} from "vue";
const {voteContract, getAccount} = useWeb3();

const account = ref("");

// 选民信息
const voterInfo = ref({});

// 受托人地址
const delegatorAddress = ref("");

const getVoteInfo = async () => {
  account.value = await getAccount();
  voterInfo.value = await voteContract.methods.voters(account.value).call();
}

const delegate = () => {
  // console.log(delegatorAddress.value);
  voteContract.methods
    .delegate(delegatorAddress.value)
    .send({ from: account.value })
    .on('receipt', (event) => {
      console.log("delegate success");
    });
}

onMounted(async () => {
  await getVoteInfo();
  console.log("Voter Info is",voterInfo.value);
});

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
      <p class="address">{{ account }}</p>
    </div>
    <div class="Quantity">
      <p class="label">Quantity</p>
      <p class="address">{{ voterInfo.weight }}</p>
    </div>
    <div class="Delegator">
      <p class="label">Delegator</p>
      <textarea v-show="isVisible" class="delAddress" :style="{ fontStyle: 'italic' }" placeholder="Please type your delegator address 输入受托人地址" v-model="delegatorAddress"></textarea>
    </div>
    <div v-show="isVisible" class="butn">
        <van-button size="small" block class="del-butn" @click="delegate">Delegate to vote</van-button>
    </div>
    <div class="Status">
      <p class="label">Status</p>
      <p class="address">{{ voterInfo.isVoted }}</p>
    </div>
    <div class="TargetID">
      <p class="label">Target ID</p>
      <p class="address">{{voterInfo.cryptoId }}</p>
    </div>
  </div>
  <van-button block class="toggle" @click="toggleVisibility" :class="{ 'clicked': !isVisible, 'unclicked': isVisible }">Adding Delegator</van-button>
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