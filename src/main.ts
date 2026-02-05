import './main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';

import router from './router';
import App from './App.vue';

const queryClient = new QueryClient();

const app = createApp(App);
app.use(VueQueryPlugin, { queryClient });
app.use(createPinia());
app.use(router);

app.mount('#app');
