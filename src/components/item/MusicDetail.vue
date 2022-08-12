<template>
  <div style="height: 100%">
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
    <div class="detailContent" v-show="!isLyricShow">
      <img
        src="@/assets/cizhen.png"
        class="img_cizhen"
        :class="{ img_cizhen_active: !isPlaying }"
        @click="isLyricShow = true"
      />
      <img src="@/assets/cd.png" class="img_cd" @click="isLyricShow = true" />
      <img
        :src="playList[playListIndex].al.picUrl"
        class="img_music"
        :class="{ img_music_active: !isPlaying, img_music_paused: isPlaying }"
        @click="isLyricShow = true"
      />
    </div>
    <div class="lyric" ref="musicLyric" v-show="isLyricShow">
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
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
        <svg class="icon" aria-hidden="true" @click="isLyricShow = false">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerContent">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon_play" aria-hidden="true" @click="play">
          <use xlink:href="#icon-bofang" v-if="isPlaying"></use>
          <use xlink:href="#icon-zanting" v-else></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
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
import { watch } from "@vue/runtime-core";
import { get } from "vant/lib/utils";
export default {
  props: ["playList", "playListIndex", "isPlaying", "play", "show", "audio"],
  components: { Vue3Marquee },
  emits: ["update:show"],
  setup(props, ctx) {
    // console.log(props.audio);
    const store = useStore();
    const musicLyric = ref(null);

    const lyricList = computed(() => store.state.lyricList);
    //进度条绑定currentTime无法直接修改，因为computed是只读属性，需要设置set来进行更改
    const currentTime = computed({
      get: () => store.state.currentTime,
      set: (val) => {
        store.commit("updateCurrentTime", val);
        props.audio.currentTime = val;
      },
    });
    const duration = computed(() => store.state.duration);

    const lyric = computed(() => {
      let arr;
      if (lyricList.value.lyric) {
        arr = lyricList.value.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 9);
          let lrc = item.slice(item.indexOf("]") + 1, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          // console.log(min,sec,mill,lrc,time)
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 10000000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      // console.log(arr);
      return arr;
    });

    let isLyricShow = ref(false);
    function back() {
      ctx.emit("update:show", false);
    }
    watch(currentTime, (newValue) => {
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop >= 250) {
          musicLyric.value.scrollTop = p.offsetTop - 250;
        }
      }
      if (newValue === duration.value) {
        goPlay(1);
      }
    });

    function goPlay(val) {
      let index = props.playListIndex + val;
      if (index < 0) {
        index = props.playList.length - 1;
      } else if (index === props.playList.length) {
        index = 0;
      }
      store.commit("updatePlayListIndex", index);
    }
    return {
      back,
      isLyricShow,
      lyricList,
      lyric,
      currentTime,
      musicLyric,
      goPlay,
      duration,
    };
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
  background-color: rgba(255, 255, 255, 0.2);
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
.lyric {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem 0;

  overflow: scroll;
  // position:relative;
  p {
    color: white;
    margin-bottom: 0.4rem;
  }
  .active {
    color: red;
    font-size: 0.4rem;
  }
}
.detailFooter {
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 0.3rem;

  .footerTop {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.8rem;
    // margin-bottom: .1rem;
    .icon_play {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>