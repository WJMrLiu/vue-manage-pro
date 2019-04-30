<template>
  <div class="app-container">
    <headTop />
    <el-upload
      class="upload-demo"
      action="http://192.168.43.231:9999/user/importIn"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :file-list="fileList"
    >
      <el-button
        size="small"
        type="primary"
      >点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >上传文件，不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import headTop from "_com/headTop";
import { importIn } from "@/api/getData";

export default {
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  components: {
    headTop
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleSuccess(res) {
      if (res.status == "success") {
        // this.open()
        this.$message({
          type: "success",
          message: "导入文件成功"
        });
      } else {
        this.$message({
          type: "error",
          message: "导入文件失败"
        });
      }
    },
    open() {
      const h = this.$createElement;

      this.$notify({
        title: "标题名称",
        message: h(
          "i",
          { style: "color: teal" },
          "这是提示文案这是提示文案这是提示文案"
        )
      });
    }
  }
};
</script>

<style>
.upload-demo {
  padding: 20px;
}
</style>
