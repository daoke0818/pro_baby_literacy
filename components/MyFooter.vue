<template>
    <div class="text-center mainFooter fixed-bottom">
        <span hidden="" class="d-md-inline">网站访问次数：<img style="position: relative;top:-.125rem" src="http://www.cutercounter.com/hits.php?id=geepfcxo&amp;nd=6&amp;style=4" alt="免费计数器"></span>
        © {{new Date().getFullYear()}} <a href="http://e-art.top">关中刀客在青岛</a>
<!--      <a href="http://www.beian.miit.gov.cn" target="_blank"> 鲁ICP备19013610号 </a>-->
        <a href="https://github.com/daoke0818/myWeb" target="_blank" title="github上的源码"><i class="iconfont i-github_bg"></i></a>
        <a href="https://gitee.com/daoke0818/myWeb" target="_blank" title="码云上的源码"><i class="iconfont i-gitee_bg"></i></a>
    </div>
</template>

<script>
    export default {
        name: "MyFooter"
    }
</script>

<style scoped lang="scss">
  .mainFooter{
    padding: .5rem 0;
    color: #fff;
    background-color: var(--c-brand);
    a{
      color: inherit;
    }
  }
</style>
