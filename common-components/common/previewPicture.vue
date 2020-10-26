<template>
  <div class="mhsc-dialog-prevpic" v-if="isVisiable">
    <div class="pic-box-side">
      <div class="pic-box" :style="{ height: boardObj.h + 'px' }">
        <img
          class="tu"
          :style="{
            left: imglt + 'px',
            top: imgtp + 'px',
            width: imgObj.uW + 'px',
            height: imgObj.uH + 'px',
            transform: `translate(0, 0)  scale(${scaleNum}) rotate(${
              directNum * 90
            }deg)`,
          }"
          :src="imgSrc"
          @mousedown.stop.prevent="picMousedown"
        />
        <div class="load" v-if="isLoading">
          <span>新图加载中</span>
        </div>
      </div>
      <div class="prev-bottom-def"></div>
      <div class="prev-bottom">
        <div class="btn" @click.stop.prevent="downClick">
          <div class="ic icxa"></div>
          <div>下载</div>
        </div>
        <div
          class="btn btnsx"
          :class="[{ disabled: scaleNum == scaleMin }]"
          @click="reduceClick"
        >
          <div class="ic icsx"></div>
          <div class="txt">缩小</div>
        </div>
        <div
          class="btn btnfd"
          :class="[{ disabled: scaleNum == scaleMax }]"
          @click="enlargeClick"
        >
          <div class="ic icfd"></div>
          <div class="txt">放大</div>
        </div>
        <div
          class="btn btnsyg"
          :class="[{ disabled: imgIdx == 0 }]"
          @click.stop.prevent="prevClick"
        >
          <div class="ic icsyg"></div>
          <div>上个</div>
        </div>
        <div
          class="btn btnxyg"
          :class="[{ disabled: imgIdx == srcArr.length - 1 }]"
          @click.stop.prevent="nextClick"
        >
          <div class="ic icxyg"></div>
          <div>下个</div>
        </div>
        <div class="btn" @click="resetClick">
          <div class="ic iccz"></div>
          <div class="txt">{{ !oldData ? "重置" : "1:1" }}</div>
        </div>
        <!--  i18n-cli getlang common -f zh.json -d previewPicture.vue -->
        <!--  i18n-cli writelang commonDist -f zh.json -d previewPicture.vue -->
        <!-- <div class="btn" @click="rotateAcwClick">
          <div class="ic icnxz"></div>
          <div class="txt">逆旋</div>
        </div>-->
        <div class="btn" @click="rotateCwClick">
          <div class="ic icxz"></div>
          <div class="txt">正旋</div>
        </div>
        <div class="btn" @click.stop.prevent="closedClick">
          <div class="ic icgb"></div>
          <div>关闭</div>
        </div>

        <!-- <div class="btn" @click.stop.prevent="soundClick">
                    <div class="ic icxa"></div>
                    <div>语音</div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downObj: null,
      isMoving: false,
      scaleNum: 1,
      directNum: 0,
      imgObj: { w: 0, h: 0, uW: 0, uH: 0 },
      boardObj: {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight - 80,
      },
      imglt: 0,
      imgtp: 0,
      imgSrc: "",
      imgIdx: 0,
      isVisiable: false,
      isLoading: false,
      oldData: null,
      prevOverflow: "",
    };
  },
  props: {
    srcArr: {
      type: Array,
      default: () => [],
    },
    curIdx: {
      type: Number,
      default: 0,
    },
    scaleStep: {
      type: Number,
      default: 0.2,
    },
    scaleMax: {
      type: Number,
      default: 3,
    },
    scaleMin: {
      type: Number,
      default: 0.2,
    },
  },
  async created() {
    const _this = this;
    await _this.getLang();
    if (this.srcArr.length) {
      this.initImg(true);
    }
    document.addEventListener(
      "mousemove",
      function (e) {
        if (_this.isMoving) {
          _this.imglt = _this.downObj.imglt + e.clientX - _this.downObj.clientX;
          _this.imgtp = _this.downObj.imgtp + e.clientY - _this.downObj.clientY;
        }
      },
      false
    );

    document.addEventListener(
      "mouseup",
      function (e) {
        if (_this.isMoving) {
        }
        _this.isMoving = false;
      },
      false
    );
  },
  mounted() {},
  destroyed() {},
  methods: {
    async getLang() {
      const win = window;
      const { localeLang } = win;
      const localItemV4 = "saas-other";
      await localeLang(win.navigator, localItemV4, "zh").then((res) => {
        localStorage.setItem("saas-other", JSON.stringify(res));
      });
    },
    effectNum(num, point = 0) {
      return parseFloat(num.toFixed(point));
    },
    initImg(isDef = false, callback = function () {}) {
      let _this = this;
      if (isDef) {
        this.imgIdx = this.curIdx;
      }
      this.isLoading = true;
      let imgSrc = this.srcArr[this.imgIdx];
      let img = document.createElement("img");
      img.onload = function (e) {
        let uW = 0;
        let uH = 0;

        if (_this.boardObj.w / _this.boardObj.h <= img.width / img.height) {
          uW = _this.boardObj.w;
          uH = (_this.boardObj.w * img.height) / img.width;
        } else {
          uW = (_this.boardObj.h * img.width) / img.height;
          uH = _this.boardObj.h;
        }

        _this.imgObj = {
          w: img.width,
          h: img.height,
          uW: uW,
          uH: uH,
        };
        _this.isLoading = false;

        callback && callback();
      };
      img.onerror = function () {
        _this.isLoading = false;
        throw Error("加载错误");
      };
      img.src = imgSrc;
      this.imgSrc = imgSrc;
    },
    calPic() {
      let uW = 0;
      let uH = 0;
      let imgObj = this.imgObj;

      let num = this.directNum % 4;
      if (num % 2 == 0) {
        // 图片比较宽
        if (this.boardObj.w / this.boardObj.h <= imgObj.w / imgObj.h) {
          uW = this.boardObj.w;
          uH = (this.boardObj.w * imgObj.h) / imgObj.w;
        } else {
          uW = (this.boardObj.h * imgObj.w) / imgObj.h;
          uH = this.boardObj.h;
        }
      } else if (this.boardObj.w / this.boardObj.h <= imgObj.w / imgObj.h) {
        uW = this.boardObj.h;
        uH = (this.boardObj.h * imgObj.h) / imgObj.w;
      } else {
        uW = this.boardObj.h;
        uH = (this.boardObj.h * imgObj.h) / imgObj.w;
      }

      this.imgObj = {
        w: imgObj.w,
        h: imgObj.h,
        uW: uW,
        uH: uH,
      };
    },
    rotateAcwClick() {
      this.directNum--;
      this.calPic();
    },
    rotateCwClick() {
      this.directNum++;
      this.calPic();
    },
    resetClick() {
      if (!this.oldData) {
        this.oldData = {
          scaleNum: this.scaleNum,
          imglt: this.imglt,
          imgtp: this.imgtp,
          directNum: this.directNum,
        };
        this.scaleNum = 1;
        this.imglt = 0;
        this.imgtp = 0;
      } else {
        this.scaleNum = this.oldData.scaleNum;
        this.imglt = this.oldData.imglt;
        this.imgtp = this.oldData.imgtp;
        this.directNum = this.oldData.directNum;
        this.oldData = null;
      }
    },
    enlargeClick() {
      this.scaleNum = this.scaleNum + this.scaleStep;
      this.scaleNum = this.effectNum(this.scaleNum, 1);
      if (this.scaleNum >= this.scaleMax) {
        this.scaleNum = this.scaleMax;
      }
    },
    reduceClick() {
      let oldNum = this.scaleNum;
      this.scaleNum = this.scaleNum - this.scaleStep;
      this.scaleNum = this.effectNum(this.scaleNum, 1);
      if (this.scaleNum <= this.scaleMin) {
        this.scaleNum = this.scaleMin;
      }

      if (oldNum != this.scaleNum) {
        this.imglt = this.imglt * (1 - this.scaleStep);
        this.imgtp = this.imgtp * (1 - this.scaleStep);
      }
    },
    picMousedown(e) {
      this.isMoving = true;
      this.downObj = {
        clientX: e.clientX,
        clientY: e.clientY,
        imglt: this.imglt,
        imgtp: this.imgtp,
      };
    },
    downClick(e) {
      let _this = this;
      e.preventDefault();
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        let event = new MouseEvent("click");
        let prex = this.src.replace(/(.*\.)([^?#]*)/gi, "$2");
        a.download = `${new Date().getTime()}.${prex}` || "photo";
        a.href = url;
        a.dispatchEvent(event);
      };
      image.onerror = function (e) {
        window.open(_this.imgSrc);
      };
      image.src = this.imgSrc;
      return false;
    },
    nextClick(e) {
      if (this.imgIdx == this.srcArr.length - 1) {
        return;
      }
      this.imgIdx = this.imgIdx + 1;
      this.initImg(false, () => {
        this.scaleNum = 1;
        this.imglt = 0;
        this.imgtp = 0;
        this.directNum = 0;
        this.oldData = null;
      });
    },
    prevClick(e) {
      if (this.imgIdx == 0) {
        return;
      }
      this.imgIdx = this.imgIdx - 1;
      this.initImg(false, () => {
        this.scaleNum = 1;
        this.imglt = 0;
        this.imgtp = 0;
        this.directNum = 0;
        this.oldData = null;
      });
    },
    closedClick(e) {
      document.body.style.overflow = this.prevOverflow;
      if (this.curIdx != this.imgIdx) {
        this.initImg(true, () => {
          this.scaleNum = 1;
          this.imglt = 0;
          this.imgtp = 0;
          this.directNum = 0;
          this.oldData = null;
        });
      }
      this.removeListener();
      this.isVisiable = false;
    },
    show() {
      this.prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      this.initListener();
      this.isVisiable = true;
    },

    wheel(event) {
      let delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) {
        delta = -event.detail / 3;
      }
      if (delta < 0) {
        // 向下
        this.reduceClick();
      } else {
        // 向上
        this.enlargeClick();
      }
    },
    keyPress(event) {
      let keyCode = event.keyCode;
      switch (keyCode) {
        case 27:
          this.closedClick();
          break;
        case 37:
          this.prevClick();
          break;
        case 39:
          this.nextClick();
          break;
        default:
          break;
      }
    },
    initListener() {
      if (window.addEventListener) {
        window.addEventListener("DOMMouseScroll", this.wheel, false);
        window.addEventListener("keyup", this.keyPress, false);
      } else {
        window.onkeyup = document.onkeyup = this.keyPress;
      }
      window.onmousewheel = document.onmousewheel = this.wheel;
    },
    removeListener() {
      if (window.removeEventListener) {
        window.removeEventListener("DOMMouseScroll", this.wheel, false);
        window.removeEventListener("keyup", this.keyPress, false);
      }
      window.onmousewheel = document.onmousewheel = null;
      window.onkeyup = document.onkeyup = null;
    },
  },
  watch: {
    srcArr: function (val, oldVal) {
      if (val != oldVal) {
        this.initImg(true);
      }
    },
    curIdx: function (val, oldVal) {
      if (val != oldVal) {
        this.initImg(true, () => {
          this.scaleNum = 1;
          this.imglt = 0;
          this.imgtp = 0;
          this.directNum = 0;
          this.oldData = null;
        });
      }
    },
  },
};
</script>

