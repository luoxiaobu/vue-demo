import axios from 'axios';

/**
 * axiosRequest
 *
 * @param {Object} config about axios
 */
export function axiosRequest (config = {}) {
  var axiosIns = axios.create(config);
  axiosIns.interceptors.response.use((res) => {
    // need refer to the data provided by the server
    var data = res.data || res;
    // may handle some common error
    if (data.code === 0) {
      return data;
    }
    return Promise.reject(data);
  });
  let request = (url, options = {}) => {
    let promise = new Promise((resolve, reject) => {
      options.headers = options.headers || {};
      options.url = url;
      options.method = options.method || 'get';
      options.timeout = options.timeout || 20000;
      let send = () => {
        axiosIns.request(options).then((data) => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
      };
      send();
    });
    return promise;
  };
  return request;
}
