<template>
  <div>
    <header>
      <vue-typed-js
        :strings="['舊式，酷','各式懷舊古物帶你穿越時光',]"
        :typeSpeed="200"
        :backSpeed="100"
        :showCursor="true"
        :cursorChar="'_'"
      >
        <p class="typing"></p>
      </vue-typed-js>
    </header>
    <section id="typewriter">
      <router-link to="/product?categories=Typewriter">
        <div class="section-img bg1"></div>
        <div class="section-desc">
          <h3>復古打字機</h3>
          <p>輕敲於鍵帽、遊走於文字，找回打字的樂趣和快感，找一台契合靈魂的打字機吧!</p>
        </div>
      </router-link>
    </section>
    <section id="telephone">
      <router-link to="/product?categories=Telephone">
        <div class="section-desc">
          <h3>復古電話</h3>
          <p>各式老式/仿古轉盤電話，帶你轉入50 、60 年代的情懷，祖孫情感交流的不二人選。</p>
        </div>
        <div class="section-img bg2"></div>
      </router-link>
    </section>
    <section id="camera">
      <router-link to="/product?categories=相機">
        <div class="section-img bg3"></div>
        <div class="section-desc">
          <h3>復古相機</h3>
          <p>越老越好看的復古相機，造型多樣、名家出品，攝影、相機愛好者絕對不容錯過的經典復古相機。</p>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      isRwd: false
    };
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
  position: relative;
  width: 100%;
}
.typed-element {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  justify-content: center;
  align-content: center;
  min-width: 300px;
  p {
    font-size: 2rem;
  }
  span .typed-cursor {
    font-size: 100px;
  }
}

section {
  display: flex;
  min-height: 350px;
  padding: 50px 60px 0px 60px;
  &:hover{
    background-clip: content-box;
    background-color: #d9b310;
    transition: all 0.5s;
    .section-desc{
      color: #083C5D;
      flex:3;
      transition: all 0.5s;
      p{
        color: #083C5D
      }
    }
  }
  a {
    width: 100%;
    text-decoration: none;
    display: flex;
  }
  .section-img {
    flex: 4;
    padding: 30px;
    background-position: center;
    background-size: cover;
  }
  .bg1 {
    background-image: url(https://images.pexels.com/photos/219570/pexels-photo-219570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  }
  .bg2 {
    background-image: url(https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  }
  .bg3 {
    background-image: url(https://images.pexels.com/photos/821653/pexels-photo-821653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  }
  .section-desc {
    flex: 8;
    padding: 30px;
    position: relative;
    h3 {
      text-transform: uppercase;
      margin-bottom: 30px;
      font-size: 24px;
      font-weight: 900;
    }
    p {
      font-size: 20px;
    }
  }
}
#typewriter .section-desc:before,
#camera .section-desc:before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  height: 100%;
  border-bottom: 2px solid #d9b310;
  border-right: 2px solid #d9b310;
}
#telephone .section-desc:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60%;
  height: 100%;
  border-bottom: 2px solid #d9b310;
  border-left: 2px solid #d9b310;
}
@media screen and (max-width: 768px) {
  header {
    height: 50vh;
  }
  section {
    display: block;
    padding: 20px 30px 0px 20px;
    a{
      display: block;
    }
  }
  .section-img {
    height: 300px;
    max-width: 800px;
  }
  .section-desc {
    margin: 24px 0;
  }
  .typed-element {
    h1 {
      font-size: 20px;
    }
  }

  #telephone {
    transform: scale(-1);
    .section-img {
      transform: scale(-1);
    }
    .section-desc {
      transform: scale(-1);
    }
  }
}
</style>