function findBlockByAllias(allias) {
    return $('.review__block').filter((ndx, item)=> {
        return $(item).attr("data-linked-with") == allias;
    });
}
$('.review__link').click(e =>{
     e.preventDefault();
     const $this= $(e.currentTarget);
     const curItem =$this.closest('.review__item');
     const elem=$this.attr("data-open");
     const itemToShow = findBlockByAllias(elem);
     console.log(itemToShow)
     itemToShow.addClass('review__block--active').siblings().removeClass('review__block--active');
     curItem.addClass('review__item--active').siblings().removeClass('review__item--active')
    })