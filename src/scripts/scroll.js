const sections = $('section');
const display = $(".main__wrapper");
const sideMenu=$(".fixed");
const sideMenuItem=sideMenu.find('.fixed__item')
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();
let inScroll = false;

sections.first().addClass('wrapper--active');

const countSectionPosition=sectionEq=>{
    const position=sectionEq * -100;
    if (isNaN(position)){
        return 0
    }
    return position
}

const themeMenu=sectionEq=>{
    const currentSection=sections.eq(sectionEq);
    const currentTheme = currentSection.attr('data-menu-theme');

    if (currentTheme=='white'){
        sideMenu.addClass('fixed--shadow')
        }
    else{
        sideMenu.removeClass('fixed--shadow')
        }
}

const resetActiveItem= (item, itemEq, activeClass)=>{
    item.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass)
}

const performTransition = sectionEq =>{

    const timeTransition=1000;
    const timeInertiaMouse =300;
    if(inScroll)return;
    inScroll=true;
    const position = countSectionPosition(sectionEq);

    themeMenu(sectionEq);
    display.css({
        transform: `translateY(${position}%)`
    });
    
    resetActiveItem(sideMenuItem,sectionEq, 'fixed__item--active');
    resetActiveItem(sections,sectionEq, 'wrapper--active');
    

    setTimeout(()=>{
        inScroll=false;
    }, timeTransition+timeInertiaMouse)
}


const viewportScroller = direction =>{

    const activeSection = sections.filter(".wrapper--active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    return {
        next(){
            if (nextSection.length){
                performTransition(nextSection.index())
            }   
        },

        prev(){
            if (prevSection.length){
       performTransition(prevSection.index())
        }
    }
}
}
$(window).on("wheel", e =>{
    const deltaY = e.originalEvent.deltaY;
    const scroller=viewportScroller();
    if (deltaY>0){
        scroller.next()
    };
    if (deltaY < 0){
        scroller.prev()
    }
    
})

$(window).on("keydown", e=>{

    const tagName = e.target.tagName.toLowerCase();
    const userTypingText = tagName=='input' || tagName=='textarea';
    const scroller=viewportScroller();
    if (userTypingText)return;
    switch (e.keyCode){
        case 38:
            scroller.prev();
            break;
        case 40:
            scroller.next();
            break
        }

    
})
$('.wrapper').on('touchmove', e => e.preventDefault())
$('[data-scroll-to]').click(e=>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const dataScroll=$this.attr('data-scroll-to');
    const reqSection=$(`[data-id-section=${dataScroll}]`);
    performTransition(reqSection.index())
})
if (isMobile){
    $("body").swipe( {
        swipe:function(event, direction) {
          const scroller=viewportScroller();
          let scrollDirection='';
          if (direction=='up')scrollDirection='next';
          if (direction=='down')scrollDirection='prev';
            scroller[scrollDirection]();
        }
      });
}
