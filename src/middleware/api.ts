import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

let requestName: any;  // 每次发起请求都会携带这个参数，用于标识这次请求，如果值相等，则取消重复请求

switch (process.env.NODE_ENV) {
    case 'development':
        axios.defaults.baseURL = 'http://123.56.115.20:8083/rest-api/';
        break;
    case 'production':
        axios.defaults.baseURL = 'rest-api/';
        break;
    default:
        axios.defaults.baseURL = 'rest-api/';
        break;
}

// 自定义响应成功的HTTP状态码
axios.defaults.validateStatus = (status): boolean => {
    console.log(status);
    return /^(2|3)\d{2}$/.test(status.toString());
};

axios.interceptors.request.use((config: any) => {
    // config 代表发起请求的参数的实体(可以发起一个请求在控制台打印一下这个config看看是什么东西)
    // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
    // 如果没有 requestName 就默认添加一个 不同的时间戳
    if (config.method === 'post') {
        if (config.data && qs.parse(config.data).requestName) {
            requestName = qs.parse(config.data).requestName;
        } else {
            requestName = new Date().getTime();
        }
    } else {
        if (config.params && config.params.requestName) {
            //如果请求参数中有这个requestName标识，则赋值给上面定义的requestName
            requestName = config.params.requestName;
        } else {
            requestName = new Date().getTime();
        }
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
    // if (requestName) {
    //     if (axios.get(requestName) && axios.get(requestName).cancel) {
    //         axios.get(requestName).cancel('取消了请求');
    //     }
    //     config.cancelToken = new axios.CancelToken((c: any) => {
    //         axios.get(requestName) = {};
    //         axios.get(requestName).cancel = c; //取消请求操作
    //     });
    // }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response: any) => {
    console.log('reponse interceptor:');
    console.log(response);
    let { data, status, heders, config } = response;
    console.log(config);

    if (status) {
        console.log(status);
        // 服务器返回了结果
        switch (status) {
            case 401:   // 当前请求用户需要验证，未登录；
                // 跳转路由或弹出蒙层
                console.error('401');
                // return response;
                break;
            case 403:   // 服务器拒绝执行，通常是token过期；
                console.error('403');
                // return response;
                break;
            case 404:   // 资源找不到；
                // return response;
                console.error('404');
                break;
        }
    } else {
        if (!window.navigator.onLine) {
            // 断网处理：可以跳转到断网页面
            console.error('!window.navigator.onLine');
            return response;
        }
        // 服务器无响应又没断网，返回报错
        return Promise.reject(response);
    }
    return response;
}, (error: any) => {
    console.log(error);
    let { response } = error;
    if (response) {
        // 服务器返回了结果
        switch (response.status) {
            case 401:   // 当前请求用户需要验证，未登录；
                // 跳转路由或弹出蒙层
                break;
            case 403:   // 服务器拒绝执行，通常是token过期；
                break;
            case 404:   // 资源找不到；
                break;
        }
    } else {
        if (!window.navigator.onLine) {
            // 断网处理：可以跳转到断网页面
        }
        // 服务器无响应又没断网，返回报错
        return Promise.reject(error);
    }
});

export default axios;