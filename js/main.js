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
      'svg#colorBarChart');

    initBarChartData(
      cardList,
      'types',
      'typeRadios',
      'Number of Cards',
      'Type Category',
      'Number of Cards by Type',
      'svg#typeBarChart');

    initCardChartData(dataSet);
    initCardDetailChartData(cardList[0]);
    // ========================================================================
  });
}
