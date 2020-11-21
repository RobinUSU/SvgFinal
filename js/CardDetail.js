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

  cardDetailSvg .selectAll("*").remove();
  cardDetailSvg .append('p').html(function(){return "Name: " + card.name;});
  cardDetailSvg .append('p').html(function(){return "Type: " + card.type;});
  cardDetailSvg .append('p').html(function(){return "Mana Cost: " + getManaCost(card);});
  cardDetailSvg .append('p').html(function(){return  "Converted Mana Cost: " + card.cmc;});

  if(card.types==="Creature"){
    cardDetailSvg .append('p').html(function(){return "Power: " + card.power});
    cardDetailSvg .append('p').html(function(){return "Toughness: " + card.toughness});
  }

  if(!(card.text === "")){
      cardDetailSvg .append('p').html(function(){return "Effect: " + card.text});
  }

  if(!(card.flavor === "")){
    cardDetailSvg .append('p').html(function(){return "Flavor Text: " + card.flavor});
  }
}
