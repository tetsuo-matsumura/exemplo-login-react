const express = require(`express`)
const cors = require('cors')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const SECRET = 'bananaphone'

const database = {
  56742357: {
    username: 'tetsuo',
    password: 'h4x0r',
    profile_pic: 'https://media-exp1.licdn.com/dms/image/D4D03AQH1e5aDwazB-Q/profile-displayphoto-shrink_200_200/0/1664501805329?e=1669852800&v=beta&t=hApBuJjIrT3oeUeWHKWH9y3yvSOTecftNKVHnTXmmLA'
  }
}

const validateLogin = (username, password) => {
  let userIndex = Object.values(database).findIndex(user => user.username === username)
  let userId = Object.keys(database)[userIndex]
  if (database[userId].password === password) return userId
}

app.get('/validate/:token', (req, res) => {
  const { token } = req.params
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(500).json({
      message: 'Token inválido'
    })

    res.json({
      message: 'Token válido',
      user: database[decoded.userId]
    })
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  let userId = validateLogin(username, password)
  if (userId) {
    let token = jwt.sign({ userId }, SECRET, { expiresIn: 300 })
    res.send({
      message: "Login OK",
      token: token
    })
  } else {
    res.send({
      message: "Login Falhou",
      token: null
    })
  }
})

app.post('/signup', (req, res) => {
  const { username, password } = req.body
  let userId = uuid.v4()
  database[userId] = {
    username,
    password,
    profile_pic: 'https://picsum.photos/200'
  }
  let token = jwt.sign({ userId }, SECRET, { expiresIn: 300 })
  res.send({
    message: "Cadastro OK",
    token: token
  })
})

app.listen(`3333`, () => {
  console.log("Server listening at 3333")
})