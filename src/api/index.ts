import axios from 'axios';

switch (process.env.NODE_ENV) {
    case 'development':
        axios.defaults.baseURL = '';
        break;
    case 'production':
        axios.defaults.baseURL = '';
        break;
    default:
        axios.defaults.baseURL = '';
        break;
}

// axios.defaults.validateStatus = (status): boolean => {
//     // 自定义响应成功的HTTP状态码
//     return /^('2'|'3')\d{2}$/.test(status);
// };
//
// axios.interceptors.response.use((error) => {
//     let { response } = error;

//     if (response) {
//         // 服务器返回了结果
//         switch (response.status) {
//             case 401:   // 当前请求用户需要验证，未登录；
//                 // 跳转路由或弹出蒙层
//                 break;
//             case 403:   // 服务器拒绝执行，通常是token过期；
//                 break;
//             case 404:   // 资源找不到；
//                 break;
//         }
//     } else {
//         if (!window.navigator.onLine) {
//             // 断网处理：可以跳转到断网页面
//         }
//         // 服务器无响应又没断网，返回报错
//         return Promise.reject(error);
//     }
// });
