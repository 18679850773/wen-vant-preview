<template>
  <div class="hello">
    <h1>Welcome to  {{ msg }}</h1>    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg'],
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color: #42b983;
}
</style>
