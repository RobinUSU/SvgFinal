/* Main updating function, data will be filtered here and updates that need to
 * be made when the page updates should be placed inside this function.
 * */
function update()
{
  let data = [];
  if (deckView)
  {
    data = filterData(deck);
  }
  else  {
    data = filterData(cardList);
  }

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
      adjustValues,
      onClickRadio);

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
      adjustValues,
      onClickRadio);

  updateBarChart(
    data,
    'cmc',
    'manaInput',
    'Number of Cards',
    'ManaCost',
    'Number of Cards by Mana Cost',
    'svg#manaBarChart',
    () => {return [manaCosts, manaCosts];},
    aggregateDataInputs,
    adjustValues,
    onClickMana);

  updateSubTypeList(data);

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
    adjustValuesSorted,
    onClickSubtype);

  updateCardChart(data);

  updateImage(data[0]);
  // ==========================================================================
}

/* Function to change updating behavior on filtering clicks */
function clickUpdate()
{
  updateOnClick = true;

  if (updateOnClick)
  {
    update();
  }
}
