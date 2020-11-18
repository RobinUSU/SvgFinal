let lineChartData = null;
let areaChartData = null;
let scatterPlotData = null;
let barChartData = null;
let svgWidth = 1000;
let svgHeight = 800;
let margin = 100;
let width = svgWidth - 2 * margin;
let height = svgHeight - 2 * margin;

function initChart(selectTag, chartClass)
{
  // ============================================================
  // Svg and lineChart object creation
  // ============================================================
  let svg =
      d3.select(selectTag).attr('width', svgWidth).attr('height', svgHeight);
  let lineChart = svg.append('g')
                      .attr("class", chartClass)
                      .attr('transform', `translate(${margin}, ${margin})`);
  lineChart
    .append('g')
    .attr("class", "invertCanvas")
    .attr('transform', `translate(0, ${height})scale(1,-1)`)

  // ============================================================
  // Axis and axis label creation
  // ============================================================
  lineChart.append('g')
      .attr("class", "xAxis")
      .attr('transform', `translate(0, ${height})`)
      .style('font-size', '12px');

  lineChart.append('g').attr("class", "yAxis").style('font-size', '10px')

  svg.append('text')
      .attr("class", "yAxisLabel")
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.8)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')

  svg.append('text')
      .attr("class", "xAxisLabel")
      .attr('x', width / 2 + margin)
      .attr('y', height + margin + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')

  svg.append('text')
      .attr("class", "titleLabel")
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
}

function initBarChartData(dataSelect = 'colorIdentity', data)
{
  initChart('svg#barChart',"barChartObj");
  updateBarChart(dataSelect,data);
}

function updateBarChart(dataSelect = 'colorIdentity', data = barChartData) {
  barChartData = data;
  let yAxisLabel = 'Number of Creatures';
  let xAxisLabel = 'Color Identity';
  let titleLabel = 'Number of Creates by Color Identity';
  let selectTag = 'svg#barChart';
  let svg = d3.select(selectTag);
  let barChart = svg.select(".barChartObj");

  let dataAggregate = {};

  let colors = [];
  let colorAbv = [];
  var radios = document.getElementsByClassName('colorRadios');

  for (var i = 0, length = radios.length; i < length; i++) {
    colors.push(radios[i].alt);
    colorAbv.push(radios[i].value);
  }

  colorAbv.forEach(d => dataAggregate[d] = 0);

  barChartData.forEach(d => { dataAggregate[d[dataSelect]] += 1; });

  let yScale = d3.scaleLinear()
    .range([height,0])
    .domain([5000, 0]);
  let yScaleLabel = d3.scaleLinear()
    .range([0, height])
    .domain([5000, 0]);
  let xScaleAxis = d3.scaleBand()
    .range([0, width])
    .domain(colors);
  let xScale = d3.scaleBand()
    .range([0, width])
    .domain(colorAbv);

  barChart.select(".xAxis")
    .call(d3.axisBottom(xScaleAxis));
  barChart.select(".yAxis")
    .call(d3.axisLeft(yScaleLabel));

  svg.select('.xAxisLabel')
      .text(xAxisLabel);
  svg.select('.yAxisLabel')
      .text(yAxisLabel);
  svg.select('.titleLabel')
      .text(titleLabel)

  var u = barChart
    .select(".invertCanvas")
    .selectAll('.barChartBars')
    .data(Object.entries(dataAggregate));

  u
    .enter()
    .append('rect')
    .attr("class","barChartBars")
    .attr('x', (d) => xScale(d[0]))
    .attr('y', (d) => 0)
    .attr('width', xScale.bandwidth() - 20)
    .attr('height', 0)
    .on('mouseover', function(d,i) {
      d3.select(this).style('fill', 'red')
    })
    .on('mouseout', function(d,i) {
      d3.select(this).style('fill', 'black')
    })
    .merge(u)
    .transition()
    .duration(1000)
    .delay(100)
    .attr('x', (d) => xScale(d[0]))
    .attr('height', (d) => yScale(d[1]));

  u.exit()
    .transition()
    .duration(1000)
    .delay(100)
    .attr('height', yScale(0));

  barChart
    .select(".invertCanvas")
    .selectAll('.barChartBars')
    .html("")
    .append('title')
    .text(d => `${d[1]}`)
  ;
}
