<template>
  <div id="app">
    <transition>
      <keep-alive v-if="this.$route.meta.keepAlive">
        <!--这里是会被缓存的组件--><!--这里是会被缓存的组件-->
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<style lang="scss">
@import "./assets/style/reset.scss";
#app {
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;
  line-height: 50px;
  font-size: 16px;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
