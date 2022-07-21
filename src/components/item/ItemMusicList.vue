<template>
  <div class="itemMusicList">
    <div class="itemMusicListTop">
      <div class="itemMusicListTopLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playCircle"></use>
        </svg>
        <div class="itemMusicListTopLeftText">
          <div>播放全部</div>
          <span>(共{{ songsList.length }}首)</span>
        </div>
      </div>
      <div class="itemMusicListTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <div>收藏({{ changeCount(subscribedCount) }})</div>
      </div>
    </div>
    <div class="musicList">
      <div class="musicItem" v-for="(item, i) in songsList" :key="i">
        <div class="musicListLeft" @click="playMusic(i)">
          <span>{{ i + 1 }}</span>
          <div class="musicName">
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">
              {{ item1.name }}
            </span>
          </div>
        </div>
        <div class="musicListRight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-if="item.mv !== 0">
            <use xlink:href="#icon-shipin"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    const playMusic = (val) => {
      store.commit("updatePlayList", props.songsList);
      store.commit("updatePlayListIndex", val);
    };

    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { changeCount,playMusic };
  },
  props: ["songsList", "subscribedCount"],
};
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  background: white;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  margin-top: 0.7rem;
  padding: 0.1rem 0.2rem;
  .itemMusicListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    .itemMusicListTopLeft {
      width: 40%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .itemMusicListTopLeftText {
        display: flex;
        align-items: center;
        font-weight: 700;
        span {
          font-size: 0.24rem;
          color: gray;
          font-weight: 400;
        }
      }
    }
    .itemMusicListTopRight {
      width: 35%;
      height: 100%;
      background: rgb(255, 22, 22);
      border-radius: 1rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.1rem;
      font-size: 0.28rem;
      .icon {
        width: 0.4rem;
        fill: white;
      }
    }
  }
  .musicList {
    width: 100%;
    display: flex;
    flex-direction: column;
    .musicItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.4rem;
      .musicListLeft {
        display: flex;
        align-items: center;
        .musicName {
          padding-left: 0.2rem;
          p {
            font-weight: 600;
          }
          span {
            font-size: 0.24rem;
            color: gray;
          }
        }
      }
      .musicListRight {
        width: 20%;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        .icon {
          width: 0.45rem;
          height: 0.45rem;
        }
      }
    }
  }
}
</style>