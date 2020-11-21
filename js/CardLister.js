
let cardChartData = null;
let ownClass = null;
let ownTag = null;
let svg = null;
let table = null;

let pageIndex = 0;
let pageSize = 10;

function initCardChart(selectTag, chartClass){
  // ============================================================
  // Svg and lineChart object creation
  // ============================================================
  ownClass = chartClass;
  ownTag = selectTag;
  svg = d3.select(ownTag);

}

function initCardChartData(data){
  // console.log("initing the card chart data");
  initCardChart('#cardChart',"cardoverallChartObj");
  updateCardChart(data);
}

function changePage(num){
  console.log(num);
  pageIndex += num;

  maxNumberofPages = cardChartData.length / pageSize;
  if(pageIndex < 0){
    pageIndex = 0;
  }
  else if (pageIndex > maxNumberofPages) {
    pageIndex = maxNumberofPages
  }
  updateCardChart(cardChartData);
}

function updateCardChart(data) {
  // used this to help set this up  https://www.vis4.net/blog/2015/04/making-html-tables-in-d3-doesnt-need-to-be-a-pain/
  if(data!=cardChartData){
    cardChartData = data;
    pageIndex = 0;
  }
  let cards = deepCopyButMakesCards(cardChartData).slice(pageIndex*pageSize,(pageIndex+1)*pageSize);
  // console.log(cards);

  svg.selectAll("*").remove();
  table = svg.append('table');

  header = table.append("tr");
  header.append('td').html("Total Mana Cost");
  header.append('td').html("Name");
  header.append('td').html("Type");

  let rows = table.selectAll('.tableRow')
    .data(cards).enter()
    .append('tr')
    .attr("class", "tableRow")
    .on('click', function(m){updateCardDetailChart(m);});

  rows.append('td').html(function(m){return displayableString(getManaCost(m));});
  rows.append('td').html(function(m){return displayableString(m.name)});
  rows.append('td').html(function(m){return displayableString(m.type)});
}
