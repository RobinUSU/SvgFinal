function deepCopy(arr) {
  let copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem))
    } else {
      copy.push(elem)
    }
  });
  return copy;
}

function deepCopyButMakesCards(arr){
  let copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push.apply(copy,deepCopy(elem))
    } else {
      copy.push(elem)
    }
  });
  return copy;
}

function displayableString(string){
  return (string.length < 30) ? string:(string.substring(0,17)+"...") ;
}

function getManaCost(card){
  let toReturn = "";
  let colorABV = ["", "B","U","G","R","W","Y"];
  let colors = [ "Colorless","Black", "Blue", "Green", "Red", "White","Yellow"];
  let amountOfEach = [0,0,0,0,0,0,0];

  for(entry of card.manaCost){

    if(isNaN(entry)){
      if(entry=="X"){
        toReturn += "X, "
      }
      else{
        for(color in colorABV){

          if(entry===colorABV[color]){
            amountOfEach[color] += 1;
          }

        }
      }

    }
    else{
      amountOfEach[0] += Number(entry);
    }
  }

  for(color in colors){
    if(amountOfEach[color] > 0){
      toReturn += (Number(amountOfEach[color])+ " " + colors[color] + ", ");
    }
  }

  return toReturn;
}
