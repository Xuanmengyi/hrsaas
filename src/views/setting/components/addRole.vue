<template>
  <el-dialog
    title="新增角色"
    width="60%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="roleForm"   
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{ required: true, message: '角色名称不能为空', trigger: 'blur' }]"
      >
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description" >
        <el-input v-model="roleForm.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit" v-loading="loading">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
  import { addRoleAPI,updateRole } from '@/api/setting'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
    return {
	roleForm: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
    methods: {
        handleClose() {
        this.$emit('update:dialogVisible', false)
        this.$refs.roleDialogForm.resetFields()
      },
     async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.roleForm.id ? await updateRole(this.roleForm) : await addRoleAPI(this.roleForm)
        this.$message.success(`${this.roleForm.id ? '编辑' : '新增'}角色成功`)
        this.$emit('refreshList')
        this.handleClose()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
        }
   }
}
</script>

<style>

</style>