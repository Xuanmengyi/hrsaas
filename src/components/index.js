// import PageTools from './PageTools'

// const components = [PageTools]

// export default {
//     install: function(Vue){
//         components.forEach(ele=>{
//             console.log(ele)
//             Vue.component(ele.name,ele)
//         })
//     }
// }
import * as filters from '@/filters'
const fn = require.context('./', true, /\.vue$/)
const components = fn.keys().map(ele => {
    return fn(ele)
})
// 上述相当于如下
export default (Vue) => {
    components.forEach(ele => {
        Vue.component(ele.default.name, ele.default)
    })
    Object.keys(filters).forEach(key=>{
    Vue.filter(key, filters[key])
})
}

// console.log(fn.keys())
// console.log(fn('./PageTools/index.vue'))
