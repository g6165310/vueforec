<template>
  <div>
    <header>
      <Navbar/>
      <vue-typed-js :strings="['Welcome to Old Cool','The Old, The Cool',]"   :typeSpeed="100" :backSpeed="100" :showCursor="false" >
        <h1 class="typing"></h1>
      </vue-typed-js>
    </header>
    <section id="typewriter">
      <div class="section-img bg1">
      </div>
      <div class="section-desc">
        <h3>typewriter</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
    </section>
    <section id="telephone">
      <div class="section-desc">
        <h3>telephone</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit veritatis</p>
      </div>
      <div class="section-img bg2">
      </div>
    </section>
        <section id="camera">
      <div class="section-img bg3">
      </div>
      <div class="section-desc">
        <h3>camera</h3>
        <p>Lorem ipsum dolor sit amete velit laboriosam quod perspiciatis soluta ab! Beatae fugit officia similique quos sunt labore corporis quaerat, unde nulla facere, saepe maxime assumenda, officiis repellat est deserunt perspiciatis ab nesciunt esse a accusantium dolores?</p>
      </div>
    </section>
    <Footer/>
  </div>

</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "home",
  components: {
    Navbar,
    Footer
  },
  data(){
    return{
      isRwd:false
    }
  }
};
</script>
<style scoped lang="scss">
header {
  height: 100vh;
  background-image: url(https://images.pexels.com/photos/592675/pexels-photo-592675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  font-family: "Homemade Apple", cursive;
  position: relative;
  width: 100%;
}
.typed-element {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%,-25%);
  color: white;
  justify-content: center;
  align-content: center;
  min-width: 300px;
  h1 {
    font-family: "Homemade Apple", cursive;
    font-size: 2rem;
  }
  span .typed-cursor{
    font-size: 100px;
  }
}

section{
  display: flex;
  min-height: 350px;
  padding: 50px 60px 0px 60px;
  box-sizing: border-box;
  .section-img{
    flex: 4;
    padding: 30px;
    background-position: center;
    background-size: cover;
  }
  .bg1{
    background-image: url(https://images.pexels.com/photos/219570/pexels-photo-219570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  }
  .bg2{
    background-image: url(https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  }
  .bg3{
    background-image: url(https://images.pexels.com/photos/821653/pexels-photo-821653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  }
  .section-desc{
    flex:8;
    padding: 30px;
    position: relative;
    color: #D9B310;
    font-family: "Homemade Apple", cursive;
    h3{
      text-transform: uppercase;
      margin-bottom: 30px;
      font-size: 24px;
    }
    p{
      font-size: 20px;
    }
  }
}
#typewriter .section-desc:before,#camera .section-desc:before{
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 100%;
  border-bottom: 2px solid #D9B310;
  border-right: 2px solid #D9B310;
}
#telephone .section-desc:before{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60%;
  height: 100%;
  border-bottom: 2px solid #D9B310;
  border-left: 2px solid #D9B310;
}
@media screen and (max-width: 768px){
  header{
    height: 50vh;
  }
  section{
    display: block;
    padding: 20px 30px 0px 20px;
  }
  .section-img{
    height: 300px;
    max-width: 800px;
  }
  .section-desc{
    margin: 24px 0;
  }
  .typed-element{
    h1{
      font-size: 20px;
    }
  }
}
</style>