import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex)

export default new vuex.Store({
  strict:true,
  state:{
    loginStatus:false,
    isLoading: false,
    products:[],
    cart:{
      carts:[]
    },
    pagination:{}
  },
  actions:{
    checkLogin (context){
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      axios.post(api).then(response =>{
        if (response.data.success) {
          context.commit('LOGINSTATUS', true)
        }else{
          context.commit('LOGINSTATUS', false)
        }
      })
    },
    updateLoading (context, payload){
      context.commit('LOADING',payload)
    },
    getProducts (context, payload){
      const api = payload
      context.commit('LOADING', true)
      axios.get(api).then((response)=>{
        context.commit('PRODUCTS',response.data.products)
        context.commit('LOADING', false)
      })
    },
    getCart(context){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING',true)
      axios.get(api).then((response)=>{
        console.log(response)
        context.commit('CARTS',response.data.data)
        context.commit('LOADING',false)
      })
    },
    addToCart(context,{ product_id, qty}){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart={
        product_id,
        qty
      }
      console.log(cart)
      context.commit('LOADING', true)
      return axios.post(api,{data:cart}).then((response)=>{
        console.log(response)
        context.dispatch('getCart')
        context.commit('LOADING', false)
      })
    },
    removeItem(context, id){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      axios.delete(api).then(response =>{
        context.dispatch('getCart')
      })
    }
  },
  mutations:{
    LOGINSTATUS (state, payload){
      state.loginStatus = payload
    },
    LOADING (state, payload){
      state.isLoading = payload
    },
    PRODUCTS (state, payload){
      state.products = payload
    },
    CARTS (state, payload){
      state.cart = payload
    },
  },
  getters:{
    loginStatus: (state) =>{ return state.loginStatus},
    isLoading: (state) =>{ return state.isLoading},
    products: (state) => { return state.products},
    cart: (state) => { return state.cart},
  }
})
