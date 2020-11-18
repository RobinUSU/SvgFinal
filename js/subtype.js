function updateSubTypeList(data)
{
  let typeList = d3.select("#subTypeList");

  let subtypeSet = new Set();

  data.forEach(
      d => d.subtypes.split(",").forEach(type => subtypeSet.add(type)));

  typeList
    .selectAll('*')
    .remove();

  typeListDiv = typeList.append('div');

  typeListDiv
    .selectAll('a')
    .data(Array.from(subtypeSet).sort())
    .enter()
    .append('a')
    .on('click', function(d,i) {
      if (this.className == "subtype active")
      {
        d3.select(this).attr('class', 'subtype')
      }
      else
      {
        d3.select(this).attr('class', 'subtype active')
      }
    })
    .text(d => `${d}`)
  ;
}
