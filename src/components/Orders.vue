<template>
  <div class="content">
    <loading :active.sync="isLoading"></loading>
    <table class="order-table">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key">
          <td>{{ item.create_at |date}}</td>
          <td>{{ item.user.email}}</td>
          <td>
            <ul>
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ item.total}}</td>
          <td><strong v-if="item.is_paid" class="text-success">已付款</strong><strong v-else class="text-danger">未付款</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Pagination from './Pagination'

export default {
  data(){
    return {
      isLoading: false,
      orders:{},
      pagination:{},
    }
  },
  components:{
    Pagination
  },
  methods:{
    getOrders(page = 1){
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/orders?page=${page}`;
      const vm  = this
      vm.isLoading = true
      this.$http.get(api).then((response)=>{
        console.log(response)
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    }
  },
  created() {
    this.getOrders();
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: absolute;
  top: 0;
  left: 20%;
  width: 80%;
  box-sizing: border-box;
  padding: 50px;
}
.order-table {
  margin-bottom: 50px;
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: center;
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    color: #dee2e6;
    vertical-align: middle;
  }
  a:hover {
    color: #fff;
  }
  li{
    list-style: none;
  }
}

.btn {
  text-decoration: none;
  color: #000;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 20px;
  position: relative;
  background: white;
  transition: color 0.3s, background 0.3s;
  border-radius: 5px;
  &:hover {
    transition: color 0.3s, background 0.3s;
  }
  &:focus {
    box-shadow: none;
  }
}
.edit-btn,
.btn-confirm {
  border: 2px solid #373737;
  margin-right: 5px;
  &:hover {
    color: #fff;
    background: #373737;
  }
}
.del-btn,
.btn-cancel {
  color: rgb(211, 32, 32);
  border: 2px solid rgb(211, 32, 32);
  &:hover {
    color: #fff;
    background: rgb(211, 32, 32);
  }
}

</style>