import Api from './Api';

const API_URL = process.env.REACT_APP_API_URL;

const OrderApi = {

  getOrders(query = null) {
    // const url = `/orders.json`;
    const url = Api.buildUrl(API_URL, 'orders', query);

    return new Promise((resolve) => {
      Api.get(url).then((res) => {
        if (res && res.status === 200) {
          resolve(res.data);
        } else {
          // redirect to error page and log error message
          console.log(res.statusText);
          resolve([]);
        }
      });
    });
  },

  createOrder(data) {
    // const url = `/orders.json`;
    const url = Api.buildUrl(API_URL, 'orders', query);

    return new Promise((resolve) => {
      Api.post(url, data).then((res) => {
        if (res && res.status === 200) {
          resolve(res.data);
        } else {
          // redirect to error page and log error message
          console.log(res.statusText);
          resolve();
        }
      });
    });
  },

  updateOrder(data) {
    // const url = `/orders.json`;
    const url = Api.buildUrl(API_URL, 'orders', query);

    return new Promise((resolve) => {
      Api.put(url, data).then((res) => {
        if (res && res.status === 200) {
          resolve(res.data);
        } else {
          // redirect to error page and log error message
          console.log(res.statusText);
          resolve();
        }
      });
    });
  },

};

export default OrderApi;
