import HelloWord from './helloWorld.vue';

/* istanbul ignore next */
HelloWord.install = function(Vue) {
  Vue.component(HelloWord.name, HelloWord);
};

export default HelloWord;