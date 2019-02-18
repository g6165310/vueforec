<template>
  <div class='sidebar'>
    <ul>
      <li><router-link to = '/admin/products' :class="{'active':this.$route.name==='Products'}">Products</router-link></li>
      <li><router-link to = '/admin/orders' :class="{'active':this.$route.name==='Orders'}">Orders</router-link></li>
      <li class="home-link"><router-link to = '/'>Home</router-link></li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
    };
  },
  created() {
  }
};
</script>
<style scoped lang="scss">
.sidebar {
  position: fixed;
  box-sizing: border-box;
  height: 100%;
  width: 20%;
  background-color: #373737;
  padding: 50px;
  li {
    margin-bottom: 50px;
    list-style: none;
  }
  li a {
    position: relative;
    z-index: 10;
    text-align: center;
    display: block;
    text-decoration: none;
    color: white;
    font-size: 30px;
    font-weight: bold;
    width: 100%;
    height: 100%;
    &:before{
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50%;
      z-index: -1;
      background: #D9B310;
      transform: scaleX(0) ;
      transform-origin: right;
      transition: transform .5s;
    
    }
    &:hover:before{
      transform: scaleX(1);
      transform-origin: left;
      transition: transform .5s;
    }
  }
  .active{
    position: relative;
    &:before{
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50%;
      z-index: -1;
      background: #D9B310;
      transform: scaleX(1) ;
    }
  }
}
</style>
