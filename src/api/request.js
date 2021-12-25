import axios from "axios";
let baseURL = {
    development:"http://mockjs1.com",
    production:"http://mockjs2.com",
}

let instance = axios.create({
    baseURL:baseURL[process.env.NODE_ENV],
    timeout:3000,
})
instance.interceptors.response.use(res=>{
    console.log(res,'响应拦截')
    //响应返回处理
    if(res.status >= 200 && res.status<300){
        console.log(res)
        return res.data
    }
})
export default instance