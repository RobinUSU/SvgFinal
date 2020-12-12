function getColor(key, i)
{
  let colorDict = {
    '': 'LightGray',
    'B': '#595959',
    'U': 'Blue',
    'G': 'Green',
    'R': 'FireBrick',
    'W': 'White',
    'd': 'DarkGray',
    'dB': 'Black',
    'dU': 'DarkBlue',
    'dG': 'DarkGreen',
    'dR': 'DarkRed',
    'dW': 'Ivory',
    'Creature': 'DarkGoldenRod',
    'Enchantment': 'Coral',
    'Instant': 'BlueViolet',
    'Sorcery': 'DarkOrange',
    'Artifact': 'SeaGreen',
    'Land': 'DarkOliveGreen',
    'dCreature': 'GoldenRod',
    'dEnchantment': 'DarkSalmon',
    'dInstant': 'Violet',
    'dSorcery': 'Orange',
    'dArtifact': 'DarkSeaGreen',
    'dLand': 'OliveGreen',
    '0': '#3f5efb',
    '1':'#4e5cef',
    '2':'#5d5ae4',
    '3':'#7058d6',
    '4':'#7d56cc',
    '5':'#8e54bf',
    '6':'#9953b6',
    '7':'#a452ad',
    '8':'#bd4f9a',
    '9':'#bf4f99',
    '10':'#c94e92',
    '11':'#d14d8c',
    '12':'#da4b85',
    '13':'#e34a7e',
    '14':'#e9497a',
    '15':'#ed4877',
    '16':'#ef4876',
    '17':'#f14874',
    '18':'#f34873',
    '19':'#f54871',
    '20':'#fc466b',
    'd20':'#3f5efb',
    'd19':'#4e5cef',
    'd18':'#5d5ae4',
    'd17':'#7058d6',
    'd16':'#7d56cc',
    'd15':'#8e54bf',
    'd14':'#9953b6',
    'd13':'#a452ad',
    'd12':'#bd4f9a',
    'd11':'#bf4f99',
    'd10':'#c94e92',
    'd9':'#d14d8c',
    'd8':'#da4b85',
    'd7':'#e34a7e',
    'd6':'#e9497a',
    'd5':'#ed4877',
    'd4':'#ef4876',
    'd3':'#f14874',
    'd2':'#f34873',
    'd1':'#f54871',
    'd0':'#fc466b',
  };

  if (colorDict[key])
    return colorDict[key];
  else if (key[0] == "d")
    return d3.hsl(99, .35 + (10 - i) * .05, .40 + (10 - i) * .05, 1);
  else
    return d3.hsl(99, .35 + i * .05, .40 + i * .05, 1);
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

  let colorlessCount = ""
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
      colorlessCount += entry;
    }
  }
  amountOfEach[0] = Number(colorlessCount);

  for(color in colors){
    if(amountOfEach[color] > 0){
      toReturn += (Number(amountOfEach[color])+ " " + colors[color] + ", ");
    }
  }

  return toReturn;
}


function presentableText(text){
  text = text.replaceAll("{T}", "Tap");
  text = text.replaceAll("{X}", "X");
  text = text.replaceAll("{", " ");
  text = text.replaceAll("}", " ")
  text = text.replaceAll("\\n", " ");
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

  let abvRange = range(Number(filterValuesAbv[1]) - Number(filterValuesAbv[0]) + 1,
                       Number(filterValuesAbv[0]));
  let valueRange = range(Number(filterValues[1]) - Number(filterValues[0]) + 1,
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

  let targetIdx = null;
  sorted.forEach((d, i) => {
    if (d[0] == "") {
      targetIdx = i;
    }
  });

  if (targetIdx != null)
  {
    sorted.splice(targetIdx, 1);
  }

  sorted = sorted.slice(0,10);

  let values = sorted.map(d => d[0]);

  return [values, values, sorted];
}

/* Function removes value from array
 *
 * @param[in] arr -- array to be checked for value
 * @param[in] value -- value to be removed
 * */
function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

/* Function reset filtering options for the page and updates page */
function reset()
{
  let radios = document.querySelectorAll('input[type=checkbox]');
  for (let radio of radios)
  {
    radio.checked = true;
  }

  let textfilter = document.getElementById('filterText');
  textfilter.value = "";

  removefromActive();

  d3.select(".brush").call(brush.move, null);

  let minManaCost = document.getElementById('minCost');
  minManaCost.alt = 0;
  minManaCost.value = 0;
  let maxManaCost = document.getElementById('maxCost');
  maxManaCost.alt = 20;
  maxManaCost.value = 20;

  update();
}
