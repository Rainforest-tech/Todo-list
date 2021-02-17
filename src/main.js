import Vue from 'vue'
import App from './App.vue'
import "./styles/slyles.css";


Vue.config.productionTip = false

Vue.filter('all', (todos) => todos)
Vue.filter('active', (todos) => todos.filter(todo => !todo.completed))
Vue.filter('completed', (todos) => todos.filter(todo => todo.completed))

new Vue({
  render: h => h(App),
}).$mount('#app')
