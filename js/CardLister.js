let cardChartData = null;
let ownClass = null;
let ownTag = null;
let svg = null;
let table = null;

let pageIndex = 0;
let pageSize = 10;
let curCard = null;
let sort = false;

function initCardChart(selectTag, chartClass){
  // ============================================================
  // Svg and lineChart object creation
  // ============================================================
  ownClass = chartClass;
  ownTag = selectTag;
  svg = d3.select(ownTag);


  sortButtonArea = svg.append('div');
  sortSelector = sortButtonArea.append('select');
  sortSelector.attr("id", "sortSelector");
  sortSelector.append("option").attr("value","alpha").html("Alphabetical Order");
  sortSelector.append("option").attr("value","-alpha").html("Reverse Alphabetical Order");
  sortSelector.append("option").attr("value","manaCost").html("Mana Cost High to Low");
  sortSelector.append("option").attr("value","-manaCost").html("Mana Cost Low to High");
  sortButtonArea.append("button").html("Sort").on("click", function(m){
      sort = true;
      updateCardChart(cardChartData);
      });
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
    console.log(data);
    cardChartData = data;
    curCard = data[0];
    pageIndex = 0;
  }
  if(sort){
    sort = false;
    pageIndex = 0;
  }


  let cards = deepCopyButMakesCards(cardChartData);
  cards = sortCustom(cards).slice(pageIndex*pageSize,(pageIndex+1)*pageSize);
  // console.log(cards);

  svg.selectAll("table").remove();
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

function sortCustom(cards){
  let value = document.getElementById("sortSelector").value;
  // console.log(value);

  if(value.includes("alpha")){
    cards.sort(function(a,b){
        if(a.name > b.name){
          return 1;
        }
        else if(a.name < b.name){
          return -1;
        }
        return 0;
     });
   }
   if(value.includes("manaCost")){
     cards.sort(function(a,b){
         if(a.cmc < b.cmc && b.cmc!=""){
           return 1;
         }
         else if(a.cmc > b.cmc && a.cmc!=""){
           return -1;
         }
         return 0;
      });
   }
   if(value.includes("-")){
     cards.reverse();
   }
   return cards;
}
