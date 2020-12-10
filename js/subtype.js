/* Update function for subtype lists 
 *
 * @param[in] data -- data to update lists with
 * */
function updateSubTypeList(data)
{
  updateSubTypeListActive(data);
  updateSubTypeListShared(data);
}

/* Update function to update active subtype list 
 *
 * @param[in] data -- data to update list with
 * */
function updateSubTypeListActive(data)
{
  let typeList = d3.select("#subTypeListActive");

  let subtypeElems = document.getElementsByClassName("subtype active")
  let subtypes = [];
  for (let subtypeElem of subtypeElems) {
    subtypes.push(subtypeElem.text);
  }

  let subtypeSet = new Set();

  data.forEach(
      d => subtypes.forEach(type => subtypeSet.add(type)));

  typeList
    .selectAll('*')
    .remove();

  typeListDiv = typeList.append('div');

  typeListDiv.selectAll('a')
      .data(Array.from(subtypeSet).sort())
      .enter()
      .append('a')
      .attr('class', 'subtype active')
      .text(d => `${d}`)
      .on('click', function(d, i) {
        removefromActive(this);
        update();
      });
}

/* Update function to remove items from being an active subtype
 *
 * @param[in] item -- item to be removed from being active
 * */
function removefromActive(item = null)
{
  let subtypeElems = document.getElementsByClassName("subtype active");
  let targets = [];
  for (let subtypeElem of subtypeElems) {
    console.log("1");
    if (item == null || subtypeElem.text == item.text)
    {
      targets.push(subtypeElem)
    }
  }

  for (let target of targets)
  {
    d3.select(target).attr('class', 'subtype');
  }
}

/* Update function to update shared subtype list
 *
 * @param[in] data -- data to update list with
 * */
function updateSubTypeListShared(data)
{
  let typeList = d3.select("#subTypeListShared");

  let subtypeSet = new Set();

  data.forEach(
      d => d.subtypes.split(",").forEach(type => subtypeSet.add(type)));

  typeList
    .selectAll('*')
    .remove();

  typeListDiv = typeList.append('div');

  typeListDiv
    .selectAll('a')
    .data(Array.from(subtypeSet).sort())
    .enter()
    .append('a')
    .attr('class', 'subtype')
    .on('click', function(d,i) {
      if (this.className == "subtype active")
      {
        removefromActive(this);
        update();
      }
      else
      {
        d3.select(this).attr('class', 'subtype active')
        update();
      }
    })
    .text(d => `${d}`)
  ;
}

/* Initialization function for subtype list containing all subtypes
 *
 * @param[in] data -- data to initialize list with
 * */
function initSubTypeListAll(data = cardList)
{
  let typeList = d3.select("#subTypeListAll");

  let subtypeSet = new Set();

  data.forEach(
      d => d.subtypes.split(",").forEach(type => subtypeSet.add(type)));

  typeList
    .selectAll('*')
    .remove();

  typeListDiv = typeList.append('div');

  typeListDiv
    .selectAll('a')
    .data(Array.from(subtypeSet).sort())
    .enter()
    .append('a')
    .attr('class', 'subtype')
    .on('click', function(d,i) {
      if (this.className == "subtype active")
      {
        removefromActive(this);
        update();
      }
      else
      {
        d3.select(this).attr('class', 'subtype active')
        update();
      }
    })
    .text(d => `${d}`)
  ;
}
