const  getMtgJson = require('mtg-json')

const  express = require('express')
const  app = express()
const  data = require('./AllCards.json')
const  cors = require('cors')();

app.use( express.static('views') )
app.use( cors )

//Request AllCards.json and store it in the current directory
app.get("/pulljson", (req, res) => {
  getMtgJson('cards', __dirname)
    .then(json => {
      console.log(json)
      res.send({success: true})
    })
    .catch( err =>
      res.send({
        success: false,
        err
      }
    ));
})

app.get("/cards/:id?", (req, res) => {
  let cards = Object.keys(data).map( cardName => data[cardName] )
  console.log(req.params.id)
  res.json( (req.params.id) ? cards[req.params.id] : data)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.listen(3000)
