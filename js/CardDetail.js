let cardDetailSvg = null;

function initCardDetailChart(selectTag){
  // ============================================================
  // Svg and lineChart object creation
  // ============================================================
  ownTag = selectTag;
  cardDetailSvg = d3.select(ownTag);
  // console.log(svg);
}

function initCardDetailChartData(card){
  // console.log("initing the card chart data");
  initCardDetailChart('#cardDetail');
  updateCardDetailChart(card);
}

function updateCardDetailChart(card){
  console.log(card);
  updateImage(card);

  cardDetailSvg.selectAll("*").remove();
  appendParagraph("Name", card.name);

  appendParagraph("Type", card.type);

  if(getManaCost(card)!=""){
    appendParagraph("Mana Cost", getManaCost(card));
    appendParagraph("Converted Mana Cost", card.cmc);
  }

  if(card.types==="Creature"){
    appendParagraph("Power", card.power);
    appendParagraph("Toughness", card.toughness);
  }

  if(!(card.text === "")){
    appendParagraph("Effect", presentableText(card.text));
  }

  if(!(card.flavor === "")){
    appendParagraph("Flavor Text", presentableText(card.flavor));
  }
  appendParagraph("Printings", card.printings.replaceAll(",", ", "));
}

function appendParagraph(titleText, content){
  var paragraph = cardDetailSvg.append('p');
  paragraph.html(titleText.bold() + ": " + content);
}
