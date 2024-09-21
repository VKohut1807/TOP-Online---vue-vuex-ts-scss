<template>
  <section id="loading" class="loading">
    <img src="@/assets/logo-transformed.webp" />
    <div class="text">
      <span class="symbol" style="animation-delay: 0s">L</span>
      <span class="symbol" style="animation-delay: 0.1s">o</span>
      <span class="symbol" style="animation-delay: 0.2s">a</span>
      <span class="symbol" style="animation-delay: 0.3s">d</span>
      <span class="symbol" style="animation-delay: 0.4s">i</span>
      <span class="symbol" style="animation-delay: 0.5s">n</span>
      <span class="symbol" style="animation-delay: 0.6s">g</span>
      <span class="symbol" style="animation-delay: 0.7s">.</span>
      <span class="symbol" style="animation-delay: 0.8s">.</span>
      <span class="symbol" style="animation-delay: 0.9s">.</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.loading {
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;

  .text {
    font-size: 1.5rem;

    .symbol {
      animation: rainbow 3s infinite;
    }
  }

  img {
    width: 2rem;
    aspect-ratio: 1;
    animation: rotate-animation 7s infinite linear;
  }

  @keyframes rainbow {
    0% {
      color: $primary_40;
    }
    16% {
      color: $secondary_40;
    }
    32% {
      color: $third_40;
    }
    48% {
      color: $primary_80;
    }
    64% {
      color: $secondary_80;
    }
    80% {
      color: $third_80;
    }
    100% {
      color: $third_120;
    }
  }

  @keyframes rotate-animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
