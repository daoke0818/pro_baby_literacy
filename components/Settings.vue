<template>
  <el-form ref="form">
  <el-form-item label="练习范围">
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
      typeRanges
    }
  },
  methods:{
    onChange(){
      Bus.$emit('setTypeRange',this.typeRanges_show)
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
