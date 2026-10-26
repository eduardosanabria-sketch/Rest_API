import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/Login.vue';
import AdminLayout from '../components/AdminLayout.vue';
import AdminDashboard from '../views/adminDashboard.vue'; 
import JugadoresView from '../views/JugadoresView.vue';
import RostersView from '../views/RostersView.vue'; 

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'jugadores', name: 'Jugadores', component: JugadoresView },
      { path: 'rosters', name: 'Rosters', component: RostersView } 
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;