import { createApp } from 'vue';
import { createStore } from 'vuex';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import store from './store/index';

// creating store
const vuexStore = createStore(store);
// app
const app = createApp(App);
// use
app.use(vuexStore);
app.use(Antd);
// mount the app
app.mount('#app');
