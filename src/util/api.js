import request from '@/util/axios.js'
import Qs from "query-string"

export const blogLoginUser = (query) => {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: query,
    })
}
export const blogLoginUserByToken = (query) => {
    return request({
        url: '/api/user/auth',
        method: 'post',
        data: query,
    })
}
export const blogRegisterUser = (query) => {
    return request({
        url: '/api/user/register',
        method: 'post',
        data: query,
    })
}