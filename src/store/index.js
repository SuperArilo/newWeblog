import { createStore } from 'vuex'
export default createStore({
    state: {
        isPhone: null,
        darkModel: false,
        windowScrollValue: null,
    },
    getters: {
        isPhone:state => state.isPhone,
        darkModel:state => state.darkModel,
        windowScrollValue:state => state.windowScrollValue
    },
    mutations: {
        isPhoneSet(state, value){
            state.isPhone  = value
        },
        darkModelSet(state, value){
            state.darkModel = value
        },
        windowScrollValueSet(state,value){
            state.windowScrollValue = value
        },
    }
})
