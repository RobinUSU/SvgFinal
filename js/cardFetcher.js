function updateImage(card)
{
  let uId = card.multiverseid;

  let dataSrc =
      'https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + uId +
      '&type=card';

  d3.selectAll('.cardPreviewContainer')
      .html("")
      .selectAll('cardPreview')
      .data([dataSrc])
      .enter()
      .append('img')
      .attr('class', 'preview')
      .attr('src', d => d);
}
