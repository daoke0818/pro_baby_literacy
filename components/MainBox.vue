<template>
  <div>
    <form>
      <label>请选择答案范围</label>
      <el-checkbox-group v-model="typeRange" @change="print" size="small">
        <el-checkbox-button v-for="item in typeRanges" :key="item" :label="item"></el-checkbox-button>
      </el-checkbox-group>
      <label>请选择显示模式</label>
      <div>
        <el-radio-group v-model="typeDisplay" @change="print" size="small">
          <el-radio-button v-for="item in typeDisplays" :key="item" :label="item"></el-radio-button>
        </el-radio-group>
      </div>
    </form>
    <hr class="my-3">
    <section class="text-center mb-2 position-relative">
      <p class="mb-2">请点选答案方格</p>
      <div class="box-wrap d-flex flex-wrap w2h2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <img src="" id="good" class="position-absolute w-50" alt="thumb">
    </section>
    <p>第
      <output id="counter" class="font-weight-bold"></output>
      道题
    </p>
    <p id="tip"></p>
    <audio id="pippaPig" src="static/music/PeppaPig.m4a" controls style="display: none"></audio>
  </div>

</template>

<script>
    export default {
        name: "MainBox",
        methods:{
            print(){
                console.log(this.typeRange,this.typeDisplay)
            }
        },
        data(){
            return{
                typeRange:[],
                typeRanges:['数字','大写字母','小写字母','符号'],
                typeDisplay:[],
                typeDisplays:['2x2','3x2']
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
  .el-checkbox-group, .el-radio-group {
    margin: .25rem 0 .5rem;
  }

</style>
