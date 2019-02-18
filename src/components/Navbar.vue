<template>
    <nav :class="{'navscroll':scrolled}">
      <div class="logo">
        <router-link to="/"><h1>Old Cool</h1></router-link>
      </div>
      <div class="menu">
        <ul>
          <li><router-link to="/product?categories=Typewriter">Typewriter</router-link></li>
          <li><router-link to="/product?categories=Turntable">Turntable</router-link></li>
          <li><router-link to="/product?categories=Telephone">Telephone</router-link></li>
          <li><router-link to="/product?categories=Glasses">Glasses</router-link></li>
          <li><router-link to="/product?categories=Camera">Camera</router-link></li>
        </ul>
      </div>
      <div class="nav-right">
        <ul>
          <li><router-link to="/checkout">Cart ({{cart.carts.length}})</router-link></li>
          <li v-if="loginStatus"><router-link to="/admin/products">Manage</router-link></li>
          <li v-if="!loginStatus"><router-link to="/login">Login</router-link></li>
          <li class="logout" v-if="loginStatus" @click="logout()">Logout</li>
          <li></li>
        </ul>
      </div>
    </nav>
</template>
<script>
import { mapGetters , mapActions} from 'vuex'
export default {
  name: "Navbar",
  data() {
    return {
      scrolled:false
    };
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch('checkLogin')
        }
      });
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        type: 'success',
        text: '成功登出'
      });
    },
    handleScroll () {
      this.scrolled = window.scrollY > 0;
    },
    ...mapActions(['getCart'])
  },
  computed:{
    ...mapGetters(['cart','loginStatus'])
  },
  created(){
    window.addEventListener('scroll',this.handleScroll)
    this.$store.dispatch('checkLogin')
    this.getCart()
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Permanent+Marker");
h1,ul{
  margin-bottom:0;
}
li {
  list-style: none;
}
nav {
  display: flex;
  background:transparent;
  width: 100%;
  height: 80px;
  font-family: "Homemade Apple", cursive;
  position: fixed;
  top: 0;
  z-index: 1000;
  align-items: center;
  transition: all .5s;
}
.navscroll{
  background-color: #083C5D;
}
.logo {
  box-sizing: border-box;
  padding: 20px;
  a{
    text-decoration: none;
  }
  h1 {
    color: #D9B310;
    font-family: "Permanent Marker", cursive;
    font-size: 36px;
  }
}
.menu ,.nav-right{
  flex: 5;
  ul {
    display: flex;
    box-sizing: border-box;
    justify-content: center;
  }
  li {
    color: #fff;
    margin-right: 50px;
    position: relative;
    a{
      text-decoration: none;
      color: #D9B310;
      font-family: 'Homemade Apple', cursive;
      font-size: 20px;
      white-space:nowrap;
    }
    &:hover::after{
      content: '';
      box-sizing: border-box;
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      bottom: -8px;
      right: -15px;
      border-bottom: 2px solid #D9B310;
      animation: menu-hover 1s infinite ;
    }
  }
}
.logout{
  cursor: pointer;
  font-size: 20px;
  
}
.nav-right{
  flex: 1;
  ul{
    justify-content: flex-end;
  }
}
.my-notify{
  font-size: 30px;
}
@keyframes menu-hover {
  0% {opacity: 1;}
  100% {opacity: 0;}
}
</style>
