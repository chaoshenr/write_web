### 什么是Promise ?
1.ES6新增语法(对象)  
2.一个容器，里面保存着某个未来才会结束的事件的结果   
3.异步编程的解决方案，使得异步函数以同步的方式表示，避免了传统异步处理的回调地狱。    

### 回顾我们曾经一度使用的回调
首先我们模拟一个场景，比如我们要发起三个网络请求，request1、request2，request3依赖于request1的请求完成才能发起请求，request3依赖于request2的请求完成。按照以前我们实现异步回调的方式，如下：
示例1：   
```
request1(function (res1) {
	console.log(res1);

	request1(function (res2) {
		console.log(res2);

		request2(function (res3) {
			console.log(res3);
		})
	})
})
function request1(fn) {		
	setTimeout(function () {
		fn("request1");
	},1000)		
}
function request2(fn) {
	setTimeout(function () {
		fn("request2")
	},500)				
}
function request3(fn) {
	setTimeout(function () {
		fn("request3")
	},700)	
}
```
这种业务逻辑应该是我们在处理请求的时候经常会遇到的，并且跟我上面实现的代码逻辑也类似。我们忍不住会想，如果依赖的请求再多来几层，那么option函数中的回调嵌套岂不是越来越深，多丑啊？确实如此，虽然回调层数较多的场景不是太多，但是一旦我们遇到了，就会进入不断的写嵌套回调的魔咒，这就是我们常说的回调地狱。

### 且看Promise如何处理回调

按照上面的业务场景，使用Promise进行重写：    
示例2：
```
var request1 = new Promise(function (resolve, reject) {
	var data = "1";
	setTimeout(function () {
		if (data) {
			console.log("request1 success")
			resolve("request1 success");
		}else{
			reject("request1 error");
		}
	},500)
});
request1
	.then(request2)
	.then(request3);
	
function request2(data) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (data) {
				console.log("request2 success")
				resolve("request2 success");
			}else{
				reject("request2 error");
			}
		},700)
	})	
}
function request3(data) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			if (data) {
				console.log("request3 success")
				resolve("request3 success");
			}else{
				reject("request3 error");
			}
		},800)
	})	
}
```
有没有很吃惊Promise的能力，完全颠覆了我们对异步操作的认知，比着示例1，异步代码看着像写同步代码一样，回调层数较多时，嵌套调用变成了链式调用，代码的组织方式更加优雅和整洁。现在我们了解到了Promise的强大了，那么接下来就分析下Promise的语法。

### Promise简介
#### Promise-构造函数
通过 `new` 初始化一个Promise实例对象作为接口。

