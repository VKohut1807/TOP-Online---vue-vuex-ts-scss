<script setup lang="ts">
const props = defineProps({
  tagList: {
    type: Array,
    required: true,
  },
  tagsLinks: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="tag-list">
    <router-link
      v-if="props.tagsLinks"
      v-for="(tag, idxTag) in props.tagList"
      :key="'link-' + idxTag"
      :to="{name: 'tag', params: {slug: String(tag)}}"
      class="tag"
    >
      {{ tag }}
    </router-link>

    <div
      v-else
      v-for="(tag, idxTag) in props.tagList"
      :key="'div-' + idxTag"
      class="tag"
    >
      {{ tag }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    border: 1px solid $third_90;
    font-size: 1.1rem;
    color: $third_90;
    padding: 0.25rem 0.5rem;
    border-radius: 2rem;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
      background-color: $third_90;
      color: #000;
    }
  }
}
</style>
