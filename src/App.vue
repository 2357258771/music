<template>
<!-- 当路由path 与访问的地址相符时，会将指定的组件替换该router-view -->
  <router-view/>
  <FooterMusic v-if="$store.state.isFooterMusic"/>
</template>
<script>
import FooterMusic from "@/components/item/FooterMusic"
export default {
  components:{FooterMusic}
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>
