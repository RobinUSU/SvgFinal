function update()
{
  let data = filterData(cardList);

  // ==========================================================================
  // === Update Stuff Here With Filtered Data =================================
  // ==========================================================================
  updateBarChart('colorIdentity', data);
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
