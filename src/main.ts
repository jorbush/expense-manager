import { createApp } from 'vue';
import './assets/tailwind.css';
import './assets/fonts.css';
import App from './App.vue';
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);
app.use(Toast);
app.mount('#app');
