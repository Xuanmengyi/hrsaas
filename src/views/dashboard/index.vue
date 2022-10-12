<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon iconClass="eye-open"></svg-icon>
    <UploadExcel :beforeUpload="beforeUpload" :onSuccess="handleSuccess"></UploadExcel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel/index.vue';
export default {
    name: "Dashboard",
    computed: {
        ...mapGetters([
            "name"
        ])
    },
    components: { UploadExcel },
    methods:{
      handleSuccess(data){
        console.log('data',data)
      },
      beforeUpload(file){
        console.log(file)
        // if(file.size>1024){
        //   this.$message.error("文件太大了")
        //   return false
        // }
        return true
      }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
