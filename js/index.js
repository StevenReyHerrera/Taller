let position = 0;
let moveLeft = true;

setInterval(() => {
  const grande = document.querySelector(".carrousel__grande");
  if (moveLeft === true) {
    position -= 33;
    if (position === -66) {
      moveLeft = false;
    }
  }else {
    position += 33;
    if(position===0){
      moveLeft=true;
    }
  }
  grande.style.transform = `translateX(${position}%)`;
}, 5000);
