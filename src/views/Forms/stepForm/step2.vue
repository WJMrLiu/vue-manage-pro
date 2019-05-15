<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item prop="payAccount" label="付款账户">{{ step.payAccount }}</el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="{
      required: true, message: '请输入密码', trigger: 'blur'
    }"
      >
        <el-input v-model="dynamicValidateForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="onPrev">上一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        password: '',
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    },
  },
  created() {
    this.dynamicValidateForm = this.step
  },
  methods: {
    handleSubmit() {
      this.$refs['dynamicValidateForm'].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: 'form/submitStepForm',
            payload: {...this.step, ...this.dynamicValidateForm}
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onPrev() {
      this.$router.push('/info');
    },
  },
};
</script>