<style lang="scss">
.mhsc-dialog-prevpic {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  .pic-box-side {
    position: relative;
  }
  .pic-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .tu {
      position: relative;
      display: block;
      transform-origin: center center;
    }
    .load {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 16px;
      color: #000;
      text-shadow: 0 0 3px #fff;
    }
  }
  .picture {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .prev-bottom-def {
    height: 80px;
    width: 100%;
  }

  .prev-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 101;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    font-size: 12px;
    text-align: center;
    background: #fff;
    user-select: none;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 50px;
      height: auto;
      text-align: center;
      margin: 0 15px;
      cursor: pointer;

      &.disabled {
        color: #aaa;
        cursor: default;
      }
    }

    .ic {
      width: 24px;
      height: 24px;
      background: url("../assets/images/prevpic1.png") no-repeat center center;
      background-size: contain;
      margin-bottom: 3px;
    }
    .icsx {
      background-image: url("../assets/images/prevpic3.png");
    }
    .iccz {
      background-image: url("../assets/images/prevpic5.png");
    }
    .icfd {
      background-image: url("../assets/images/prevpic1.png");
    }
    .icnxz {
      background-image: url("../assets/images/prevpic6.png");
      transform: rotateY(180deg);
    }
    .icxz {
      background-image: url("../assets/images/prevpic6.png");
    }
    .icxa {
      background-image: url("../assets/images/prevpic7.png");
    }
    .icxyg {
      background-image: url("../assets/images/prevpic8.png");
    }
    .icsyg {
      background-image: url("../assets/images/prevpic8.png");
      transform: rotateY(180deg);
    }
    .icgb {
      background-image: url("../assets/images/prevpic10.png");
    }
    .btnsx.disabled .ic {
      background-image: url("../assets/images/prevpic4.png");
    }
    .btnfd.disabled .ic {
      background-image: url("../assets/images/prevpic2.png");
    }
    .btnsyg.disabled .ic {
      background-image: url("../assets/images/prevpic9.png");
    }
    .btnxyg.disabled .ic {
      background-image: url("../assets/images/prevpic9.png");
    }
  }
}
</style>
