function update()
{
  let data = filterData(cardList);

  // ==========================================================================
  // === Update Stuff Here With Filtered Data =================================
  // ==========================================================================
  updateBarChart('colorIdentity', data);
  updateCardChart(data);
  // ==========================================================================
}

function filterData(data)
{
  let filteredData = deepCopy(data);
  let displayColors = [];
  var radios = document.getElementsByClassName('colorRadios');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      displayColors.push(radios[i].value);
    }
  }

  filteredData = filteredData.filter(d => displayColors.includes(d['colorIdentity']));

  let displayTypes = [];
  var radios = document.getElementsByClassName('typeRadios');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      displayTypes.push(radios[i].value);
    }
  }

  filteredData = filteredData.filter(d => displayTypes.includes(d['types']));

  return filteredData;
}
