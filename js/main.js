let dataSet = null;

function init()
{
  new Promise(loadDataset).then(data => {
    dataSet = data;
    // ========================================================================
    // === Init Stuff Here with Populated 'dataSet' ===========================
    // ========================================================================
    initBarChartData('colorIdentity', dataSet);
    // ========================================================================
  });
}
