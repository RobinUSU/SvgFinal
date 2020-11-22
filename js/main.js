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
    initBarChartData('colorIdentity', cardList);
    initCardChartData(dataSet);
    initCardDetailChartData(cardList[0]);
    // ========================================================================
  });
}
