let deck = [];
let deckView = false;

/* Adds given card to deck 
 *
 * @param[in] card -- card to add to deck
 * */
function addCardToDeck(card)
{
  deck.push(card);
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
