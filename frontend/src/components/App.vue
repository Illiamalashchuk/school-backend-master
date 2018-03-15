<template>

  <el-container>
    <el-header>
         <nav-bar/> <!-- component which saved in navBar.vue -->
    </el-header>
    <el-main>
      <userMenu></userMenu>
      <router-view>
      </router-view>
    </el-main>
  </el-container>

</template>
<style>
.el-container {
  height: 100%;
}
.el-header, .el-main {
  padding: 0 150px 0 150px;
}
.el-main {
  display: flex;
  flex-wrap: wrap;
}
</style>


<script>
import NavBar from 'components/navBar';
import userMenu from 'components/userMenu';

export default {
  components: {
    NavBar,
    userMenu
  }
};
</script>
