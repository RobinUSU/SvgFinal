let deck = [];
let deckView = false;

function addCardToDeck(card)
{
  deck.push(card);
}

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
