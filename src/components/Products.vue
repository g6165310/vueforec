<template>
  <div class="content">
    <loading :active.sync="isLoading"></loading>
    <div class="addProduct">
      <a @click.prevent="openModal(true)">建立新的產品</a>
    </div>
    <table class='product-table'>
      <thead>
        <tr>
          <th>分類</th>
          <th width='20%'>產品圖</th>
          <th width='30%'>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key='item.id'>
          <td>{{item.category}}</td>
          <td><img :src="item.imageUrl" alt="" class='product-thumb' v-if="item.imageUrl"></td>
          <td>{{item.title}}</td>
          <td style="text-align:right">{{item.origin_price |currency}}</td>
          <td >{{item.price | currency}}</td>
          <td>
            <span v-if='item.is_enabled' >啟用</span>
            <span v-else >未啟用</span>
          </td>
          <td>
            <a href="" class='btn edit-btn' @click.prevent='openModal(false,item)'>編輯</a>
            <a href="" class='btn del-btn'  @click.prevent='openDelModal(item)'>刪除</a>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @Updatepage="getProducts"></Pagination>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結"  v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if='status.fileUploading'></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                 <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit"
                      placeholder="請輸入單位">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-cancel" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-confirm" @click.prevent='updateProduct'>確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
      aria-labelledby="delModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-confirm" data-dismiss="modal">取消</button>
            <button type="button" class="btn del-btn"
              @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from './Pagination'
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }
    };
  },
  components:{
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    openDelModal(item) {
      const vm = this;
      $("#delModal").modal("show");
      vm.tempProduct = Object.assign({}, item);
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗");
        }
      });
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then(response => {
        $("#delModal").modal("hide");
        this.getProducts();
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      console.log(uploadedFile);
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/upload`;
      vm.status.fileUploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
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
.addProduct {
  margin-bottom: 24px;
  text-align: right;

  a {
    text-decoration: none;
    color: #dee2e6;
    letter-spacing: 2px;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    position: relative;
    transition: color 0.5s;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fbb72c;
      border-radius: 5px;
      z-index: -1;
      transform-origin: bottom right;
      transition: transform 0.5s;
      transform: scale(0);
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border: 2px solid #fbb72c;
      border-radius: 5px;
      box-sizing: border-box;
      z-index: 1;
      transform-origin: top left;
      transition: transform 0.5s;
      transform: scale(1);
    }
    &:hover {
      transition: color 0.5s;
      color: #0b3c5d;
    }
    &:hover:before {
      transform: scale(1);
      transform-origin: top left;
      transition: transform 0.5s;
    }
    &:hover::after {
      transform: scale(0);
      transform-origin: bottom right;
      transition: transform 0.5s;
    }
  }
}
.product-table {
  margin-bottom: 50px;
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: center;
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
    vertical-align: middle;
    color: #dee2e6;
  }
}
.btn {
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  padding: 8px 20px;
  position: relative;
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
  border: 2px solid #fbb72c;
  color:#fbb72c;
  margin-right: 5px;
  &:hover {
    color: #373737;
    background: #fbb72c;
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
.product-thumb {
  width: 100%;
}
input,textarea{
  margin-top: 10px;
}
.close{
  color: #fff;
  opacity: 1;
  text-shadow: 0 0 0 transparent;
  &:not(.disabled):hover{
    color: #fbb72c;
    opacity: 1;
  }
}
</style>
