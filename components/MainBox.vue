<template>
  <div>
    <form >
      <label>请选择练习范围</label>
      <el-checkbox-group :style="{pointerEvents: isEnd?'none':''}" v-model="typeRange" @change="changeTypeRange" size="small" :min="1">
        <el-checkbox-button class="testScope" v-for="item in typeRanges" :key="item" :label="item"></el-checkbox-button>
      </el-checkbox-group>
      <label>请选择显示模式</label>
      <div>
        <el-radio-group :style="{pointerEvents: isEnd?'none':''}" v-model="displayMode" @change="changeDisplayMode" size="small">
          <el-radio-button v-for="item in displayModes" :key="item" :label="item"></el-radio-button>
        </el-radio-group>
      </div>
    </form>
    <hr class="my-3">
    <section class="text-center mb-2 position-relative">
      <p class="mb-2">请点选答案方格</p>
      <div :class="['box-wrap d-flex flex-wrap', displayMode==='2x2'?'w2h2':'w3h2']">
        <div v-for="(item,index) in fillStr" :key="item" @click="clickBlock(index)"  :class="isChecked && index === +resultIndex?'correct':'' ">{{item}}</div>
      </div>
      <ok-pic :now="counter" :limitNum="limitNum" v-show="showOkPic" @setBlankPic="setBlankPic"/>

    </section>
    <audio id="pippaPig" preload autoplay src="music/PeppaPig.mp3" controls v-if="isEnd" ></audio>
    <MyProgress :total="limitNum" :now="counter"/>
    <p v-if="counter<=limitNum">第
      <output id="counter" class="font-weight-bold">{{counter}}</output>
      道题
    </p>
    <p class="mt-2" v-else>结束 <el-button type="primary" size="mini" @click="playAgain">再来一局</el-button></p>
    <hr class="my-3">
    <p id="tip" v-if="typeRange.includes('符号')">目前已经学过的符号有：<br>{{this.passOperateChar.split('').join(' ')}}<br>
      共{{this.passOperateChar.length}}个<br>
      <el-alert class="mt-2" title="注意：键盘输入不支持一些中文标点和数学符号，比如“：× ÷ ， 。 ：”" type="warning"></el-alert>
    </p>
    <audio id="sound_correct" hidden="" src="sound/tada.wav"></audio>
    <audio id="sound_next" hidden="" src="sound/next.wav"></audio>
  </div>
</template>

