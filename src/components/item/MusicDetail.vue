<template>
  <div>
    <img :src="playList[playListIndex].al.picUrl" class="bgimg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="detaiMusiclInfo">
          <Vue3Marquee>
            {{ playList[playListIndex].name }}
          </Vue3Marquee>
          <span v-for="(item, i) in playList[playListIndex].ar" :key="i">{{
            item.name
          }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangyoujiantou"></use>
          </svg>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="isLyricShow">
      <img
        src="@/assets/cizhen.png"
        class="img_cizhen"
        :class="{ img_cizhen_active: !isPlaying }"
      />
      <img src="@/assets/cd.png" class="img_cd" />
      <img
        :src="playList[playListIndex].al.picUrl"
        class="img_music"
        :class="{ img_music_active: !isPlaying, img_music_paused: isPlaying }"
      />
    </div>
    <div class="lyric">
        <p v-for="item in lyric" :key="item">
            {{item.lrc}}
        </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerContent"></div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon_play" aria-hidden="true" @click="play">
          <use xlink:href="#icon-bofang" v-if="isPlaying"></use>
          <use xlink:href="#icon-zanting" v-else></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";

import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
export default {
  props: ["playList", "playListIndex", "isPlaying", "play", "show"],
  components: { Vue3Marquee },
  emits: ["update:show"],
  setup(props, ctx) {
    // console.log(props.show);
    const store = useStore();
    const lyricList = computed(() => store.state.lyricList);
    const lyric = computed(() => {
        let arr;
        if(lyricList.value.lyric){
            arr=lyricList.value.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                let min=item.slice(1,3)
                let sec=item.slice(4,6)
                let mill=item.slice(7,9)
                let lrc=item.slice(item.indexOf(']')+1,item.length)
                // console.log(min,sec,mill,lrc)
                return {min,sec,mill,lrc}
            })
        }
        return arr
    });

    let isLyricShow = ref(false);
    function back() {
      ctx.emit("update:show", false);
    }
    return { back, isLyricShow,lyricList,lyric };
  },
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(30px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.1rem;
  background-color: rgba(255,255,255,0.2);
  //   fill: darkgray;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .detaiMusiclInfo {
      width: 2.5rem;
      margin-left: 0.4rem;
      span {
        font-size: 0.24rem;
      }
      .icon {
        margin-left: 0.08rem;
        width: 0.2rem;
        height: 0.2rem;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_cizhen {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_cizhen_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_music {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_music 10s linear infinite;
  }
  .img_music_active {
    animation-play-state: running;
  }
  .img_music_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_music {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.lyric{
    width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  overflow: scroll;
  p{
    color: white;
    margin-bottom: .4rem;
  }

}
.detailFooter {
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.8rem;
    .icon_play {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>