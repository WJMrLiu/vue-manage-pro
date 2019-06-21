<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manage">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>数据管理
            </template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="foodList">用户列表详情</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-edit"></i>编辑
            </template>
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>分布表单
            </template>
            <el-menu-item index="info">分布表单</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-document"></i>Excel
            </template>
            <el-menu-item index="exportExcel">下载excel</el-menu-item>
            <el-menu-item index="uploadExcel">导入excel</el-menu-item>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-document"></i>远程搜索
            </template>
            <el-menu-item index="remoteSearch">远程搜索</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  name: 'manage',
  computed: {
    defaultActive: function() {
      return this.$route.path.replace('/', '');
    },
  },
};
</script>


<style lang="less" scoped>
@import '../style/mixin';
</style>
<style>
.iconfont {
  font-size: 20px !important;
  padding: 7px;
}
</style>