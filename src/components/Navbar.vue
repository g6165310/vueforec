<template>
  <nav :class="{'navscroll':scrolled}">
    <div class="logo">
      <router-link to="/">
        <h1>Old Cool</h1>
      </router-link>
    </div>
    <div class="menu">
      <ul>
        <li>
          <router-link to="/product?categories=Typewriter">Typewriter</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Turntable">Turntable</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Telephone">Telephone</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Glasses">Glasses</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Camera">Camera</router-link>
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <ul>
        <li>
          <router-link to="/checkout">Cart ({{cart.carts.length}})</router-link>
        </li>
        <li v-if="loginStatus">
          <router-link to="/admin/products">Manage</router-link>
        </li>
        <li v-if="!loginStatus">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="logout" v-if="loginStatus" @click="logout()">Logout</li>
      </ul>
    </div>
    <div
      class="hamburger"
      @click.prevent="isActive=!isActive"
      :class="{'hamburgerActive':isActive}"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="moblie-menu" :class="{'active':isActive}">
      <ul>
        <li>
          <router-link to="/product?categories=Typewriter">Typewriter</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Turntable">Turntable</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Telephone">Telephone</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Glasses">Glasses</router-link>
        </li>
        <li>
          <router-link to="/product?categories=Camera">Camera</router-link>
        </li>
        <div class="line">
          <span></span>
        </div>
        <li>
          <router-link to="/checkout">Cart ({{cart.carts.length}})</router-link>
        </li>
        <li v-if="loginStatus">
          <router-link to="/admin/products">Manage</router-link>
        </li>
        <li v-if="!loginStatus">
          <router-link to="/login">Login</router-link>
        </li>
        <li class="logout" v-if="loginStatus" @click="logout()">Logout</li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      scrolled: false,
      isActive: false
    };
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch("checkLogin");
        }
      });
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        text: "成功登出"
      });
    },
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    ...mapActions(["getCart"])
  },
  computed: {
    ...mapGetters(["cart", "loginStatus"])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("checkLogin");
    this.getCart();
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Permanent+Marker");
h1,
ul {
  margin-bottom: 0;
}
li {
  list-style: none;
}
nav {
  display: flex;
  background: transparent;
  width: 100%;
  height: 60px;
  font-family: "Homemade Apple", cursive;
  position: fixed;
  top: 0;
  z-index: 1000;
  align-items: center;
  transition: all 0.5s;
  max-width: 1280px;
}
.navscroll {
  background-color: #083c5d;
}
.logo {
  box-sizing: border-box;
  padding: 20px;
  min-width: 150px;
  margin-right: 24px;
  a {
    text-decoration: none;
  }
  h1 {
    color: #d9b310;
    font-family: "Permanent Marker", cursive;
    font-size: 24px;
  }
}
.menu,
.nav-right {
  flex: 5;
  ul {
    display: flex;
    box-sizing: border-box;
    justify-content: center;
  }
  li {
    color: #fff;
    margin-right: 25px;
    
    flex: 1;
    a {
      text-decoration: none;
      color: #d9b310;
      font-size: 15px;
      white-space: nowrap;
      display: inline-block;
      position: relative;
      &:hover::after {
        content: "";
        box-sizing: border-box;
        position: absolute;
        display: block;
        width: 14px;
        height: 20px;
        bottom: -4px;
        right: -20px;
        border-bottom: 1px solid #d9b310;
        animation: menu-hover 1s infinite;
      }
    }
  }
}
.logout {
  cursor: pointer;
  color: #fff;
}
.nav-right {
  flex: 1;
  ul {
    justify-content: flex-end;
  }
}
.my-notify {
  font-size: 30px;
}
@keyframes menu-hover {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.hamburger {
  padding: 20px;
  span {
    width: 24px;
    height: 2px;
    background-color: #d9b310;
    display: none;
    margin: 6px auto;
    transition: all 0.3s ease-in-out;
  }
}
.hamburgerActive span:nth-child(2) {
  transform: translateX(-12px);
}
.moblie-menu {
  display: none;
  height: 100vh;
  width: 30%;
  position: absolute;
  top: 60px;
  right: 0;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.5s;
  ul {
    li {
      cursor: pointer;
      padding: 30px 30px;
      a {
        color: #d9b310;
        font-size: 18px;
        text-decoration: none;
      }
      &:hover {
        background-color: #d9b310;
        a {
          color: #083c5d;
        }
      }
    }
  }
  &:after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #083c5d;
    width: 100%;
    height: 100%;
    z-index: -10;
  }
}
.active {
  opacity: 1;
  transform: translateX(0%);
}
.line {
  padding: 0px 50px;
  span {
    display: block;
    width: 100%;
    color: #d9b310;
    border-bottom: 1px solid #d9b310;
  }
}

@media screen and (max-width: 960px) {
  .menu {
    display: none;
  }
  .nav-right {
    ul {
      display: none;
    }
  }
  .hamburger {
    span {
      display: block;
    }
  }
  .moblie-menu {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .moblie-menu {
    width: 100%;
  }
}
</style>
