import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'abc',
    nextId: 5
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
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then((data) => {
        console.log(data.data);
        context.commit("initList", data.data)
      })
    },

  },
  modules: {
  }
})
