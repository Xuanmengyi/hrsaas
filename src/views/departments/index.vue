<template>
    <div class="departments-container" v-loading="loading">
    <el-card>
     <tree-node  :treeNode="company" :isRoot="false" @addDept="handleAddDept"/>
    </el-card>
    <el-tree :data="departs" :props="defaultProps" default-expand-all >
     <tree-node slot-scope="{ data }" :treeNode="data" @addDept="handleAddDept" @editDept="editDept" @refreshList="getDepartments" />
    </el-tree>
    <add-dept :dialog-visible.sync="dialogVisible" :tree-node="currentNode" ref="addDept" ></add-dept>
  </div>

</template>

<script>
import treeNode from './components/treeNode.vue'
import { getDepartments } from '@/api/departments'
import { tranListtoTree } from '@/utils/index'
import addDept from './components/add-dept.vue'
export default {
  components: {
    treeNode,
    addDept
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  data() {
    return {
      departs: [],
      defaultProps: {
          label: 'name'
      },
      company: {},
      dialogVisible: false,
      currentNode: { },
      loading:false
    }
  },
  methods: {
  async  getDepartments() {
     try {
       this.loading=true
        const { depts, companyName, companyManage } = await getDepartments()
      this.departs = tranListtoTree(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
     } finally{
       this.loading=false
     }
    },
    handleAddDept(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDept(node){
      this.dialogVisible = true
      this.currentNode = {...node}
      this.$refs.addDept.formData={...node}
    }

  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
         padding-right: 20px;
      }
    }
  }
</style>
