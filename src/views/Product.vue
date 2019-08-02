<template>
  <div class="product-page">
    <div class="banner">
      <div class="banner-msg">
        <h2>{{category}}</h2>
      </div>
    </div>
    <div class="content">
      <div class="product-list" v-if="filteredProducts.length!=0">
        <div
          class="product-card"
          v-for="product in filteredProducts"
          :key="product.id"
          :class="{disable:!product.is_enabled}"
        >
          <div class="mask" v-if="!product.is_enabled"></div>
          <router-link :to="`/product/${product.id}`">
            <div class="product-card-top">
              <div class="product-img" :style="{backgroundImage:`url(${product.imageUrl})`}"></div>
            </div>
            <div class="product-details">
              <span class="product-category">{{product.category}}</span>
              <h4>{{ product.title}}</h4>
              <div class="product-price">${{product.price}}</div>
              <div class="product-card-bottom">
                <a
                  @click.prevent.self="addToCart(product.id)"
                  class="add-to-cart"
                  v-if="product.is_enabled"
                >加入購物車</a>
                <a class="add-to-cart disabled" v-else>Sold Out</a>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="no-product" v-else>
        <i class="fas fa-pray"></i>
        <p>海外尋覓中 敬請等待</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Product",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isLoading: false,
      category: this.$route.query.categories
    };
  },
  methods: {
    addToCart(product_id) {
      this.$store.dispatch("addToCart", { product_id, qty: 1 }).then(() => {
        this.$swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          type: "success",
          text: "成功加入購物車"
        });
      });
    }
  },
  computed: {
    ...mapGetters(["products"]),
    filteredProducts() {
      let vm = this;
      return this.products.filter(item => {
        if (item.category == vm.category) {
          return item;
        }
      });
    }
  },
  watch: {
    "$route.query": function() {
      this.category = this.$route.query.categories;
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  margin: 100px 20px;
}
.banner {
  background-image: url(https://images.pexels.com/photos/33085/knowledge-book-library-glasses.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-attachment: fixed;
  position: relative;
  .banner-msg {
    position: relative;
    width: 50%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    h2 {
      position: relative;
      font-size: 50px;
      text-transform: uppercase;
      color: #d9b310;
      line-height: 50px;
      margin-bottom: 0;
      background-color: rgba(11, 60, 93, 1);
      z-index: 2;
      width: 100%;
      text-align: center;
      padding: 50px 100px;
      &::before,
      &::after {
        position: absolute;
        content: "";
        border-top: 4px solid #d9b310;
        width: 80%;
      }
      &::before {
        top: 10px;
        left: 10%;
      }
      &::after {
        bottom: 10px;
        right: 10%;
      }
    }
  }
}
.product-list {
  display: flex;
  max-width: 1024px;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  margin: 0 auto;
  flex: 1;
}
.product-card {
  position: relative;
  width: 250px;
  box-shadow: 0 1px 2px #a7a3a3;
  margin-right: 15px;
  margin-bottom: 20px;
  background: #0b3c5d;
  overflow: hidden;
  a {
    text-decoration: none;
  }
  .disable {
    pointer-events: none;
  }
  &.disable:hover {
    cursor: default;
  }
  &:hover {
    cursor: pointer;
    .product-img {
      transform: scale(1.3);
    }
  }
}
.product-card-top {
  overflow: hidden;
}
.product-img {
  transition: all 0.3s ease-in-out;
  background-position: center;
  background-size: cover;
  width: auto;
  height: 200px;
}
.product-details {
  padding: 30px;
  h4 {
    font-weight: 500;
    display: block;
    margin-bottom: 18px;
    text-transform: uppercase;
    color: #fff;
    transition: 0.3s;
  }
}
.product-category {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ccc;
  margin-bottom: 18px;
}
.product-price {
  font-size: 24px;
  color: #fbb72c;
  font-weight: 600;
  text-align: right;
}
.product-card-bottom {
  overflow: hidden;
  border-top: 1px solid #eee;
  padding-top: 20px;
  .add-to-cart {
    display: block;
    text-align: center;
    border: 2px solid gray;
    text-decoration: none;
    color: white;
    background-color: rgb(102, 98, 98);
    line-height: 30px;
    height: 30px;
    transition: 0.5s;
    text-decoration: none;
    &:hover {
      color: #083c5d;
      background-color: rgb(245, 163, 11);
    }
    .disabled {
      pointer-events: none;
    }
  }
}

section {
  flex: 1;
}

.no-product {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 48px;
    margin-right: 24px;
  }
  p {
    font-size: 48px;
    line-height: 50px;
  }
}
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(8, 60, 93, 0.6);
  position: absolute;
  z-index: 100;
  &:before {
    position: absolute;
    content: "SOLD OUT";
    font-size: 24px;
    font-weight: 900;
    width: 80%;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%) rotate(-45deg);
    padding: 24px 0px;
    border-top: 2px solid #fbb72c;
    border-bottom: 2px solid #fbb72c;
  }
}
@media screen and (max-width: 768px) {
  .product-list {
    display: block;
  }
  .product-card {
    width: 100%;
    max-width: 500px;
    margin: 12px auto;
    a {
    }
  }
  .product-card-top {
    flex: 1;
    padding: 10px;
    .product-img {
      max-width: 400px;
      margin: 0 auto;
    }
  }
  .product-details {
    flex: 1;
  }
  .banner {
    .banner-msg {
      padding: 30px;
      width: 80%;
      h2 {
        font-size: 40px;
        line-height: 40px;
        padding: 50px 50px;
      }
    }
  }
}
@media screen and (max-width: 568px) {
  .banner {
    .banner-msg {
      width: 80%;
      h2 {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>
