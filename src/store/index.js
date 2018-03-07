import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        test:"hello store"
    },
    modules: {
        crud: {
            namespaced: true
        }
    }
})


export default store