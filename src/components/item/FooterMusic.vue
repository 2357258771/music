<template>
  <div class="footMusic">
    <div class="footerLeft" @click="show = !show">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="musicName">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横划切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-bofang" v-if="isPlaying"></use>
        <use xlink:href="#icon-zanting" v-else></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :playList="playList"
        :playListIndex="playListIndex"
        :isPlaying="isPlaying"
        :play="play"
        v-model:show="show"
      />
    </van-popup>
  </div>
</template>

<script>
import { ref, computed, watch, onUpdated, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import MusicDetail from "@/components/item/MusicDetail";
export default {
  components: { MusicDetail },

  setup() {
    const store = useStore();
    const audio = ref(null);

    let show = ref(false);

    const playList = computed(() => store.state.playList);
    const playListIndex = computed(() => store.state.playListIndex);
    const isPlaying = computed(() => store.state.isPlaying);

    const updateIsPlaying = (val) => {
      store.commit("updateIsPlaying", val);
    };
    onMounted(() => {
      store.dispatch("getLyric", playList.value[playListIndex.value].id);
    });
    onUpdated(() => {
      store.dispatch("getLyric", playList.value[playListIndex.value].id);
    });
    function play() {
      if (audio.value.paused) {
        audio.value.play();
        updateIsPlaying(false);
      } else {
        audio.value.pause();
        updateIsPlaying(true);
      }
    }
    //监听下标，如果下标发生改变，自动播放音乐
    watch([playList, playListIndex], () => {
      audio.value.autoplay = true;
      if (audio.value.paused) {
        updateIsPlaying(false);
      }
    });
    return {
      audio,
      play,
      isPlaying,
      playListIndex,
      playList,
      show,
    };
  },
};
</script>

<style lang="less" scoped>
.footMusic {
  width: 100%;
  height: 1.4rem;
  background: white;
  position: fixed;
  z-index: 1;
  bottom: 0;
  border-top: 0.02rem solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .musicName {
      width: 70%;
      p {
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
        -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
        -webkit-line-clamp: 1; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
      }
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>