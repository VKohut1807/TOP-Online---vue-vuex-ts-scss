<script setup lang="ts">
import {cardData} from "@/data/homePageData";
import TopoCard from "@/components/Card.vue";
</script>

<template>
  <ul class="wrapper card-group">
    <li v-for="(cardEl, index) in cardData" :key="cardEl.index" class="card">
      <topo-card
        :card-data="cardEl"
        :card-class="index % 2 ? 'revert' : null"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.card-group {
  display: flex;
  flex-direction: column;
}
</style>
