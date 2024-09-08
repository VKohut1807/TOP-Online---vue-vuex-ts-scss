<script setup lang="ts">
import IconArrowRight from "@svg/ArrowRight.vue";

const props = defineProps({
  cardData: {
    type: Object,
    required: true,
  },
  cardClass: {
    type: [String, null],
    required: false,
  },
});
</script>

<template>
  <div :class="['card', cardClass]">
    <div class="image-box">
      <img :src="cardData.img.src" :alt="cardData.img.alt" />
    </div>
    <div class="context-box">
      <div class="counter-box">
        <div class="counter">
          {{ cardData.index < 10 ? "0" + cardData.index : cardData.index }}
        </div>
        <div class="line"></div>
        <h5 class="class-name">{{ cardData["class-name"] }}</h5>
      </div>
      <h2 class="title">{{ cardData.title }}</h2>
      <p class="description">{{ cardData.description }}</p>
      <router-link :to="{name: 'home'}" class="link">
        <span class="text">read more</span>
        <IconArrowRight svg-class="svg" />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.card {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 9rem;

  @include break("md") {
    flex-direction: column;
    gap: 3rem;
  }

  &.revert {
    .image-box {
      img {
        margin: 0 0 0 auto;

        @include break("md") {
          margin: 0 auto;
        }
      }
    }

    .context-box {
      order: -1;

      @include break("md") {
        order: 1;
      }
    }
  }

  .image-box {
    flex: 1;

    img {
      margin: 0 auto 0 0;
      border-radius: 25%;

      @include break("md") {
        width: 70%;
        margin: 0 auto;
      }
    }
  }

  .context-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-left: 8rem;

    @include break("md") {
      padding-left: 0;
    }

    .counter-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;
      position: relative;
      z-index: 1;

      .counter {
        user-select: none;
        position: absolute;
        font-size: 17rem;
        top: 50%;
        left: 0%;
        color: $third_110;
        z-index: -1;
        opacity: 0.2;
        transform: translate(-50%, -50%);

        @include break("md") {
          font-size: 10rem;
          left: 100%;
          transform: translate(-100%, -50%);
        }
      }

      .line {
        width: 72px;
        height: 2px;
        background-color: $secondary;

        @include break("md") {
          display: none;
        }
      }

      .class-name {
        color: $secondary;
        text-transform: uppercase;
        font-weight: 800;
        font-size: 1.15rem;
        letter-spacing: 6px;

        @include break("md") {
          margin-left: auto;
        }
      }
    }

    .title {
      margin-top: 2rem;
      font-size: 1.5rem;
      font-weight: 600;

      @include break("md") {
        font-size: 3rem;
        text-align: center;
      }
    }

    .description {
      color: $third_100;
      line-height: 2.5rem;
      font-weight: 500;

      @include break("md") {
        font-size: 1.5rem;
      }
    }

    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      color: $primary;
      transition: color 0.3s ease-in-out;

      @include break("md") {
        font-size: 2rem;
        margin-left: auto;
      }

      &:hover {
        color: $secondary;
      }

      .text {
        line-height: 4rem;
        font-weight: 500;
      }
    }
  }
}
</style>

<style lang="scss">
@import "@scss/config/config.scss";

.link {
  &:hover {
    .svg {
      transform: translateX(5px);

      path {
        fill: $secondary;
      }
    }
  }

  .svg {
    display: block;
    width: 1.5rem;
    height: auto;
    transition: transform 0.3s ease-in-out;

    @include break("md") {
      width: 2rem;
      margin-left: auto;
    }

    path {
      fill: $primary;
      transition: fill 0.3s ease-in-out;
    }
  }
}
</style>
