import axios from 'axios';

/**
 * axiosRequest
 *
 * @param {Object} config about axios
 */
export function axiosRequest (config = {}) {
  var axiosIns = axios.create(config);
  var CancelToken = axios.CancelToken;
  axiosIns.interceptors.response.use((res) => {
    // need refer to the data provided by the server
    var data = res.data || res;
    // may handle some common error
    if (data.code === 0) {
      return data.data || data;
    }
    return Promise.reject(data);
  });
  let request = (url, options = {}) => {
    var cancel = null
    let promise = new Promise((resolve, reject) => {
      options.headers = options.headers || {};
      options.url = url;
      options.method = options.method || 'get';
      options.timeout = options.timeout || 20000;
      options.cancelToken = new CancelToken(function executor (c) {
        cancel = c;
        // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
      })
      let send = () => {
        axiosIns.request(options).then((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      };
      send();
    });
    promise.cancel = cancel;
    return promise;
  };
  request.interceptors = axiosIns.interceptors;
  return request;
}
