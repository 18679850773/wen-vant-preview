<template>
  <div id="wen-vant-preview" v-if="modelValue">
    <van-swipe @change="swipeChange" v-bind="$attrs" :ref="'wen-vant-preview-'+refTime">
      <van-swipe-item v-for="(item, index) of list" :key="item[_config.key]||index" @click="e => $listeners.click(e, index)">
        <vue-mini-player v-if="computedVideoType(item[_config.type])" :ref="'wen-vant-preview-video-'+index"
          :video="item.videoData" :mutex="true" @fullscreen="e=>videoFullscreen(e,index)" :class="videoClass"
          @videoPlay="e => videoPlay(e,index)" @ready="()=>videoReady(index)" style="width:100%;height:100%;" />
        <van-image v-else-if="computedImageType(item[_config.type])" fit="contain" :src="item[_config.imgSrc]"
          class="wen-vant-preview-image">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <slot v-else v-bind="{item, index}"></slot>
      </van-swipe-item>
      <template #indicator v-if="$attrs['show-indicators']===undefined?true:$attrs['show-indicators']">
        <slot name="indicator" v-if="$scopedSlots.indicator()" v-bind="{current}"></slot>
        <div class="custom-indicator" v-else>{{ current + 1 }} / {{list.length}}</div>
      </template>
    </van-swipe>
    <van-icon name="clear" class="wen-vant-clear" @click="clearSwipe" />
  </div>
</template>

<script>


export default {
  install (Vue) {
    Vue.component(this.name, this);
  },
  name: 'wen-vant-preview',
  components: {},
  model: {
    prop: "modelValue",
    event: "model-change",
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({
        imgSrc: 'src',
        videoSrc: 'url',
        videoCover: 'cover',
        type: 'type'
      })
    },
    width: Number, height: Number, vertical: Boolean, stopPropagation: Boolean, lazyRender: Boolean
  },
  data () {
    return {
      current: 0,
      defconfig: {
        imgSrc: 'src',
        videoSrc: 'url',
        videoCover: 'cover',
        type: 'type'
      },
      videos: [],
      videoClass: '',
      refTime: ''
    }
  },
  computed: {
    computedVideoType () {
      return val => val == 'video'
    },
    computedImageType () {
      return val => val == 'image'
    },
    _config () {
      return Object.assign(this.defconfig, this.config)
    }
  },
  watch: {
    list (newVal) {
      if (newVal) {
        newVal.forEach(f => { if (this.computedVideoType(f[this._config.type])) this.formatVideoData(f) })
      }
    }
  },
  mounted () {
    this.refTime = Date.now()
    this.current = Number(this.$attrs["initial-swipe"])
    if (this.list.length > 0) this.list.forEach((f, i) => { if (this.computedVideoType(f[this._config.type])) this.formatVideoData(f, i) })
    this.$nextTick(() => {
      document.body.append(this.$el)
    })
  },
  methods: {
    swipeChange (index) {
      if (this.videos.includes(this.current)) {
        this.$refs["wen-vant-preview-video-" + this.current][0].$video.pause()
        // this.$refs["wen-vant-preview-video-"+this.current][0].$video.currentTime = 0
      }
      this.current = index;
      this.$listeners.change(index)
    },
    formatVideoData (item, index) {
      this.videos.push(index)
      item.videoData = {
        url: item[this._config.videoSrc],
        cover: item[this._config.videoCover],
        muted: false,
        loop: false,
        preload: "auto",
        poster: "",
        volume: 1,
        autoplay: false,
      }
    },
    clearSwipe () {
      this.$emit('model-change', false);
    },
    videoFullscreen (status, index) {
        this.$emit('fullscreen', status, index)
        console.log('fullscreen', status, index)
    },
    videoPlay (status, index) {
      this.videoClass = status ? "play" : "pause"
      this.$emit('video-play', status, index)
      console.log('play - pause', status, index)
    },
    videoReady(index) {
        this.$emit('ready', index)
        console.log('ready', index)
    },
    prev() {
        this.$refs["wen-vant-preview-"+this.refTime].prev()
    },
    next() {
        this.$refs["wen-vant-preview-"+this.refTime].next()
    },
    swipeTo() {
        this.$refs["wen-vant-preview-"+this.refTime].swipeTo(...arguments)
    },
    resize() {
        this.$refs["wen-vant-preview-"+this.refTime].resize()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#wen-vant-preview {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  .van-swipe {
    height: 100%;
  }
  .wen-vant-clear {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .custom-indicator {
    position: absolute;
    left: 50%;
    top: 20px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    transform: translateX(-50%);
  }
  .wen-vant-preview-image {
    width: 100%;
    height: 100%;
    /deep/.van-image__img {
      width: 100%;
      height: 100%;
    }
  }
  .pause {
    /deep/._play-btn {
      display: block !important;
      opacity: 1 !important;
    }
    /deep/.qun-base-controls {
      display: flex !important;
      opacity: 1 !important;
    }
  }
}
</style>
