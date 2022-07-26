<template>
  <div id="wen-vant-preview" v-if="modelValue"
    :class="[startTransition&&scale < 0.95&&'start-transition', !enableFullscreen&&'close-fullscreen']"
    :style="{backgroundColor: `rgba(0, 0, 0, ${scale})`}">
    <div :style="{transform, transition}" class="wen-vant-preview">
      <van-swipe @change="swipeChange" v-bind="$attrs" :ref="'wen-vant-preview-'+refTime" :touchable="!startClear">
        <van-swipe-item v-for="(item, index) of list" :key="item[_config.key]||index" @click="swipeClick($event, index)"
          @touchmove="swipeMove" @touchstart="swipeMoveStart" @touchend="swipeMoveEnd">
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
          <slot name="cover" v-bind="{index}"></slot>
        </van-swipe-item>
        <template #indicator v-if="$attrs['show-indicators']===undefined?true:$attrs['show-indicators']">
          <slot name="indicator" v-if="typeof $scopedSlots.indicator=='function'&&$scopedSlots.indicator()"
            v-bind="{current}"></slot>
          <div class="custom-indicator" v-else>{{ current + 1 }} / {{list.length}}</div>
        </template>
      </van-swipe>
      <van-icon name="clear" class="wen-vant-clear" @click="clearSwipe" v-if="clearable" />
      <slot name="clear" v-if="typeof $scopedSlots.clear=='function'&&$scopedSlots.clear()"></slot>
    </div>
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
      default: () => ({})
    },
    clickClose: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    pullclose: {
      type: Boolean,
      default: true
    },
    enableFullscreen: {
      type: Boolean,
      default: true
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
        type: 'type',
        videoType: 'video',
        imageType: 'image',
      },
      videos: [],
      videoClass: '',
      refTime: '',
      scale: 1,
      translateY: 0,
      translateX: 0,
      startClear: null,
      startTransition: false,
    }
  },
  computed: {
    computedVideoType () {
      return val => val === this._config.videoType
    },
    computedImageType () {
      return val => val === this._config.imageType
    },
    _config () {
      return Object.assign(this.defconfig, this.config)
    },
    transform () {
      return `scale(${this.scale}) translate3d(${this.translateX}px, ${this.translateY}px, 0)`
    },
    transition () {
      return this.startTransition ? `transform .4s` : 'none';
    },
  },
  watch: {
    list (newVal) {
      if (newVal) {
        newVal.forEach((f, i) => { if (this.computedVideoType(f[this._config.type])) this.formatVideoData(f, i) })
      }
    },
    modelValue (newVal) {
      if (newVal) {
        this.scale = 1
        this.translateY = 0
        this.translateX = 0
        this.startTransition = false
        this.current = Number(this.$attrs["initial-swipe"]) || 0
        this.$nextTick(() => {
          if (!this.enableFullscreen) {
            this.$el.querySelectorAll('video').forEach(f => {
              f.setAttribute('webkit-playsinline', true)
              f.setAttribute('playsinline', true)
            })
          }
        })
      }
    }
  },
  mounted () {
    this.refTime = Date.now()
    this.current = Number(this.$attrs["initial-swipe"]) || 0
    if (this.list.length > 0) this.list.forEach((f, i) => { if (this.computedVideoType(f[this._config.type])) this.formatVideoData(f, i) })
    this.$nextTick(() => {
      document.body.append(this.$el)
    })
  },
  methods: {
    swipeMoveEnd (e) {
      if (!this.pullclose) return false;
      console.log(e)
      if (!this.startClear) {
        this.startClear = null
        return false
      };
      this.startTransition = true
      if (this.scale < 0.95) {
        this.translateY = 1000
        this.translateX *= 3
        setTimeout(() => {
          this.scale = 1
          this.translateY = 0
          this.translateX = 0
          this.startTransition = false
          this.clearSwipe();
        }, 350)
      } else {
        this.scale = 1
        this.translateY = 0
        this.translateX = 0
        setTimeout(() => {
          this.startTransition = false
        }, 350)
      }
      this.startClear = null
    },
    swipeMoveStart (e) {
      if (!this.pullclose) return false;
      const [{ pageX, pageY }] = e.changedTouches
      this.startPageX = pageX
      this.startPageY = pageY
    },
    swipeMove (e) {
      if (!this.pullclose) return false;
      const [{ pageX, pageY }] = e.changedTouches
      if (Math.abs(pageY - this.startPageY) > Math.abs(pageX - this.startPageX) && this.startClear === null) {
        this.startClear = true
      } else if (this.startClear === null) this.startClear = false
      if (this.startClear) {
        const offset = (pageY - this.startPageY) / 1000
        if (offset > 0) {
          this.scale = 1 - offset
          this.translateY = pageY - this.startPageY
          this.translateX = pageX - this.startPageX
        } else {
          this.scale = 1
          this.translateY = pageY - this.startPageY
          this.translateX = pageX - this.startPageX
        }
      }
    },
    swipeClick (e, index) {
      if (this.clickClose) this.clearSwipe();
      typeof this.$listeners.click == 'function' && this.$listeners.click(e, index)
    },
    swipeChange (index) {
      if (this.videos.includes(this.current)) {
        const { $video } = this.$refs["wen-vant-preview-video-" + this.current][0]
        $video.pause()
      }
      this.current = index;
      typeof this.$listeners.change == 'function' && this.$listeners.change(index)
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
      this.current = Number(this.$attrs["initial-swipe"]) || 0
      this.$emit('model-change', false);
      this.$emit('clear')
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
    videoReady (index) {
      this.$emit('ready', index)
      console.log('ready', index)
    },
    prev () {
      this.$refs["wen-vant-preview-" + this.refTime].prev()
    },
    next () {
      this.$refs["wen-vant-preview-" + this.refTime].next()
    },
    swipeTo () {
      this.$refs["wen-vant-preview-" + this.refTime].swipeTo(...arguments)
    },
    resize () {
      this.$refs["wen-vant-preview-" + this.refTime].resize()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#wen-vant-preview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  transition: background-color 0.35s;
}
#wen-vant-preview.start-transition {
  background-color: rgba(0, 0, 0, 0) !important;
}
.wen-vant-preview {
  width: 100%;
  height: 100%;
  color: white;
}
#wen-vant-preview .van-swipe {
  height: 100%;
}
#wen-vant-preview .wen-vant-clear {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
}
#wen-vant-preview .custom-indicator {
  position: absolute;
  left: 50%;
  top: 20px;
  padding: 2px 5px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.1);
  transform: translateX(-50%);
}
#wen-vant-preview .wen-vant-preview-image {
  width: 100%;
  height: 100%;
}
#wen-vant-preview .wen-vant-preview-image .van-image__img {
  width: 100%;
  height: 100%;
}
#wen-vant-preview .pause ._play-btn {
  display: block !important;
  opacity: 1 !important;
}
#wen-vant-preview .pause .qun-base-controls {
  display: flex !important;
  opacity: 1 !important;
}
#wen-vant-preview .van-image__error {
  background-color: #444;
}
#wen-vant-preview.close-fullscreen ._fullscreen {
  display: none;
}
</style>
