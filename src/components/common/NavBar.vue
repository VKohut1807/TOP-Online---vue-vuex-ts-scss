<script setup lang="ts">
import {navLinks} from "@/data/menuData";

import {computed, ComputedRef} from "vue";
import {useStore} from "vuex";

import {AuthTypes} from "@/types/auth-types";
import {AuthGetters} from "@/store/modules/auth";

const props = defineProps({
  navDrawerToggle: {
    type: Boolean,
    required: true,
  },
});

const store = useStore();

const isLoggedIn: ComputedRef<AuthTypes["isLoggedIn"]> = computed(() => {
  return store.getters[AuthGetters.isLoggedIn];
});

const currentUser: ComputedRef<AuthTypes["currentUser"]> = computed(() => {
  return store.getters[AuthGetters.currentUser];
});

const isAnonymous: ComputedRef<AuthTypes["isLoggedIn"]> = computed(() => {
  return store.getters[AuthGetters.isAnonymous];
});

const emit = defineEmits<{
  (e: "updateNavDrawerToggle", value: boolean): void;
}>();

const clickNavDrawerToggle = (): void => {
  emit("updateNavDrawerToggle", !props.navDrawerToggle);
};
</script>

<template>
  <nav class="nav">
    <div class="header wrapper">
      <router-link :to="{name: 'home'}" class="logo">
        <img src="@/assets/logo-transformed.webp" />
      </router-link>
      <div class="links">
        <router-link
          v-for="({route, title}, idx) in navLinks"
          :key="idx"
          :to="{name: route}"
          active-class="active"
          class="link"
          >{{ title }}</router-link
        >
      </div>
      <div class="right-gr">
        <template v-if="isAnonymous">
          <router-link
            :to="{name: 'login'}"
            active-class="active"
            class="login"
          >
            <mdicon name="AccountCircleOutline" />
            Login
          </router-link>
          <router-link
            :to="{name: 'register'}"
            active-class="active"
            class="register"
          >
            <mdicon name="AccountCircleOutline" />
            Register
          </router-link>
        </template>
        <a
          v-if="isLoggedIn"
          @click="clickNavDrawerToggle"
          :class="['account-data', {active: props.navDrawerToggle}]"
        >
          <template v-if="currentUser">
            <img :src="currentUser.image" alt="" />
            &nbsp;
            <span>
              {{ currentUser.username }}
            </span>
          </template>
          <template v-else>
            <mdicon name="AccountCircleOutline" />
            &nbsp; Account
          </template>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.nav {
  background-color: $primary;
  border-radius: 0 0 50% 50%;

  @include break("md") {
    border-radius: 0 0 25% 25%;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem 1.5rem;

    @include break("md") {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .logo {
      display: block;
      width: 2.5rem;
      border-radius: 50%;
      background-color: #fff;
      transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

      &:hover {
        background-color: $secondary;
        transform: scale(1.15);
      }
    }

    .links {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;

      @include break("md") {
        order: 2;
        grid-column: span 2;
        justify-content: center;
      }

      @include break("sm") {
        font-size: 1.5rem;
      }

      .link {
        color: #fff;
        font-size: 1.5rem;
        transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;

        &.active {
          color: $secondary;
          transform: scale(1.15) !important;
        }

        &:hover {
          color: $secondary;
        }
      }
    }

    .right-gr {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      @include break("sm") {
        font-size: 1.5rem;
      }

      .register,
      .login {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
        color: #fff;

        &:hover,
        &:focus {
          color: $secondary;
        }

        &.active {
          color: $secondary;
          transform: scale(1.15);
        }
      }

      .account-data {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
        color: #fff;

        @include break("md") {
          margin-left: auto;
        }

        img {
          width: 2rem;
          aspect-ratio: 1;
          border-radius: 50%;
        }

        &:hover,
        &:focus {
          color: $secondary;
        }

        &.active {
          color: $secondary;
          transform: scale(1.15);
        }
      }
    }
  }
}
</style>
