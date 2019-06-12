# bs-ui-xxx

[Base Readme](./base/README.md)
> 这个项目是从bs-ui-seed基础创建出来的. 请查看`base/README.md` 来了解其基础内容.

基于百度echarts的小程序图表组件。

## 功能介绍

- 基础图表功能
- touch事件修正
- 微信版本检测
- ios 兼容性

## 使用方法

1. 安装

```js
npm i bs-ui-echarts -s
```

2. .json

```js
"usingComponents": {
    "bs-echarts": "../bs-ui-echarts/index"
  }
```
3. .wxml

```xml
<bs-chart
    canvas-id="chart-id"
    class="echart-class"
    option="{{options}}"
/>
```

4. .js

```js
onReady() {
    this.setData({
        options: yourChartOptions
    });
}
```

## 接口说明

### Properties

| Property        	| Type    	| Required 	| Default Value          	| Comments                           	|
|-----------------	|---------	|----------	|------------------------	|------------------------------------	|
| `canvasId`        	| String  	| required 	| --                     	|                                    	|
| `option`          	| Object  	| required 	| --                     	| echart 选项,数据变化会重新触发加载 	|
| `ec`              	| Object  	| optional 	| {   lazyLoad:  true  } 	| 自定义扩展选项                     	|
| `showNoData`      	| Boolean 	| optional 	| true                   	| 是否呈现no data提示                	|
| `componentHidden` 	| Boolean 	|          	| true                   	|                                    	|