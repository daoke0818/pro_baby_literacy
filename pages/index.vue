<template>
  <el-container>
    <el-header>
      <my-header/>
    </el-header>
    <el-main>
      <main-box/>
    </el-main>
    <el-footer>
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Vue from "vue";
    import MyHeader from "../components/MyHeader";
    import MainBox from "../components/MainBox";
    import common from "../assets/js/common";
    import MyFooter from "../components/MyFooter";

    export default {
        components: {
            MainBox,
            MyHeader,
            MyFooter
        },
        data() {
            return {}

        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="scss">
  @import "../assets/css/common.css";

  body {
    background: lightskyblue;

    .el-header, .el-footer {
      height: auto;
      padding: 0;
    }

  }
</style>
