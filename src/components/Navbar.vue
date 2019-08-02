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
          <router-link to="/product?categories=打字機" title="打字機">打字機</router-link>
        </li>
        <li>
          <router-link to="/product?categories=唱盤" title="唱盤">唱盤</router-link>
        </li>
        <li>
          <router-link to="/product?categories=電話" title="電話">電話</router-link>
        </li>
        <li>
          <router-link to="/product?categories=眼鏡" title="眼鏡">眼鏡</router-link>
        </li>
        <li>
          <router-link to="/product?categories=相機" title="相機">相機</router-link>
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <ul>
        <li>
          <router-link to="/checkout" title="購物車">
            <i class="fas fa-shopping-cart"></i>
            <span>{{cart.carts.length}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin" title="後台管理">
            <i class="fas fa-server"></i>
          </router-link>
        </li>
        <li class="logout" v-if="loginStatus" @click="logout()" title="登出">
          <i class="fas fa-sign-out-alt"></i>
        </li>
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
      <ul @click.prevent="isActive=!isActive">
        <li>
          <router-link to="/product?categories=打字機">打字機</router-link>
        </li>
        <li>
          <router-link to="/product?categories=唱盤">唱盤</router-link>
        </li>
        <li>
          <router-link to="/product?categories=電話">電話</router-link>
        </li>
        <li>
          <router-link to="/product?categories=眼鏡">眼鏡</router-link>
        </li>
        <li>
          <router-link to="/product?categories=相機">相機</router-link>
        </li>
        <div class="line">
          <span></span>
        </div>
        <li>
          <router-link to="/checkout">
            <i class="fas fa-shopping-cart"></i>
            購物車 ({{cart.carts.length}})
          </router-link>
        </li>
        <li>
          <router-link to="/admin" title="後台管理">
            <i class="fas fa-server"></i>後台管理
          </router-link>
        </li>
        <li class="logout" v-if="loginStatus" @click="logout()" title="登出">
          <i class="fas fa-sign-out-alt"></i>登出
        </li>
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
      isActive: false,
      selected: ""
    };
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      const vm = this;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.$store.dispatch("checkLogin");
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            text: "成功登出"
          });
        }
      });
    },
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    }
  },
  watch: {
    isActive: function(val) {
      if (val) {
        document.querySelector("body").style.overflow = "hidden";
      } else {
        document.querySelector("body").style.overflow = "auto";
      }
    }
  },
  computed: {
    ...mapGetters(["cart", "loginStatus"])
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    console.log("Navbar created");
    this.$store.dispatch("checkLogin");
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
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
      text-align: center;
      color: #d9b310;
      font-size: 18px;
      font-weight: 900;
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
  display: none;
  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: #d9b310;
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
  overflow-y: scroll;
  width: 30%;
  position: absolute;
  top: 60px;
  right: 0;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.5s;
  ul {
    li {
      a {
        padding: 30px 30px;
        display: block;
        width: 100%;
        height: 100%;
        color: #d9b310;
        font-size: 18px;
        text-decoration: none;
      }
      &:hover {
        background-color: #d9b310;
        a,
        i::before,
        .logout {
          color: #083c5d;
        }
      }
      i {
        margin-right: 24px;
      }
    }
    .logout {
      padding: 30px 30px;
      display: block;
      width: 100%;
      height: 100%;
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
i {
  font-size: 20px;
}
.fa-shopping-cart {
  & + span {
    position: absolute;
    top: -15px;
    right: -15px;
    color: #083c5d;
    background-color: #d9b310;
    display: flex;
    width: 16px;
    height: 16px;
    font-size: 14px;
    border-radius: 50%;
    justify-content: center;
    line-height: 16px;
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
    display: block;
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
