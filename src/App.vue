<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default{
    name:'App',
    created(){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      console.log(api)
      this.$http.get(api).then((response)=>{
        console.log(response.data)
      })
    }
  }
</script>
<style lang="scss">
*{
   margin: 0;
  padding: 0;
  font-family: sans-serif;
 
}
</style>
<style lang="scss" scoped>

</style>

