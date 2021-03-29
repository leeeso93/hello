// 백엔드 시작점
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://lee:abcd1234@react-signup.kvb0q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=> console.log('MongeDB connented...'))
    .catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~~~')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})