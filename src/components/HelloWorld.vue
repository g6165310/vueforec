<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "TEST"
    };
  },
  methods: {

  },
  created(){
    console.log(this.$route.query)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #6642b9;
}
body {
  background-color: rgb(186, 202, 41);
}
</style>
