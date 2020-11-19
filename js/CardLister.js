
let cardChartData = null;
let ownClass = null;
let ownTag = null;
let svg = null;
let table = null;

function initCardChart(selectTag, chartClass)
{
  // ============================================================
  // Svg and lineChart object creation
  // ============================================================
  ownClass = chartClass;
  ownTag = selectTag;
  svg = d3.select(ownTag);

}

function initCardChartData(data)
{
  console.log("initing the card chart data");
  initCardChart('#cardChart',"cardoverallChartObj");
  updateCardChart(data);
}

function updateCardChart(data) {
  // used this to help set this up  https://www.vis4.net/blog/2015/04/making-html-tables-in-d3-doesnt-need-to-be-a-pain/

  cardChartData = data;
  let cards = deepCopyButMakesCards(data);
  console.log(cards);

  svg.selectAll("*").remove();
  table = svg.append('table');

  let rows = table.selectAll('tr')
    .data(cards).enter()
    .append('tr')

  rows.append('td').html(function(m){return displayableString(getManaCost(m));});
  rows.append('td').html(function(m){return displayableString(m.name)})
    .on('click', function(m){console.log(m);});
  rows.append('td').html(function(m){return displayableString(m.types.split(',')[0])});
  rows.append('td').html(function(m){return displayableString(m.type)});
}
