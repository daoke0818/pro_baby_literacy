<template>
  <div>
    <form>
      <label class="d-block">请选择练习范围</label>
      <el-checkbox-group :style="{pointerEvents: isEnd?'none':''}" v-model="typeRange" @change="changeTypeRange" size="small" :min="1">
        <el-checkbox-button class="testScope" v-for="(item,index) in typeRanges_show" :key="item+index" :label="item"
                            @click.native="changeTypeChecked"></el-checkbox-button>
      </el-checkbox-group>
      <label class="d-block">请选择显示模式</label>
      <el-radio-group :style="{pointerEvents: isEnd?'none':''}" v-model="displayMode" @change="changeDisplayMode" size="small">
        <el-radio-button v-for="item in displayModes" :key="item" :label="item"></el-radio-button>
      </el-radio-group>
      <label class="d-block">选择汉字阶段</label>
      <div v-if="typeRange.includes('汉字')">
        <el-checkbox-group :style="{pointerEvents: isEnd?'none':''}" v-model="hanZiRange" @change="changeHanZiRange" size="small" :min="1">
          <el-checkbox-button v-for="(item,index) in passHanZi" :key="item+index" :label="`${index+1}阶段`"></el-checkbox-button>
        </el-checkbox-group>
      </div>
    </form>
    <hr class="my-3">
    <section class="text-center mb-2 position-relative">
      <p class="mb-2">请点选答案方格</p>
      <div :class="['box-wrap d-flex flex-wrap', displayMode==='2x2'?'w2h2':'w3h2']">
        <div v-for="(item,index) in fillStr" :key="item+index" @click="clickBlock(index)"
             :class="isChecked && index === +resultIndex?('correct '+currentAnimation):'' ">{{ item }}
        </div>
      </div>
      <ok-pic :okPicRate="okPicRate" :now="counter" :limitNum="limitNum" v-show="showOkPic&&!isEnd" @setBlankPic="setBlankPic"/>
    </section>
    <MyProgress :total="limitNum" :now="counter"/>
    <p v-if="counter<=limitNum">第
      <output id="counter" class="font-weight-bold">{{ counter }}</output>
      道题
    </p>
    <p class="mt-2" v-else>结束
      <el-button type="primary" size="mini" @click="playAgain">再来一局</el-button>
    </p>
    <hr class="my-3">
    <div id="tip">
      <!--      目前已经学过的符号有：<br>{{this.passOperateChar.split('').join(' ')}}<br>
            共{{this.passOperateChar.length}}个<br>-->
      <el-collapse>
        <el-collapse-item title="部分符号读法" v-if="typeRange.includes('符号')" type="success">
          <ul>
            <li v-for="(item,index) in operateCharArray" v-if="item[1]"><b>{{ item[0] }}</b>：{{ item[1] }}</li>
          </ul>
        </el-collapse-item>
        <el-collapse-item class="tip-hanzi" title="汉字列表" v-if="typeRange.includes('汉字')" type="success">
          <span class="d-inline-block my-2" v-for="(item,index) in passHanZi"><b>{{ item + '\n' }}</b></span>
          <br>共{{ passHanZi.join('').length }}个
        </el-collapse-item>
      </el-collapse>
      <el-alert class="mt-2" title="注意：键盘输入不支持汉字、中文标点和一些数学符号，比如：“× ÷ ， 。 ：”" type="warning"></el-alert>
    </div>
    <div class="mt-2 about p-3">
      <h3 class="text-center mb-3">说明</h3>
      <p class="">欢迎大家来到阿洛识字！
      <p>阿洛识字是一款免费的幼儿识字工具，简单易用，动画丰富，让宝宝在玩的过程中就能学会很多文字。此工具无需安装app，只要打开一个链接，就能打开宝宝认字的世界。
        可以将网址添加到微信浮窗，方便随时使用。
        链接地址
        <el-link type="danger" href="http://e-art.top/aluoshizi/"> http://e-art.top/aluoshizi/</el-link>

      <p class="">本工具是作者根据自己孩子的成长状态开发的，目前比较适合一岁半到三四岁的宝宝，当然为了让更多孩子能使用到，以后将逐步完善功能，增加大龄幼儿的兴趣点。</p>
      <p class="">如果父母们有好的想法可以加QQ群1056477760，或扫描下方二维码加入微信群一起交流：
      <p class="qrCode text-center mt-4"><img src="http://e-art.top/Img/QR_weixin.png" alt="微信二维码"></p>
    </div>
    <GameFrame v-if="isEnd" @playAgain="playAgain" :limitNum='limitNum'/>

    <audio id="sound_correct" hidden="" src="sound/tada.mp3"></audio>
    <audio id="sound_next" hidden="" src="sound/next.mp3"></audio>
  </div>
