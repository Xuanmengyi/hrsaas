import request from '@/utils/request'

export function getRoleListAPI(params) {
    return request({
        url: '/sys/role',
        params
    })
}

export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 修改角色
 * ***/
 export function updateRole(data) {
    return request({
      url: `/sys/role/${data.id}`,
      data,
      method: 'put'
    })
  }
  /**
   * 获取角色详情
   * **/
  export function getRoleDetail(id) {
    return request({
      url: `/sys/role/${id}`
    })
  }
  
/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
