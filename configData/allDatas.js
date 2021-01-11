const generateLetters = () => { // 大写字母的ASC2码是65~90
  let arr = '';
  for (let i = 65; i < 65 + 26; i++) {
    arr += String.fromCharCode(i);
  }
  return arr;
}

export const
  lowerLetters = generateLetters().toLocaleLowerCase(),
  upperLetters = generateLetters(),
  numbers = '0123456789',
  typeRanges = ['数字', '大写字母', '小写字母', '符号', '汉字'],
  operateCharArray = [
    ['`', '反引号'],
    ['~', '波浪号'],
    ['!', ''],
    ['@', '同单词at'],
    ['#', ''],
    ['$', '同单词dollar'],
    ['%', ''],
    ['^', '尖角号'],
    ['&', '同单词and'],
    ['*', '星号'],
    ['\\', '反斜杠'],
    ['/', '斜杠'],
    ['(', '左小括号或左圆括号'],
    [')', ''], ['[', '左中括号或左方括号'],
    [']', ''],
    ['{', ''],
    ['}', '右大括号或右花括号'],
    ['<', ''],
    ['>', '大于号或右尖括号'],
    ['_', '下划线'],
    ['|', '竖杠或管道符'],
    [',', ''],
    ['.', '小数点或英文句号'],
    [';', ''],
    ['?', ''],
    [':', ''],
    ['\'', '单引号'],
    ['\"', '双引号'],
    ['+', ''],
    ['-', ''],
    ['×', ''],
    ['÷', ''],
    ['=', ''],
    ['。', ''],
    ['《', '左书名号'],
    ['》', '']
  ],
  passHanZi = [
    '一二三四五六七八九十' +
    '人口手上中下大小不对' +
    '子了月水火海头眼耳鼻' +
    '舌牙脚地鸡蛋爸妈爷奶' +
    '姥打牛车太阳阿洛吃喝来',
    '饭米面饼干渣馒碗杯勺' +
    '穿脱衣服裤袜鞋帽肚嘴' +
    '床搂瞌睡梦醒抱熊尿纸' +
    '咸瓶看见书桌板凳佩奇' +
    '走跑跳路轮扔哭几岁宝',
    '金木土生克阴天地山家' +
    '黑白彩色红绿黄蓝紫画' +
    '云草树鸟虫鱼虾玉麦肉' +
    '春暖夏热秋凉冬冷青岛' +
    '风雨雷电雪花草球单杠'
  ],
  animations = ['rollIn', 'bounceInDown', 'bounceInLeft', 'bounceInUp', 'bounceInRight', 'flip', 'flipInY', 'rotateIn',
    'bounce', 'rubberBand', 'swing', 'pulse', 'shake', 'tada', 'wobble', 'jello', 'heartBeat'],
  okSounds = ['ok_aluo', 'ok_father01', 'ok_father02', 'ok_father03', 'ok_father04', 'ok_father05', 'ok_laolao01', 'ok_laolao02',
    'ok_laolao03', 'ok_laolao04', 'ok_mother01', 'ok_mother02'].map(item => item + '.mp3');
