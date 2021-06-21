<template>
    <div class="game-frame">
    <el-dialog
      title='恭喜过关！'
      :visible.sync="dialogVisible"
      width="80%">
      <strong>宝宝，你已经学了{{this.limitNum}}道题了，可以选择一种游戏玩了。直接关闭会重新开始哦~</strong>
      <ul class='gameList'>
        <li><el-button type="primary" size="small" @click='()=>selecteGame("peppaPig")'>佩奇一家跳泥坑</el-button></li>
        <li><el-button type="primary" size="small" @click='()=>selecteGame("parkingPole")' >汽车抬杆落杆</el-button></li>
      </ul>
    </el-dialog>
    <!--进度条-->
    <div class='progressBar' :style='{background: `linear-gradient(to right, red ${progressValue}%, green ${progressValue}%)`}'>绿色为剩余时间</div>
    <div class='peppaPig' v-if="selected==='peppaPig'">
        <img src='img/p_game01_peiqiAnimation.gif'/>
        <audio id="pippaPig" preload autoplay src="music/PeppaPig.mp3" controls ></audio>
    </div>
    <div class='parkingPole' v-if="selected==='parkingPole'">
        <iframe src='http://e-art.top/parkingPole/'></iframe>
      </div>
    <div class='ctrlBar'>
      <el-button class='exitGame' type="danger" size="small" @click='playAgain'>退出游戏</el-button>
    </div>
    </div>

</template>

<script>
import {gameDuration} from '../configData/allDatas'
    export default {
        name: "MyFooter",
        data:()=>{
          return{
            selected:'',
            dialogVisible:true,
            progressValue:0,
          }
          
        },
        props:{
          limitNum:0
        },
        methods:{
          selecteGame(game){
            this.dialogVisible=false
            this.selected = game
            const timer = setInterval(()=>{
              if(this.progressValue>100){
                clearInterval(timer)
                this.$emit('playAgain')
              }
              this.progressValue+=100/gameDuration
            },1000)
          },
          playAgain(){
            this.$emit('playAgain')
          }
        }, 
    }
</script>

<style scoped lang="scss">
.game-frame{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: black;
    z-index:2001;
    .gameList{
      padding-top:1rem;
      li{
        margin-bottom:.5rem
      }

    }
    .parkingPole{
      height:100%;
      iframe{
        height:calc(100% - 1rem);
        width:100%;
        border: none;
      }
    }
    .peppaPig{
      img,audio{
        width:100%
      }
    }
    .progressBar{
      height:1rem;
      text-align:right;
      color:white;
      font-size:.75rem;
      background-color:green
    }
    .ctrlBar{
          position: absolute;
          top: 1rem;
          padding:.5rem;
    }
    
}
  
</style>
