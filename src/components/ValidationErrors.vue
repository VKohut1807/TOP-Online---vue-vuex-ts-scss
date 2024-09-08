<script setup lang="ts">
const props = defineProps({
  validationErrors: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <sup
    style="color: red"
    v-for="(valueError, nameError) in validationErrors"
    :key="nameError"
    >{{ nameError }}. -
    <span v-for="(error, idxErr) in valueError" :key="idxErr">{{ error }}</span>
  </sup>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

sup {
  position: relative;
  width: fit-content;
  margin: 0 auto;
  font-size: 1rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -1rem;
    width: 0.5rem;
    aspect-ratio: 1;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: red;
  }
}
</style>
