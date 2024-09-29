<script setup lang="ts">
import {computed, ComputedRef, reactive, watch} from "vue";
import TopoValidationErrors from "@/components/ValidationErrors.vue";

import {useStore} from "vuex";

import {ModuleType} from "@/types/module-types";
import {AuthTypes} from "@/types/auth-types";
import {AuthGetters, AuthActions} from "@/store/modules/auth";
import {ExtendedUserType} from "@/types/user-types";

const store = useStore();

const isSubmitting: ComputedRef<ModuleType["isSubmitting"]> = computed(() => {
  return store.state.userSettings.isSubmitting;
});

const validationErrors: ComputedRef<ModuleType["validationErrors"]> = computed(
  () => {
    return store.state.userSettings.validationErrors || null;
  }
);

const inputError: ComputedRef<string[]> = computed(() =>
  validationErrors.value ? Object.keys(validationErrors.value) : []
);

const currentUser: ComputedRef<AuthTypes["currentUser"]> = computed(() => {
  return store.getters[AuthGetters.currentUser];
});

const dataForm: ExtendedUserType = reactive({
  ...currentUser.value,
} as ExtendedUserType);

let isChangedForm: boolean = false;

watch(
  currentUser,
  (newVal) => {
    Object.assign(dataForm, {...newVal});
    isChangedForm = true;
  },
  {immediate: true}
);

const onSubmit = (): void => {
  store.dispatch(AuthActions.updateCurrentUser, {
    currentUserInput: {...dataForm},
  });
};

const onDiscard = (): void => {
  Object.assign(dataForm, {...currentUser.value});
};
</script>

<template>
  <section v-if="currentUser" id="user-settings" class="user-settings">
    <div class="wrapper">
      <div class="content">
        <topo-validation-errors
          v-if="validationErrors"
          :validation-errors="validationErrors"
        />

        <form @submit.prevent="onSubmit" class="user-settings-form">
          <div class="input-block">
            <input
              v-model="dataForm.image"
              type="text"
              placeholder="Image"
              :class="{empty: inputError.includes('image')}"
            />
          </div>
          <div class="input-block">
            <input
              v-model="dataForm.username"
              type="text"
              placeholder="Username"
              :class="{empty: inputError.includes('username')}"
            />
          </div>
          <div class="textarea-block">
            <textarea
              v-model="dataForm.bio"
              type="text"
              placeholder="About you"
              :class="{empty: inputError.includes('bio')}"
            ></textarea>
          </div>
          <div class="input-block">
            <input
              v-model="dataForm.email"
              type="text"
              placeholder="Email"
              :class="{empty: inputError.includes('email')}"
            />
          </div>
          <div class="buttons-box">
            <button
              @click="onDiscard"
              :disabled="!isChangedForm"
              variant="secondary"
              class="btn"
            >
              Return Current Data
            </button>
            <button :disabled="isSubmitting" class="btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.user-settings-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  min-width: 50%;

  @include break("sm") {
    width: 75%;
  }

  .input-block,
  .textarea-block {
    input,
    textarea {
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

  .buttons-box {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-left: auto;

    @include break("sm") {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>
