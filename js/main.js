let dataSet = null;
let cardList = null;

// Initializes page and then performs a page update
function init()
{
  new Promise(loadDataset).then(data => {
    dataSet = data;
    // Flatten the dataSet into one card list
    cardList = deepCopy(dataSet).flat(Infinity);

    // ========================================================================
    // === Init Stuff Here with Populated 'dataSet' ===========================
    // ========================================================================
    initBarChartData('svg#colorBarChart');

    initBarChartData('svg#typeBarChart');

    initBarChartData('svg#manaBarChart');

    initBarChartData('svg#subTypeBarChart');

    initSubTypeListAll();

    initManaChart('svg#manaChart', 'brushChart');

    initCardChartData(dataSet);

    initCardDetailChartData(cardList[0]);
    // ========================================================================

    update();
  });
}
