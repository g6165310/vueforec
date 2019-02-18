<template>
    <div>
    <Navbar/>
    <div class="container">
      <h4>Order List</h4>
      <table class='cart-table' v-if="cart.carts.length!=0">
        <thead>
          <tr>
            <th width='30%'>PRODUCT NAME</th>
            <th>Unit</th>
            <th>price</th>
            <th width="10%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td>{{item.product.title}}</td>
            <td>{{ item.qty }}</td>
            <td style="">$ {{item.final_total}}</td>
            <td class="del-icon"><i  class="material-icons" @click="removeItem(item.id)">delete_outline</i></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="total_price">total</td>
            <td colspan="1" style="" class="total_price">$ {{cart.final_total}}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <vue-typed-js :strings="['To buy, or not to buy.That\'s a question']" :showCursor="true" :typeSpeed="100" :backSpeed="100" :cursorChar="'_'" v-else>
        <h1 class="typing"></h1>
      </vue-typed-js>
      <h4>Checkout</h4>
      <form class="checkout-form" @submit.prevent="createOrder">
        <div>
          <input type="text" name="name" id="username" required v-model="form.user.name">
          <label for="username">Name</label>
        </div>
        <div>
          <input type="email" name="email" id="useremail" required v-model="form.user.email">
          <label>Email</label>
        </div>
        <div>
          <input type="tel" pattern="[09]{2}[0-9]{8}" name="tel" id="usertel" required v-model="form.user.tel">
          <label for="usertel">phone</label>
          <small>(ex:09********)</small>
        </div>
        <div>
          <input type="text" name="address" id="useraddress" required v-model="form.user.address">
          <label for="useraddress">Address</label>
        </div>
        <div>
          <textarea name="" id="usermessage" cols="30" rows="10" v-model="form.message">
          </textarea>
          <label for="usermessage">Message</label>
        </div>
        <div class="comfirm-btn">
          <button >Comfirm</button>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
      products: [],
      form: {
        user: {
          name: null,
          email: null,
          tel: null,
          address: null
        },
        message: null
      }
    };
  },
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/order`;
      const order = vm.form;
      vm.$http.post(api, { data: order }).then(response => {
        if (response.data.success) {
          setTimeout(() => {
            vm.$router.push(`/order/${response.data.orderId}`);
          }, 2000);
        }else{
          this.$swal({
          type: 'error',
          text: response.data.message
        });
        }
      });
    },
    ...mapActions(["getCart", "removeItem"])
  },
  computed: {
    ...mapGetters(["cart"])
  },
  created() {
    this.getCart();
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 200px;
  font-family: "Homemade Apple", cursive;
  letter-spacing: 0.5em;
  color: #d9b310;
}
h4 {
  font-size: 50px;
  text-align: center;
  margin: 24px;
}
small{
  display: inline-block;
  margin-top: 8px;
}
.cart-table {
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
    i {
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
    position: relative;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: none;
    border-bottom: 2px solid #328cc1;
    background-color: #1d2731;
    color: #d9b310;
  }
  input {
    padding: 10px 15%;
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
    span {
      display: inline-block;
      font-size: 12px;
      margin-top: 8px;
    }
  }
  input:focus ~ label,
  textarea:focus ~ label,
  input:valid ~ label,
  textarea:valid ~ label,
  {
    top: -20px;
    font-weight: bold;
    font-size: 12px;
  }
  input:focus,
  textarea:focus {
    border-bottom: 2px solid #d9b310;
  }
  .comfirm-btn {
    text-align: center;
    margin: 12px;
    button {
      background-color: #1d2731;
      outline: none;
      border: none;
      color: #d9b310;
      cursor: pointer;
      transition: 0.5s;
      padding: 10px;
      box-sizing: border-box;
      border: 2px solid transparent;
      position: relative;
      &:before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        border-top: 2px solid #d9b310;
        transform-origin: left;
        transform: scale(0);
        transition: 0.5s;
      }
      &::after {
        position: absolute;
        content: "";
        bottom: 0;
        right: 0;
        width: 100%;
        border-top: 2px solid #d9b310;
        transform-origin: right;
        transform: scale(0);
        transition: 0.5s;
      }
      &:hover::after,
      &:hover::before {
        transform: scale(1);
      }
    }
  }
}
.typing{
  display: inline-block;
  position: relative;
  padding: 50px 0;
  font-size: 36px;
  // &::before{
  //   content: '“ ';
  //   position: absolute;
  //   top: 30px;
  //   left: 0;
  // }
  // &::after{
  //   content: ' ”';
  //   position: absolute;
  //   top: 30px;
  //   right:0;
  // }
}
</style>
