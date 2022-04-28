import MainPage from '@/pages/MainPage.vue';
import PostsPage from '@/pages/PostsPage.vue';
import PostsPageVuex from '@/pages/PostsPageVuex.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/postsvuex',
    component: PostsPageVuex,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
