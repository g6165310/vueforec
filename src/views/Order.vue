<template>
    <div>
    <Navbar/>
    <div class="container">
      <h4>Comfirm</h4>
      <h5>Cart Info</h5>
      <table class='custom-table'>
        <thead>
          <tr>
            <th width='30%'>PRODUCT NAME</th>
            <th>Unit</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{item.product.title}}</td>
            <td>{{ item.qty }}</td>
            <td style="">$ {{item.final_total}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="total_price">total</td>
            <td colspan="1" style="" class="total_price">$ {{order.total}}</td>
          </tr>
        </tfoot>
      </table>
      <h5>Order Info</h5>
      <table class='custom-table'>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{{order.user.email}}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{{order.user.name}}</td>
          </tr>
          <tr>
            <td>phone</td>
            <td>{{order.user.tel}}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{{order.user.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from  'vuex';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Checkout",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      orderId:'',
      order:{
        user:{},
      }
    };
  },
  methods:{
    getOrder(){
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      this.$http.get(api).then(response =>{
        vm.order = response.data.order
      })
    },
  },
  computed:{
  },
  created(){
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
};
</script>
<style lang="scss" scoped>

.container {
  margin-top: 200px;
  font-family: "Homemade Apple", cursive;
  letter-spacing: .5em;
  color: #d9b310;
}
h4 {
  font-size: 50px;
  text-align: center;
  margin-bottom: 72px;
  position: relative;
}
h4::after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  border-bottom: 2px solid #D9B310;
  width: 50%;
}
h5{
  font-size: 24px;
  text-align: center;
  margin: 20px 0;
}
.custom-table {
  width: 100%;
  background-color: #0b3c5d;
  margin-bottom: 72px;
  border: 2px solid #328cc1;
  td,
  th {
    padding: 15px;
    border-top: 1px solid #328cc1;
    font-size: 20px;
  }
  th {
    font-size: 16px;
  }
  .del-icon {
    text-align: center;
    i{
      cursor: pointer;
      font-size: 24px;
    }
    
  }
  .item_delete {
    text-align: center;
  }
  .total_price {
    font-size: 24px;
    font-weight: 700;
  }
}
.checkout-form {
  margin: 0 auto;
  border: 2px solid #328cc1;
  padding: 3em;
  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 2px solid #328cc1;
    background-color: #1d2731;
    color: #d9b310;
  }
  input {
    padding: 10px 10px;
    
  }
  textarea {
    height: 160px;
    padding: 10px 0;
  }
  div {
    position: relative;
    margin-bottom: 48px;
    label {
      position: absolute;
      content: "";
      top: 25px;
      left: 10px;
      pointer-events: none;
      transition: 0.3s;
    }
    span{
      display: inline-block;
      font-size: 12px;
      margin-top: 8px;
    }
  }
  input:focus ~ label,
  textarea:focus ~ label,
  input:valid ~ label,
  textarea:valid ~ label {
    top: -20px;
    font-weight: bold;
    font-size: 12px;
  }
  input:focus,
  textarea:focus{
    border-bottom: 2px solid #d9b310;
  }
  .comfirm-btn{
    text-align: center;
    margin: 12px;
    button{
      background-color: #1d2731;
      outline: none;
      border: none;
      color: #d9b310;
      cursor: pointer;
      transition: .5s;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid transparent;
      position: relative;
      &:before{
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        border-top: 2px solid #d9b310;
        transform-origin:left;
        transform: scale(0);
        transition: .5s;
      }
       &::after{
        position: absolute;
        content: "";
        bottom:0;
        right: 0;
        width: 100%;
        border-top: 2px solid #d9b310;
        transform-origin:right;
        transform: scale(0);
        transition: .5s;
      }
      &:hover::after,&:hover::before{
        transform: scale(1)
      }
    }
  }
}
</style>