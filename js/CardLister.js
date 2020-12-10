let cardChartData = null;
let ownClass = null;
let ownTag = null;
let svg = null;
let table = null;

let pageIndex = 0;
let pageSize = 10;
let curCard = null;

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

  maxNumberofPages =  (cardChartData.length / pageSize)|0;
  if(pageIndex < 0){
    pageIndex = 0;
  }
  else if (pageIndex > maxNumberofPages-1) {
    pageIndex = maxNumberofPages-1
  }
  updateCardChart(cardChartData);
}

function updateCardChart(data) {
  // used this to help set this up  https://www.vis4.net/blog/2015/04/making-html-tables-in-d3-doesnt-need-to-be-a-pain/
  if(data!=cardChartData){
    cardChartData = data;
    curCard = data[0];
    pageIndex = 0;
  }
  let cards = deepCopyButMakesCards(cardChartData).slice(pageIndex*pageSize,(pageIndex+1)*pageSize);
  // console.log(cards);

  svg.selectAll("*").remove();
  table = svg.append('table').attr('class','cardTable');

  header = table.append("tr").attr("class", "tableHeader");
  header.append('th').html("Name");
  header.append('th').html("Total Mana Cost");
  header.append('th').html("Type");


  let rows = table.selectAll('.tableRow')
    .data(cards).enter()
    .append('tr')
    .attr("class", "tableRow")
    .on('click', function(m){
      updateCardDetailChart(m);
      curCard = m;
    })
    .on('mouseover', function(m) {
      updateCardDetailChart(m);
    })
    .on('mouseout',function(m){
      updateCardDetailChart(curCard);
    });


  rows.append('td').html(function(m){return displayableString(m.name)});
  rows.append('td').html(function(m){return displayableString(getManaCost(m));});
  rows.append('td').html(function(m){return displayableString(m.type)});

  headerButtons = table.append("tr").attr("class", "tableHeader");
  headerButtons.append('th').append("button").html("Previous Page").on("click", function(m){changePage(-1)});
  headerButtons.append('th').html("Current Page: " + pageIndex).append;
  headerButtons.append('th').append("button").html("Next Page").on("click", function(m){changePage(1)});

}
