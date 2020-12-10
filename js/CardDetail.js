let cardDetailSvg = null;

// initializes needed variables
function initCardDetailChart(selectTag){
  // ============================================================
  // Svg and lineChart object creation
  // ============================================================
  ownTag = selectTag;
  cardDetailSvg = d3.select(ownTag);
  // console.log(svg);
}

// sets up the detail chart
function initCardDetailChartData(card){
  // console.log("initing the card chart data");
  initCardDetailChart('#cardDetail');
  updateCardDetailChart(card);
}


// the display method
function updateCardDetailChart(card){
  // console.log(card);
  // updates the image to be that of the card
  updateImage(card);

  cardDetailSvg.selectAll("*").remove();


  // Adds the relevant statistics of the card
  appendParagraph("Name", card.name);

  appendParagraph("Type", card.type);

  // only display the mana cost if card has a cost
  if(getManaCost(card)!=""){
    appendParagraph("Mana Cost", getManaCost(card));
    appendParagraph("Converted Mana Cost", card.cmc);
  }

  // only display the power and toughness if card is a creature
  if(card.types==="Creature"){
    appendParagraph("Power", card.power);
    appendParagraph("Toughness", card.toughness);
  }

  // display effect if card has an effect
  if(!(card.text === "")){
    appendParagraph("Effect", presentableText(card.text));
  }

  // displays flavor text if there is flavor text
  if(!(card.flavor === "")){
    appendParagraph("Flavor Text", presentableText(card.flavor));
  }

  //displays printings
  appendParagraph("Printings", card.printings.replaceAll(",", ", "));
}

// adds the the paragraph with bolded titletext to the detailSVG
function appendParagraph(titleText, content){
  var paragraph = cardDetailSvg.append('p');
  paragraph.html(titleText.bold() + ": " + content);
}
