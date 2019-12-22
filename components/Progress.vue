<template>
<div>
  <span :class="['item','d-inline-block','text-center',{pass : index < now-1}]" :key="item" :style="{width:100/total+'%'}" v-for="(item,index) in total" >{{item}}</span>
</div>
</template>

<script>
    export default {
        name: "Progress",
        props:{
            total: {
                type:Number
            },
            now:{
                type:Number
            },
        }
    }
</script>

<style scoped lang="scss">
.item{
  height: 2rem;
  line-height: 1.875rem;
  font-size: .875rem;
  color: lightgray;
  background: #fff;
  border: .0625rem solid gray;
  background: url("../static/img/egg.jpg") no-repeat;
  background-position:  center -100px ;
  transition: all .4s ease-in;
  background-size: 120% 120%;
  /*transform: scale(.5);*/
  &.pass{
    background-position:  center center;
    /*transform: scale(1);*/
   }
}
</style>
