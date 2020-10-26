<template>
  <div class="demo-page">
    <div class="demo-box">
      <div class="demo-title">例子一、单张图片</div>
      <div class="demo-main demo-ppic">
        <div @click="click1">单图测试</div>
      </div>
    </div>
    <div class="demo-box">
      <div class="demo-title">例子二、多张图片</div>
      <div class="demo-main demo-ppic">
        <div class="demo-ppic-group">
          <img
            @click="click2(index)"
            v-for="(item, index) in arr2"
            :key="index"
            :src="item"
            alt
          />
        </div>
      </div>
    </div>
    <div class="demo-box">
      <div class="demo-title">例子三、横纵图片</div>
      <div class="demo-main demo-ppic">
        <div class="demo-ppic-group">
          <img
            @click="click3(index)"
            v-for="(item, index) in arr3"
            :key="index"
            :src="item"
            alt
          />
        </div>
      </div>
    </div>
    <div class="demo-box">
      <div class="demo-title">例子四、带样式</div>
      <div class="demo-main demo-ppic">
        <ul class="el-upload-list el-upload-list--picture-card">
          <li
            class="el-upload-list__item"
            v-for="(item, index) in arr4"
            :key="index"
          >
            <img :src="item" alt class="el-upload-list__item-thumbnail" />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(item, index)"
              >
                <i class="preview-icon"></i>
              </span>
              <!-- 拓展按钮 -->
            </span>
          </li>
        </ul>
      </div>
    </div>
    <SCPreviewPicture
      ref="refPrevPic"
      :srcArr="picCurArr"
      :curIdx="picCurIdx"
    ></SCPreviewPicture>
  </div>
</template>

<script>
import { SCPreviewPicture } from "../../../index.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      arr1: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746652&di=05fceee9601735a05bce3c0baf17692d&imgtype=0&src=http%3A%2F%2F07.imgmini.eastday.com%2Fmobile%2F20171210%2F956a40682e1c46fcf0c980c7a86e8663.jpeg",
      ],
      arr2: [
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1575225859,3162989107&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=a91268b495db6dd8f45b95984c05047c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F08%2F03%2F2257a1ff36ef06e.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=7c4737e2d8d94d61cfc162251dd928e9&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F329%2F112.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=ad9d03a500074ce473b4153417f75d90&imgtype=0&src=http%3A%2F%2Fpic.soutu123.com%2Fback_pic%2F04%2F34%2F89%2F035847b9dd1f0d5.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
      ],
      arr3: [
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1575225859,3162989107&fm=26&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=a91268b495db6dd8f45b95984c05047c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F08%2F03%2F2257a1ff36ef06e.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=7c4737e2d8d94d61cfc162251dd928e9&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F329%2F112.jpg",
      ],
      arr4: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746652&di=05fceee9601735a05bce3c0baf17692d&imgtype=0&src=http%3A%2F%2F07.imgmini.eastday.com%2Fmobile%2F20171210%2F956a40682e1c46fcf0c980c7a86e8663.jpeg",
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=7c4737e2d8d94d61cfc162251dd928e9&imgtype=0&src=http%3A%2F%2Fimg.sccnn.com%2Fbimg%2F329%2F112.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603709746651&di=ad9d03a500074ce473b4153417f75d90&imgtype=0&src=http%3A%2F%2Fpic.soutu123.com%2Fback_pic%2F04%2F34%2F89%2F035847b9dd1f0d5.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue",
      ],
      picCurIdx: 0,
      picCurArr: [],
    };
  },
  props: {
    msg: String,
  },
  components: {
    SCPreviewPicture,
  },
  methods: {
    click1() {
      this.picCurArr = this.arr1;
      this.picCurIdx = 0;
      this.$refs.refPrevPic.show();
    },
    click2(xid) {
      this.picCurArr = this.arr2;
      this.picCurIdx = xid;
      this.$refs.refPrevPic.show();
    },
    click3(xid) {
      this.picCurArr = this.arr3;
      this.picCurIdx = xid;
      this.$refs.refPrevPic.show();
    },
    handlePictureCardPreview(item, index) {
      this.picCurArr = this.arr4;
      this.picCurIdx = index;
      this.$refs.refPrevPic.show();
    },
  },
};
</script>

<style lang="scss">
body {
  overflow-x: scroll;
}
.demo-ppic {
  .demo-ppic-group {
    display: flex;
    align-items: center;
  }
  img {
    width: 150px;
    height: auto;
    margin: 0 10px;
  }
}
// 样式引用eleme, 实际如已安装依赖，可不重写样式
.el-upload-list--picture-card {
  margin: 0;
  display: inline;
  vertical-align: top;
}

.el-upload-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.el-upload-list--picture-card .el-upload-list__item {
  position: relative;
  display: inline-block;
  width: 148px;
  height: 148px;
  font-size: 14px;
  color: #606266;
  line-height: 1.8;
  margin: 0 8px 8px 0;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  .el-upload-list__item-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: contain;
    // object-fit: cover;
    margin: 0;
  }
  .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    span {
      display: none;
      cursor: pointer;
    }
    .preview-icon {
      display: block;
      width: 32px;
      height: 32px;
      margin: calc(50% - 16px) auto 0;
      background: url("../assets/preview-icon.png") no-repeat center;
      background-size: contain;
    }
  }
  &:hover {
    .el-upload-list__item-actions {
      opacity: 1;
      span {
        display: block;
      }
    }
  }
}
</style>
