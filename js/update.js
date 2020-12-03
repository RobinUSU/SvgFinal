function update()
{
  let data = filterData(cardList);

  // ==========================================================================
  // === Update Stuff Here With Filtered Data =================================
  // ==========================================================================
  updateBarChart(
      data,
      'colorIdentity',
      'colorRadios',
      'Number of Cards',
      'Color Identity',
      'Number of Cards by Color Identity',
      'svg#colorBarChart',
      getSelectedRadios,
      aggregateDataRadios);

  updateBarChart(
      data,
      'types',
      'typeRadios',
      'Number of Cards',
      'Type Category',
      'Number of Cards by Type',
      'svg#typeBarChart',
      getSelectedRadios,
      aggregateDataRadios);

  updateBarChart(
    data,
    'cmc',
    'manaInput',
    'Number of Cards',
    'ManaCost',
    'Number of Cards by Mana Cost',
    'svg#manaBarChart',
    getSelectedInputs,
    aggregateDataInputs);

  updateSubTypeList(data);
  updateCardChart(data);
  // ==========================================================================
}

function updateClick()
{
  updateOnClick = false;

  if (updateOnClick)
  {
    update();
  }
}
