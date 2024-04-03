<script setup>
/*import useweb3 from "@/hooks/useweb3";
import { onMounted, ref } from "vue";
const { web3, voteContract, getAccounts } = useweb3();

const board = ref([]);

const account = ref("");

const getBoardInfo = async () => {
  const result = await voteContract.methods.getBoardInfo().call();
  board.value = result;
};

const vote = async (index) => {
  const account = await getAccounts();
  const result = await voteContract.methods.vote(index).send({ from: account });
  console.log(result);
}

onMounted(() => {
  getBoardInfo();
})
*/
</script>

<template>
  <div class="block3">
    <van-divider
  :style="{ color: '#888888', borderColor: '#888888'}"
  >
    Board Summary
    </van-divider>
    <!--
    <van-cell-group inset>
      <van-cell :title="item.crypto" v-for="(item, index) in board">
      <template #right-icon>
        <van-button>{{ item.totalAmount }}</van-button>
      </template>
      </van-cell>
    </van-cell-group>
    -->
    <van-cell-group inset>
      <van-cell size="large" title="Cell title" >
      <template #right-icon>
        <van-button>1</van-button>
      </template>
    </van-cell>
    </van-cell-group>
  </div>
</template>

<style lang="less">
</style>

