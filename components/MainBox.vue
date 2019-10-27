<template>
  <div>
    <form>
      <label>请选择答案范围</label>
      <el-checkbox-group v-model="typeRange" @change="changeTypeRange" size="small">
        <el-checkbox-button v-for="item in typeRanges" :key="item" :label="item"></el-checkbox-button>
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
        <div v-for="(item,index) in fillStr" :key="index">{{item}}</div>
      </div>
      <img :src="thumbAttr" v-if="isGoodHide" id="good" class="position-absolute w-50" alt="thumb">
    </section>
    <p>第
      <output id="counter" class="font-weight-bold"></output>
      道题
    </p>
    <p id="tip"></p>
    <audio id="pippaPig" src="../static/music/PeppaPig.m4a" controls style="display: none"></audio>
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
            changeDisplayMode(){
                if(this.displayMode==='2x2'){
                    this.blockNum = 4
                }else if(this.displayMode==='3x2'){
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
                const thumbAttr = 'static/img/' + picSrc;
                this.isGoodHide = true;
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
                        // case 'letterOrNum':
                        //     this.result = (this.numbers + this.upperLetters + this.lowerLetters).rdm();
                    }
                });

                this.result = charRange.rdm();
                this.resultIndex = (this.blockNum).rdm();
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
                Bus.$emit('setResult',this.result)
            },
        },
        data() {
            return {
                limitNum: 15,
                blockNum: 4,
                isGoodHide: true,
                $good: document.querySelectorAll('#good'),
                thumbAttr: '',
                boxActive: -1,
                typeRange: [],
                typeRanges: ['数字', '大写字母', '小写字母', '符号'],
                displayMode: [],
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
                fillStr: []
            }
        },
        created() {
            this.lowerLetters = this.generateLetters().toLocaleLowerCase();
            this.upperLetters = this.generateLetters();
            this.shuffle();

        },
        mounted() {
            document.querySelectorAll('.box-wrap>div').forEach(function (item, index) {
                item.innerHTML = index
            })
        }
    }
</script>

<style scoped>
  .el-checkbox-group, .el-radio-group {
    margin: .25rem 0 .5rem;
  }

</style>

