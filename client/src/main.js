import Vue from 'vue';
import App from './App.vue';
import router from './router';
import snakeToTitleCase from './filters/snakeToTitleCase';

Vue.config.productionTip = false;

Vue.filter('snakeToTitleCase', snakeToTitleCase);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
