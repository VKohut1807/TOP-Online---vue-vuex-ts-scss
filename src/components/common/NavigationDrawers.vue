<script lang="ts" setup>
import {navigationDrawers} from "@/data/menuData";

import {useStore} from "vuex";
import {useRouter} from "vue-router";

import {AuthActions} from "@/store/modules/auth";

const store = useStore();
const router = useRouter();

const props = defineProps({
  navDrawerToggle: {
    type: Boolean,
    required: true,
  },
});

const onLogout = (): void => {
  store
    .dispatch(AuthActions.logoutCurrentUser)
    .then(() => router.push({name: "home"}));
};
</script>

<template>
  <nav class="nav">
    <ul :class="['nav-drawer', {active: props.navDrawerToggle}]">
      <li v-for="({title, route, icon}, idx) in navigationDrawers" :key="idx">
        <router-link :to="{name: route}" class="tag">
          <mdicon :name="icon" />
          <span class="text">{{ title }}</span>
        </router-link>
      </li>
      <li>
        <button @click="onLogout" class="tag">
          <mdicon name="Logout" />
          <span class="text">Logout</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.nav {
  position: relative;
  top: -1.5rem;
  margin-left: auto;

  .nav-drawer {
    position: absolute;
    top: 0;
    right: -10rem;
    width: fit-content;
    height: auto;
    list-style: none;
    margin-left: auto;
    background-color: $primary;
    display: flex;
    flex-direction: column;
    padding: 2rem 0rem 3rem;
    box-shadow: 0 10px 50px 0 rgba($primary_120, 0.25);
    border-radius: 5rem 0 0 5rem;
    transition: right 0.3s ease-in-out;

    &.active {
      right: 0;
    }

    li:nth-child(6) {
      &::before {
        content: "";
        display: block;
        margin: 2rem auto 0;
        padding-top: 1.15rem;
        border-top: 1px solid $secondary;
        width: 75%;
      }
    }
    li {
      .tag {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 8px;
        position: relative;
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;

        &:hover,
        &:focus,
        &.active {
          background-color: $secondary;
          outline: 0;

          span {
            transform: scale(1);
            opacity: 1;
          }
        }

        .text {
          position: absolute;
          background-color: $secondary;
          white-space: nowrap;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          right: calc(100% + 0.5rem);
          transform-origin: center left;
          transform: scale(0);
          opacity: 0;
          transition: 0.3s ease-in-out;
          &:before {
            content: "";
            display: block;
            width: 12px;
            height: 12px;
            position: absolute;
            background-color: $secondary;
            right: -5px;
            top: 50%;
            transform: translatey(-50%) rotate(45deg);
            border-radius: 3px;
          }
        }
      }
    }
  }
}

@keyframes scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
