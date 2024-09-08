<script setup lang="ts">
const props = defineProps({
  svgClass: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <svg
    :class="props.svgClass"
    width="733"
    height="425"
    viewBox="0 0 733 425"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M510.51 368.036C497.49 381.056 497.49 402.16 510.51 415.18C523.527 428.196 544.633 428.196 557.65 415.18L713.17 259.66C739.203 233.623 739.203 191.413 713.17 165.376L557.553 9.76296C544.537 -3.25438 523.433 -3.25437 510.413 9.76329C497.397 22.7806 497.397 43.8863 510.413 56.9036L632.617 179.106H33.3333C14.924 179.106 0 194.03 0 212.44C0 230.846 14.924 245.773 33.3333 245.773H632.773L510.51 368.036Z"
      fill="#0F0F0F"
    />
  </svg>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";
</style>
