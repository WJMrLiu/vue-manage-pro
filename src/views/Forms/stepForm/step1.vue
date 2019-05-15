<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="payAccount"
        label="付款账户"
        :rules="[
      { required: true, message: '请输入付款账户', trigger: 'blur' },
    ]"
      >
        <el-input v-model="dynamicValidateForm.payAccount"></el-input>
      </el-form-item>
      <el-form-item
        label="收款账户"
        prop="receiverAccount"
        :rules="{
      required: true, message: '请输入收款账户', trigger: 'blur'
    }"
      >
        <el-input v-model="dynamicValidateForm.receiverAccount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
    return {
      dynamicValidateForm: {
        payAccount: '',
        receiverAccount: '',
      },
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  created() {
    this.dynamicValidateForm = this.step
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit({
            type: 'form/saveStepFormData',
            payload: this.dynamicValidateForm
          })
          this.$router.push('/confirm');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>