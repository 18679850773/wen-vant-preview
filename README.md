# wen-vant-preview

## 功能介绍
- 基于vant2.x的swipe组件改造，支持视频和图片预览的vant组件（适用移动端）
- 预览暂不支持图片的缩放、旋转、平移之类的操作
- 支持自动播放，循环播放，手势滑动切换，自定义初始位置索引值
- 支持完全自定义指示器（需要通过position设置指示器的位置，否则无法看见指示器）
- 支持除视频与图片之外的元素自定义预览
- 支持视频页ready、play、pause、fullscreen回调

&emsp;


## 示例
- ![image](./example.gif) 


## 安装
```
# 安装该组件需要基于Vue 2项目，且安装了 Vant 2：

npm i wen-vant-preview
```

## 使用方法

``` xml
    <wen-vant-preview v-model="showPreview" :list="previewList" ref="wen-vant-preview" :config="previewConfig">
      <template v-slot="{item, index}">
        <span :style="{color: `${item.color}`, 'display': 'flex','height': '100%','align-items': 'center','justify-content': 'center'}">
          {{ item.name }}----{{ index + 1 }}
        </span>
        <button @click="itemClick">click</button>
      </template>
      <template #indicator="{current}">
        <div style="color: red;position: absolute;top: 10px;left: 20px;font-size: 36px;">
          {{current + 1}} / {{previewList.length}}
        </div>
      </template>
    </wen-vant-preview>
```

``` js
import WenVantPreview from 'wen-vant-preview'
export default {
  components: { WenVantPreview },
  data () {
    return {
      showPreview: false,
      previewList: [
        {
          id: 1,
          name: '测试数据111',
          value: '数据数据111',
          color: '#fff'
        },
        {
          id: 2,
          name: '测试数据222',
          label: 'wenshao',
          color: '#c3ff24'
        },
        {
          id: 3,
          url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          fileType: 2 
        },
        {
          id: 4,
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp8.itc.cn%2Fimages01%2F20211109%2F68827788036149d78b9abb076c67917b.jpeg&refer=http%3A%2F%2Fp8.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660189303&t=e864839984d3cc831e9cc10e0ac8be78',
          fileType: 1
        },
        {
          id: 5,
          url: 'http://v.xiaohongshu.com/pre_post/01e2c976f53d85c80183700381e2fb09d5_259.mp4?sign=d002efb961ae9e2bb0484d459f6d088d&t=62d03d80',
          fileType: 2
        }
      ],
      previewConfig: {
        type: 'fileType', // 用于区分视频还是图片的字段
        videoType: 2,     // 视频类型的判断值
        imageType: 1      // 图片类型的判断值
      }
    }
  },
  methods: {
    vantClick () {
      this.showPreview = true
    },
    previewClick (event, index) {
      console.log(event, index, 'previewClick')
    },
    previewChange (index) {
      console.log(index, 'previewChange')
    },
    itemClick() {
        this.$refs["wen-vant-preview"].swipeTo(3, {immediate: false})
    }
  }
}
```



## 接口说明
&emsp;

#### Props

Property | Type | Default | Comments
 :-- |:--: |:--:|:--
v-model | Boolean | false | 是否展示预览组件
list | Array | -- | 组件的数据，[{}, {}, ...]
config | Object | {imgSrc: 'src',videoSrc: 'url',videoCover: 'cover',type: 'type'} | 组件的配置，详细的配置说明请查阅CONFIG
autoplay | Number、String | 0 | 自动轮播间隔，单位为 ms。默认值0，不轮播
duration | Number、String | 500 | 动画时长，单位为 ms
initial-swipe | Number、String | 0 | 初始位置索引值
loop | Boolean | true | 是否开启循环，当处于最后一页时，下一页是否回到第一页
show-indicators | Boolean | true | 是否显示指示器
touchable | Boolean | true | 是否可以通过手势滑动

&emsp;

#### Events

Property | Comments | Params 
 :-- |:--|:--
change | 每一页轮播结束后触发 | index: 当前页的索引
click | 点击时触发 | event: Event, index: 当前页的索引 `注：video页不会触发click回调`
ready | 视频准备完成后触发 | index: 当前页的索引 
video-play | 视频点击播放或暂停触发 | status: 返回true、false表示视频播放或暂停, index: 当前页的索引 
fullscreen | 视频全屏或退出全屏模式触发 | status: 返回true、false是否全屏, index: 当前页的索引 

&emsp;

#### Function

Property | Comments | Params 
 :-- |:--|:--
prev | 切换到上一轮播 | - -
next | 切换到下一轮播  |- -
swipeTo | 切换到指定位置 | index: number, options: {immediate: boolean} `immediate：是否跳过动画`
resize | 外层元素大小或组件显示状态变化时，可以调用此方法来触发重绘 | - -

&emsp;


#### Slots

Property | Comments
 :-- |:--
default | 轮播内容，当数据的type值不为video或image有用
indicator | 自定义指示器，完全自由设计`注：使用该slot，需要通过position设置指示器的位置，否则无法看见指示器`

&emsp;

#### Config

Property | Default | Comments
 :-- |:-- |:--
imgSrc | 'src' | 渲染图片的字段，String
videoSrc | 'url' | 渲染视频的字段，String
videoCover | 'cover' | 渲染视频的第一帧字段，String
type | 'type' | 区分视频还是图片类型的字段，String
videoType | 'video' | 视频类型的判断值，String、Number、Boolean、undefined、null，不能跟imageType相同
imageType | 'image' | 图片类型的判断值，String、Number、Boolean、undefined、null，不能跟videoType相同



