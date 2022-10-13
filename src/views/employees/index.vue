<template>
  <div class="app-container">
    <PageTools>
      <template #before>
           <span>共166条记录</span>
      </template>
      <template slot="after">
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border :data="list" v-loading="loading">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber"/>
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterfn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{row.timeOfEntry | formatDate}}
          </template>

        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
<el-switch :value="row.enableState===1" />
          </template>
          </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination 
        layout="prev, pager, next,sizes,total"
        :total="total"
        :page-size.sync="page.size"
        :current-page.sync="page.page"
        :page-sizes="[2,5,10]"
        @current-change="getEmployeeList"
        @size-change="getEmployeeList"
        />
      </el-row>
      <add-employ :dialogVisible.sync="dialogVisible"></add-employ>
    </el-card>
  </div>
</template>


<script>
  import { getEmployeeList,delEmployee } from '@/api/employees'
  import EnumHireType from '@/api/constant/employees'
  import addEmploy from './components/addEmploy.vue'
  console.log(EnumHireType)
  export default {
    name:'HrsaasIndex',
    data(){
      return {
        page:{
          page:1,
          size:10
        },
        total:0,
        list: [],
        loading:false,
        hireType:EnumHireType.hireType,
        dialogVisible:false
      }
    },
    components:{
addEmploy
    },
mounted(){
  this.getEmployeeList()
},
methods:{
  async getEmployeeList(){
  try {
      const {rows,total }= await getEmployeeList(this.page)
  this.total=total
  this.list=rows
  this.loading=true
  }finally{
    this.loading=false
  }
  },
  formatterfn(row, column, cellValue){
   const res=this.hireType.find(ele=>ele.id===cellValue)
   return res && res.value || '非正式'
  },
  handleEmploy(){
    this.dialogVisible=true
  },
async  del(id){
    try {
     await this.$confirm('确定删除该员工吗','提示',{
        type:'warning'
      })
      await delEmployee(id)
      this.getEmployeeList()
    } catch (error) {
      console.log(error)
    }
  },
 async exportExcel(){
  const { export_json_to_excel}= await  import('@/vendor/Export2Excel')
  const {rows}=await getEmployeeList({
    page:1,
    size:this.total
  })
  console.log(rows)
   const exportExcelMapPath = {
            '手机号': 'mobile',
            '姓名': 'username',
            '入职日期': 'timeOfEntry',
            '聘用形式': 'formOfEmployment',
            '转正日期': 'correctionTime',
            '工号': 'workNumber',
            '部门': 'departmentName',
        }
        const header = Object.keys(exportExcelMapPath)
        const data = rows.map(item => {
            return header.map(h => {
              if(h==='聘用形式'){
              const find= this.hireType.find(hire=>{
                  return hire.id===item[exportExcelMapPath[h]]
                })
                return find? find.value:'未知'
              }
                return item[exportExcelMapPath[h]]
            })
        })
  export_json_to_excel({
    header, // 表头
    data,//二维数组，每个数组是一行的数据
    filename:'员工列表', //非必填
    autoWidth:true, //宽度自适应
    bookType:'xlsx' //文件类型
  })
  },
  goDetail(row){
this.$router.push('/employees/detail/'+ row.id)
  }
  
}
  }

</script>
