<template>
<div class="login-form">
  <form>
  <h2>
    Sign In
  </h2>
  <div class="input-box">
    <i class="fa fa-user"></i>
    <input type="text" name="" placeholder="Username" required>
  </div>
  <div class="input-box">
      <i class="fa fa-unlock-alt"></i>
      <input type="text" name="" placeholder="Password" required>
  </div>
  <div class="input-box">
      <input type="submit" name="" value="Login">
  </div>
</form>
</div>

</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  // mounted: function() {
  //   document.getElementsByTagName("body")[0].className = "login-bg";
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .login-bg{
//   background-color: pink;
//   &:before{
//     content: '';
//   position: absolute;
//   width: 50%;
//   height: 100%;
//   background-color: gray;
//   opacity: .2;
//   }
// }
body{
  background-color: pink;
}

</style>