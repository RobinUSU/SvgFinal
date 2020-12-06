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
      aggregateDataRadios,
      adjustValues);

  updateBarChart(
      data,
      'types',
      'typeRadios',
      'Number of Cards',
      'Type Category',
      'Number of Cards by Type',
      'svg#typeBarChart',
      getSelectedRadios,
      aggregateDataRadios,
      adjustValues);

  updateBarChart(
    data,
    'cmc',
    'manaInput',
    'Number of Cards',
    'ManaCost',
    'Number of Cards by Mana Cost',
    'svg#manaBarChart',
    getSelectedInputs,
    aggregateDataInputs,
    adjustValues);

    updateBarChart(
      data,
      'subtypes',
      'subtype',
      'Number of Cards',
      'SubType',
      'Number of Cards by Subtype',
      'svg#subTypeBarChart',
      getSelectedData,
      aggregateDataRadios,
      adjustValuesSorted);

  updateSubTypeList(data);
  updateCardChart(data);
  updateImage(data[0]);
  // ==========================================================================
}

function clickUpdate()
{
  updateOnClick = true;

  if (updateOnClick)
  {
    update();
  }
}
