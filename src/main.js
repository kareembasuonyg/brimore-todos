import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import vuexStore from './store/index';
import httpConfig from './core/http';

// app
const app = createApp(App);
// use
app.use(vuexStore);
app.use(Antd);
// pass store to http module
httpConfig(vuexStore);
// mount the app
app.mount('#app');
