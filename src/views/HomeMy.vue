<template>
  <div class="about">
    <TitleBar title="我的"></TitleBar>
    <h1>This is an my page</h1>
    <router-link to="/">click to home</router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TitleBar from '@/components/common/TitleBar.vue'

@Component({
  components: {
    TitleBar
  }
})
export default class HomeMy extends Vue {}
</script>
