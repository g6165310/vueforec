<template>
  <div class="ownContainer">
    <form class="form" @submit.prevent="signin">
      <h2>Login</h2>
      <div class="input-box">
        <i class="fa fa-user"></i>
        <input type="text" name placeholder="Username" required v-model="user.username">
      </div>
      <div class="input-box">
        <i class="fa fa-unlock-alt"></i>
        <input type="password" name placeholder="Password" required v-model="user.password">
      </div>
      <div class="input-box">
        <input type="submit" name value="Login">
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        if (response.data.success) {
          vm.$router.push("/");
        } else {
          vm.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "warning",
            text: "認證失敗，請重新輸入"
          });
        }
      });
    }
  }
  // mounted: function() {
  //   document.getElementsByTagName("body")[0].className = "login-bg";
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ownContainer {
  background-image: url(https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 100vh;
  font-family: "Homemade Apple", cursive;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: rgb(160, 130, 135);
    box-shadow: 0 0 15px 0 rgba(146, 85, 95, 0.5),
      inset 0 0 15px 0 rgba(146, 85, 95, 0.5);
    opacity: 0.2;
  }
}
.form {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  background: #0b3c5d;
  width: 350px;
  min-height: 400px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 1);
  box-sizing: border-box;
  padding: 50px;
  h2 {
    color: #d9b310;
    margin: 0 0 40px;
    padding: 0;
    font-size: 48px;
    text-align: center;
  }
  .input-box {
    position: relative;
    margin: 20px 0;
    input {
      width: 100%;
      font-size: 14px;
      border: 2px solid transparent;
      outline: none;
      padding: 10px;
      padding-left: 35px;
      box-sizing: border-box;
      font-weight: bold;
      color: #d9b310;
    }
    input[type="submit"] {
      border: none;
      cursor: pointer;
      background: #96c4da;
      color: #fff;
      font-weight: bold;
      transition: 0.5s;
      padding-left: 10px;
      border: none;
    }
    input[type="submit"]:hover {
      background: #184357;
      border: none;
      color: #d9b310;
    }
    input:focus,
    input:valid {
      border: 2px solid #d9b310;
    }
    input[type="submit"]:focus,
    input[type="submit"]:valid {
      border: none;
    }
    i {
      position: absolute;
      top: 15px;
      left: 10px;
      color: #d9b310;
      font-size: 18px;
    }
  }
}
@media screen and (max-width: 768px) {
  .form {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    padding: 40px;
    margin: 10px;
  }
}
</style>