</template>

<script>
import Bus from '../middleware/BusEvent';
import MyProgress from '../components/Progress';
import OkPic from '../components/OkPic';
import GameFrame from '../components/GameFrame';
import {passHanZi, operateCharArray, lowerLetters, upperLetters, numbers, animations, okSounds} from '../configData/allDatas'

const animationRate = .63; // 选对后方块出现动画的概率
const loacalStorageSign = '2020-3-8 15:00:38';

export default {
  name: 'MainBox',
  props: {
    typeRanges_show: [],
  },
  data() {
    return {
      okPicRate: .33, // 选中后图片出现的概率
      okSoundRate: .33,
      isChecked: false,
      limitNum: 15,
      showOkPic: false,
      blankPic: true,
      $good: {},
      $sound_correct: {},
      $sound_next: {},
      timer: '',
      thumbAttr: '',
      boxActive: -1,
      typeRange: [],
      operateCharArray,
      displayMode: '2x2',
      displayModes: ['2x2', '3x2'],
      result: '',
      resultIndex: 0,
      operateChar: '',
      passOperateChar: '',
      hanZiRange: ['1阶段'], // 元素必须是字符串，数字不行
      passHanZi,
      hanZi: '',
      fillStr: [],
      counter: 1,
      goodWidth: 'w-50',
      currentAnimation: 'bounceIn',
      isEnd: false
    };
  },
  watch: {
    typeRanges_show: function () {
      // console.log('~~this.typeRange',this.typeRange)
      this.typeRange = this.typeRanges_show.filter(item => this.typeRange.includes(item))
      if (!this.typeRange.length) {
        this.typeRange = [this.typeRanges_show[0]]
      }
      this.changeTypeRange();
    },
    isEnd:function(){
      document.querySelector('.el-main').style.overflow = 'hidden'
    }

  },
  computed: {
    blockNum: function () {
      switch (this.displayMode) {
        case '2x2':
          return 4;
        case '3x2':
          return 6;
        default:
          return 4;
      }
    }
  },
  methods: {
    cleanLocalStorage(name) {
      if (localStorage.sign !== loacalStorageSign) {
        localStorage.setItem(name, '');
        localStorage.sign = loacalStorageSign;
      }
    },
    playAgain() {
      location.reload();
    },
    changeTypeChecked(e) {
      if (e.target.innerHTML === '汉字') {
        this.typeRange = ['汉字'];
        this.changeTypeRange(); // 点击汉字按钮没有触发group的change事件
      } else {
        let index = this.typeRange.indexOf('汉字');
        if (index >= 0) {
          this.typeRange.splice(index, 1);
        }
      }
    },
    changeTypeRange(item) {
      localStorage.typeRange = JSON.stringify(this.typeRange);
      this.shuffle();
    },
    changeDisplayMode() {
      localStorage.displayMode = this.displayMode;
      this.shuffle();
    },
    changeHanZiRange() {
      localStorage.hanZiRange = JSON.stringify(this.hanZiRange);

      this.shuffle();
    },
    setBlankPic(blankPic) {
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
          case '数字':
            charRange += numbers;
            break;
          case '大写字母':
            charRange += upperLetters;
            break;
          case '小写字母':
            charRange += lowerLetters;
            break;
          case '符号':
            charRange += this.passOperateChar;
            break;
          case '汉字':
            charRange += this.hanZiRange.map(item0 => {
              console.log({item0});
              return passHanZi[item0.slice(0, 1) - 1];
            }).join('');

            break;
        }
      });

      this.result = charRange.rdm();
      // 如果2x2则只有3个填充块和4个可插入答案的位置
      // console.log(5.rdm())
      this.resultIndex = (this.blockNum - 1).rdm();
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
      Bus.$emit('setResult', this.result);
    },
    next() {
      if (++this.counter > this.limitNum) {
        // this.openGameFrame()
        // alert('宝宝，你已经学了' + this.limitNum + '道题了，欣赏一下佩奇家跳泥坑吧！');
        this.isEnd = true;
        return false;
      } else {
        this.$sound_next.pause();
        this.$sound_next.play();
        this.shuffle();
      }
    },
   /*  open() {
        this.$alert('<button type="primary" size="mini" @click="playAgain">佩奇一家跳泥坑</button><br/><button type="primary" size="mini" @click="playAgain">汽车抬杆落杆</button>', 
        '宝宝，你已经学了' + this.limitNum + '道题了，可以选择一种游戏玩了', {
            dangerouslyUseHTMLString: true
        })
    },  */
    keyDownBlock(e) {
      console.log(e);
    },
    clickBlock(index) {
      this.currentAnimation = this.getCorrectAnimation();
      const checkRight = () => {
        setTimeout(() => {
          this.showOkPic = true;
        }, 400);
        // this.blankPic = false;
        this.isChecked = true;
        this.$sound_correct.pause();
        if (Math.random() < this.okSoundRate) {
          this.$sound_correct.src = "sound/" + okSounds.rdm()
        } else {
          this.$sound_correct.src = "sound/tada.mp3"
        }
        this.$sound_correct.play();
        this.timer = setTimeout(this.next, this.blankPic ? 1500 : 2500);
      };
      if (index === +this.resultIndex) {
        checkRight();
      }
    },
    getCorrectAnimation() {
      return Math.random() < animationRate ? animations.rdm() : '';
    }
  },
  created() {
    this.cleanLocalStorage('hanZiRange');
    this.operateChar = operateCharArray.map(item => item[0]).join('');
    this.passOperateChar = this.operateChar;
    window.onkeydown = (e) => {
      this.clickBlock(this.fillStr.indexOf(e.key));
    };
    const localTypeRange = JSON.parse(localStorage.typeRange || null)
    this.typeRange = localTypeRange && localTypeRange.length > 0 ? localTypeRange : [this.typeRanges_show[0]];
    this.hanZiRange = JSON.parse(localStorage.hanZiRange || null) || this.hanZiRange;
    this.displayMode = localStorage.displayMode || this.displayMode;
  },
  mounted() {
    this.$good = document.querySelector('#good');
    this.$sound_correct = document.querySelector('#sound_correct');
    this.$sound_next = document.querySelector('#sound_next');
    this.shuffle();
  },
  components: {
    MyProgress,
    OkPic,
    GameFrame
  }
};
</script>


