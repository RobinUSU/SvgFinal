function filterData(data)
{
  let filteredData = deepCopy(data);

  filteredData = filterColor(filteredData);

  filteredData = filterType(filteredData);

  filteredData = filterCost(filteredData);

  filteredData = filterSubtype(filteredData);

  filteredData = filterText(filteredData);

  return filteredData;
}

function filterColor(data)
{
  let displayColors = [];
  let colorRadios = document.getElementsByClassName('colorRadios');

  for (var i = 0, length = colorRadios.length; i < length; i++) {
    if (colorRadios[i].checked) {
      displayColors.push(colorRadios[i].value);
    }
  }
  data = data.filter(d => displayColors.includes(d['colorIdentity']));

  return data
}

function filterType(data)
{
  let displayTypes = [];
  let typeRadios = document.getElementsByClassName('typeRadios');

  for (var i = 0, length = typeRadios.length; i < length; i++) {
    if (typeRadios[i].checked) {
      displayTypes.push(typeRadios[i].value);
    }
  }
  data = data.filter(d => displayTypes.includes(d['types']));

  return data;
}

function filterCost(data)
{
  let displayCosts = [];
  let minCost = Number(document.getElementById('minCost').value);
  let maxCost = Number(document.getElementById('maxCost').value);
  document.getElementById('minCost').alt = minCost;
  document.getElementById('maxCost').alt = maxCost;
  data = data.filter(d => (d.cmc >= minCost && d.cmc <= maxCost));

  return data;
}

function filterSubtype(data)
{
  let subtypeElems = document.getElementsByClassName("subtype active")
  let subtypes = [];
  for (let subtypeElem of subtypeElems) {
    subtypes.push(subtypeElem.text);
  }

  if (subtypes.length > 0)
  {
    data = data.filter(
        d => d.subtypes.split(",").some(d => subtypes.includes(d)));
  }

  return data;
}

function filterText(data)
{
  let filterText = document.getElementById('filterText').value;

  let filterValues = filterText.split(" ");

  if (filterValues != "")
  {
    data = data.filter(datum => filterValues.some(
                           d => datum.text.search(new RegExp(d)) != -1 ));
  }

  return data;
}
