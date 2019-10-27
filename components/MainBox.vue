<template>
  <div>
    <form>
      <label>请选择练习范围</label>
      <el-checkbox-group v-model="typeRange" @change="changeTypeRange" size="small" :min="1">
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
        <div v-for="(item,index) in fillStr" :key="item" @click="clickBlock(index)">{{item}}</div>
      </div>
      <img :src="thumbAttr" v-if="isGoodHide" id="good" class="position-absolute w-50" alt="thumb">
    </section>
    <p>第
      <output id="counter" class="font-weight-bold"></output>
      道题
    </p>
    <p id="tip"></p>
    <audio id="pippaPig" src="../static/music/PeppaPig.m4a" controls style="display: none"></audio>
    <img :src="thumbAttr" alt="">
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
                // this.thumbAttr = '/_nuxt/static/img/' + picSrc;
                this.thumbAttr = '/_nuxt/static/img/p_pass01_thumb.png';
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
                this.resultIndex = this.blockNum.rdm();
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
                /*const next = () => {
                    this.$blocks.css('pointer-events', 'initial');
                    this.$sound_next.get(0).pause();
                    this.$sound_next.get(0).play();
                    if (++this.counter > this.limitNum) {
                        alert('宝宝，你已经学了' + this.limitNum + '道题了，听首歌休息一下吧！');
                        that.$good.addClass('w-auto');
                        $("#pippaPig").slideDown(600).get(0).play();
                        return;
                    }
                    this.shuffle();
                };*/
                const checkRight = () => {
                    setTimeout(() => {
                        // this.$good.style.display = 'block'
                    }, 400);

                    /*
                                        this.$blocks.eq(this.resultIndex).addClass('correct');
                                        this.$sound_correct.get(0).pause();
                                        this.$sound_correct.get(0).play();

                                        this.timer = setTimeout(next, that.$good.attr("src").includes('1x1px.png') ? 1000 : 2500);
                    */
                };
                if (index === +this.resultIndex) {
                    console.log(index, this.$good)
                    checkRight()
                }
                /*this.$blocks.click(function () {
                    const text = $(this).text();
                    if (!that.timer && text === that.result) {
                        checkRight()
                    } else {
                        // $(this).addClass('error')
                    }
                });

                $('body').keyup(function (e) {
                    if (!that.timer && e.key === that.result) {
                        checkRight()
                    }
                });*/

            }
        },
        data() {
            return {
                limitNum: 15,
                blockNum: 4,
                isGoodHide: true,
                $good: {},
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
                fillStr: []
            }
        },
        created() {
            this.lowerLetters = this.generateLetters().toLocaleLowerCase();
            this.upperLetters = this.generateLetters();
        },
        mounted() {
            /*document.querySelectorAll('.box-wrap>div').forEach(function (item, index) {
                item.innerHTML = index
            });*/
            this.$good = document.querySelector('#good');
            this.shuffle();
        }
    }
</script>

<style scoped>
  .el-checkbox-group, .el-radio-group {
    margin: .25rem 0 .5rem;
  }

</style>

