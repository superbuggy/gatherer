const getMtgJson = require('mtg-json');
const app = require('express')();
const data = require('./AllCards.json');

//Request AllCards.json and store it in the current directory
app.get("/grabem", (req, res) => {
  getMtgJson('cards', __dirname).then(json => {
    console.log(json) // Logs ['Creature']
  });
  res.send({success:true})
})

app.get("/cards?page=:page", (req, res)=>{
  console.log(req.params.page);
  let cards = Object.keys(data).map( cardName => data[cardName] );
  res.send( cards )
})

app.get("/cards/:id", (req, res)=>{
  let cards = Object.keys(data).map( cardName => data[cardName] );
  res.send(cards[req.params.id]);
})
app.listen(3000)
