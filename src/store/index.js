import { createStore } from 'vuex'
export default createStore({
    state: {
        isPhone: null,
        darkModel: false
    },
    getters: {
        isPhone:state => state.isPhone,
        darkModel:state => state.darkModel
    },
    mutations: {
        isPhoneSet(state, value){
            state.isPhone  = value
        },
        darkModelSet(state, value){
            state.darkModel = value
        }
    }
})
