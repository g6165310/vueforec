<template>
  <div>
    <Navbar />
    <router-view></router-view>
    <Footer />
    <div class="moblie-cart" v-if="showFixedCart">
      <router-link to="/checkout">
        <i class="fas fa-shopping-cart"></i>
        <span>{{cart.carts.length}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";
export default {
  name: "layout",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      showFixedCart: false
    };
  },
  computed: {
    ...mapGetters(["cart"])
  },
  mounted() {
    let vm = this;
    window.addEventListener("resize", function(e) {
      if (document.body.clientWidth <= 952) {
        vm.showFixedCart = true;
      } else {
        vm.showFixedCart = false;
      }
    });
  },
  created() {
    let vm = this;
    if (document.body.clientWidth <= 952) {
      vm.showFixedCart = true;
    } else {
      vm.showFixedCart = false;
    }
  }
};
</script>
<style scoped lang="scss">
.moblie-cart {
  position: fixed;
  bottom: 50px;
  right: 50px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  background-color: #d9b310;
  overflow: hidden;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      text-decoration: none;
    }
  }
  i {
    font-size: 24px;
    color: #fff;
    &::before {
      color: #fff;
    }
  }
  span {
    position: absolute;
    color: #000;
    top: 24px;
    left: 24px;
    transform: translate(-50%, -50%);
  }
}
</style>