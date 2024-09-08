<script lang="ts" setup>
import {socialLinks, pageLinks} from "@/data/footerData";
</script>

<template>
  <footer class="footer">
    <div class="sections wrap-85">
      <div class="section-left">
        <router-link :to="{name: 'home'}" class="logo">
          <img src="@/assets/logo-transformed.webp" />
        </router-link>
        <h4>Copyright 2024, VKohut1807</h4>
        <h4>A concept by Vasyl Kohut</h4>
      </div>
      <div class="section-right">
        <ul class="pages">
          <li v-for="({route, title}, idx) in pageLinks" :key="idx">
            <router-link :to="{name: route}">{{ title }}</router-link>
          </li>
        </ul>
        <ul class="social">
          <li v-for="({route, title, icon}, idx) in socialLinks" :key="idx">
            <router-link :to="{name: route}"
              ><mdicon :name="icon" />{{ title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import "@scss/config/config.scss";

.footer {
  width: 100%;
  height: fit-content;
  margin-top: 3rem;
  flex-shrink: 0;
  background-color: $primary;
  border-radius: 50% 50% 0 0;

  @include break("md") {
    margin-top: 1rem;
    border-radius: 25% 25% 0 0;
  }

  .sections {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 1rem 1.5rem;
    gap: 3rem;

    @include break("md") {
      padding: 2.5rem 1rem 1.5rem;
      flex-direction: column;
      gap: 1rem;
    }

    .section-left {
      display: flex;
      flex-direction: column;
      width: 25%;

      @include break("md") {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        order: 3;
        margin: 0 auto;
      }

      @include break("xs") {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .logo {
        display: block;
        width: 5rem;
        margin-top: auto;

        @include break("xs") {
          margin: 0 auto;
          grid-column: span 2;
        }

        img {
          animation: rotate-animation 7s infinite linear;
        }
      }

      h4 {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        color: $secondary_50;
        margin-top: 1rem;

        @include break("xs") {
          margin: 0 auto;
          grid-column: span 2;
        }
      }
    }

    .section-right {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      width: 75%;
      gap: 1rem;

      @include break("md") {
        flex-direction: column;
        width: 100%;
        gap: 3rem;
      }

      .social,
      .pages {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        height: fit-content;
        width: fit-content;

        @include break("md") {
          width: 100%;
        }

        @include break("sm") {
          grid-template-columns: repeat(2, 1fr);
          justify-items: center;
        }

        li {
          height: fit-content;
          width: fit-content;
          transition: transform 0.3s ease-in-out;

          a {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            width: fit-content;
            color: #fff;
            transition: color 0.3s ease-in-out;
            font-size: 1rem;

            @include break("md") {
              font-size: 1.5rem;
            }
          }

          &:hover {
            transform: scale(1.15);

            a {
              color: $secondary;
            }
          }
        }
      }
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
