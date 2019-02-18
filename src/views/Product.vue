<template>
  <div class="product-page">
    
    <Navbar/>
    <div class="banner">
      <div class="banner-msg">
        <h2>{{category}}</h2>
      </div>
    </div>
    <div class="content">
      <div class="side-nav"></div>
      <div class="product-list">
        <div class="product-card" v-for="product in products" :key='product.id' v-if="product.category==category">
          <router-link :to="`/product/${product.id}`">
            <div class="product-card-top">
              <div class="product-img" :style="{backgroundImage:`url(${product.imageUrl})`}"></div>
            </div>
            <div class="product-details">
              <span class="product-category">{{product.category}}</span>
              <h4>{{ product.title}}</h4>
              <p>{{ product.content}}</p>
              <div class="product-price">${{product.price}}</div>
              <div class="product-card-bottom">
                <a @click.prevent.self="addToCart(product.id)" class="add-to-cart" v-if="product.is_enabled">Add To Cart</a>
                <a class="add-to-cart disabled" v-else>Sold Out</a>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
      category:this.$route.query.categories,
    };
  },
  methods: {
    getAllProduct() {
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products/all`;
      this.$store.dispatch('getProducts',api)
    },
    addToCart(product_id){
      this.$store.dispatch('addToCart',{product_id,qty:1}).then(()=>{
        this.$swal({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          type: 'success',
          text: '成功加入購物車'
        });
      })
    }
  },
  computed:{
    ...mapGetters(['products']),
  },
  watch:{
    '$route.query': function(){
      this.category = this.$route.query.categories
    }
  },
  created() {
    this.getAllProduct();
    console.log(this.$route.query.categories)
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 100px;
  display: flex;
  margin: 100px 80px;
  font-family: "Homemade Apple", cursive;
}
.banner {
  background-image: url(https://images.pexels.com/photos/33085/knowledge-book-library-glasses.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-attachment: fixed;
  position: relative;
  .banner-msg {
    position: relative;
    max-width: 600px;
    height: 250px;
    display: flex;
    align-items: center;
    padding: 50px;
    overflow: hidden;
    &:before{
      content: "";
      position: absolute;
      background-color: rgba(11,60,93,0.7);
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
    h2 {
      position: relative;
      font-size: 50px;
      text-transform: uppercase;
      font-family: "Homemade Apple", cursive;
      color: #D9B310;
      line-height: 50px;
      margin-bottom: 0;
      z-index: 2;
    }
  }
}
.side-nav{
  flex: 2;
}
.product-list {
  display: flex;
  flex-wrap: wrap;
  flex: 6;
  justify-content: flex-start;
}
.product-card {
  width: 300px;
  box-sizing: border-box;
  box-shadow: 0 1px 2px #a7a3a3;
  margin-right: 15px;
  margin-bottom: 20px;
  background: #0B3C5D;
  overflow: hidden;
}
.product-card-top{
  overflow: hidden;
}
.product-img{
  transition: all .3s ease-in-out;
  background-position: center;
  background-size: cover;
}
.product-card:hover{
  cursor: pointer;
  .product-img{
    transform: scale(1.3);
  }
}
.product-img {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center center;
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
  p {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 18px;
    color: #999;
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
.product-card-bottom{
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
      color: #083C5D;
      background-color: rgb(245, 163, 11);
    }
    .disabled{
      pointer-events: none
    }
  }
}

section {
  flex: 1;
}
</style>
