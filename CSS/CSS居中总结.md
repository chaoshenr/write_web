## CSS居中总结
### 1.文本的水平垂直居中

```
line-height: ...
text-align: center;

仅适用于单行文字

<div class="text_center">这是一个文本水平垂直居中样例</div>

.text_center {
	height: 100px;
	width: 100%;

	line-height: 100px;
	text-align: center;

	background: green;
}
```

### 2.盒模型的水平垂直居中
盒模型一般由四部分组成：content-box(内容区)、padding-box(内边距)、border-box(边框)、margin-box(外边距)
#### (1)margin(左右外边距auto) + padding 填充
```
<div class="box_center">
	<div class="box_content"></div>
</div>

.box_center {
	width: 300px;
	height: 300px;
	margin: 20px auto;
	/*等价于
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
	*/
	background: #888;
}
.box_center .box_content {
	height: 120px;
	width: 130px;
	/*计算
	padding-top = (300 - 120) / 2
	padding-bottom同理
	padding-left = (300 - 130) / 2
	padding-fight同理
	*/
	padding: 90px 85px;
	background-color: green;
	background-clip: content-box;
}			
```
提示：这种方式兼容性很好，但不适合不定长度的内容居中，内边距的值过度依赖于容器的宽高以及内容区的宽高计算，并且在原生CSS中无法进行计算，只能人为计算出内边距，难以维护。

#### (2)calc动态计算 + padding 填充
`calc：`
1.支持简单的('+','-','*','/')四则运算
2.支持 百分比%,px,em,rem等单位的计算
3.可以混合使用各种单位进行计算
4.表达式中有'+' 和 '-'时，符号前后必须有空格，没有空格(width:calc(100%-20px)/2)是错误的
```
<div class="calc_center">
	<div class="calc_content"></div>
</div>

.calc_center {
	width: 300px;
	height: 300px;
	margin: 20px auto;
	background-color: #999;
}
.calc_center .calc_content {
	width: 100px;
	height: 100px;
	padding: -webkit-calc((100% - 100px) / 2);
	padding: -moz-calc((100% - 100px) / 2);
	padding: -ms-calc((100% - 100px) / 2);
	padding: calc((100% - 100px) / 2); 
	background-color: #333;
	background-clip: content-box;
}
```

提示：
可通过添加前缀兼容各浏览器，不再依赖父容器的宽高值，但是会依赖内容宽高值进行计算，存在一定的依赖性，不利于维护。


#### (3)margin填充

```	
<div class="margin_center">
    <div class="margin_content"></div>
</div>

.margin_center {
	width: 200px;
	height: 200px;
	/*margin-left: auto;
	margin-right: auto;*/
	overflow: hidden;
	background-color: #999;
}
.margin_center .margin_content {
	margin-left: auto;
	margin-right: auto;

	width: 100px;
	height: 100px;

	margin-top: 50px;
	background-color: green;
}
边距重叠：hasLayout 会影响一个盒子和其子孙的边距重叠。根据规范，一个盒子如果没有上补白和上边框，那么它的上边距应该和其文档流中的第一个孩子元素的上边距重叠。   
即：如果父容器没有设置 padding-top 和 border-top的话，父容器的外边距和第一个子元素的外边距会发生重叠。    
解决方案:    
    1.父容器设置 padding-top 或者 border-top
    2.父容器设置 overflow: hidden / auto
    3.父容器设置 position: absolute
    等等
```

### 3.absolute布局水平垂直居中
利用left：50%将盒子的左边先置于父容器的中点，然后再将盒子往左偏移盒子自身宽度的50%，即 50% + -50%
#### (1)absolue + margin填充
```
方式1
<div class="absolute_margin_center">
	<div class="absolute_margin_content"></div>
</div>

.absolute_margin_center {
	width: 200px;
	height: 200px;
	background-color: #888;
	position: relative;
	margin-left: auto;
	margin-right: auto;
}
.absolute_margin_center .absolute_margin_content {
	width: 100px;
	height: 100px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -50px;
	margin-left: -50px;
	background-color: green;
}

方式2
<!-- 视口居中同理 -->
<div class="absolute_center">
	<div class="absolute_content"></div>
</div>

.absolute_center {
	width: 300px;
	height: 300px;
	background-color: #888;
	margin: 20px auto;
	position: relative;
	overflow: auto;
}
.absolute_center .absolute_content {
	width: 100px;
	height: 100px;
	position: absolute;
	margin: auto;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: green;
}

```
提示：方式1和2兼容性很好，适合内容宽高固定的布局，方式1需要人工计算外边距，不便于后期维护。方式2不许人工计算偏移量，较好。

#### (2)absolue + transform转换
```
将上面示例 margin-top 和 maring-left 替换为 transform: translate(x,y)即可

transform: translate(-50%, -50%);
```
### 4.fixed视口水平垂直居中

```
<div class="fixed_center">视口居中</div>

.fixed_center {
	position: fixed;
	width: 200px;
	height: 200px;
	background-color: red;
	opacity: .6;
	margin: auto;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	line-height: 200px;
	text-align: center;
}
```

### 5.flexbox布局水平垂直居中

```
<div class="flexbox_center">
	<div class="flexbox_content"></div>
</div>

.flexbox_center {
	/*旧版语法*/
	display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    display: -moz-box; /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox; /* 混合版本语法: IE 10 */
    /*新版语法*/
    display: -webkit-flex; /* 新版本语法: Chrome 21+ */
    display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
	/*注意，设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。*/
	width: 300px;
	height: 300px;
	background-color: #888;
	/*新主轴对齐方式*/
	justify-content: center;/*水平方向居中*/
	-moz-justify-content: center;
	-webkit-justify-content: center;
	/*旧主轴对齐方式*/
	-moz-box-pack: center; /*Firefox*/
    -webkit-box-pack: center; /*Safari,Opera,Chrome*/
    box-pack: center;

    /*新交叉轴对齐方式*/
	align-items: center;/*垂直方向居中*/
	-moz-align-items: center;
	-webkit-align-items: center;
	/*旧交叉轴对齐方式*/
	-moz-box-align: center;
	-webkit-box-align: center;
	box-align: center;

}
.flexbox_center .flexbox_content {
	width: 100px;
	height: 100px;
	background-color: red;
}
```
提示：如果无需兼容低版本浏览器（如IE10以下），那么使用该方案是最便捷和稳妥的方式，且便于维护


