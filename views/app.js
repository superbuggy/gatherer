angular
  .module("mtg", [
    "ngResource"
  ])
  .controller("CardController", [
    "Card",
    CardControllerFunc
  ])
  .factory("CardFactory", [
    "$resource",
    CardFactoryFunc
  ])

function CardControllerFunc(CardFactory){
  this.cards = Card.query()
}

function CardFactoryFunc($resource){
  return $resource( "localhost:3000/cards/:id", {id: "@id"}, {
    getAll: {
      method: "GET",
      params: {},
      isArray: true
    },
    get: {
      method: "GET",
      params: { id: "@id" },
      isArray: false
    }
  })
}
