let deck = [];
let deckView = false;

/* Adds given card to deck
 *
 * @param[in] card -- card to add to deck
 * */
function addCardToDeck(card)
{
  if(!deck.includes(card)){
    deck.push(card);
  }
}

function removeCardFromDeck(card){
  if(deck.includes(card)){
    deck.splice(deck.indexOf(card),1);
  }
}

/* Activates or Deactivates deck depending on current state, then update page*/
function activateDeckView()
{
  let deckButton = document.getElementById('deckButton');
  if (deckView)
  {
    deckView = false;
    d3.select(deckButton).attr('class', '');
  }
  else
  {
    deckView = true;
    d3.select(deckButton).attr('class', 'active');
  }

  update();
}
