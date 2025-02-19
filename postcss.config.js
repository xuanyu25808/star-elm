//安装postcss-px-to-viewport插件后的配置
module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:750,  //视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight:1334, //视窗的高度，对应的是我们设计稿的高度
      unitPrecision:5,    //指定'px'转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit:'vw',  //指定需要转换的视窗单位，建议使用vw
      selectorBlackList:['ignore'],//指定不需要转换的类
      minPixelValue:1,    //小于或等于'1px'不转换为视窗单位
      mediaQyery:false,   //允许在媒体查询中转换'px',
      exclude:[]   //包含DetailBottomBar的文件不需要转化  写正则
    },
  }
}
