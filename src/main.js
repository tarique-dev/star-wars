import Vue from 'vue';
import './plugins/vuetify';
import Vuetify from 'vuetify';
import VueGoodTablePlugin from 'vue-good-table';
import App from './App.vue';
import 'vue-good-table/dist/vue-good-table.css';

import 'vuetify/dist/vuetify.min.css';

Vue.use(VueGoodTablePlugin);

Vue.use(Vuetify);

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
}).$mount('#app');
