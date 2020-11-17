function update()
{
  let data = filterData(dataSet);

  // ==========================================================================
  // === Update Stuff Here With Filtered Data =================================
  // ==========================================================================
  updateBarChart('colorIdentity', data);
  updateCardChart(data);
  // ==========================================================================
}

function filterData(dataSet)
{
  let data = deepCopy(dataSet);
  let displayColors = [];
  var radios = document.getElementsByClassName('colorRadios');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      displayColors.push(radios[i].value);
    }
  }

  data.forEach((d, index) => data[index] =
                   d.filter(d => displayColors.includes(d['colorIdentity'])));

  let displayTypes = [];
  var radios = document.getElementsByClassName('typeRadios');

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      displayTypes.push(radios[i].value);
    }
  }

  data.forEach((d, index) => data[index] =
                   d.filter(d => displayTypes.includes(d['types'])));

  return data;
}
