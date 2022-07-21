<template>
  <div v-if="state.isShow">
    <ItemMusicTop :playList="state.playList" />
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getMusicItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/itemMusicTop.vue";
export default {
  setup() {
    const state = reactive({
      playList: {},
      isShow: false,
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      console.log(res.data.playlist);
      state.playList = res.data.playlist;
      state.isShow = true;
      // sessionStorage.setItem('itemDetail',JSON.stringify(state))
    });
    return { state };
  },
  components: {
    ItemMusicTop,
  },
};
</script>

<style>
</style>