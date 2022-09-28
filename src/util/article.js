import request from '@/util/axios.js'
import Qs from "query-string"

//文章管理列表获取
export const articleListGet = (params) => {
    return request({
        url: '/article/list',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//文章详情获取
export const articleContentGet = (params) => {
    return request({
        url: '/article/content',
        method: 'get',
        params: params,
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
//文章喜欢
export const increaseArticleLike = (query) => {
    return request({
        url: '/article/like',
        method: 'put',
        data: query,
    })
}