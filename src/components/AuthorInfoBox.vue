<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="info-box">
    <router-link
      :to="{name: 'userProfile', params: {slug: props.data.author.username}}"
      class="link-author-image"
    >
      <img
        :src="props.data.author.image"
        alt="author logo"
        class="author-image"
      />
    </router-link>
    <div class="short-info">
      <router-link
        :to="{
          name: 'userProfile',
          params: {slug: props.data.author.username},
        }"
        class="author-name"
      >
        {{ props.data.author.username }}
      </router-link>
      <h6>
        {{ new Date(props.data.createdAt).toLocaleDateString("en-GB") }}
      </h6>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.info-box {
  display: flex;
  flex-direction: row;
  gap: 1rem;

  .link-author-image {
    display: flex;
    flex-direction: column;
    align-items: center;

    .author-image {
      width: 2.5rem;
      height: 2.5rem;
      aspect-ratio: 1;
      border-radius: 50%;
      margin: auto 0;
    }
  }

  .short-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .author-name {
      color: $primary;
      font-size: 1.5rem;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0.2rem;
        width: 0%;
        background-color: $primary;
        transition: width 0.3s ease-in-out;
      }

      &:hover {
        &::after {
          width: 100%;
        }
      }
    }
    h6 {
      font-size: 1rem;
      color: $third_80;
    }
  }
}
</style>
