<template>
    <!-- 新增部门的弹层 -->
    <el-dialog :title="showTitle" @close="handleClose" :visible="dialogVisible">
      <!-- 表单组件  el-form   label-width设置label的宽度   -->
      <!-- 匿名插槽 -->
      <el-form label-width="120px" :model="formData" :rules="rules" ref="addDeptForm">
        <el-form-item label="部门名称" prop="name">
          <el-input style="width:80%" placeholder="1-50个字符" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input style="width:80%" placeholder="1-50个字符" v-model="formData.code"/>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select style="width:80%" placeholder="请选择" v-model="formData.manager" @focus="getEmployeesSimple">
            <el-option :label="item.username" :value="item.username" v-for="item in employees" :key="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" v-model="formData.introduce" />
        </el-form-item>
      </el-form>
      <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
      <el-row slot="footer" type="flex" justify="center">
        <!-- 列被分为24 -->
        <el-col :span="6">
          <el-button type="primary" @click="onSubmit" size="small" v-loading="loading" >确定</el-button>
          <el-button size="small" @click="handleClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </template>

<script>
import { getDepartments,addDepartments,updateDepartments } from '@/api/departments'
import { getEmployeesSimpleAPI } from '@/api/employees'
export default {
  name: 'hrsaasAddDept',
  data() {
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      console.log(depts)
      let isRepeat = true
if(this.formData.id) {
   isRepeat = depts.some(ele =>ele.id!==this.formData.id && ele.code === value)
}else{
      isRepeat = depts.some(ele => ele.code === value)
}

      isRepeat ? callback(new Error(`模块下已经存在${value}编码`)) : callback()
      }
      const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
     
      let isRepeat = true
      if(this.formData.id){
        const departments1=depts.filter(item => item.pid === this.treeNode.pid && item.id!==this.treeNode.id)
        isRepeat = departments1.some(item => item.name === value)
      }else{
      const departments = depts.filter(item => item.pid === this.treeNode.id)
        isRepeat = departments.some(item => item.name === value)
      }
     
      isRepeat ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      employees: [],
      loading:false,
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
      },
      treeNode: {
        type: Object,
        default: () => ({})
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
      this.formData={
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
  async  getEmployeesSimple(){
     this.employees= await getEmployeesSimpleAPI()
    
    },
   async onSubmit() {
      try {
      await this.$refs.addDeptForm.validate()
      this.loading = true
      if(this.formData.id){
await updateDepartments(this.formData)
      }else{
 await addDepartments({ ...this.formData, pid: this.treeNode.id })
      }
     
      this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功`)
      this.$parent.getDepartments()
      this.handleClose()
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed:{
    showTitle(){
      return this.formData.id? '编辑部门':'新增部门'
    }
  }
}
</script>

<style>

</style>