```
var promise = new Promise(function(resolve, reject){

})
```
#### Promise-状态
Promise存在以下三种状态：
`pending`: 初始化状态，操作未fullied(完成)或者reject(失败)   
`fulfilled`: 操作成功完成   
`rejected`: 操作失败   
一个处于pending状态的Promise对象，随时可能会在成功(fulfilled)时返回一个值，也可能失败(rejected)是返回原因。无论是成功或者失败，只要触发了，Promise 的 then方法关联的事件队列将会被执行，如下图：
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="862" height="342" viewBox="-0.5 -0.5 862 342" stroke="#000" stroke-linecap="round" stroke-linejoin="round" fill="#fff" fill-rule="evenodd" font-family="Roboto" font-size="14" text-anchor="middle"><style>svg text{stroke:none}</style><defs><linearGradient id="L10010000057c7ff1008ad8ff.grad" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#57c7ff"/><stop offset="100%" stop-color="#8ad8ff"/></linearGradient><linearGradient id="L100100000ffe357100ffeb8a.grad" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#ffe357"/><stop offset="100%" stop-color="#ffeb8a"/></linearGradient><path d="M0 0l3 10h-6z" stroke="none" id="thin.end"/></defs><path fill="url(#L10010000057c7ff1008ad8ff.grad)" stroke="url(#L10010000057c7ff1008ad8ff.grad)" d="M0 0h85v40H0z" transform="translate(0 150)"/><text fill="#000" font-weight="bold" transform="translate(0 150)"><tspan x="42.5" y="25.6">Promise</tspan></text><path stroke="url(#L100100000ffe357100ffeb8a.grad)" fill="url(#L100100000ffe357100ffeb8a.grad)" d="M0 0h150v40H0z" transform="translate(230 90)"/><text fill="#000" transform="translate(230 90)"><tspan x="75" y="25.6">.then(onFulfillment)</tspan></text><path fill="url(#L100100000ffe357100ffeb8a.grad)" stroke="url(#L100100000ffe357100ffeb8a.grad)" d="M0 0h150v40H0z" transform="translate(230 210)"/><text fill="#000" transform="translate(230 210)"><tspan x="75" y="17.2">.then(onRejection)</tspan><tspan x="75" y="34">.catch(onRejection)</tspan></text><path fill="url(#L100100000ffe357100ffeb8a.grad)" stroke="url(#L100100000ffe357100ffeb8a.grad)" d="M0 0h150v40H0z" transform="translate(360)"/><text fill="#000" transform="translate(360)"><tspan x="75" y="25.6">async actions</tspan></text><path fill="url(#L100100000ffe357100ffeb8a.grad)" stroke="url(#L100100000ffe357100ffeb8a.grad)" d="M0 0h150v40H0z" transform="translate(360 300)"/><text fill="#000" transform="translate(360 300)"><tspan x="75" y="25.6">error handling</tspan></text><path fill="url(#L10010000057c7ff1008ad8ff.grad)" stroke="url(#L10010000057c7ff1008ad8ff.grad)" d="M0 0h85v40H0z" transform="translate(560 150)"/><text fill="#000" font-weight="bold" transform="translate(560 150)"><tspan x="42.5" y="25.6">Promise</tspan></text><path fill="url(#L100100000ffe357100ffeb8a.grad)" stroke="url(#L100100000ffe357100ffeb8a.grad)" d="M0 0h150v40H0z" transform="translate(710 150)"/><text fill="#000" transform="translate(710 150)"><tspan x="75" y="17.2">.then()</tspan><tspan x="75" y="34">.catch()</tspan></text><g transform="translate(85 110)"><path fill="none" d="M0 60h55V0h80"/><use class="EndArrow.cls" fill="#000" x="145" xlink:href="#thin.end" transform="rotate(90 145 0)"/><text fill="#000" transform="translate(17.5 -45)"><tspan x="75" y="35.6">fulfill</tspan></text></g><g transform="translate(85 170)"><path fill="none" d="M0 0h55v60h80"/><use class="EndArrow.cls" fill="#000" x="145" y="60" xlink:href="#thin.end" transform="rotate(90 145 60)"/><text fill="#000" transform="translate(20 45)"><tspan x="75" y="35.6">reject</tspan></text></g><g transform="translate(320 20)"><path fill="none" d="M0 70V0h30"/><use class="EndArrow.cls" fill="#000" x="40" xlink:href="#thin.end" transform="rotate(90 40 0)"/></g><g transform="translate(320 250)"><path fill="none" d="M0 0v70h30"/><use class="EndArrow.cls" fill="#000" x="40" y="70" xlink:href="#thin.end" transform="rotate(90 40 70)"/></g><g transform="translate(380 110)"><path fill="none" d="M0 0h70v60h100"/><use class="EndArrow.cls" fill="#000" x="180" y="60" xlink:href="#thin.end" transform="rotate(90 180 60)"/><text fill="#000" transform="translate(40 15)"><tspan x="87.5" y="35.6">return</tspan></text></g><g transform="translate(380 170)"><path fill="none" d="M0 60h70V0h100"/><use class="EndArrow.cls" fill="#000" x="180" xlink:href="#thin.end" transform="rotate(90 180 0)"/></g><g transform="translate(645 170)"><path fill="none" d="M0 0h55"/><use class="EndArrow.cls" fill="#000" x="65" xlink:href="#thin.end" transform="rotate(90 65 0)"/></g><g><text fill="#000" transform="translate(560 115)"><tspan x="42.5" y="20.6">pending</tspan></text></g><g><text fill="#000" transform="translate(230 60)"><tspan x="37.5" y="18.1">settled</tspan></text></g><g><text fill="#000" transform="translate(0 115)"><tspan x="42.5" y="20.6">pending</tspan></text></g></svg>





