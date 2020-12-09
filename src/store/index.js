import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'abc',
    nextId: 5,
    viewStatus: 'undone'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, value) {
      state.inputValue = value
    },
    addItem(state, item) {
      const Obj = {
        id: state.nextId, info: state.inputValue.trim(), done: false
      }
      state.list.push(Obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeView(state, K) {
      state.viewStatus = K
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then((data) => {
        context.commit("initList", data.data)
      })
    },
  },
  getters: {
    unDoneLength(state,) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state,) {
      if (state.viewStatus === 'done') {
        return state.list.filter(x => x.done)
      } else if (state.viewStatus === 'undone') {
        return state.list.filter(x => !x.done)
      } else {
        return state.list
      }
    }
  },
  modules: {
  }
})
