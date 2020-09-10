<template>
  <div class="home">
    <TitleBar title="首页"></TitleBar>
    <div>
      <router-link to="/home/my">click to my</router-link>
    </div>
    <img alt="Vue logo" src="../assets/images/logo.png">
    <HelloWorld msg="Welcome to ks-cli的h5模板"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TitleBar from '@/components/common/TitleBar.vue'
import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: {
    TitleBar,
    HelloWorld
  }
})
export default class HomeFirst extends Vue {}
</script>
