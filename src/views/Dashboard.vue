<template>
  <div class="ownContainer">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>
<script>
import Sidebar from "../components/Sidebar";
export default {
  components: {
    Sidebar
  },
  created() {
    this.$store.dispatch("checkLogin");
  }
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700,900&subset=chinese-traditional");
.ownContainer {
  position: relative;
  font-family: "Noto Sans TC", sans-serif;
  position: relative;
}
</style>