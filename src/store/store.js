import Vue from 'vue'
import Vuex from 'vuex'
import {lumenRequest} from '../Axios Instances/lumenRequest'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    loading: false,
    data:[]
  },

  getters: {
    getFetchedData(state) {
      return state.data
    },
    getLoading(state) {
      return state.loading
    }
  },

  mutations: {
    setDataFetched(state,payload) {
      state.data = payload
    },
    setLoading(state,payload) {
      state.loading = payload
    },
    changeStateAfterUpdate(state,updatedData) {
      let indexOfId
      let data = state.data

      for(let i=0;i<data.length;i++) {
        if(data[i].id === updatedData.id) {
          indexOfId = i;
        }
      }

      Object.assign(data[indexOfId],updatedData)
    },
    addNewRow(state,payload) {
      const actions = ['mode_edit', 'delete_forever']

      payload.actions = actions

      state.data.unshift(payload)

    },
    deleteRow(state,payload) {
      for(let i=0;i<state.data.length;i++){
        if(state.data[i].id === payload){
          state.data.splice(i,1)
        }
      }
    }
  },

  actions: {
    setDataFetched({commit},payload) {
      const actions = ['mode_edit', 'delete_forever']

      for(let i = 0;i<payload.length;i++) {
        payload[i].actions = actions //we retrieve from database the data and add them actions
      }

      commit('setDataFetched', payload)
    },
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    storeEditableFields({commit,getters}, payload) {
      commit('setLoading',true)

      // console.log(payload.newData)

      lumenRequest.put('/persons/update', payload.newData)
        .then(response => {
          if(response.data.ok === 'ok')
            commit('changeStateAfterUpdate',payload.newData)
          else
            alert('Something went wrong Please try again')
        })
        .catch(error => alert('Something went wrong Please try again'))
    },
    addNewRow({commit},payload) {
      lumenRequest.post('/persons/create',payload)
        .then(response => {
          if(response.data.id) {
            payload.id = response.data.id
            commit('addNewRow',payload)
          }else{
            alert('Something went wrong Please try again')
          }
        })
        .catch(error => alert('Something went wrong Please try again'))
    },
    deleteRow({commit},payload) {
      lumenRequest.delete('persons/delete',{
        params:{id:payload}
      })
        .then(response => {
          if(response.data.ok === 'ok'){
            commit('deleteRow',payload)
          }else{
            alert('Something went wrong!!Please refresh the page and try again')
          }
        })
        .catch(error => console.log(error))
    }
  }

})