<style lang="scss">

.el-checkbox-button.is-disabled .el-checkbox-button__inner {
  color: #000;
  border-color: var(--c-brand) !important;
  background: var(--c-brand) !important;
}

.el-collapse-item [role=tab] [role=button] {
  padding-left: .5rem;
}

.el-alert {
  .el-alert__content {
    padding-left: 0;
  }
}
</style>

<style lang="scss" scoped>
.el-checkbox-group, .el-radio-group {
  margin: .25rem 0 .5rem;
}


.box-wrap {
  text-align: center;
  box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, .33);
  /*font-family: cursive, serif;*/
  font-family: "\5B8B\4F53"
}

.box-wrap > div {
  position: relative;
  width: calc(100% / 3);
  height: 6rem;
  line-height: 5.5rem;
  font-size: 4rem;
  font-weight: bold;
  border: .125rem solid gray;
  background: lightgray;
  box-shadow: -0.25rem -0.25rem 0.25rem rgba(0, 0, 0, .88) inset;
  cursor: pointer;
}

.box-wrap.w2h2 > div {
  width: calc(100% / 2);
}

.box-wrap.w2h2 > div:nth-of-type(4) ~ div {
  display: none;
}

.box-wrap > div.correct {
  box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, .9) inset;
  color: #fff;
  background: var(--c-success);
  pointer-events: none;
  animation-duration: .88s;
  // z-index: 1;
}

.box-wrap > div.error {
  background: indianred;
}

.box-wrap ~ img {
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*max-height: 15.5rem;*/
  z-index: 2;
}


#tip {
  .tip-hanzi {
    .el-collapse-item__wrap {
      padding-left: .5rem;
    }

    span {
      display: inline-block;
      letter-spacing: .25rem;
      padding: 0 1rem;
    }
  }

  ul {
    list-style: none;

    & > li > b {
      display: inline-block;
      width: 1rem;
    }
  }

}

.about {
  background: white;

  p {
    margin-bottom: .75rem;
  }

  .qrCode img {
    margin: 0 auto;
    width: 18rem;
    border: .0625rem solid lightskyblue;
    border-radius: .5rem;
  }
}

</style>

