<template>
  <div v-if="state.isShow">
    <ItemMusicTop :playList="state.playList" />
    <ItemMusicList :songsList="state.songsList" :subscribedCount="state.playList.subscribedCount"/>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getMusicItemList,getMusicList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop";
import ItemMusicList from "@/components/item/ItemMusicList";

export default {
  setup() {
    const state = reactive({
      playList: {},
      songsList:[],
      isShow: false,
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      let result= await getMusicList(id)
      console.log(result.data.songs);
      console.log(res.data.playlist);
      state.songsList = result.data.songs;
      state.playList = res.data.playlist;
      state.isShow = true;
      // sessionStorage.setItem('itemDetail',JSON.stringify(state))
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  },
};
</script>

<style>
</style>