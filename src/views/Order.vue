<template>
  <div>
    <Navbar/>
    <div class="container">
      <h4>Comfirm</h4>
      <h5>Cart Info</h5>
      <table class="custom-table">
        <thead>
          <tr>
            <th width="30%">PRODUCT NAME</th>
            <th>Unit</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{item.product.title}}</td>
            <td>{{ item.qty }}</td>
            <td style>$ {{item.final_total}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="total_price">total</td>
            <td colspan="1" style class="total_price">$ {{order.total}}</td>
          </tr>
        </tfoot>
      </table>
      <h5>Order Info</h5>
      <table class="custom-table">
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
      orderId: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/order/${vm.orderId}`;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
      });
    }
  },
  computed: {},
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
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
  margin-bottom: 72px;
  position: relative;
}
h4::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 25%;
  border-bottom: 2px solid #d9b310;
  width: 50%;
}
h5 {
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
@media screen and (max-width: 768px) {
  .custom-table {
    td,
    th {
      font-size: 16px;
    }
  }
}
@media screen and (max-width: 568px) {
  .custom-table {
    td,
    th {
      padding: 10px;
      font-size: 12px;
      letter-spacing: 0.2em;
    }
    .total_price {
      font-size: 18px;
    }
  }
}
</style>