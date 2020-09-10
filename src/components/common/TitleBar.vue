<template>
  <div :class="['title-bar-warp','text-main', bottemLine? 'small-line-bottom':'']" :style="`background:${bgColor}`">
    <div class="item-left" v-if="leftArrow">
      <slot name="left">
        <div :class="['left-img']" @click="onBackClick"></div>
      </slot>
    </div>
    <div :class="['title','text-ellipsis']" :style="{
        'justify-content':`${titleAlign}`,
        'color':`${textColor}`
      }">
      <img v-if="icon? true:false" :src="icon"/>
      {{title.length > 15? (title.substring(0,15) + '...'): title}}
    </div>
    <div class="item-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TitleBar extends Vue {
  @Prop() private title!: string
  @Prop() private titleAlign?: string
  @Prop() private leftArrow!: boolean
  @Prop() private bottemLine!: boolean
  @Prop() private bgColor?: string
  @Prop() private textColor?: string
  @Prop() private icon?: string

  onBackClick () {
    this.$router.back()
  }
}
</script>

<style scoped lang="scss">
.title-bar-warp{
  width: 100%;
  height:$bar-title-height;
  line-height:$bar-title-height;
  background: #fff;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  .item-left{
    position: absolute;
    height:$bar-title-height;
    display: flex;
    left: 0;
    top: 0;
    align-items: center;
    z-index: 100;
    .left-img{
      width: 84px;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 16px 28px;
    }
  }
  .title{
    text-align: center;
    width: 100%;
    font-size:34px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight:bold;
    padding: 0 32px;
    letter-spacing: 1px;
    img{
      width:46px;
      height:46px;
      margin-right: 12px;
    }
  }

  .item-right{
    position: absolute;
    height:$bar-title-height;
    right: 0;
    top: 0;
    padding-right: 32px;
    display: flex;
    align-items: center;
    z-index: 100;
  }
}
</style>
