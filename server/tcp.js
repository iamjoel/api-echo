//引入net模块
const net = require('net');
//实例化一个服务器对象
const server = new net.createServer(function (socket) {
    //监听data事件
    socket.on("data", function (data) {
        //打印数据
        console.log("接收到数据：" + data.toString());
        socket.write(`你好，我是服务器，我收到了你的数据：${data.toString()}`);
    });
});

//监听connection事件
server.on('connection', function (socket) {
    console.log('有新的客户端接入');
});

//设置监听端口
server.listen(8001);
//设置监听时的回调函数
server.on('listening', function () {
    console.log('服务正在监听 8001 端口中: 。。。');
});

//设置关闭时的回调函数
server.on('close', function () {
    console.log('服务已关闭');
});

//设置出错时的回调函数
server.on('error', function (err) {
    console.log('服务运行异常', err);
});