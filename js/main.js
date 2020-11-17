let dataSet = null;

function init()
{
  new Promise(loadDataset).then(data => {
    dataSet = data;
    dataSet = deepCopy(dataSet);
    // ========================================================================
    // === Init Stuff Here with Populated 'dataSet' ===========================
    // ========================================================================
    initBarChartData('colorIdentity', dataSet);
    initCardChartData(dataSet);
    // ========================================================================
  });
}
