import { createStore } from 'vuex'
export default createStore({
    state: {
        isPhone: null
    },
    getters: {
        isPhone:state => state.isPhone
    },
    mutations: {
        isPhoneSet(value){
            state.isPhone  = value
        }
    }
})
