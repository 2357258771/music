import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home'

export default createStore({
  state: {
    playList: [{//播放列表
      al: {
        id: 98517711,
        name: "是但求其爱",
        pic: 109951165480807280,
        picUrl: "https://p1.music.126.net/flFrObLA9GZdj8B0b6ni1A==/109951165480807278.jpg",
        pic_str: "109951165480807278"
      },
      ar: [{ id: 2116, name: '陈奕迅' }],
      name: "是但求其爱",
      id: 1496602290
    }],
    playListIndex: 0,
    isPlaying: true,//是否播放
    lyricList: {},
    currentTime: 0,//当前播放时间
    isEnded: true,
    duration: 0,
    isLogin:false,
    isFooterMusic:true
  },
  getters: {
  },
  mutations: {
    updateIsPlaying(state, value) {
      state.isPlaying = value
    },
    updatePlayList(state, value) {
      state.playList = value
      // console.log(state.playList)
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateLyric(state, value) {
      state.lyricList = value
      // console.log(state.lyricList)
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
      // console.log(state.currentTime)
    },
    updateIsEnded(state, value) {
      state.isEnded = value
    },
    updateDuration(state, value) {
      state.duration = value
      console.log(state.duration)
    },
    updateIsLogin(state, value) {
      state.isLogin = value
    },

  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      context.commit("updateLyric", res.data.lrc)
    },
    async getLogin(context, value) {
      console.log("11")
      let res = await getPhoneLogin(value)
      // context.commit("updateIsLogin", res.data.lrc)
      console.log(res)
    }
  },
  modules: {
  }
})
