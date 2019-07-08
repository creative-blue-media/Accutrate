import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// import { currentUser } from '@/constants/config'

Vue.use(VueAxios, axios)

export default {
  state: {
    currentUser: localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : null,
    loginError: null,
    processing: false
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout (state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
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
    }
  },
  actions: {
    register ({ commit }, payload) {
      commit('clearError')
      console.log('Going to register', payload)
      Vue.axios.post('http://localhost:3000/api/users', payload)
        .then((response) => {
          console.log('THIS IS DATA FROM API: ', response)
        })
    },
    saveProspectInfo ({ commit }, payload) {
      commit('clearError')
      console.log('in svae prospect', payload)
    },
    update ({ commit }, payload) {
      // we are going to update user here
      console.log('UPDATING THE USER')
      commit('clearError')
      commit('setProcessing', true)
      Vue.axios.put('http://localhost:3000/api/users/user/update', payload)
        .then((response) => {
          console.log('USER WAS UPDATED: ', response.data)
        }, (err) => {
          console.log('UHOH')
          commit('setError', err.response.data.message)
        })
    },
    login ({ commit }, payload) {
      console.log('HOW ABOUT ME?')
      commit('clearError')
      commit('setProcessing', true)
      Vue.axios.post('http://localhost:3000/api/users/login', payload)
        .then((response) => {
          // console.log('THIS IS THE DATA inside: ', response)
          var user = response.data.user
          if (!user.address) {
            user.address = {}
          }
          const item = { uid: response.data.user._id, token: response.data.token, ...user }
          localStorage.setItem('user', JSON.stringify(item))
          console.log('storage: ', JSON.parse(localStorage.getItem('user')))
          commit('setUser', { uid: item.uid, ...user })
        }, (err) => {
          console.log('THere is erer', err.response)
          commit('setError', err.response.data.message)
        })
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(payload.email, payload.password)
      //   .then(
      //     user => {
      //       const item = { uid: user.user.uid, ...currentUser }
      //       localStorage.setItem('user', JSON.stringify(item))
      //       commit('setUser', { uid: user.user.uid, ...currentUser })
      //     },
      //     err => {
      //       localStorage.removeItem('user')
      //       commit('setError', err.message)
      //     }
      //   )
    },
    signOut ({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('user')
          commit('setLogout')
        }, _error => {})
    }
  }
}
