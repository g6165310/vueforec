<template>
  <div>
    <Navbar/>
    <div class="contain">
      <div class="item-category">
        <span>{{product.category}}</span>
      </div>
      <div class="item-img">
        <img v-bind:src="product.imageUrl" alt="">
      </div>
      <div class="item-details">
        <div class="item-info">
          <h3>{{product.title}}</h3>
          <span class="origin-price" v-if="product.origin_price!=product.price">${{product.origin_price}}</span>
          <span class="sale-price">${{product.price}}</span>
          <select name="num" id="" class="item-select-num" v-model="count">
            <option value="0" selected disabled v-if="!product.is_enabled">Sold Out</option>
            <option value="0" selected disabled v-else>Chose Please</option>
            <option :value="i" v-for="i in 10" :key="i" v-if="product.is_enabled"> {{i}} Unit</option>
          </select>
          <a class="addCart-btn" @click="addToCart(product.id,count)">ADD TO CART</a>
        </div>
        <div class="item-desc">
          <div class="item-intro">
            <h3>Product Description</h3>
            <p>{{product.description}}</p>
          </div>
          <div class="item-content">
            <h3>Product Content</h3>
            <p>{{product.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "ProductInfo",
  components: {
    Navbar,
    Footer
  },
  data(){
    return {
      product:[],
      count:0,
    }
  },
  methods:{
    getProduct(){
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.$route.params.productId}`
      vm.$http.get(api).then((response)=>{
        if(response.data.success){
          vm.product = response.data.product
          console.log(vm.product)
        }
      })
    },
    getCart(){
      this.$store.dispatch('getCart')
    },
    addToCart(product_id,qty){
      if(qty<1){
        alert('請選擇數量')
        return
      }
      this.$store.dispatch('addToCart',{product_id,qty}).then(()=>{
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
  created(){
    this.getProduct()
  }
}
</script>
<style lang="scss" scoped>
.contain{
  margin-top: 200px;
  display: flex;
  flex-wrap: wrap;
  font-family: "Homemade Apple", cursive;
}
.item-category{
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    writing-mode: vertical-lr;
    color: #D9B310;
    font-size: 50px;
    position: relative;
    &:before{
      content: "";
      position: absolute;
      top: 100px;
      left: -20px;
      height: 90%;
      border-left: 2px solid #D9B310;
    }
     &:after{
      content: "";
      position: absolute;
      top: -100px;
      right: -20px;
      height: 90%;
      border-left: 2px solid #D9B310;
    }
  }
}
.item-img{
  flex:8;
  img{
    max-width: 800px;
    max-height: 600px;
  }
}
.item-details{
  width: 70%;
  margin: 30px auto;
  
  display: flex;
}
.item-info,.item-desc{
  height: 500px;
  box-sizing: border-box;
  background-color: transparent;
  flex:1;
  margin: 5px;
  padding: 50px;
  border-top: 1px solid #D9B310;
  border-bottom: 1px solid #D9B310;
}
.item-info{
  h3{
    color: #D9B310;
    font-size: 36px;
    letter-spacing: 3px;
    margin-bottom: 36px;
  }
  span{
    display: block;
  }
  .origin-price{
    display: inline-block;
    font-size: 18px;
    color: #fbb72c;
    text-decoration: line-through;
    margin-bottom: 16px;
  }
  .sale-price{
    display: inline-block;
    font-size: 36px;
    color: #fbb72c;
    font-weight: 900;
    margin-bottom: 16px;
  }
  a:not([href]){
    color: #D9B310;
    font-size: 24px;
    width: 80%;
    display: block;
    text-align: center;
    border: 1px solid #D9B310;
    padding: 16px;
    cursor: pointer;
    &:hover{
      background-color: #D9B310;
      color: #fff;
      transition: all .3s;
    }
  }
}
.item-select-num{
  display: block;
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
  font-size: 16px;
  letter-spacing: 5px;
  option:not(:checked) :hover{
    background-color:#eee
  }
}
.item-desc{
  h3{
    font-size: 24px;
    color: #D9B310;
    text-align: center;
    margin-bottom: 24px;
  }
  p{
    color: #D9B310;
    font-size: 18px;
    line-height: 24px;
  }
  .item-intro,.item-content{
    height: 50%;
  }
}
</style>
