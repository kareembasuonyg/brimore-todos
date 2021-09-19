import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

import store from './store/index';

// creating store
const vuexStore = createStore(store);
const app = createApp(App);
app.use(vuexStore);
// mount the app
app.mount('#app');
