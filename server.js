const express = require('express')
const app = express()

const fs = require('fs')

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8000 })

app.use(express.static('public'))

wss.on('connection', function connection(ws) {
  // Server get message
  ws.on('message', function incoming(message) {
    console.log('[ Server > data received ✅]')
    console.log('received: %s', message)
    console.log('------------------------------------')

    ws.send(`${message}`)
  })

  //   ws.send('something')
})

//index.js
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') })

  fs.readFile('./public/index.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    res.end()
  })
})

app.listen(process.env.PORT || 8080)

module.exports = app
