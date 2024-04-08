<script setup>
//import useweb3 from "@/hooks/useweb3";
import { voteContract,getAccount } from '../hooks/useweb3.js';
import { ref, onMounted } from "vue";
//const {voteContract, getAccounts } = useweb3();

const board = ref([]);

// const account = ref("");

const getBoardInfo = async () => {
  const result = await voteContract.methods.getBoardInfo().call();
  board.value = result;
};

onMounted(() => {
  initEventListen();
  getBoardInfo();
})

const vote = async (index) => {
  const account = await getAccount();
  const result = await voteContract.methods.vote(index).send({ from: account });
  console.log(result);
}

const initEventListen = ( )=>{
  voteContract.events.voteSuccess({fromBlock:0},(err,event)=>{
    console.log("Event Listening");
    console.log(event)
  })
  .on("data",(event)=>{
    console.log("Event triggered by smart contract: ",event.returnValues );

  })


}

// onMounted(() => {
//   getBoardInfo();
// })

</script>

<template>
  <div class="block3">
    <van-divider
  :style="{ color: '#888888', borderColor: '#888888'}"
  >
    Board Summary
    </van-divider>
    <van-cell-group inset>
      <van-cell :title="item.crypto" v-for="(item,index) in board" :key="item.id">
        <template #right-icon>
          <van-button @click="vote(index)">{{ item.totalAmount }}</van-button>
        </template>
      </van-cell>
    </van-cell-group>
   
  </div>
</template>

<style lang="less">
</style>

