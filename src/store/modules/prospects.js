import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import { currentUser } from '@/constants/config'

Vue.use(VueAxios, axios)

export default {
  state: {
    prospects: [],
    processing: false
  },
  getters: {
    prospects: state => state.prospects,
    processing: state => state.processing
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false
    },
    setProcessing (state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError (state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    clearError (state) {
      state.loginError = null
    },
    setProspects (state, payload) {
      state.prospects = payload
      state.processing = false
    }
  },
  actions: {
    saveProspectInfo ({ commit }, payload) {
      commit('clearError')
      console.log('in svae prospect', payload)
      Vue.axios.post('http://localhost:3000/api/prospects', payload)
        .then((response) => {
          console.log('THIS IS RESPONSE FROM PROSPECT API: ', response)
        })
    },
    getProspects ({ commit }) {
      commit('clearError')
      Vue.axios.get('http://localhost:3000/api/prospects/all')
        .then((response) => {
          console.log('GOT ALL THE PROSPECTS: ', response.data)
          commit('setProspects', response.data.data)
        })
    }
  }
}
