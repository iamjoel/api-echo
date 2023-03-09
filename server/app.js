const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8081

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const jwt = require('jsonwebtoken')
var { expressjwt } = require("express-jwt")
const secretKey = 'joel';

// app.use(expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({ path: ['/', '/login'] }))

app.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(user.username, user.password)

    if (user.username === 'admin' && user.password === '1') {
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

        res.json({
        success: true,
        message: 'Authentication success.',
        token: token
        });
    } else {
        // Return error to client
        res.status(401).json({
        success: false,
        message: 'Authentication failed'
        });
    }
})

app.post('/register', (req, res) => {
    const tel = req.body.tel
    res.json({
        success: true,
        tel
    })
})

app.get('/list', (req, res) => {
    res.send({
        total: 3,
        data: [
            {
                id: 1,
                name: 'Apple',
                price: 100
            },
            {
                id: 2,
                name: 'Orange',
                price: 200
            },
            {
                id: 3,
                name: 'Banana',
                price: 300
            }
        ]
    })
})


app.get('/echo-header', (req, res) => {
    res.send({
        ...req.headers
    })
})

//Websocket
const expressWs = require('express-ws')(app)
app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
        ws.send(`Got message: ${msg}`);
    })
})

// setTimeout(() => {
//     ws.send(`Are your there: ${msg}`);
// }, 1000)

app.get('/', (req, res) => {
    res.send('rootpath')
  })

app.listen(port, () => {
  console.log(`App run on port ${port}`)
})