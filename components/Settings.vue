<template>
  <el-form ref="form">
    <el-form-item v-if="!showSettings">
      <el-input placeholder="请输入:宝宝加油" v-model="password" class="input-with-select">
        <el-button slot="append" @click="checkPassword">确定</el-button>
      </el-input>
<!--      <el-input v-model="password" />-->
<!--      <el-button @click="checkPassword">确定</el-button>-->
    </el-form-item>
  <el-form-item label="练习范围" v-if="showSettings">
    <el-checkbox-group v-model="typeRanges_show" @change="onChange" :min="1">
      <el-checkbox v-for="item in typeRanges" :label='item'/>
    </el-checkbox-group>
  </el-form-item>
  </el-form>
</template>

<script>
import {typeRanges} from '../configData/allDatas'
import Bus from '../middleware/BusEvent'
export default {
  name: "settings",
  props:{
    typeRanges_show:[]
  },
  data() {
    return {
      typeRanges,
      password:'',
      showSettings:false
    }
  },
  methods:{
    onChange(){
      Bus.$emit('setTypeRange',this.typeRanges_show)
    },
    checkPassword(){
      if(this.password==='宝宝加油'){
        this.showSettings = true
      }
    }
  }

}
</script>

<style lang="scss">
.el-form-item{
  padding: 0 1rem;
  .el-form-item__label{
    float: none;
    &~.el-form-item__content{
      margin-left: 0;
    }
  }
}

</style>
