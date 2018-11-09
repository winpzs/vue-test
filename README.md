# api-console

> api-console for vue2

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9696
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 使用 TypeScript

- 安装typescript 2.x
- 安装ts-loader 3.x
- build\webpack.base.conf.js配置：

```javascript

...
vueLoaderConfig.ts = 'ts-loader';
...

  module: {
    rules: [
    //在vue-loader之前
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src/,
        loader: "ts-loader"
      }
      ...


```

## 按router配置分片打包

- 修改build\auto-router.js的writeJs方法内容

```javascript
// routes=routes.replace(/\"##require_placeholder_begin##/g,'require').replace(/##require_placeholder_end##\"/g,'');
    
    routes=routes.replace(/\"##require_placeholder_begin##/g,`function (cb) {
        require.ensure([], function () {
            cb(require`).replace(/\'\)##require_placeholder_end##\"/g,`.vue'));
        });
    }`);
```


## 将pages下所有的shared目录不添加进router表

- 修改build\auto-router.js内容

```javascript

...
function run(devMode){
    ...
    let tmList = [];
    const sharedReg = /\/shared\//i;
    routes.forEach(function(item){
        if (!sharedReg.test(item.path)) tmList.push(item);
    });
    routes = tmList;

    writeJs(pagesPath,JSON.stringify(routes,(key,value)=>{
    ...
    }
    ....
}
```