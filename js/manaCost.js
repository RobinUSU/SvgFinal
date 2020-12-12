let svgWidthl = 800;
let svgHeightl = 200;
let marginl = 0;
let widthl = svgWidthl - 2 * marginl;
let heightl = svgHeightl - 2 * marginl;
let manaCosts = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
let brush = null;

/* Snaps brush filter to given bounds 
 *
 * @param[in] lowerBound -- lower bound for brush to snap to
 * @param[in] upperBound -- upper bound for brush to snap to
 * */
function snapBrushTo(lowerBound, upperBound)
{
  let f = widthl / manaCosts.length;
  d3.select(".brush").transition().call(
      brush.move,
      [ (lowerBound * f), ((upperBound + 1) * f) - 1 ]);
}

/* Initializes mana chart 
 *
 * param[in] selectTag -- tag to select svg object
 * param[in] chartClass -- class tag to give to generated chart
 * */
function initManaChart(selectTag  = 'svg#manaChart', chartClass = 'brushChart')
{
  let svg =
      d3.select(selectTag)
      .attr('width', svgWidthl)
      .attr('height', svgHeightl);

  let brushChart = svg.append('g')
                      .attr("class", chartClass)
                      .attr('transform', `translate(${marginl}, 25)`);

  let rects = brushChart.selectAll('rect').data(manaCosts);

  let f = widthl / manaCosts.length;
  let rectHeight = 100;
  rects
    .enter()
    .append('rect')
    .attr("class", 'manaBars')
    .attr('x', d => {
      return f * d;
    })
    .attr('y', 10)
    .attr('width', d => {
      return f;
    })
    .attr('height', rectHeight)
    .attr('stroke-width', 1)
    .attr('fill', d => getColor(d))
    .style('stroke', 'black')
    .style('stroke-width', 2)
  ;

  rects
    .enter()
    .append('text')
    .attr('x', d => {
      return (f * d) + f/2 - 10;
    })
    .attr('y', 15 + rectHeight/2)
    .text(d => d)
    .style('font-size', '20px')
    .style('font-weight', 'bold')
    .style('fill', 'white')
  ;

  brush =
    d3.brushX()
    .extent(
        [ [ 0, 0 ], [ widthl, rectHeight + 20 ] ])
    .on("end", () => {
      if (!d3.event.sourceEvent) return;

      let x0 = d3.event.selection[0];
      let x1 = d3.event.selection[1];
      let lowerBound = Math.floor(x0/f);
      let upperBound = Math.floor(x1/f);

      var inputs = document.getElementsByClassName('manaInput');
      inputs[0].value = lowerBound;
      inputs[0].alt = lowerBound;
      inputs[1].value = upperBound;
      inputs[1].alt = upperBound;

      snapBrushTo(lowerBound, upperBound);

      update();
    });

  brushChart.append("g").attr("class", "brush").call(brush);
}
