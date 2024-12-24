import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './index.css';
import router from './router/index.js';
import store from './vuexStore/store';

// Create and configure the app instance
const app = createApp(App);

// Use the router
app.use(router);
// vuex store
app.use(store)
// Mount the app to the DOM
app.mount('#app');
