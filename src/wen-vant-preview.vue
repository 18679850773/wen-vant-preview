<template>
  <div id="wen-vant-preview" v-if="modelValue" @touchmove="stopPropagations" @touchend="stopPropagations"
    :class="[startTransition&&scale < 0.95&&'start-transition', !enableFullscreen&&'close-fullscreen']"
    :style="{backgroundColor: `rgba(0, 0, 0, ${traceabilityEnd?0:scale-(1-scale)*4})`}">
    <div :style="{transform, transition}" class="wen-vant-preview">
      <van-swipe @change="swipeChange" v-bind="$attrs" :ref="'wen-vant-preview-'+refTime" :touchable="!startClear"
        :show-indicators="false">
        <van-swipe-item v-for="(item, index) of list" :key="item[_config.key]||index" @click="swipeClick($event, index)"
          @touchmove="swipeMove" @touchstart="swipeMoveStart" @touchend="swipeMoveEnd">
          <vue-mini-player v-if="computedVideoType(item[_config.type])"
            :ref="'wen-vant-preview-video-'+item.randomString" :video="item.videoData" :mutex="true"
            @fullscreen="e=>videoFullscreen(e,index)" :class="videoClass" @videoPlay="e => videoPlay(e,index)"
            @ready="()=>videoReady(index)" style="width:100%;height:100%;" />
          <van-image v-else-if="computedImageType(item[_config.type])" fit="contain" :src="item[_config.imgSrc]"
            class="wen-vant-preview-image" :style="imageTransform" :class="[imageStartTransition&&'start-transition']"
            :ref="'wen-vant-preview-image-'+item.randomString">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <slot v-else v-bind="{item, index}"></slot>
          <slot name="cover" v-bind="{index}"></slot>
        </van-swipe-item>
      </van-swipe>
    </div>

    <slot name="indicator" v-if="typeof $scopedSlots.indicator=='function'&&$scopedSlots.indicator()"
      v-bind="{current}"></slot>
    <div class="custom-indicator" v-else>{{ current + 1 }} / {{list.length}}</div>

    <slot name="clear" v-if="typeof $scopedSlots.clear=='function'&&$scopedSlots.clear()"></slot>
    <van-icon name="clear" v-else class="wen-vant-clear" @click="clearSwipe" v-show="clearable" />
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
    list: { // 数据源
      type: Array,
      default: () => []
    },
    modelValue: { // 展示、隐藏预览
      type: Boolean,
      default: false,
    },
    config: {   // 图片或视频的配置
      type: Object,
      default: () => ({})
    },
    clickClose: { // 是否开启点击关闭
      type: Boolean,
      default: false
    },
    clearable: { // 右上角是否展示关闭图标
      type: Boolean,
      default: false
    },
    pullclose: { // 是否开启下拉关闭
      type: Boolean,
      default: true
    },
    enableFullscreen: { // 是否开启全屏预览功能
      type: Boolean,
      default: false
    },
    traceability: Object, // 是否开启溯源模式
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
      translateImageY: 0,
      translateImageX: 0,
      startClear: null,
      startTransition: false,
      imageStartTransition: false,
      scaleMoveStart: -1,
      scale2: 1, // 双指缩放
      endScale2: 1,
      traceabilityEnd: false
    }
  },
  computed: {
    currentSwipeIsImage () {
      return this.computedImageType(this.list[this.current][this._config.type])
    },
    computedVideoType () {
      return val => val === this._config.videoType
    },
    computedImageType () {
      return val => val === this._config.imageType
    },
    _config () {
      return Object.assign(this.defconfig, this.config)
    },
    imageTransform () {
      return `transform: scale(${this.scale2}) translate3d(${this.translateImageX}px, ${this.translateImageY}px, 0)`
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
        newVal.forEach((f, i) => { f.randomString = this.randomString(16); if (this.computedVideoType(f[this._config.type])) this.formatVideoData(f, i) })
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
          if (this.traceability) {
            const { left, width, height, top } = this.traceability.getBoundingClientRect()
            this.$el.style.transform = `scale(${width / window.innerWidth}, ${height / window.innerHeight}) translate(${left}px, ${top}px)`
            this.$el.style.transformOrigin = `${left}px ${top}px `
          }
        })
      } else {
        this.$emit('update:traceability', null)
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
    randomString (len) {
      len = len || 32;
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      const maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    doubleTouch (e) {
      if (this.currentSwipeIsImage) {
        const [{ pageX, pageY }] = e.changedTouches
        this.scale2 = this.scale2 < 2 ? 3 : 1
        if (this.scale2 == 3) {
          this.translateImageX = window.innerWidth / 2 - pageX
          this.translateImageY = window.innerHeight / 2 - pageY
          this.processingBoundaries()
          this.imageStartTransition = true
          setTimeout(() => {
            this.imageStartTransition = false
          }, 350)
        } else {
          this.translateImageX = this.translateImageY = 0
          this.imageStartTransition = true
          setTimeout(() => {
            this.imageStartTransition = false
          }, 350)
        }
      }
    },
    stopPropagations (e) {
      if (this.currentSwipeIsImage) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    get2pointDistance (changedTouches) {
      const [{ pageX: x1, pageY: y1 }, { pageX: x2, pageY: y2 }] = changedTouches
      const dx = Math.abs(x2 - x1);
      const dy = Math.abs(y2 - y1);
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    },
    resetImageTranslate () {
      this.translateImageX = 0
      this.translateImageY = 0
      this.translateImageEndX = 0
      this.translateImageEndY = 0
    },
    processingBoundaries () {
      const width = window.innerWidth * this.scale2
      const height = window.innerHeight * this.scale2
      const offx = parseInt((width - window.innerWidth) / 2 / this.scale2)
      const offy = parseInt((height - window.innerHeight) / 2 / this.scale2)
      this.translateImageX = Math.min(Math.max(-offx, this.translateImageX), offx)
      this.translateImageY = Math.min(Math.max(-offy, this.translateImageY), offy)
      this.translateImageEndX = this.translateImageX
      this.translateImageEndY = this.translateImageY
    },
    swipeMoveEnd (e) {
      if (Date.now() - this.lastTouchTime < 300) {
        this.doubleTouch(e)
        return false;
      }
      this.lastTouchTime = Date.now()
      if (!this.pullclose) return false;

      if (this.scaleMoveStart == 2 && this.currentSwipeIsImage) {
        this.scaleMoveStart = 0
        this.endScale2 = this.scale2
        if (this.endScale2 < 1) {
          this.endScale2 = 1
          this.scale2 = 1
          this.imageStartTransition = true
          this.resetImageTranslate()
          setTimeout(() => {
            this.imageStartTransition = false
          }, 350)
        }
        return false
      }

      if (this.currentSwipeIsImage && this.scale2 > 1) {
        this.processingBoundaries()
        this.imageStartTransition = true
        setTimeout(() => {
          this.imageStartTransition = false
        }, 350)
        return false;
      }

      console.log(e)
      if (!this.startClear) {
        this.startClear = null
        return false
      };
      this.startTransition = true
      if (this.scale < 0.95) {
        if (this.traceability) {
          this.traceabilityEnd = true
          this.$el.style.animation = 'reverse-preview .35s reverse'
          this.translateY = 0
          this.translateX = 0
          this.scale = 1
          setTimeout(() => {
            this.startTransition = false
            this.traceabilityEnd = false
            this.clearSwipe();
          }, 400)
        } else {
          this.traceabilityEnd = false
          this.translateY = 1000
          this.translateX *= 3
          setTimeout(() => {
            this.scale = 1
            this.translateY = 0
            this.translateX = 0
            this.startTransition = false
            this.clearSwipe();
          }, 350)
        }
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
      this.scaleMoveStart = e.targetTouches.length;
      if (this.scaleMoveStart == 1) {
        const [{ pageX, pageY }] = e.changedTouches
        this.startPageX = pageX
        this.startPageY = pageY
      } else if (this.scaleMoveStart == 2 && this.currentSwipeIsImage) {
        this.startDistance = this.get2pointDistance(e.targetTouches)
      }
    },
    scaleMoveHander (changedTouches) {
      const distance = this.get2pointDistance(changedTouches) - this.startDistance
      this.scale2 = Math.min(distance / this.startDistance + this.endScale2, 5)
    },
    imageMoveHander (pageX, pageY) {
      this.translateImageY = (pageY - this.startPageY) / this.scale2 + (this.translateImageEndY || 0)
      this.translateImageX = (pageX - this.startPageX) / this.scale2 + (this.translateImageEndX || 0)
      //   const {height, width} = this.$refs["wen-vant-preview-image-"+this.current][0].$el.getBoundingClientRect()
    },
    swipeMove (e) {
      if (!this.pullclose || this.scaleMoveStart == 0 || this.scaleMoveStart > 2) return false;
      if (this.scaleMoveStart == 2) {
        e.preventDefault();
        e.stopPropagation();
        this.currentSwipeIsImage && this.scaleMoveHander(e.changedTouches)
        return false
      }
      const [{ pageX, pageY }] = e.changedTouches
      if (this.scaleMoveStart == 1 && this.currentSwipeIsImage && this.scale2 > 1) {
        e.preventDefault();
        e.stopPropagation();
        this.imageMoveHander(pageX, pageY)
        return false
      }
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
      this.scaleMoveStart = 0
      this.endScale2 = 1
      this.scale2 = 1
      this.resetImageTranslate()
      const { randomString } = this.list[this.current]
      if (this.videos.includes(randomString)) {
        const { $video } = this.$refs["wen-vant-preview-video-" + randomString][0]
        $video.pause()
      }
      this.current = index;
      typeof this.$listeners.change == 'function' && this.$listeners.change(index)
    },
    formatVideoData (item, index) {
      this.videos.push(item.randomString)
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
      this.endScale2 = 1
      this.scale2 = 1
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
  animation: start-preview 0.35s forwards;
}
@keyframes start-preview {
  100% {
    transform: scale(1) translate(0, 0);
    transform-origin: center;
  }
}
@keyframes reverse-preview {
  100% {
    transform: scale(1) translate(0, 0);
    transform-origin: center;
  }
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
  background: rgba(0, 0, 0, 0.3);
  transform: translateX(-50%);
  color: white;
}
#wen-vant-preview .wen-vant-preview-image {
  width: 100%;
  height: 100%;
}
#wen-vant-preview .wen-vant-preview-image.start-transition {
  transition: transform 0.35s;
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
