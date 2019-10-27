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
        <div  v-for="(item,index) in rdmStr" :key="index">{{item}}</div>
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
    export default {
        name: "MainBox",
        methods:{
            print(){
                this.shuffle();
                console.log(this.typeRange,this.typeDisplay)
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
                this.typeRange.forEach((item)=>{
                    switch (item) {
                        case "数字":
                            charRange += this.numbers.rdm();
                            break;
                        case '大写字母':
                            charRange += this.upperLetters.rdm();
                            break;
                        case '小写字母':
                            charRange += this.lowerLetters.rdm();
                            break;
                        case '符号':
                            charRange += this.passOperateChar.rdm();
                            break;
                        // case 'letterOrNum':
                        //     this.result = (this.numbers + this.upperLetters + this.lowerLetters).rdm();
                    }
                });

                console.log(this.result)
                this.result = charRange.rdm();
                this.resultIndex = this.blockNum.rdm();
                let tempArr = [];
                // 生成随机字符串以填充方格
                let n=0;
                while (n++<10) {
                    tempArr = charRange.rdm(this.blockNum-1);
                   /* if (this.typeRange[0] === '符号') {
                        tempArr = this.operateChar.split('').disruptOrder().splice(1 - this.blockNum);
                    } else if (this.typeRange[0] === '小写字母') {
                        tempArr = Math.random().toString(36).substr(1 - this.blockNum).split('');
                    } else if (['大写字母','数字'].includes(this.typeRange[0])) {
                        tempArr = Math.random().toString(36).toUpperCase().substr(1 - this.blockNum).split('');
                    }*/
                    // 填充的字符不包含当前的答案则退出循环，即不重复
                    if (!tempArr.includes(this.result+'')) {
                        break;
                    }
                }
                //splice方法的第一个参数指对应的下标之前，如果数值很大超过了数组长度，则位置定在数组最后
                // 所以this.resultIndex在0~n的位置对应n个rdmStr字符的n+1个空隙中
                // tempArr = tempArr.split('').splice(this.resultIndex, 0, this.result + '');
                this.rdmStr = tempArr;
                console.log('tempArr',tempArr,'resultIndex',this.resultIndex, this.result,this.rdmStr)

                // $('#answer').text(this.result);
                // $('#counter').text(this.counter);
            },
        },
        data(){
            return{
                limitNum: 15,
                blockNum: 4,
                isGoodHide:true,
                $good:document.querySelectorAll('#good'),
                thumbAttr: '',
                boxActive:-1,
                typeRange:[],
                typeRanges:['数字','大写字母','小写字母','符号'],
                typeDisplay:[],
                typeDisplays:['2x2','3x2'],
                result:'',
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
                rdmStr: []
            }
        },
        mounted() {
            this.shuffle();
            document.querySelectorAll('.box-wrap>div').forEach(function (item,index) {
                item.innerHTML = index+''
            })
        }
    }
</script>

<style scoped>
  .el-checkbox-group, .el-radio-group {
    margin: .25rem 0 .5rem;
  }

</style>

