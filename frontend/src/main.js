import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Login from './components/Login.vue';
import MapView from './components/MapView.vue';
import './style.css';

const routes = [
  { path: '/', component: Login },
  { path: '/mapa', component: MapView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
