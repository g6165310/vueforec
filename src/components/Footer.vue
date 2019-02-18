<template>
  <footer>
    <div class="logo">
      <h3>Old Cool</h3>
    </div>
    <div class="copyright">
      <span>Copyright © g6165310@gmail.com All Rights Reserved.</span>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {

    };
  },
}
</script>
<style lang="scss" scoped>
footer{
  margin-top: 50px;
  background-color: #083C5D;
}
.logo {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    color: #fbb72c;
    font-family: "Permanent Marker", cursive;
    font-size: 2.5rem;
  }
}
.copyright{
  text-align: center;
  color: #fbb72c;
  padding-bottom: 10px;
}
</style>
