const express = require('express')
let app = express()
// 建立http服務器連接app
app.use(express.static('public'))
let http = require('http').createServer(app)



let port = 3000 ;
http.listen(port,()=>{
    console.log('server is running')
})


// 建立socketio Server
let io = require('socket.io')(http)
// 監聽
let count = 0

io.on('connection',(client)=>{
    console.log('users are coming~')
    //計算用戶登入
    count++
    io.emit('countUpdate',count)
    //計算用戶登出
    client.on('disconnect',(data)=>{
        count--;
        io.emit('countUpdate',count)
    })
    
    client.on('newMessage',(msg)=>{
        console.log('玩家消息:' + msg)
        io.emit('newMessage',msg)
    })
})

// app.get('/login.html',(req,res)=>{
//     res.send('fff')
// })

