# ks-vant-template
```
ks-cli的h5-vant模板,包括：
Babel
dart-sass
Typescript
router
Vuex
eslint
test
core-js
PostCSS
autoprefixer
axios
utils
通用组件
vant
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目结构
```
├── babel.config.js				// babel配置文件
├── package.json				// npm包配置文件，依赖信息
├── public						// 入口文件目录
│   ├── favicon.ico
│   └── index.html
├── README.md				    // 项目描述说明文件
├── src						    // 项目代码主目录
│   ├── api					    // 接口请求，统一管理
│   │   └── index.ts			// 接口请求，统一封装axios文件
│   ├── App.vue				    // 根组件
│   ├── assets				    // 资源放置目录
│   │   ├── images			    // 图片资源
│   │   ├── js					
│   │   └── style			    // 样式目录，reset.scss、variables.scss等
│   ├── components			    // 组件目录，根据功能分子目录
│   ├── main.ts				    // 入口js文件
│   ├── mock (可选)			    // 临时目录，用于mock数据模拟
│   ├── pages (可选)			// 多页面应用时，子文件分目录页面
│   ├── router				    // 统一配置路由规则
│   │   └── index.ts
│   ├── store				    // 统一状态管理目录，vuex
│   │   └── index.ts
│   ├── types				    // 类型目录，ts类型
│   ├── utils (可选)			// 公共js目录
│   └── views				    // 单页面应用页面文件
├── static						// 静态资源，不会被webpack构建
├── tests	(可选)				// 用于单元测试用例编写
└── tsconfig.json				// 统一配置ts目录
```
