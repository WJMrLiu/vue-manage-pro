<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <div style="text-align: right">
        <el-button
          type="primary"
          @click="handleAdd('selectTable')"
        >添加用户</el-button>
      </div>
      <el-table
        :data="tableData"
        @expand='expand'
        :expand-row-keys='expendRow'
        :row-key="row => row.index"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="用户">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="用户名称">
                <span>{{ props.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="注册日期"
          prop="username"
        >
        </el-table-column>
        <el-table-column
          label="用户姓名"
          prop="address"
        >
        </el-table-column>
        <el-table-column
          label="注册地址"
          prop="regAddr"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
      <el-dialog
        :title="titleDialog?'修改用户信息':'添加用户'"
        v-model="dialogFormVisible"
      >
        <el-form
          :model="selectTable"
          ref="selectTable"
          :rules="rules"
        >
          <el-form-item
            label="用户名"
            label-width="100px"
            prop="username"
          >
            <el-input
              v-model="selectTable.username"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <template v-if='flagPassword'>
            <el-form-item
              label="密码"
              label-width="100px"
              prop="password"
            >
              <el-input
                v-model="selectTable.password"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </template>
          <el-form-item
            label="用户地址"
            label-width="100px"
            prop="address"
          >
            <el-input v-model="selectTable.address"></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            v-if="!flagPassword"
            type="primary"
            @click="updateFood('selectTable')"
          >确 定</el-button>
          <el-button
            v-else
            type="primary"
            @click="addUser('selectTable')"
          >确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="添加规格"
        v-model="specsFormVisible"
      >
        <el-form
          :rules="specsFormrules"
          :model="specsForm"
        >
          <el-form-item
            label="规格"
            label-width="100px"
            prop="specs"
          >
            <el-input
              v-model="specsForm.specs"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="包装费"
            label-width="100px"
          >
            <el-input-number
              v-model="specsForm.packing_fee"
              :min="0"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="价格"
            label-width="100px"
          >
            <el-input-number
              v-model="specsForm.price"
              :min="0"
              :max="10000"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="specsFormVisible = false">取 消</el-button>
          <el-button
            v-if="!flagPassword"
            type="primary"
            @click="addspecs('edit')"
          >确 定</el-button>
          <el-button
            v-else
            type="primary"
            @click="addspecs('add')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import headTop from "_com/headTop";
import { baseUrl, baseImgPath } from "@/config/env";
import {
  getFoods,
  getFoodsCount,
  getMenu,
  updateFood,
  deleteFood,
  getResturantDetail,
  getMenuById,
  getUserList,
  addUser
} from "@/api/getData";
export default {
  data() {
    return {
      titleDialog: null,
      flagPassword: false,
      baseUrl,
      baseImgPath,
      restaurant_id: null,
      city: {},
      offset: 0,
      limit: 20,
      count: 0,
      tableData: [{ username: "王小虎",}],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      menuOptions: [],
      selectMenu: {},
      selectIndex: null,
      specsForm: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      },
      specsFormrules: {
        specs: [{ required: true, message: "请输入规格", trigger: "blur" }]
      },
      specsFormVisible: false,
      expendRow: []
    };
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id;
    // this.initData();
    this.getUsers();
  },
  computed: {
    specs: function() {
      let specs = [];
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          });
        });
      }
      return specs;
    }
  },
  components: {
    headTop
  },
  methods: {
    async getUsers() {
      const result = await getUserList({
        page: 1,
        pagesize: this.limit
      });
      this.count = result.value.total;
      this.tableData = [];
      result.value.items.forEach(item => {
        const tableData = {};
        tableData.username = item.username;
        tableData.address = item.address;
        tableData.regAddr = item.regAddr;
        tableData.userId = item.userId;
        tableData.password = item.password;
        this.tableData.push(tableData);
      });
    },
    async initData() {
      try {
        const countData = await getFoodsCount({
          restaurant_id: this.restaurant_id
        });
        if (countData.status == 1) {
          this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getFoods();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getMenu() {
      this.menuOptions = [];
      try {
        const menu = await getUserList({
          restaurant_id: this.selectTable.restaurant_id,
          allMenu: true
        });
        menu.forEach((item, index) => {
          this.menuOptions.push({
            label: item.name,
            value: item.id,
            index
          });
        });
      } catch (err) {
        console.log("获取食品种类失败", err);
      }
    },
    async getFoods() {
      const Foods = await getUsers({
        offset: 1,
        limit: this.limit
      });
      this.tableData = [];
      Foods.forEach((item, index) => {
        const tableData = {};
        tableData.name = item.name;
        tableData.item_id = item.item_id;
        tableData.adderss = item.adderss;
        tableData.rating = item.rating;
        tableData.month_sales = item.month_sales;
        tableData.restaurant_id = item.restaurant_id;
        tableData.category_id = item.category_id;
        tableData.image_path = item.image_path;
        tableData.specfoods = item.specfoods;
        tableData.index = index;
        this.tableData.push(tableData);
      });
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return "info-row";
      } else if (index === 3) {
        return "positive-row";
      }
      return "";
    },
    addspecs(type) {
      if (type == "edit") {
        this.specs.push({ ...this.specsForm });
        this.specsForm.specs = "";
        this.specsForm.packing_fee = 0;
        this.specsForm.price = 20;
        this.specsFormVisible = false;
      }
      if (type == "add") {
        this.addUser();
      }
    },
    deleteSpecs(index) {
      this.specs.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getFoods();
    },
    expand(row, status) {
      if (status) {
        this.getSelectItemData(row);
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    handleAdd(formName) {
      this.titleDialog = false;
      this.flagPassword = true;
      this.dialogFormVisible = true;
      this.selectTable.username = "";
      this.selectTable.address = "";
      this.selectTable.password = "";
      //   this.$refs[formName].resetFields();
    },
    handleEdit(row) {
      this.titleDialog = true;
      this.getSelectItemData(row, "edit");
      this.dialogFormVisible = true;
    },
    async getSelectItemData(row, type) {
      this.flagPassword = false;
      this.selectTable.username = row.username;
      this.selectTable.address = row.address;
      //   const restaurant = await getResturantDetail(row.userId);
      //   const category = await getMenuById(row.userId);
      this.selectTable = {
        // ...row.userId,
        ...{
          address: this.selectTable.address,
          username: this.selectTable.username,
          userId: row.userId
        }
      };
      this.selectMenu = { label: category.name, value: row.category_id }; // 展示某一行的具体信息
      this.tableData.splice(row.index, 1, { ...this.selectTable });
      this.$nextTick(() => {
        this.expendRow.push(row.index);
      });
      if (type == "edit" && this.restaurant_id != row.restaurant_id) {
        this.getMenu();
      }
    },
    async getUserList(row, type) {
      const restaurant = await getResturantDetail(1);
      const category = await getMenuById({ userId: row.userId });
      this.selectTable = {
        // ...row,
        // ...{
        //   restaurant_name: restaurant.name,
        //   restaurant_address: restaurant.address,
        //   category_name: category.name,
        //   userId: restaurant.userId
        // }
      };

      this.selectMenu = { label: category.name, value: row.category_id };
      this.tableData.splice(row.index, 1, { ...this.selectTable });
      this.$nextTick(() => {
        this.expendRow.push(row.index);
      });
      if (type == "edit" && this.restaurant_id != row.restaurant_id) {
        this.getMenu();
      }
    },
    handleSelect(index) {
      this.selectIndex = index;
      this.selectMenu = this.menuOptions[index];
    },
    async handleDelete(index, row) {
      try {
        const res = await deleteFood({ userId: row.userId });
        if (res.status == "OK") {
          this.$message({
            type: "success",
            message: "删除食品成功"
          });
          this.tableData.splice(index, 1);
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        this.$message({
          type: "error",
          message: err.message
        });
        console.log("删除食品失败");
      }
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.selectTable.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败！");
      }
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    addUser(formName) {
      this.$refs[formName].validate(async valid => {
        try {
          const postData = {
            username: this.selectTable.username,
            password: this.selectTable.password,
            address: this.selectTable.address
          };
          const res = await addUser(postData);
          if (res.status == "OK") {
            this.dialogFormVisible = !this.dialogFormVisible;
            this.$message({
              type: "success",
              message: "用户信息添加成功"
            });
            this.getUsers();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } catch (err) {
          console.log("更新信息失败", err);
        }
      });
    },
    updateFood(formName) {
      this.$refs[formName].validate(async valid => {
        try {
          const postData = { ...this.selectTable };
          const res = await updateFood(postData);
          if (res.status == "OK") {
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "用户信息修改成功"
            });
            this.getUsers();
            // this.getFoods();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        } catch (err) {
          console.log("更新餐馆信息失败", err);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_container {
  padding: 20px;
}
.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
