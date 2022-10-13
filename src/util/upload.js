import request from '@/util/axios.js'
export const customUploadImage = (query) => {
    return request({
        url: '/upload/image',
        method: 'post',
        data: query,
    })
}