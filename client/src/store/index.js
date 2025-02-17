import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({})

const requireModule = require.context('./modules', false, /\.js$/)

requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  store.registerModule(moduleName, requireModule(fileName).default)
})

export default store