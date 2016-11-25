import Vue from 'vue';
import 'normalize.css';
import router from './router';
import App from './App.vue';

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
