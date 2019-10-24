<template>
    <el-row>
        <el-col :span="4">
          <a href="http://e-art.top">
            <img src="../assets/img/logo_v0.1_w.png" alt="logo">
          </a>
        </el-col>
        <el-col :span="16">
            <h1 class="title">
                阿洛识字
            </h1>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>
<script>
    export default {
        name: 'my-header'
    }
</script>
<style lang="scss">
  .el-row{
    background: #409EFF;
    h1 {
      color: #fff;
      text-align: center
    }

    img {
      width: 3rem;
    }
  }
</style>
