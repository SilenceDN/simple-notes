import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        type: 1
    },

    actions: {
        typeChange({ commit }, type) {
            console.log(type)
            commit('typeChange', type)
        }
    },

    mutations: {
        typeChange(state, type) {
            state.type = type
        }
    },

    plugins: [createPersistedState(), createSharedMutations()],
    strict: process.env.NODE_ENV !== 'production'
})
