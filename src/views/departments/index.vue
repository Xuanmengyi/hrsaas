<template>
    <div class="departments-container">
    <el-card>
      <el-row type="flex" justify="space-around" align="middle" style="height:40px">
        <el-col>
          <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex">
            <el-col>
              <span>负责人</span>
            </el-col>
            <el-col>
              <el-dropdown>
                <span>
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        // padding-right: 20px;
      }
    }
  }
</style>
