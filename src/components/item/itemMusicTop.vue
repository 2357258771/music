<template>
  <img :src="playList.coverImgUrl" class="bgimg" />
  <div class="itemMusicTop">
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
  </div>
  <div class="itemMusicBody">
    <img :src="playList.coverImgUrl" class="itemMusicImg" />
    <div class="itemMusicBodyRight">
      <div class="name">{{ playList.name }}</div>
      <div class="creator">
        <img :src="playList.creator.avatarUrl" class="avatar" />
        <span>{{ playList.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
      <div id="description">
        <div class="description">{{ playList.description }}</div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="itemMusicBottom">
    <div class="itemMusicIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi"></use>
      </svg>
      <span>{{ playList.commentCount }}</span>
    </div>
    <div class="itemMusicIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playList.shareCount }}</span>
    </div>
    <div class="itemMusicIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="itemMusicIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    // console.log(props);
  },
  props: ["playList"],
};
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 8rem;
  position: fixed;
  z-index: -1;
  filter: blur(10px);
}
.itemMusicTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  // padding: .2rem;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      font-size: 0.4rem;
      font-weight: 500;
      color: white;
    }
    .icon {
      fill: white;
    }
  }
}
.itemMusicBody {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 0.6rem;
  .itemMusicImg {
    width: 40%;
    border-radius: 0.2rem;
  }
  .itemMusicBodyRight {
    width: 50%;
    display: flex;
    flex-direction: column;
    .name {
      font-size: 0.32rem;
      font-weight: 600;
    }
    .creator {
      width: 80%;
      padding: .2rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: darkgray;
      font-size: 0.25rem;
      .avatar {
        border-radius: 30px;
        width: 30%;
      }
      span{
        width: 50%;
      }
      .icon {
        width: 0.2rem;
        fill: white;
      }
    }
    #description {
      display: flex;
      align-items: center;
      .description {
        width: 80%;
        color: darkgray;
        font-size: 0.25rem;
        overflow: hidden;
        display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
        -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
        -webkit-line-clamp: 2; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
      }
      .icon {
        width: 0.2rem;
        fill: white;
      }
    }
  }
}
.itemMusicBottom{
    display: flex;
    justify-content: space-around;
    margin-top: .3rem;
    .itemMusicIcon{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        .icon{
            fill: white;
        }
        span{
            padding-top: .2rem;
        }
    }
}
</style>