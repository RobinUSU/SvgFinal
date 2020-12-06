let dataSet = null;
let cardList = null;

function init()
{
  new Promise(loadDataset).then(data => {
    dataSet = data;
    // Flatten the dataSet into one card list
    cardList = deepCopy(dataSet).flat(Infinity);

    // ========================================================================
    // === Init Stuff Here with Populated 'dataSet' ===========================
    // ========================================================================
    initBarChartData(
      cardList,
      'colorIdentity',
      'colorRadios',
      'Number of Cards',
      'Color Identity',
      'Number of Cards by Color Identity',
      'svg#colorBarChart',
      getSelectedRadios,
      aggregateDataRadios,
      adjustValues);

    initBarChartData(
      cardList,
      'types',
      'typeRadios',
      'Number of Cards',
      'Type Category',
      'Number of Cards by Type',
      'svg#typeBarChart',
      getSelectedRadios,
      aggregateDataRadios,
      adjustValues);

    initBarChartData(
      cardList,
      'cmc',
      'manaInput',
      'Number of Cards',
      'ManaCost',
      'Number of Cards by Mana Cost',
      'svg#manaBarChart',
      getSelectedInputs,
      aggregateDataInputs,
      adjustValues);

    initBarChartData(
      cardList,
      'subtypes',
      'subtype',
      'Number of Cards',
      'SubType',
      'Number of Cards by Subtype',
      'svg#subTypeBarChart',
      getSelectedData,
      aggregateDataRadios,
      adjustValuesSorted);

    initManaChart('svg#manaChart', 'brushChart');

    initCardChartData(dataSet);
    initCardDetailChartData(cardList[0]);

    update();
    // ========================================================================
  });
}
