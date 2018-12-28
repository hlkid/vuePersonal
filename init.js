//vue初始化项目
//vue init webpack name(eslint,ete，unit选N)

// IE兼容
// 1、npm install babel-polyfill --save-dev
// 2、webpack.base.conf.js中：entry: {
//     app: ["babel-polyfill", "./src/main.js"]
//   },
// 3、main.js中import 'babel-polyfill'

// 使用vuex（）
// 1、npm install --save-dev vuex

// 安装less依赖
// npm install less less-loader --save-dev

// 使用elementui
// 1、npm install element-ui --save
// 2、man.js中：
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';//不能缺
// Vue.use(ElementUI)

// 使用jquery
// npm install --save jquery

// 使用icon
// npm install vue-svg-icon --save-dev

// 使用swiper swiper4不兼容IE9+
// npm install swiper@3 --save-dev