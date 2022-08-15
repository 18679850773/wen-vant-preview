<template>
  <div class="example">
    <wen-vant-preview v-model="showPreview" :list="previewList" :config="previewConfig" initial-swipe="1"
      :autoplay="autoplay" :loop="true" :show-indicators="true" @click="previewClick" @change="previewChange" click-close
      ref="wen-vant-preview" :clearable="false" :enable-fullscreen="false" @clear="previewClear" :traceability.sync="traceability">
      <template v-slot="slotProps">
        <span
          :style="{color: `${slotProps.item.color}`, 'display': 'flex','height': '80%','align-items': 'center','justify-content': 'center', 'background-color': 'cadetblue'}">
          {{ slotProps.item.name }}---- 下标：{{ slotProps.index }}
        </span>
        <button @click="itemClick">click</button>
      </template>
      <template #indicator="{current}">
        <div style="color: red;position: absolute;top: 10px;left: 20px;font-size: 36px;">
          {{current + 1}} / {{previewList.length}}
        </div>
      </template>
      <template #cover="{index}">
        <div>
          {{index + 1}}
        </div>
      </template>
    </wen-vant-preview>
    <van-button type="primary" @click="vantClick($event)">预览测试</van-button>
    <van-button type="info" @click="vantClick2($event)">预览测试</van-button>

    <span class="test-span" :class="reversespan"></span>
  </div>
</template>

<script>
import {WenVantPreview} from '../components/wen-vant-preview'

export default {
  name: 'example',
  components: { WenVantPreview },
  data () {
    return {
      showPreview: false,
      previewList: [],
      previewConfig: { key: 'id', imgSrc: 'src', videoSrc: 'url', videoCover: '', type: 'type' },
      autoplay: 0,
      reversespan: '',
      traceability: null
    }
  },
  mounted() {
    setTimeout(() => {
        this.reversespan = 'reversespan'
    }, 5000)
  },
  methods: {
    vantClick (event) {
      this.traceability = event.target
      this.showPreview = true
      this.previewList = [
        {
          id: 1,
          name: '第一页',
          value: '数据数据111',
          color: '#fff'
        },
        {
          id: 2,
          name: '第二页',
          label: 'wenshao',
          color: '#c3ff24'
        },
        {
          id: 3,
          url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          type: 'video'
        },
        {
          id: 4,
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp8.itc.cn%2Fimages01%2F20211109%2F68827788036149d78b9abb076c67917b.jpeg&refer=http%3A%2F%2Fp8.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660189303&t=e864839984d3cc831e9cc10e0ac8be78',
          type: 'image'
        },
        {
          id: 5,
          src: 'https://uploadfile.bizhizu.cn/up/96/2c/bf/962cbf6f70342ed7649cc70449457733.jpg',
          type: 'image'
        }
      ]
    },
    vantClick2 (event) {
      this.traceability = event.target
      this.showPreview = true
      this.previewList = [{
        id: 1,
        name: '第一页',
        value: '数据数据111',
        color: '#fff'
      },
      {
        id: 2,
        name: '第二页',
        label: 'wenshao',
        color: '#c3ff24'
      },]
    },
    previewClick (event, index) {
      console.log(event, index, 'previewClick')
    },
    previewChange (index) {
      console.log(index, 'previewChange')
    },
    previewClear () {
      console.log('Clear')
    },
    itemClick () {
      this.$refs["wen-vant-preview"].swipeTo(3, { immediate: false })
    }
  }
}
</script>

<style>
.example {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.test-span {
  width: 100px;
  height: 100px;
  background-color: aqua;
  position: absolute;
  top: 200px;
  left: 0;
  animation: test-span 1s forwards;
}
.reversespan{
    /* animation-play-state: paused; */
    animation: test-span2 1s reverse;
}
@keyframes test-span {
    100%{
        transform: translateX(200px);
    }
}
@keyframes test-span2 {
    100%{
        transform: translateX(200px);
    }
}
</style>
