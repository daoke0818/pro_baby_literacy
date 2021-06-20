<template>
  <img :src="imgSrc" id="good" :class="['position-absolute', goodWidth]" :key="this.now" alt="thumb">
</template>

<script>
export default {
  name: "OkPic",
  data() {
    return {
      okPic: {
        rdmPics: ['p_pass01_thumb.jpg', 'p_pass02_thumb.jpg', 'p_pass03_thumb_face.jpg', 'p_pass04_peiqi.jpg', 'p_pass05_peiqiAnimation.gif',
         'p_pass06_qiaozhi.jpg','p_pass08_lvKongLong.jpg', 'p_pass11_hen.gif', 'p_pass12_lvKongLong.png','p_pass13_lvKongLong.png'],
        empty: '1x1px.png',
        level1: [ 'p_level2_mengMengJi.png', 'p_level_baby.png', 'p_level_bear.png', 'p_level_monkey.png'],
        level2: ['p_level2_JSON.jpg', 'p_level2_maTong.jpg', 'p_level2_niuChe.jpg', 'p_level2_xiaoDuGuo.jpg', 'p_level2_musicFengLing.png',
          'p_level2_ElevaNaiFen.png', 'p_level2_diQiuYi.png', 'p_level2_moTuoChe.png', 'p_level2_lanQiuJia.png', 'p_level2_wanXiangChe.png',
          'p_level2_clock.png','p_level2_niu.png'],
      },
      imgSrc: '',
      goodWidth: 'w-50'
    }
  },
  props: {
    now: {
      type: Number
    },
    limitNum: {
      type: Number
    },
    okPicRate: {
      default: 0,
      type: Number
    }
  },
  methods: {
    getImgSrc() {
      if (this.now > this.limitNum) {
        return
      }
      let picSrc = (Math.random() < this.okPicRate) ? this.okPic.rdmPics.rdm() : this.okPic.empty;
      switch (this.now) {
        case 5:
          picSrc = this.okPic.level1.rdm();
          break;
        case 10:
          picSrc = this.okPic.level2.rdm();
          break;
        case this.limitNum:
          break;
      }
      // 放在static目录里的文件会自动映射到根目录下，所以路径不用static/开头
      this.$emit('setBlankPic', picSrc.includes('1x1px.png'));
      this.imgSrc = 'img/' + picSrc;
      // console.log('~~this.imgSrc', this.imgSrc)
    }
  },
  beforeUpdate() {
    // 最后一道题做完后this.now会自动更新到this.limitNum+1
    this.goodWidth = [5, 10, this.limitNum + 1].includes(this.now) ? 'w-100' : 'w-50';
    this.getImgSrc()
  },
  created() {
    this.getImgSrc()
  }
}
</script>

<style scoped>

</style>
