const teamList = document.querySelector('.section__block');

teamList.addEventListener("click", function (e) {
    const link = e.target;
    console.log(link)
    if (link.classList.contains('team__link') || link.classList.contains('team__name')){
        e.preventDefault();
        const active = teamList.querySelector('.team__item.team__item--active');
        console.log(active)
        if (active){
            let high = active.querySelector('.team__invisible');
            high.style.height = "0px";
            active.classList.remove('team__item--active');
        }
        if (!active || active.querySelector(".team__link") !== link || active.querySelector(".team__name") !== link){
            let item = link.closest('.team__item');
            item.classList.add('team__item--active');
            let current = item.querySelector('.team__invisible');
            current.style.height = current.scrollHeight + 'px'
        }
    }
  })