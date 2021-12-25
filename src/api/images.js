import request from "./request";

export function getImages(params){
    return request.get('/api/images',params)
}