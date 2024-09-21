<script setup lang="ts">
import {PropType} from "vue";

const props = defineProps({
  errorMessage: {
    type: Array as PropType<string[] | null>,
    required: false,
  },
});
</script>
<template>
  <section id="error-message" class="error-message">
    <div v-for="(error, idx) in props.errorMessage" :key="idx" class="group">
      <mdicon name="AlertCircleOutline" class="blink" />
      <span>{{ error }}</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.error-message {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  .group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    color: red;

    .blink {
      animation: blink-animation 10s infinite;
    }
  }

  @keyframes blink-animation {
    0%,
    20% {
      visibility: visible;
    }
    30%,
    40% {
      visibility: hidden;
    }
    50%,
    60% {
      visibility: visible;
    }
    70%,
    80% {
      visibility: hidden;
    }
    90%,
    100% {
      visibility: visible;
    }
  }
}
</style>
