<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input
      type="text"
      placeholder="蔡徐坤"
      v-model="searchKey"
      @keydown.enter="enterKey"
    />
  </div>
  <div class="searchHistory" v-show="!state.isSearch">
    <span style="font-weight: 700">历史</span>
    <span
      v-for="item in state.keyWordList"
      :key="item"
      class="history"
      @click="getSearchResult(item)"
      >{{ item }}</span
    >
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="musicList" v-show="state.isSearch">
    <div class="musicItem" v-for="(item, i) in state.searchList" :key="i">
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
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { getSearchMusic } from "@/request/api/item";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const playMusic = (val) => {
      store.commit("updatePlayList", state.searchList);
      store.commit("updatePlayListIndex", val);
    };

    let state = reactive({
      keyWordList: ["1"],
      searchList: [],
      isSearch:false
    });
    let searchKey = ref("");
    onMounted(() => {
      //清除过后数组重新赋值时会为null，从而访问不到数组方法
      state.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
    });
    async function getSearchResult(val) {
      let res = await getSearchMusic(val);
      console.log(res.data.result);
      state.searchList = res.data.result.songs;
      state.isSearch=true
    }
    function enterKey() {
      //判断输入框非空
      if ((searchKey.value ?? "") !== "") {
        state.keyWordList.unshift(searchKey.value);
        state.keyWordList = [...new Set(state.keyWordList)]; //Set去重
        if (state.keyWordList.length > 5) {
          state.keyWordList.splice(state.keyWordList.length - 1, 1);
        }
        localStorage.setItem("keyWordList", JSON.stringify(state.keyWordList));
        getSearchResult(searchKey.value);
      }
    }

    function delHistory() {
      localStorage.removeItem("keyWordList");
      state.keyWordList = [];
    }
    return {
      state,
      searchKey,
      enterKey,
      delHistory,
      getSearchResult,
      playMusic,
    };
  },
};
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .history {
    padding: 0.1rem 0.2rem;
    margin: 0.1rem 0.2rem;
    background-color: rgb(180, 168, 168);
    border-radius: 0.4rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.musicList {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  margin-bottom: 1.4rem;


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
</style>