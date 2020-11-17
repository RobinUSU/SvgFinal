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
