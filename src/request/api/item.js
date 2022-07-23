import service from ".."
//获取歌单详情页的数据
export function getMusicItemList(data){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${data}`
    })
}
//获取歌单歌曲的数据
export function getMusicList(data){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${data}&limit=20`
    })
}
//获取歌曲歌词的数据
export function getMusicLyric(data){
    return service({
        method:'GET',
        url:`/lyric?id=${data}`
    })
}

