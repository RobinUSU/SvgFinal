function getColor(key)
{
  let colorDict = {
    '': 'LightGray',
    'B': '#343434',
    'U': 'Blue',
    'G': 'Green',
    'R': 'FireBrick',
    'W': 'White',
    'd': 'DarkGray',
    'dB': 'Black',
    'dU': 'DarkBlue',
    'dG': 'DarkGreen',
    'dR': 'DarkRed',
    'dW': 'Ivory'
  };

  return colorDict[key];
}
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function deepCopy(arr) {
  let copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem))
    } else {
      copy.push(elem)
    }
  });
  return copy;
}

function deepCopyButMakesCards(arr){
  let copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push.apply(copy,deepCopy(elem))
    } else {
      copy.push(elem)
    }
  });
  return copy;
}

function displayableString(string){
  return (string.length < 30) ? string:(string.substring(0,17)+"...") ;
}

function getManaCost(card){
  let toReturn = "";
  let colorABV = ["", "B","U","G","R","W","Y"];
  let colors = [ "Colorless","Black", "Blue", "Green", "Red", "White","Yellow"];
  let amountOfEach = [0,0,0,0,0,0,0];

  for(entry of card.manaCost){

    if(isNaN(entry)){
      if(entry=="X"){
        toReturn += "X, "
      }
      else{
        for(color in colorABV){

          if(entry===colorABV[color]){
            amountOfEach[color] += 1;
          }

        }
      }

    }
    else{
      amountOfEach[0] += Number(entry);
    }
  }

  for(color in colors){
    if(amountOfEach[color] > 0){
      toReturn += (Number(amountOfEach[color])+ " " + colors[color] + ", ");
    }
  }

  return toReturn;
}


function presentableText(text){
  text = text.replace("{T}", "Tap");
  text = text.replace("{X}", "X");
  text = text.replace("{", "");
  text = text.replace("}", "")
  text = text.replace("\\n", " ");
  return text;
}

function getSelectedRadios(filterSelect)
{
  var radios = document.getElementsByClassName(filterSelect);
  let filterValuesAbv = [];
  let filterValues = [];

  for (var i = 0, length = radios.length; i < length; i++) {
    filterValues.push(radios[i].alt);
    filterValuesAbv.push(radios[i].value);
  }

  return [filterValues, filterValuesAbv];
}

function aggregateDataRadios(data, filterValues, dataSelect)
{
  let dataAggregate = {};
  filterValues.forEach(d => dataAggregate[d] = 0);

  data.forEach(
      d => { d[dataSelect].split(",").forEach(d => dataAggregate[d] += 1); });

  return dataAggregate;
}

function getSelectedInputs(filterSelect)
{
  var inputs = document.getElementsByClassName(filterSelect);
  let filterValuesAbv = [];
  let filterValues = [];

  for (var i = 0, length = inputs.length; i < length; i++) {
    filterValues.push(inputs[i].alt);
    filterValuesAbv.push(inputs[i].value);
  }

  let abvRange = range(Number(filterValuesAbv[1]) - Number(filterValuesAbv[0]),
                       Number(filterValuesAbv[0]));
  let valueRange = range(Number(filterValues[1]) - Number(filterValues[0]),
                         Number(filterValues[0]));

  return [valueRange, abvRange];
}

function aggregateDataInputs(data, filterValues, dataSelect)
{
  let dataAggregate = {};
  filterValues.forEach(d => dataAggregate[d] = 0);

  data.forEach(d => {
    filterValues.includes(Number(d[dataSelect]))
        ? dataAggregate[Number(d[dataSelect])] += 1 : 1 + 1;
  });

  return dataAggregate;
}

function getSelectedData(filterSelect)
{
  var selections = document.getElementsByClassName(filterSelect);
  let filterValuesAbv = [];
  let filterValues = [];

  for (var i = 0, length = selections.length; i < length; i++) {
    filterValues.push(selections[i].__data__);
    filterValuesAbv.push(selections[i].__data__);
  }

  return [filterValues, filterValuesAbv];
}

function adjustValues(filterValues, filterValuesAbv, dataObject)
{
  return [filterValues, filterValuesAbv, Object.entries(dataObject)];
}

function adjustValuesSorted(filterValues, filterValuesAbv, dataObject)
{
  let sorted = Object.entries(dataObject).sort(function(a, b) {
    return b[1] - a[1];
  });

  sorted = sorted.slice(0,10);

  let values = sorted.map(d => d[0]);

  return [values, values, sorted];
}
