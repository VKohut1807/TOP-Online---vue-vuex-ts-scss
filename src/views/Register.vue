<script setup lang="ts">
import {computed, ComputedRef, reactive, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import {AuthTypes} from "@/types/auth-types";
import {UserType} from "@/types/user-types";
import {AuthActions, AuthMutations} from "@/store/modules/auth";

import TopoValidationErrors from "@/components/ValidationErrors.vue";

const store = useStore();
const router = useRouter();

const isSubmitting: ComputedRef<AuthTypes["isSubmitting"]> = computed(() => {
  return store.state.auth.isSubmitting;
});

const validationErrors: ComputedRef<AuthTypes["validationErrors"]> = computed(
  () => store.state.auth.validationErrors
);

const inputError: ComputedRef<string[]> = computed(() =>
  validationErrors.value ? Object.keys(validationErrors.value) : []
);

const user: UserType = reactive({
  username: null,
  email: null,
  password: null,
});

const onSubmit = (): void => {
  store.dispatch(AuthActions.register, user as UserType).then(() => {
    router.push({name: "home"});
  });
};

onMounted(() => {
  store.commit(AuthMutations.droppingErrors);
});
</script>

<template>
  <section id="register" class="register">
    <div class="wrapper">
      <div class="box">
        <h3>Sing Up</h3>
        <router-link :to="{name: 'login'}" class="login-link">
          Have an account?
        </router-link>

        <topo-validation-errors
          v-if="validationErrors"
          :validation-errors="validationErrors"
        />

        <form @submit.prevent="onSubmit" class="register-form">
          <div class="input-block">
            <input
              v-model="user.username"
              type="text"
              placeholder="Username"
              :class="{empty: inputError.includes('username')}"
            />
          </div>
          <div class="input-block">
            <input
              v-model="user.email"
              type="text"
              placeholder="Email"
              :class="{empty: inputError.includes('email')}"
            />
          </div>
          <div class="input-block">
            <input
              v-model="user.password"
              type="password"
              placeholder="Password"
              :class="{empty: inputError.includes('password')}"
            />
          </div>
          <button :disabled="isSubmitting" class="btn">Sign Up</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.register {
  height: 100%;
  margin: 7rem 0 0;

  .box {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      font-size: 2.5rem;
      font-weight: 500;
      line-height: 1.1;
      text-align: center;
      color: $third_120;
    }

    .login-link {
      color: $primary;
      font-size: 1.5rem;
      line-height: 1.5;
      position: relative;
      width: fit-content;
      margin: 0 auto;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        background-color: $primary;
        bottom: 0;
        left: 0;
        transition: width 0.3s ease-in-out;
      }

      &:hover::after {
        width: 100%;
      }
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 0 auto;
      min-width: 50%;

      @include break("sm") {
        width: 75%;
      }

      .input-block {
        input {
          box-sizing: border-box;
          padding: 0.75rem 1.5rem;
          font-size: 1.5rem;
          border-radius: 8px;
          border: 1px solid $third_60;
          outline: none;
          width: 100%;

          &:focus {
            border: 1px solid $primary;

            &::placeholder {
              color: $primary_50;
            }
          }

          &.empty {
            border: 1px solid red;
          }
        }
      }

      .btn {
        margin-left: auto;
      }
    }
  }
}
</style>
