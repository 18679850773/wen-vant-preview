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
<style scoped lang="scss">
$MiddleSize: 30px;

.hello {
  color: #42b983;
  font-size: $MiddleSize;
}
</style>
