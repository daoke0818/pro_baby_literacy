export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    // title: process.env.npm_package_name || '', // 修改package里面的name为中文会报错
    title: '阿洛识字' || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'keywords', content: '识字,幼儿识字,幼小衔接,早教,宝宝早教,免费识字软件,宝宝认字,阿洛识字,宝宝学习'},
      {name: 'description', content: '阿洛识字,是一款免费的宝宝识字工具,使用简单,动画丰富,宝宝在玩的时候就学会了很多文字,包括数字、字母、符号、常用汉字'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: 'favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#87cefa'},
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/fromBootstrap.css',
    'element-ui/lib/theme-chalk/index.css',
    'animate.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  // 用generate打包时使用hash和相对路径./
  router: {
    mode: 'hash',
    base: '/'
  }

}
