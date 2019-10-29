<template>
  <div>
    <form>
      <label>请选择练习范围</label>
      <el-checkbox-group v-model="typeRange" @change="changeTypeRange" size="small" :min="1">
        <el-checkbox-button class="testScope" v-for="item in typeRanges" :key="item" :label="item"></el-checkbox-button>
      </el-checkbox-group>
      <label>请选择显示模式</label>
      <div>
        <el-radio-group v-model="displayMode" @change="changeDisplayMode" size="small">
          <el-radio-button v-for="item in displayModes" :key="item" :label="item"></el-radio-button>
        </el-radio-group>
      </div>
    </form>
    <hr class="my-3">
    <section class="text-center mb-2 position-relative">
      <p class="mb-2">请点选答案方格</p>
      <div :class="['box-wrap d-flex flex-wrap', displayMode==='2x2'?'w2h2':'w3h2']">
        <div v-for="(item,index) in fillStr" :key="item" @click="clickBlock(index)" :class="isChecked && index===+resultIndex?'correct':'' ">{{item}}</div>
      </div>
      <img :src="thumbAttr" v-if="isGoodHide" id="good" :class="['position-absolute', goodWidth]" alt="thumb">
    </section>
    <p>第
      <output id="counter" class="font-weight-bold">{{counter}}</output>
      道题
    </p>
    <p id="tip"></p>
    <audio id="sound_correct" hidden="" src="sound/tada.wav"></audio>
    <audio id="sound_next" hidden="" src="sound/next.wav"></audio>
    <audio id="pippaPig" autoplay src="music/PeppaPig.m4a" controls v-if="isEnd" ></audio>
  </div>
</template>

<script>
    import Bus from "../middleware/BusEvent";

    export default {
        name: "MainBox",
        methods: {
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
            shuffle() {
                let picSrc = (Math.random() < .67) ? this.okPic.empty : this.okPic.rdmPics.rdm();
                switch (this.counter) {
                    case 5:
                        picSrc = this.okPic.level1;
                        break;
                    case 10:
                        picSrc = this.okPic.level2;
                        break;
                    case this.limitNum:
                        picSrc = this.okPic.levelLast;
                        break;
                }
                // 放在static目录里的文件会自动映射到根目录下，所以路径不用static/开头
                this.thumbAttr = 'img/' + picSrc;
                this.isGoodHide = false;
                this.isChecked = false;
                // this.timer = null;
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
                let n = 0;
                while (n++ < 10) {
                    tempArr = charRange.rdm(this.blockNum - 1);
                    // 填充的字符不包含当前的答案则退出循环，即不重复
                    if (!tempArr.includes(this.result + '')) {
                        break;
                    }
                }
                //splice方法的第一个参数指对应的下标之前，如果数值很大超过了数组长度，则位置定在数组最后
                // 所以this.resultIndex在0~n的位置对应n个tempArr字符的n+1个空隙中
                this.fillStr = (tempArr.slice(0, this.resultIndex) + this.result + tempArr.slice(this.resultIndex)).split('');
                console.log({
                    charRange,
                    result: this.result,
                    resultIndex: this.resultIndex,
                    tempArr,
                    fillStr: this.fillStr
                });
                Bus.$emit('setResult', this.result)
            },
            clickBlock(index) {
                const next = () => {
                    this.$sound_next.pause();
                    this.$sound_next.play();
                    if (this.counter++ === this.limitNum) {
                        alert('宝宝，你已经学了' + this.limitNum + '道题了，欣赏一下佩奇家里跳泥坑吧！');
                        this.isEnd = true;
                        return false;
                    }
                    this.shuffle();
                };
                const checkRight = () => {
                    setTimeout(() => {
                        this.isGoodHide = true
                    }, 400);
                    this.isChecked = true;
                    this.$sound_correct.pause();
                    this.$sound_correct.play();
                    this.timer = setTimeout(next, this.thumbAttr.includes('1x1px.png') ? 1000 : 2500);

                };
                if (index === +this.resultIndex) {
                    checkRight()
                }
                /* $('body').keyup(function (e) {
                    if (!that.timer && e.key === that.result) {
                        checkRight()
                    }
                });*/

            }
        },
        data() {
            return {
                isChecked:false,
                limitNum: 15,
                blockNum: 4,
                isGoodHide: true,
                $good: {},
                $sound_correct: {},
                $sound_next: {},
                $pippaPig: {},
                timer: '',
                thumbAttr: '',
                boxActive: -1,
                typeRange: ['数字', '大写字母', '小写字母', '符号'],
                typeRanges: ['数字', '大写字母', '小写字母', '符号'],
                displayMode: '2x2',
                displayModes: ['2x2', '3x2'],
                result: '',
                okPic: {
                    rdmPics: ['p_pass01_thumb.jpg', 'p_pass02_thumb.jpg', 'p_pass03_thumb_face.jpg', 'p_pass04_peiqi.jpg', 'p_pass05_peiqiAnimation.gif', 'p_pass06_qiaozhi.jpg', 'p_pass08_wolaile.gif'],
                    empty: '1x1px.png',
                    level1: 'p_pass09_JSON.jpg',
                    level2: 'p_pass10_JSON.jpg',
                    levelLast: 'p_pass07_peiqiAnimation.gif'
                },
                numbers: '0123456789',
                lowerLetters: '',
                upperLetters: '',
                operateChar: '!@#$%^&*()_+{}|:"<>?-=[];\',./`~×÷' + '，。：',
                passOperateChar: '+-×÷><=_，。：\/#*',
                fillStr: [],
                counter:1,
                goodWidth:'w-50',
                isEnd:false
            }
        },
        created() {
            this.lowerLetters = this.generateLetters().toLocaleLowerCase();
            this.upperLetters = this.generateLetters();
        },
        mounted() {
            this.$good = document.querySelector('#good');
            this.$sound_correct = document.querySelector('#sound_correct');
            this.$sound_next = document.querySelector('#sound_next');
            this.$pippaPig = document.querySelector('#pippaPig');
            this.shuffle();
        },
        updated(){
            this.goodWidth = [5,10,15].includes(this.counter) || (this.isEnd)?'w-100':'w-50'
        }
    }
</script>

<style>
  /*.testScope .el-checkbox-button__inner{
    background: greenyellow;
  }*/
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
    background: limegreen;
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

