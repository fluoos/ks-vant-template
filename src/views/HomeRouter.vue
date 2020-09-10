<template>
  <div class="app-tranlate">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <Tabbar class="home-tab" v-model="activeitem" route active-color="#F0473E" inactive-color="#939393" v-if="!(this.$store.getters.isIphone && this.$store.getters.isNativeOk)">
      <TabbarItem v-for="(item, index) in bottomTab" :key="index" replace :to="item.path">
        <span>{{item.title}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive">
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Tabbar, TabbarItem, Dialog } from 'vant'

@Component({
  components: {
    Tabbar,
    TabbarItem
  }
})
export default class HomeRouter extends Vue {
  activeitem = 0
  bottomTab = [{
    title: '首页',
    path: '/home/first',
    active: require('@/assets/images/bottom_icon_per1.png'),
    inactive: require('@/assets/images/bottom_icon_nor1.png')
  },
  {
    title: '我的',
    path: '/home/my',
    active: require('@/assets/images/bottom_icon_per4.png'),
    inactive: require('@/assets/images/bottom_icon_nor4.png')
  }]

  mounted () {
    console.log('vant')
  }
}
</script>
