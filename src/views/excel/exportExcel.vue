<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="document"
        @click="handleDownload"
      >{{ ('excel.export') }} Excel</el-button>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left:15px;"
      >
        <el-tag type="info">Documentation</el-tag>
      </a>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="id"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="city">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column
        label="Author"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="balance"
        width="115"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.balance }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="registe_time"
        width="220"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.registe_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from "@/api/getData";
import FilenameOption from "./components/FilenameOption";
import AutoWidthOption from "./components/AutoWidthOption";
import BookTypeOption from "./components/BookTypeOption";
import { baseUrl } from '@/config/env.js'
export default {
  name: "ExportExcel",
  components: { FilenameOption, AutoWidthOption, BookTypeOption },
  data() {
    return {
      list: null,
      listLoading: false,
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
      offset: 0,
      limit: 20
    };
  },
  created() {
    // this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = false;
      // const user = await getUserList("excel");
      // this.list = user;
      // this.listLoading = false;
        console.log('ewrwerwer');
        
        // 创建一个form 表单
        let tForm = document.createElement("form");
        tForm.setAttribute("style", "display:none");
        tForm.setAttribute("target", "");
        tForm.setAttribute("method", "get");
        tForm.setAttribute(
          "action",
          `${baseUrl}/user/export?expType=excel`
        );
        let tInput = document.createElement("input");
          tInput.setAttribute("name", "expType");
          tInput.setAttribute("value", "excel");
          let tBody = document.getElementsByTagName("body")[0];
          tBody.appendChild(tForm);
          tForm.appendChild(tInput);
        tForm.submit();
    },
    handleDownload() {
      console.log('点击下载');
      this.fetchData();
      this.downloadLoading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return v[j];
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>