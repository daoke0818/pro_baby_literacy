<template>
  <el-container>
    <el-header>
      <my-header/>
    </el-header>
    <el-main>
      <main-box :typeRanges_show="typeRanges_show"/>
    </el-main>
    <el-footer>
      <my-footer></my-footer>
    </el-footer>
    <el-drawer
      title="设置"
      size="70%"
      :visible.sync="drawer">
      <Settings :typeRanges_show="typeRanges_show"/>
    </el-drawer>
  </el-container>
</template>

<script>
  import Vue from "vue";
  import MyHeader from "../components/MyHeader";
  import MainBox from "../components/MainBox";
  import common from "../assets/js/common";
  import MyFooter from "../components/MyFooter";
  import Bus from "../middleware/BusEvent";
  import Settings from "../components/Settings";
  import {typeRanges} from "../configData/allDatas";

  export default {
    components: {
      MainBox,
      MyHeader,
      MyFooter,
      Settings
    },
    beforeCreate() {
      Bus.$on('openDraw', (result) => {
        this.drawer = result
      });
      Bus.$on('setTypeRange', typeRanges => {
        this.typeRanges_show = typeRanges
        localStorage.setItem('typeRanges_show',JSON.stringify(this.typeRanges_show) )
      })
    },
    created() {
      this.typeRanges_show = JSON.parse( localStorage.getItem('typeRanges_show')||null) || typeRanges

    },
    beforeDestroy() {
      Bus.$off('openDraw')
    },
    data() {
      return {
        drawer:false,
        typeRanges_show:[]
      }

    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  @import "../assets/css/common.css";

  body {
    .el-container {
      margin: 0 auto;
      max-width: 480px;
      background: lightskyblue;
    }

    .el-header, .el-footer {
      height: auto;
      padding: 0;
    }

  }

  @media (min-width: 480px) {
    body{
      background: initial;
    }
    html,
    body,
    #__nuxt,
    #__layout,
    #__layout > div,
    #__layout > div >.el-container{
      height: 100%;
    }

    .el-header, .el-footer {
      position: relative;

      .fixed-top, .fixed-bottom {
        position: absolute;
      }
    }
  }
</style>
