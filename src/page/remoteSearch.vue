<template>
  <div>
    <head-top></head-top>
    <el-select
      v-model="value"
      :multiple="false"
      :filterable="true"
      :remote="true"
      :clearable="true"
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
import headTop from '@/components/headTop';
import { remoteSearch } from '@/api/getData';
export default {
  components: {
    headTop,
  },
  data() {
    return {
      options: [],
      value: [],
      list: [],
      states: [],
      loading: false,
    };
  },
  created(){
    
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query == '') {
        return this.options = []
      }
        this.loading = true;
        this.remoteSearch(query);
    },
    async remoteSearch(query) {
      const result = await remoteSearch({
        context: query,
      });
      if (result) {
        this.loading = false;
        this.options = result.filter(item => {
          return item.label === query;
        });
      }
    },
  },
};
</script>