<template>
  <div>
    <div class="container">
      <div class="cart-info">
        <h4>購買清單</h4>
        <p v-if="cart.carts.length==0">尚未購買任何商品</p>
        <div class="tableContainer" v-else>
          <table class="cart-table">
            <thead>
              <tr>
                <th width="50%">商品名稱</th>
                <th>個數</th>
                <th>價格</th>
                <th width="10%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td>{{item.product.title}}</td>
                <td>{{ item.qty }}</td>
                <td style>$ {{item.final_total}}</td>
                <td class="del-icon">
                  <i class="material-icons" @click="removeItem(item.id)">delete_outline</i>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="total_price">總計</td>
                <td colspan="1" style class="total_price">$ {{cart.final_total}}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="check-info" v-if="cart.carts.length!=0">
        <h4>訂購資訊</h4>
        <form class="checkout-form" @submit.prevent="createOrder">
          <div>
            <input type="text" name="name" id="username" required v-model="form.user.name" />
            <label for="username">姓名</label>
          </div>
          <div>
            <input type="email" name="email" id="useremail" required v-model="form.user.email" />
            <label>信箱</label>
          </div>
          <div>
            <input
              type="tel"
              pattern="[09]{2}[0-9]{8}"
              name="tel"
              id="usertel"
              required
              v-model="form.user.tel"
            />
            <label for="usertel">電話</label>
            <small>(ex:09********)</small>
          </div>
          <div>
            <input type="text" name="address" id="useraddress" required v-model="form.user.address" />
            <label for="useraddress">地址</label>
          </div>
          <div>
            <textarea name id="usermessage" cols="30" rows="10" v-model="form.message"></textarea>
            <label for="usermessage">備註</label>
          </div>
          <div class="comfirm-btn">
            <button>確認訂購</button>
          </div>
        </form>
      </div>
      <div class="recommend" v-if="recommend.length!=0&&cart.carts.length==0">
        <h5>推薦商品</h5>
        <div class="recommend-list">
          <div class="recommend-card" v-for="index in recommend" :key="products[index].id">
            <router-link :to="`/product/${products[index].id}`">
              <div class="card-top">
                <div
                  class="product-img"
                  :style="{backgroundImage:`url(${products[index].imageUrl})`}"
                ></div>
              </div>
              <div class="card-bottom">
                <span class="product-category">{{products[index].category}}</span>
                <h4>{{ products[index].title}}</h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import store from "@/store";
export default {
  name: "Checkout",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
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
      vm.$store.dispatch("updateLoading", true);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      vm.$http.post(api, { data: order }).then(response => {
        if (response.data.success) {
          vm.$store.dispatch("updateLoading", false);
          setTimeout(() => {
            vm.$router.push(`/order/${response.data.orderId}`);
          }, 2000);
        } else {
          this.$swal({
            type: "error",
            text: response.data.message
          });
        }
      });
    },
    ...mapActions(["getCart", "removeItem"])
  },
  computed: {
    ...mapGetters(["cart", "products", "recommend"])
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 200px;
  letter-spacing: 0.5em;
  color: #d9b310;
}
h4 {
  font-size: 50px;
  text-align: center;
  margin: 24px;
}
small {
  display: inline-block;
  margin-top: 8px;
}
.cart-info {
  p {
    text-align: center;
    font-size: 24px;
    margin-top: 48px;
  }
}
.tableContainer {
  overflow-x: auto;
  margin-bottom: 72px;
}
.cart-table {
  width: 100%;
  min-width: 800px;
  background-color: #0b3c5d;
  border: 2px solid #d9b310;
  td,
  th {
    padding: 15px;
    border-top: 1px solid #d9b310;
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
  border: 2px solid #d9b310;
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
    margin: 10px 0;
  }
  div {
    position: relative;
    margin-bottom: 48px;
    label {
      font-size: 18px;
      position: absolute;
      content: "";
      top: 10px;
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
  textarea:valid ~ label {
    top: -20px;
    font-weight: bold;
    font-size: 14px;
  }
  input:valid,
  textarea:valid {
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
.recommend {
  margin-top: 100px;
  h5 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 36px;
  }
}
.recommend-list {
  display: flex;
  max-width: 1024px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  flex: 1;
}
.recommend-card {
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
  &:hover {
    cursor: pointer;
  }
  .disable {
    pointer-events: none;
  }
  &.disable:hover {
    cursor: default;
  }
  &:hover {
    .product-img {
      transform: scale(1.3);
    }
  }
}
.card-top {
  overflow: hidden;
}
.product-img {
  transition: all 0.3s ease-in-out;
  background-position: center;
  background-size: cover;
  width: auto;
  height: 200px;
}
.card-bottom {
  padding: 36px;
  h4 {
    font-weight: 500;
    display: block;
    margin: 0;
    text-transform: uppercase;
    color: #fff;
    transition: 0.3s;
    font-size: 16px;
    letter-spacing: 0;
    text-align: left;
  }
  .product-category {
    display: block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: #ccc;
    margin-bottom: 36px;
  }
}
@media screen and (max-width: 996px) {
  .recommend-card {
    flex: 1;
  }
}
@media screen and (max-width: 768px) {
  .recommend-list {
    display: block;
  }
  .recommend-card {
    width: 100%;
    a {
      width: 100%;
      display: flex;
    }
    .card-top {
      flex: 2;
    }
    .card-bottom {
      flex: 1;
    }
  }
}

@media screen and (max-width: 568px) {
  h4 {
    font-size: 36px;
  }
}
</style>
