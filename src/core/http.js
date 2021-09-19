import axios from 'axios';

let store;
export default (vuexStore) => {
  store = vuexStore;
};
const httpMethodsSwitch = async (method, props) => {
  let result;
  switch (method) {
    case 'get':
      result = await axios.get(props.url);
      return result;
    case 'post':
      result = await axios.post(props.url, props.body);
      return result;
    case 'patch':
      result = await axios.patch(props.url, props.body);
      return result;
    case 'put':
      result = await axios.put(props.url, props.body);
      return result;
    case 'delete':
      result = await axios.delete(props.url);
      return result;
    default:
      return result;
  }
};
export const http = async (method, props) => {
  let result;
  store.dispatch('setLoading', true);
  try {
    result = await httpMethodsSwitch(method, props);
  } catch (err) {
    store.dispatch('setError', err);
  }
  store.dispatch('setLoading', false);
  return result;
};
