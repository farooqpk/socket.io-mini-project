
const express = require('express')
let app = express()
let server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })
let { engine } = require('express-handlebars')
const path = require('path')

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: false,
    layoutsDir: false,
    partialsDir: false
}))


app.get('/', (req, res) => {

    res.render('index')

})



io.on('connection',(socket)=>{
    console.log('user connected:'+socket.id);

    socket.on('message',(data)=>{
        
        socket.broadcast.emit('message',data)
    })

    
})


server.listen(3000, () => {
    console.log('listend');
}) 
