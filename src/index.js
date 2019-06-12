import HelloWorld from './helloWorld.vue';
import HelloWorld1 from './helloWorld.1.vue';

const seed = {
  install: function(Vue){
    Vue.component(HelloWorld.name, HelloWorld);
    Vue.component(HelloWorld1.name, HelloWorld1);
  } 
}
export default seed