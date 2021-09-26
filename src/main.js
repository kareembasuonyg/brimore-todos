import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import vuexStore from './store/index';
import httpConfig from './core/http';

// app
const app = createApp(App);
// use
app.use(vuexStore);

// pass store to http module
httpConfig(vuexStore);
// mount the app
app.mount('#app');
