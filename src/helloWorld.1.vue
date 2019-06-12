<template>
  <div class="hello">
    <h1>Welcome to hello 1 {{ msg }}</h1>    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld1',
  props: ['msg'],
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color: #42b983;
}
</style>
