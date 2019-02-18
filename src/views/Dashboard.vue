<template>
<div class='ownContainer'>
    <Sidebar/>
    <router-view></router-view>
</div>
  
</template>
<script>
import Sidebar from "../components/Sidebar";
export default {
  components: {
    Sidebar
  }
};
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700,900&subset=chinese-traditional');
.ownContainer{
  background-color: #fff;
  position: relative;
  font-family: 'Noto Sans TC', sans-serif;
}

</style>