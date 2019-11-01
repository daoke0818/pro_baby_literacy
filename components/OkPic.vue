<template>
<!--  <div>-->
    <img :src="thumbAttr" id="good" :class="['position-absolute', goodWidth]" :key="this.now" alt="thumb">
<!--  </div>-->
</template>

<script>
    export default {
        name: "OkPic",
        data(){
            return{
                okPic: {
                    rdmPics: ['p_pass01_thumb.jpg', 'p_pass02_thumb.jpg', 'p_pass03_thumb_face.jpg', 'p_pass04_peiqi.jpg', 'p_pass05_peiqiAnimation.gif', 'p_pass06_qiaozhi.jpg', 'p_pass08_wolaile.gif', 'p_pass11_hen.gif'],
                    empty: '1x1px.png',
                    level1: 'p_pass09_JSON.jpg',
                    level2: 'p_pass10_JSON.jpg',
                    levelLast: 'p_pass07_peiqiAnimation.gif'
                },
                thumbAttr:'',
                goodWidth:'w-50'
            }
        },
        props:{
          now:{
              type:Number
          },
            limitNum:{
              type:Number
            }
        },
        methods:{
            shuffle(){
                let picSrc = (Math.random() < .67) ? this.okPic.empty : this.okPic.rdmPics.rdm();
                this.$emit('setBlankPic',picSrc.includes('1x1px.png'))
                switch (this.now) {
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
                console.log(this.thumbAttr)
                this.isOkPicHide = false;
            }
        },
        beforeUpdate() {
            this.goodWidth = [5,10,this.limitNum].includes(this.now)  ? 'w-100' : 'w-50'
            this.shuffle()
        },
        created() {
            this.shuffle()
        }
    }
</script>

<style scoped>

</style>
