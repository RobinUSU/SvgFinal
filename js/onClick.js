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

function onClickMana(targetMana, filterSelect)
{
  var inputs = document.getElementsByClassName(filterSelect);
  inputs[0].value = targetMana;
  inputs[0].alt = targetMana;
  inputs[1].value = targetMana;
  inputs[1].alt = targetMana;

  snapBrushTo(Number(targetMana), Number(targetMana));
}

function onClick(obj, filterSelect)
{
  console.log(obj);
  console.log(filterSelect);
}
