<template>
  <el-container>
    <el-header>
      <my-header/>
    </el-header>
    <el-main>
      <form>
          <el-checkbox-group v-model="type" @change="print">
            <el-checkbox-button v-for="item in types" :key="item" :label="item"></el-checkbox-button>
          </el-checkbox-group>
      </form>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
    import MyHeader from "./MyHeader";

    export default {
  components: {
      MyHeader
  },
        data(){
      return{
          type:[],
          types:['数字','大写字母','小写字母','符号']
            }
        },
        methods:{
      print(){
          console.log(this.type)
      }
        }
}
</script>

<style lang="scss">
  body{
    background: lightskyblue;
  }
  .el-header{
    padding: 0;
  }
</style>
