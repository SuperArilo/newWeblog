import { createStore } from 'vuex'
export default createStore({
    state: {
        isPhone: null,
        darkModel: false,
        windowScrollValue: null,
        userInfo: null,
    },
    getters: {
        isPhone:state => state.isPhone,
        darkModel:state => state.darkModel,
        windowScrollValue:state => state.windowScrollValue,
        userInfo:state => state.userInfo,
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
        userInfoSet(state, value){
            state.userInfo = value
        }
    }
})
