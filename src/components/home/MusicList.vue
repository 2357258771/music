<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in musicList">
          <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
            <img :src="item.picUrl" />
            <div class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              <div style="padding: 0.03rem 0.04rem">
                {{ changeCount(item.playCount) }}
              </div>
            </div>
            <div class="name">{{ item.name }}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js";
import { onMounted, reactive, toRef } from "vue";
export default {
  setup() {
    const state = reactive({
      musicList: [],
    });
    onMounted(async () => {
      let res = await getMusicList();
      state.musicList = res.data.result;
    });
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { musicList: toRef(state, "musicList"), changeCount };
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-weight: 800;
      font-size: 0.4rem;
    }
    .more {
      border: 0.02rem solid #ccc;
      border-radius: 0.4rem;
      text-align: center;
      padding: 0 0.2rem;
      line-height: 0.6rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .my-swiper {
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.3rem;
        padding: 0 0.1rem;
      }
      .playCount {
        width: 50%;
        height: 0.3rem;
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        display: flex;
        color: white;
        font-size: 0.25rem;
        line-height: 0.3rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          line-height: 0.3rem;
          fill: #ffffff;
        }
      }
      .name {
        width: 100%;
        height: 0.8rem;
        padding: 0 0.2rem;
        overflow: hidden;
        display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
        -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
        -webkit-line-clamp: 2; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
      }
    }
  }
}
</style>