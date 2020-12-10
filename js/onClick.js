/* Function for on click behavior in barcharts that use radio filters 
 *
 * @param[in] targetRadio -- bar chart bar value that was clicked
 * @param[in] filterSelect -- select tag for filtering elements
 * */
function onClickRadio(targetRadio, filterSelect)
{
  console.log(targetRadio);
  let radios = document.getElementsByClassName(filterSelect);
  for (let radio of radios)
  {
    if (radio.value != targetRadio)
    {
      radio.checked = false;
    }
  }
}

/* Function for on click behavior for subtype barchart
 *
 * @param[in] targetSubtype -- bar chart bar value that was clicked
 * @param[in] filterSelect -- select tag for filtering elements
 * */
function onClickSubtype(targetSubtype, filterSelect)
{
  let subtypes = document.getElementsByClassName(filterSelect);

  for (let subtype of subtypes)
  {
    if (subtype.__data__ == targetSubtype) {
      d3.select(subtype).attr('class', 'subtype active');
    }
  }

  update();
}

/* Function for on click behavior for mana chart
 *
 * @param[in] targetMana -- bar chart mana value that was clicked
 * @param[in] filterSelect -- select tag for filtering elements
 * */
function onClickMana(targetMana, filterSelect)
{
  var inputs = document.getElementsByClassName(filterSelect);
  inputs[0].value = targetMana;
  inputs[0].alt = targetMana;
  inputs[1].value = targetMana;
  inputs[1].alt = targetMana;

  snapBrushTo(Number(targetMana), Number(targetMana));
}
