import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{//播放列表
      al: {
        id: 525568,
        name: "ALIVE",
        pic: 5649290743585546,
        picUrl: "https://p2.music.126.net/DACbuAsZkYFpDFJGhGXTsQ==/5649290743585546.jpg"
      },
      name:"ALIVE",
      id:5366197
    }],
    playListIndex:0,
    isPlaying:true,//是否播放
  },
  getters: {
  },
  mutations: {
    updateIsPlaying(state,value) {
      state.isPlaying=value
    },
    updatePlayList(state,value){
      state.playList=value
      console.log(state.playList)
    },
    updatePlayListIndex(state,value){
      state.playListIndex=value
    }
  },
  actions: {
  },
  modules: {
  }
})
