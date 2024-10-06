<script setup lang="ts">
import {ref, Ref} from "vue";
import {useStore} from "vuex";

import {FavoritesActions} from "@/store/modules/addToFavorites";

const props = defineProps({
  isFavorited: {
    type: Boolean,
    required: true,
  },
  postSlug: {
    type: String,
    required: true,
  },
  favoritesCount: {
    type: Number,
    required: true,
  },
});

const store = useStore();

const isFavoritedLocal: Ref<boolean> = ref(props.isFavorited);
const favoritesCountLocal: Ref<number> = ref(props.favoritesCount);

const toggleLike = (): void => {
  store.dispatch(FavoritesActions.addToFavorites, {
    slug: props.postSlug,
    isFavorited: isFavoritedLocal.value,
  });

  if (isFavoritedLocal.value) favoritesCountLocal.value--;
  else favoritesCountLocal.value++;

  isFavoritedLocal.value = !isFavoritedLocal.value;
};
</script>

<template>
  <div @click="toggleLike" class="like">
    <mdicon v-if="isFavoritedLocal" name="HeartMultiple" />
    <mdicon v-else name="HeartMultipleOutline" />
    {{ favoritesCountLocal }}
  </div>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.like {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid $primary;
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1.25rem;
  color: $primary;

  @include break("xs") {
    margin-left: auto;
  }
}
</style>
