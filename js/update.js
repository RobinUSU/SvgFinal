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
      'svg#colorBarChart');

  updateBarChart(
      data,
      'types',
      'typeRadios',
      'Number of Cards',
      'Type Category',
      'Number of Cards by Type',
      'svg#typeBarChart');

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
