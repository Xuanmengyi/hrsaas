<template>
 <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabHandleClick">
          <el-tab-pane lazy label="登录账户设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" ref="form" :model="accountInfo" :rules="accountRules"  style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input style="width:300px" v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input style="width:300px" type="password" v-model="accountInfo.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees" >更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" >
            <job-info></job-info>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById,saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
  import Cookie from 'js-cookie'
export default {
data(){
  return {
    activeName:Cookie.get('tabActive') || 'job',
    accountInfo:{},
    accountRules:{
      username:[
        {required:true,message:'请输入员工名称',trigger:'blur'},
        { min:2,max:10,message:'长度在2到10个字符',trigger:'blur'}
      ],
      password:[
       {required:true,message:'请输入员工密码',trigger:'blur'},
        { min:6,max:10,message:'密码长度最小为6位',trigger:'blur'}
      ]
    }

  }
},
components:{
  UserInfo,
  JobInfo
},
 created() {
    this.getUserInfo()
  },

  methods: {
    async getUserInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployees(){
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log('校验失败')
      }
    },
    tabHandleClick(){
       Cookie.set('tabActive', this.activeName)
    }
  },
}
</script>

<style>

</style>