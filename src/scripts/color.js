const color = document.querySelector('.color');
const colorCross= document.querySelector('.color__cross');

color.addEventListener("click", function (e) {
    e.preventDefault();
    const colorLink = e.target;
    console.log(colorLink);
    const activeLink = color.querySelector('.color__item.color__item--active');
    if (colorLink.classList.contains('color__link') || colorLink.classList.contains('color__name')){
        e.preventDefault();
        if (!activeLink || activeLink.querySelector(".color__name") !== colorLink || activeLink.querySelector(".color__link") !== colorLink) {
            let item = colorLink.closest('.color__item');
            item.classList.add('color__item--active');
            let current = item.querySelector('.color__description');
            const colorItem=  document.querySelector('.color__link');
            if (document.documentElement.clientWidth>768){
                current.style.width= 524 + 'px'  
            }
            else{
            current.style.width= (document.documentElement.clientWidth - (colorItem.clientWidth*3))+ 'px';
            console.log(current.style.width)}
        }
        if (activeLink){
            let width = activeLink.querySelector('.color__description');
            width.style.width = "0px";
            activeLink.classList.remove('color__item--active');
        }
    }

    else if (colorLink.closest('.color__cross')){
        let width = activeLink.querySelector('.color__description');
            width.style.width = "0px";
            activeLink.classList.remove('color__item--active');
    }
  })
