<script setup lang="ts">
import {computed, ComputedRef, reactive} from "vue";
import {useRoute} from "vue-router";

import {Breadcrumbs} from "@/types/breadcrumbs-types";

const route = useRoute();

const breadcrumbs: ComputedRef<Breadcrumbs[]> = computed(() => {
  return (route.meta.breadcrumb as Breadcrumbs[]) || [];
});
const breadcrumbSlug: ComputedRef<string | string[]> = computed(() => {
  const slug = route.params.slug;
  return Array.isArray(slug) ? slug[0] : slug ?? "";
});
</script>

<template>
  <section id="breadcrumbs" class="breadcrumbs">
    <div class="wrapper">
      <div class="row">
        <div
          v-for="(breadcrumb, idxBreadcrumb) in breadcrumbs"
          :key="idxBreadcrumb"
          class="breadcrumb-box"
        >
          <router-link
            v-if="idxBreadcrumb < breadcrumbs.length - 1"
            :to="{name: breadcrumb.name}"
            class="breadcrumb-link"
          >
            <mdicon :name="breadcrumb.icon" />
            <span class="title">
              {{
                breadcrumb.title.includes("SLUG") && breadcrumbSlug
                  ? breadcrumb.title.replace("SLUG", String(breadcrumbSlug))
                  : breadcrumb.title
              }}
            </span>
            <mdicon name="ArrowRightThin" />
          </router-link>
          <div v-else class="breadcrumb-not-link">
            <mdicon :name="breadcrumb.icon" />
            {{
              breadcrumb.title.includes("SLUG") && breadcrumbSlug
                ? breadcrumb.title.replace("SLUG", String(breadcrumbSlug))
                : breadcrumb.title
            }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.breadcrumbs {
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2rem 0;

    .breadcrumb-box {
      font-size: 1.25rem;

      .breadcrumb-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: $secondary_50;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: $primary_30;
        }
      }

      .breadcrumb-not-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: $secondary_110;
        font-weight: 600;
      }
    }
  }
}
</style>
