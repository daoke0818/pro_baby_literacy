<template>
  <div class="fixed-top">
    <el-row class="w-100">
      <el-col :span="4">
        <a href="http://e-art.top">
          <img src="../static/img/logo_v0.1_w.png" alt="logo">
        </a>
      </el-col>
      <el-col :span="16">
        <h1 class="title">
          阿洛识字
        </h1>
      </el-col>
      <el-col :span="4">
        <div class="r">
          <output id="answer">{{ result }}</output>
          <i class="iconfont i-settings" @click="openDraw"/>
        </div>

      </el-col>
    </el-row>


  </div>

</template>
<script>
import Bus from '../middleware/BusEvent'

export default {
  name: 'my-header',
  data() {
    return {
      result: '',
      drawer: false
    }
  },
  beforeCreate() {
    Bus.$on('setResult', (result) => {
      this.result = result
    })
  },
  beforeDestroy() {
    Bus.$off('setResult')
  },
  methods: {
    openDraw() {
      Bus.$emit('openDraw', true);
    }
  }
}
</script>
<style lang="scss">
.el-row {
  top: 0;
  padding: .5rem;
  background: #409EFF;

  h1 {
    color: #fff;
    font-size: 1.25rem;
    text-align: center
  }

  img {
    width: 3rem;
  }

  .r {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .iconfont {
      line-height: 1.25rem;
    }
  }
}
</style>
