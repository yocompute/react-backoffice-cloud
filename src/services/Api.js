import axios from 'axios';
import queryString from 'query-string';

const Api = {
  /**
   * @param {*} url
   */
  async get(url) {
    const { data, status, statusText } = await axios.get(url);

    if (status === 200) {
      return data.data;
    }

    // redirect to error page and log error message
    console.log(statusText);
    return null;
  },

  async post(url, entity) {
    const { data, status, statusText } = await axios.post(url, entity);

    if (status === 200) {
      return data.data;
    }

    // redirect to error page and log error message
    console.log(statusText);
    return null;
  },


  async put(url, entity) {
    const { data, status, statusText } = await axios.put(url, entity);

    if (status === 200) {
      return data.data;
    }

    // redirect to error page and log error message
    console.log(statusText);
    return null;
  },

  /**
   * @param {*} rootUrl
   * @param {*} path
   * @param {*} params string or js object, support path/:id and path?q=x&p=y
   */
  buildUrl(rootUrl, path, params = null) {
    const url = rootUrl + (path.startsWith('/') ? path : `/${path}`);
    if (!params) {
      return url;
    }
    if (typeof params === 'string') {
      return url + params;
    }
    if (typeof params === 'object') {
      const q = JSON.stringify(params);

      return `${url}?${queryString.stringify({ where: q })}`;
    }
    return url;
  },
};

export default Api;
