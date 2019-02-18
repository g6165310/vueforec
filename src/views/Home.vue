<template>
  <div class="home">
    <header>
      <Navbar/>
      <vue-typed-js :strings="['Welcome to Old Cool','The Old, The Cool',]" :showCursor="true" :typeSpeed="100" :backSpeed="100" :cursorChar="'_'" >
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
        <p>Lorem ipsum dolor sit amete velit laboriosam quod perspiciatis soluta ab! Beatae fugit officia similique quos sunt labore corporis quaerat, unde nulla facere, saepe maxime assumenda, officiis repellat est deserunt perspiciatis ab nesciunt esse a accusantium dolores? Repudiandae sunt odit exercitationem obcaecati fuga dolorem neque architecto quis, assumenda cum, aliquam libero ratione, asperiores harum sequi quas maiores itaque quo nam nesciunt perferendis? Numquam perspiciatis magni fugiat! Mollitia labore voluptatem, corporis eum animi amet autem, qui repellat alias quo, atque sed explicabo dolores tempore soluta! Nulla necessitatibus dignissimos est mollitia iste deserunt minus incidunt doloremque rerum. Ullam, nesciunt ipsa! Aliquid quaerat placeat aliquam autem vitae molestiae sint eaque expedita? Sapiente eius aliquam quisquam ducimus facere nihil necessitatibus impedit dolores, sit officia distinctio placeat assumenda voluptate similique tempora deserunt a in libero harum cumque saepe qui. Harum assumenda repudiandae esse sapiente iste possimus maiores, quisquam perferendis provident? Nisi, quisquam sequi ducimus atque porro, totam accusantium illo voluptas consequuntur rerum eligendi necessitatibus pariatur obcaecati possimus magni, doloremque ratione! Quisquam est dicta laudantium itaque, aspernatur officia qui neque, magni, iure pariatur ipsa vero adipisci quis nulla. Velit aliquid cum ipsum vitae veritatis quasi.</p>
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
  
}
.typed-element {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%,-25%);
  color: white;
  justify-content: center;
  align-content: center;
  h1 {
    font-family: "Homemade Apple", cursive;
    font-size: 50px;
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
</style>