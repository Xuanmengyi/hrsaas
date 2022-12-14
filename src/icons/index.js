import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// 第二个参数代表能否查询子目录
// console.log(req.keys())
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