<script>
    import Bus from "../middleware/BusEvent";
    import MyProgress from '../components/Progress'
    import OkPic from '../components/OkPic'

    export default {
        name: "MainBox",
        data() {
            return {
                isChecked:false,
                limitNum: 15,
                blockNum: 4,
                showOkPic: false,
                blankPic:true,
                $good: {},
                $sound_correct: {},
                $sound_next: {},
                timer: '',
                thumbAttr: '',
                boxActive: -1,
                typeRange: ['数字', '大写字母', '小写字母', '符号'],
                typeRanges: ['数字', '大写字母', '小写字母', '符号'],
                displayMode: '2x2',
                displayModes: ['2x2', '3x2'],
                result: '',
                resultIndex:0,
                numbers: '0123456789',
                lowerLetters: '',
                upperLetters: '',
                operateChar: '!@#$%^&*()_+{}|:"<>?-=[];\',./`~×÷' + '，。：',
                passOperateChar: '+-×÷><=_，。：\/#*@$&|%',
                fillStr: [],
                counter:1,
                goodWidth:'w-50',
                isEnd:false
            }
        },
        methods: {
            playAgain(){
                location.reload()
            },
            generateLetters() { // 大写字母的ASC2码是65~90
                let arr = '';
                for (let i = 65; i < 65 + 26; i++) {
                    arr += String.fromCharCode(i);
                }
                return arr;
            },
            changeTypeRange() {
                this.shuffle();
            },
            changeDisplayMode() {
                if (this.displayMode === '2x2') {
                    this.blockNum = 4
                } else if (this.displayMode === '3x2') {
                    this.blockNum = 6
                }
                this.shuffle();
            },
            setBlankPic(blankPic){
                this.blankPic = blankPic;
            },
            shuffle() {
                // 放在static目录里的文件会自动映射到根目录下，所以路径不用static/开头
                this.showOkPic = false;
                this.isChecked = false;
                this.boxActive = -1;
                let charRange = '';
                this.typeRange.forEach((item) => {
                    switch (item) {
                        case "数字":
                            charRange += this.numbers;
                            break;
                        case '大写字母':
                            charRange += this.upperLetters;
                            break;
                        case '小写字母':
                            charRange += this.lowerLetters;
                            break;
                        case '符号':
                            charRange += this.passOperateChar;
                            break;
                    }
                });

                this.result = charRange.rdm();
                // 如果2x2则只有3个填充块和4个可插入答案的位置
                this.resultIndex = (this.blockNum-1).rdm();
                let tempArr = '';
                // 生成随机字符串以填充方格
                while (true) {
                    tempArr = charRange.rdm(this.blockNum - 1);
                    // 填充的字符不包含当前的答案则退出循环，即不重复
                    if (!tempArr.includes(this.result + '')) {
                        break;
                    }
                }
                //splice方法的第一个参数指对应的下标之前，如果数值很大超过了数组长度，则位置定在数组最后
                // 所以this.resultIndex在0~n的位置对应n个tempArr字符的n+1个空隙中
                this.fillStr = (tempArr.slice(0, this.resultIndex) + this.result + tempArr.slice(this.resultIndex)).split('');
                Bus.$emit('setResult', this.result)
            },
            next() {
                if (++this.counter > this.limitNum) {
                    alert('宝宝，你已经学了' + this.limitNum + '道题了，欣赏一下佩奇家跳泥坑吧！');
                    this.isEnd = true;
                    return false;
                } else {
                    this.$sound_next.pause();
                    this.$sound_next.play();
                    this.shuffle();
                }
            },
            keyDownBlock(e){
                console.log(e)
            },
            clickBlock(index) {
                const checkRight = () => {
                    setTimeout(() => {
                        this.showOkPic = true
                    }, 400);
                    // this.blankPic = false;
                    this.isChecked = true;
                    this.$sound_correct.pause();
                    this.$sound_correct.play();
                    this.timer = setTimeout(this.next, this.blankPic ? 1000 : 2500);

                };
                if (index === +this.resultIndex) {
                    checkRight()
                }
            }
        },
        created() {
            this.lowerLetters = this.generateLetters().toLocaleLowerCase();
            this.upperLetters = this.generateLetters();
            window.onkeydown = (e) => {
                this.clickBlock(this.fillStr.indexOf(e.key))
            }
        },
        mounted() {
            this.$good = document.querySelector('#good');
            this.$sound_correct = document.querySelector('#sound_correct');
            this.$sound_next = document.querySelector('#sound_next');
            this.shuffle();
        },
        updated(){

        },
        components:{
            MyProgress,
            OkPic
        }
    }
</script>

<style>
  .el-checkbox-group, .el-radio-group {
    margin: .25rem 0 .5rem;
  }
  .el-checkbox-button.is-disabled .el-checkbox-button__inner{
    color:#000;
    border-color: var(--c-brand)!important;
    background: var(--c-brand)!important;
  }
  .box-wrap {
    text-align: center;
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0,0,0,.33);
  }
  .box-wrap > div {
    position: relative;
    width: calc(100%/3);
    height: 6rem;
    line-height: 5rem;
    font-size: 4rem;
    font-weight: bold;
    border: .125rem solid gray;
    background: lightgray;
    box-shadow: -0.25rem -0.25rem 0.25rem rgba(0,0,0,.88) inset;
    cursor: pointer;
  }
  .box-wrap.w2h2 > div{
    width: calc(100%/2);
  }
  .box-wrap.w2h2 > div:nth-of-type(4) ~ div{
    display: none;
  }
  .box-wrap > div.correct {
    box-shadow: 0.25rem 0.25rem 0.25rem rgba(0,0,0,.9) inset;
    color: #fff;
    background: var(--c-success);
    pointer-events: none;
  }

  .box-wrap > div.error {
    background: indianred;
  }

  .box-wrap ~ img {
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

</style>

