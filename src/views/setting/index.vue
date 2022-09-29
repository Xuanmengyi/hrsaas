<template>

  <div class="app-container">
    <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <el-row :gutter="10">
          <el-button type="primary" style="margin-left:10px;" size="small" icon="el-icon-plus" @click="addRole">新增角色</el-button>
        </el-row>
        <el-table style="width:100%" :data="roleList" :loading="loading">
          <el-table-column label="序号" width="120" type="index" />
          <el-table-column label="角色名称" width="240" prop="name" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作" width="240">
            <template slot-scope="{row}">
    <el-button size="small" type="success">分配权限</el-button>
    <el-button size="small" type="primary" @click="edit(row)">编辑</el-button>
    <el-button size="small" type="danger" @click="del(row)">删除</el-button>
  </template>
          </el-table-column>
  </el-table>
  <el-row :gutter="10" type="flex" justify="end" align="middle"
  style="height:60px;">
  <el-pagination
  v-if="total>0"
  background
  layout="prev, pager, next, sizes"
  :total="total"
  :current-page.sync="page.page"
  :page-size.sync="page.pagesize"
  :page-sizes="[2,5,10,15]"
  @current-change="getRoleList"
  @size-change="getRoleList"
  >
</el-pagination></el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
          :closable="false"
          />
<el-form label-width="120px" style="margin-top:50px">
  <el-form-item label="公司名称">
    <el-input disabled style="width:400px" v-model="companyInfo.name" />
  </el-form-item>
  <el-form-item label="公司地址">
    <el-input disabled style="width:400px" v-model="companyInfo.companyAddress" />
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input disabled style="width:400px" v-model="companyInfo.mailbox" />
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" :rows="3" disabled style="width:400px" v-model="companyInfo.remarks"/>
  </el-form-item>
</el-form>
      </el-tab-pane>
    </el-tabs>
    <addRole :dialogVisible.sync="dialogVisible" @refreshList="getRoleList" ref="addRole"></addRole>
  </el-card>

  </div>

</template>

<script>
import { getRoleListAPI, getCompanyInfo,deleteRole } from '@/api/setting.js'
import { mapGetters } from 'vuex'
import addRole from './components/addRole.vue'
export default {
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: '',
      roleList: [],
      loading: false,
      dialogVisible: false,
      companyInfo: {}
    }
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
       this.loading = true
       const { rows, total } = await getRoleListAPI(this.page)
       this.total = total
        this.roleList = rows
        if (this.total > 0 && this.roleList.length === 0) {
          this.page.page--
          this.getRoleList()
        }
     } catch (error) {
       console.log(error)
      } finally {
        this.loading = false
     }
    },
    addRole() {
      this.dialogVisible = true
    },
    edit(row) {
     // console.log(this.$refs.addRole)
      this.$refs.addRole.roleForm = { ...row }
      this.dialogVisible = true
    },
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.$store.getters.companyId)
    },
    async del({ id }) {
      try {
       await this.$confirm('确定要删除该角色嘛', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
       })
        await deleteRole(id)
        this.getRoleList()
        console.log('success')
      } catch (error) {
        console.log('cancel')
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  }
}
</script>

<style>

</style>