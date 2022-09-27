import { login, getUserInfo, getUserDetailById } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: ''
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REOMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_HRSAAS_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('setToken', data)
      commit('SET_HRSAAS_TIME', new Date().getTime())
    },
    async getUserInfo(context) {
      const res = await getUserInfo()
      const res2 = await getUserDetailById(res.userId)
      const result = { ...res, ...res2 }
      context.commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    },
    async logout({ commit }) {
      commit('REOMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
