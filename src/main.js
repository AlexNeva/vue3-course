import { createApp } from 'vue';
import router from '@/router/router';
import components from '@/components/ui';
import App from './App.vue';
import store from './store';

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app
  .use(router)
  .use(store)
  .mount('#app');
