### AJAX
对于AJAX（ Asynchronous JavaScript and XML），我们都知道，它并不是js的技术规范，而是浏览器从服务器获取数据的一种实现方案。在很久以前，浏览器从服务器请求数据都是以刷新整个网页（服务器负责对页面数据进行变动）为代价，因此谈不上用户体验。后来有了AJAX，才算是抹去了这个根深蒂固的问题，网页可以实现局部刷新，用户体验更优。也因此，前端开始逐渐与后端分离，因为有了AJAX，浏览器不在需要服务器对页面进行数据刷新。因为浏览器本身就可以对网页进行数据刷新，所以通过AJAX，浏览器从服务器获取到数据后，进行页面局部更新，比服务器效果更好。

### XMLHttpRequest
`XMLHttpRequest`是浏览器内置的API--构造函数，用以实现浏览器（客户端）和服务器之间的数据交互（请求）。该对象，就是实现AJAX方案的核心。   

```
var xhr = new XMLHttpRequest()
```
### XMLHttpRequest的核心属性
#### 1.readyState

`xhr.readyState`：用以标示客户端发起的请求的当前状态，如下，存在四中状态：      

`0	UNSENT  (未打开)	open()方法还未被调用` 
         
`1	OPENED  (未发送)	send()方法还未被调用  `       

`2	HEADERS_RECEIVED (已获取响应头)	send()方法已经被调用, 响应头和响应状态已经返回`
   
`3	LOADING (正在下载响应体)	响应体下载中; responseText中已经获取了部分数据 `
  
`4	DONE    (请求完成)	整个请求过程已经完毕 `

#### 2.response
`xhr.response`：请求后的响应实体，即服务器给我们返回的数据，其类型由responseType决定,可以是`ArrayBuffer， Blob， Document， json`，对于读取返回数据我们一般是使用reponse对象。

#### 3.responseType
`xhr.responseType`：告诉服务器我们想要接收的数据类型。如：`ArrayBuffer， Blob， Document， json，text`等

#### 4.status
`xhr.status`：请求响应的状态码，如200表示请求成功"OK"，404表示"NOT FOUND"，只能在readyStateb不小于3时使用，其他情况会报错


### XMLHttpRequest的核心事件
#### 1.onreadystatechange
`xhr.onreadystatechange`：XMLHttpRequest内置的监听函数，见名知意，当 readyState 的状态发生变化时会被调用，如 readyState状态从 0 到 1 ，或者从1到2等等，都会执行该函数。
```
xhr.onreadystatechange = function () {
}
```

### XMLHttpRequest的核心方法
#### 1.open()
`xhr.open()`：用于初始化一个请求，但并没有发起请求，只是对请求需要的参数进行配置   
参数：  
1.method 请求方法，如 GET POST等等   
2.url 请求的URL   
3.async boolean类型，可选   
4.user 用户名，可选   
5.password 密码，可选   

#### 2.send()  
`xhr.send()`：发送请求，GET请求可传空，POST请求则传入提交数据
### 使用示例


	// 1.实例化XMLHttpRequest对象
	var xhr = new XMLHttpRequest();
	
	var xhrDONE = 4;//请求完成标示
	var xhrOK = 200;//请求成功标示附

	// 2.初始化请求参数（并不发送请求）
	xhr.open("GET", "http://localhost:8888/api", true);

	// 3.发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。
	xhr.send(); //POST时 xhr.send(data);

	// 4.监听每次请求状态的变化，直到请求完成
	xhr.onreadystatechange = function () {
		
		if(xhr.readyState === xhrDONE && xhr.status === xhrOK) {
		    console.log(xhr.response);
		}
	}

