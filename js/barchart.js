let svgWidth = 500;
let svgHeight = 600;
let margin = 100;
let width = svgWidth - 2 * margin;
let height = svgHeight - 2 * margin;

function initChart(selectTag, chartClass)
{
  // ============================================================
  // Svg and barChart object creation
  // ============================================================
  let svg =
      d3.select(selectTag).attr('width', svgWidth).attr('height', svgHeight);
  let barChart = svg.append('g')
                      .attr("class", chartClass)
                      .attr('transform', `translate(${margin}, ${margin})`);
  barChart
    .append('g')
    .attr("class", "invertCanvas")
    .attr('transform', `translate(0, ${height})scale(1,-1)`)

  // ============================================================
  // Axis and axis label creation
  // ============================================================
  barChart.append('g')
      .attr("class", "xAxis")
      .attr('transform', `translate(0, ${height})`)
      .style('font-size', '12px');

  barChart.append('g').attr("class", "yAxis").style('font-size', '10px')

  svg.append('text')
      .attr("class", "yAxisLabel")
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.8)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('fill', 'antiquewhite')

  svg.append('text')
      .attr("class", "xAxisLabel")
      .attr('x', width / 2 + margin)
      .attr('y', height + margin + 80)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('fill', 'antiquewhite')

  svg.append('text')
      .attr("class", "titleLabel")
      .attr('x', 2 * margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('fill', 'antiquewhite')
}

function initBarChartData(selectTag = 'svg#colorBarChart') {
  initChart(selectTag,"barChartObj");
}

function updateBarChart(
    data,
    dataSelect,
    filterSelect,
    yAxisLabel,
    xAxisLabel,
    titleLabel,
    selectTag,
    getSelectValues,
    aggregateData,
    adjustValues)
{
  let svg = d3.select(selectTag);
  let barChart = svg.select(".barChartObj");

  let resultArray = getSelectValues(filterSelect);
  let filterValues = resultArray[0];
  let filterValuesAbv = resultArray[1];

  let dataAggregate = aggregateData(data, filterValuesAbv, dataSelect);

  let adjustedValues =
      adjustValues(filterValues, filterValuesAbv, dataAggregate);
  filterValues = adjustedValues[0];
  filterValuesAbv = adjustedValues[1];
  let dataArray = adjustedValues[2];

  let yScale = d3.scaleLinear()
    .range([height,0])
    .domain([d3.max(dataArray.map(d => d[1])), 0]);
  let yScaleLabel = d3.scaleLinear()
    .range([0, height])
    .domain([d3.max(dataArray.map(d => d[1])), 0]);
  let xScaleAxis = d3.scaleBand()
    .range([0, width])
    .domain(filterValues)
    .padding(.1);
  let xScale = d3.scaleBand()
    .range([0, width])
    .domain(filterValuesAbv)
    .padding(.1);

  barChart.select(".xAxis")
    .call(d3.axisBottom(xScaleAxis))
    .selectAll("text")
      .attr("y", -5)
      .attr("x", -10)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end");

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
    .data(dataArray);

  u.enter()
      .append('rect')
      .attr("class", "barChartBars")
      .attr('x', (d) => xScale(d[0]))
      .attr('y', (d) => 0)
      .attr('width', xScale.bandwidth())
      .style('stroke', 'black')
      .style('stroke-width', 4)
      .style('fill', (d, i) => getColor(d[0], i))
      .on('mouseover',
          function(d, i) {
            d3.select(this).style('fill', d => getColor('d' + d[0], i))
          })
      .on('mouseout',
          function(d, i) {
            d3.select(this).style('fill', d => getColor(d[0], i))
          })
      .merge(u)
      .transition()
      .duration(1000)
      .delay(100)
      .attr('x', (d) => xScale(d[0]))
      .attr('height', (d) => yScale(d[1]));

  barChart
    .select(".invertCanvas")
    .selectAll('.barChartBars')
    .html("")
    .append('title')
    .text(d => `${d[1]}`)
  ;
}
