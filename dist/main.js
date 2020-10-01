const slider = $('.slider').bxSlider({
  pager:false,
  controls:false
});
$('.beat__arrow--left').click(e=>{
  e.preventDefault();
  slider.goToPrevSlide()

})
$('.beat__arrow--right').click(e=>{
  e.preventDefault();
  slider.goToNextSlide()

})

 

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

// const form = document.querySelector('.form');
// const button = document.querySelector('#myButton');
// button.addEventListener('click', ()=>{
//     function validateForm(form) {
//         let valid = true;

//         if (!validateField(form.elements.name)) {
//             valid = false;
//         }

//         if (!validateField(form.elements.lastName)) {
//             valid = false;
//         }

//         if (!validateField(form.elements.comment)) {
//             valid = false;
//         }

//         return valid;
//     };

//     function validateField(field) {
//         if (!field.checkValidity()) {
//             field.nextElementSibling.textContent = field.validationMessage;

//             return false;
//         } else {
//             field.nextElementSibling.textContent = '';

//             return true;
//         }
//     };
//     function validateField(field) {
//         field.nextElementSibling.textContent = field.validationMessage;
//         return field.checkValidity();
//     };
// if (validateForm(form)){
//     const order = {
//     name: form.elements.name.value,
//     lastName: form.elements.lastName.value,
//     comment: form.elements.comment.value
// }; 
//     const xhr=new XMLHttpsRequest();
//     xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
//     xhr.send(JSON.stringify(order));
//     xhr.addEventListener('load', () => {
//     console.log(xhr.response)})
// }})
ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [56.468069, 84.960025],
            zoom: 15,
            controls:[]
        });
        myCollection = [
            [56.467363, 84.955188],
            [56.469769, 84.964960],
            [56.466131, 84.956250],
        ];
        var myGeoObjects = new ymaps.GeoObjectCollection({}, {

            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './image/marker.svg',
        });
        for (let i = 0; i < myCollection.length; i++) {
            myGeoObjects.add(new ymaps.Placemark(myCollection[i]));
          }
        myMap.geoObjects.add(myGeoObjects);

    }
const validateFields=(form, Array)=>{
    Array.forEach((field) => {
        field.removeClass('input--error');
        
        if (field.val().trim()==''){
        field.addClass('input--error')}
    })

    const errorFields=form.find('.input--error');
    return errorFields.length==0;
}

$(".form").submit(e=>{
    e.preventDefault();
    const form=$(e.currentTarget);
    const name= form.find("[name='name']");
    const phone=form.find("[name='phone']");
    const comment=form.find("[name='comment']");
    const to=form.find("[name='to']");
    const isValid=validateFields(form, [name,phone,comment]);
    const modal=$('#modal');
    const content=modal.find(".modal__content");
    modal.css('color', 'black');

   if (isValid){ 
    $.ajax({
    url:"https://webdev-api.loftschool.com/sendmail",
    method:"post",
    data: {
        name:name.val(),
        phone:phone.val(),
        comment:comment.val(),
        to:to.val(),
    },
    success: data=>{
        content.text(data.message);
        $.fancybox.open({
            src:"#modal",
            class:"inline",
            leftRatio: 0.5
        })
    },
    error: data=>{
        console.log(data)
        const message = data.responseJSON.message;
        content.text(message);
        modal.css('color', 'red');
        $.fancybox.open({
        src:"#modal",
        class:"inline",
        leftRatio: 0.5
        })

    }
})
$('.form').trigger("reset")
   }
})
$(".app-close-modal").click(e=>{
    e.preventDefault();
    $.fancybox.close()
})

let player;

const playerContainer = $(".player");
const playButton=$(".player__start");
const playerPlay=$('.player__play--play');
const playerStop=$('.player__play--stop')
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "CRT39ITMANs",
   playerVars: {
   controls: 0,
   modestbranding: 0,
   showinfo: 0,
   rel: 0,
   iv_load_policy: 3
    },

   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   }
 });
};
const onPlayerStateChange = e =>{
 if (player.getPlayerState()==1){
  playerStop.addClass("active").siblings().removeClass("active")
 }
 else if (player.getPlayerState()==2){
  playerPlay.addClass("active").siblings().removeClass("active");
 }
}
playButton.click(e=>{
   if (playerPlay.hasClass("active")){
       player.playVideo()
   }
   else {
    player.pauseVideo();
   }
});
const funTime = time =>{
    const roundTime = Math.round(time);
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();
    $(".player__duration-estimate").text(funTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
      }
      
    interval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        const completedPercent = (currentTime / durationSec) * 100;
        $(".player__playback-button").css({
            left: `${completedPercent}%`
          });
        $(".player__duration-completed").text(funTime(currentTime));
      }, 1000);
     };

       $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec =
          (player.getDuration() / 100) * newButtonPositionPercent;
        
        $(".player__playback-button").css({
          left: `${newButtonPositionPercent}%`
        });
        
        player.seekTo(newPlaybackPositionSec);
       });


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

const cross = document.querySelector("#cross");
const overlay = document.querySelector("#overlay");
const hamburger = document.querySelector("#hamburger");
const computed = window.getComputedStyle(overlay);

hamburger.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.style.right = "0px";
});

cross.addEventListener("click", function (e) {
  e.preventDefault();
  overlay.style.right = "-1000px";
});
overlay.addEventListener("click", function (e) {
  overlay.style.right = "-1000px";
});
const teamList = document.querySelector('.section__block');

teamList.addEventListener("click", function (e) {
    const link = e.target;
    console.log(link);
    if (link.classList.contains('team__link') || link.classList.contains('team__name')){
        e.preventDefault();
        const active = teamList.querySelector('.team__item.team__item--active');
        console.log(active)
        if (!active || active.querySelector(".team__name") !== link || active.querySelector(".team__link") !== link) {
            let item = link.closest('.team__item');
            item.classList.add('team__item--active');
            let current = item.querySelector('.team__invisible');
            current.style.height = current.scrollHeight + 'px';
            // console.log(item)
        }
        if (active){
            let high = active.querySelector('.team__invisible');
            high.style.height = "0px";
            active.classList.remove('team__item--active');
        }
    }
  })
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlYXQuanMiLCJjb2xvci5qcyIsImZvcm0uanMiLCJtYXAuanMiLCJtb2RhbC5qcyIsInBsYXllci5qcyIsInJldmlldy5qcyIsInNjcm9sbC5qcyIsInNsaWRlci5qcyIsInRlYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNsaWRlciA9ICQoJy5zbGlkZXInKS5ieFNsaWRlcih7XHJcbiAgcGFnZXI6ZmFsc2UsXHJcbiAgY29udHJvbHM6ZmFsc2VcclxufSk7XHJcbiQoJy5iZWF0X19hcnJvdy0tbGVmdCcpLmNsaWNrKGU9PntcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgc2xpZGVyLmdvVG9QcmV2U2xpZGUoKVxyXG5cclxufSlcclxuJCgnLmJlYXRfX2Fycm93LS1yaWdodCcpLmNsaWNrKGU9PntcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgc2xpZGVyLmdvVG9OZXh0U2xpZGUoKVxyXG5cclxufSlcclxuXHJcbiBcclxuIiwiY29uc3QgY29sb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3InKTtcclxuY29uc3QgY29sb3JDcm9zcz0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbG9yX19jcm9zcycpO1xyXG5cclxuY29sb3IuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBjb2xvckxpbmsgPSBlLnRhcmdldDtcclxuICAgIGNvbnNvbGUubG9nKGNvbG9yTGluayk7XHJcbiAgICBjb25zdCBhY3RpdmVMaW5rID0gY29sb3IucXVlcnlTZWxlY3RvcignLmNvbG9yX19pdGVtLmNvbG9yX19pdGVtLS1hY3RpdmUnKTtcclxuICAgIGlmIChjb2xvckxpbmsuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xvcl9fbGluaycpIHx8IGNvbG9yTGluay5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbG9yX19uYW1lJykpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoIWFjdGl2ZUxpbmsgfHwgYWN0aXZlTGluay5xdWVyeVNlbGVjdG9yKFwiLmNvbG9yX19uYW1lXCIpICE9PSBjb2xvckxpbmsgfHwgYWN0aXZlTGluay5xdWVyeVNlbGVjdG9yKFwiLmNvbG9yX19saW5rXCIpICE9PSBjb2xvckxpbmspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjb2xvckxpbmsuY2xvc2VzdCgnLmNvbG9yX19pdGVtJyk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnY29sb3JfX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNvbG9yX19kZXNjcmlwdGlvbicpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xvckl0ZW09ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29sb3JfX2xpbmsnKTtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aD43Njgpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC5zdHlsZS53aWR0aD0gNTI0ICsgJ3B4JyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY3VycmVudC5zdHlsZS53aWR0aD0gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIChjb2xvckl0ZW0uY2xpZW50V2lkdGgqMykpKyAncHgnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50LnN0eWxlLndpZHRoKX1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGl2ZUxpbmspe1xyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSBhY3RpdmVMaW5rLnF1ZXJ5U2VsZWN0b3IoJy5jb2xvcl9fZGVzY3JpcHRpb24nKTtcclxuICAgICAgICAgICAgd2lkdGguc3R5bGUud2lkdGggPSBcIjBweFwiO1xyXG4gICAgICAgICAgICBhY3RpdmVMaW5rLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbG9yX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWxzZSBpZiAoY29sb3JMaW5rLmNsb3Nlc3QoJy5jb2xvcl9fY3Jvc3MnKSl7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gYWN0aXZlTGluay5xdWVyeVNlbGVjdG9yKCcuY29sb3JfX2Rlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgICAgIHdpZHRoLnN0eWxlLndpZHRoID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgYWN0aXZlTGluay5jbGFzc0xpc3QucmVtb3ZlKCdjb2xvcl9faXRlbS0tYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgfSlcclxuIiwiLy8gY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtJyk7XHJcbi8vIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNteUJ1dHRvbicpO1xyXG4vLyBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4vLyAgICAgZnVuY3Rpb24gdmFsaWRhdGVGb3JtKGZvcm0pIHtcclxuLy8gICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xyXG5cclxuLy8gICAgICAgICBpZiAoIXZhbGlkYXRlRmllbGQoZm9ybS5lbGVtZW50cy5uYW1lKSkge1xyXG4vLyAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgaWYgKCF2YWxpZGF0ZUZpZWxkKGZvcm0uZWxlbWVudHMubGFzdE5hbWUpKSB7XHJcbi8vICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBpZiAoIXZhbGlkYXRlRmllbGQoZm9ybS5lbGVtZW50cy5jb21tZW50KSkge1xyXG4vLyAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgcmV0dXJuIHZhbGlkO1xyXG4vLyAgICAgfTtcclxuXHJcbi8vICAgICBmdW5jdGlvbiB2YWxpZGF0ZUZpZWxkKGZpZWxkKSB7XHJcbi8vICAgICAgICAgaWYgKCFmaWVsZC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuLy8gICAgICAgICAgICAgZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gZmllbGQudmFsaWRhdGlvbk1lc3NhZ2U7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50ID0gJyc7XHJcblxyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9O1xyXG4vLyAgICAgZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChmaWVsZCkge1xyXG4vLyAgICAgICAgIGZpZWxkLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCA9IGZpZWxkLnZhbGlkYXRpb25NZXNzYWdlO1xyXG4vLyAgICAgICAgIHJldHVybiBmaWVsZC5jaGVja1ZhbGlkaXR5KCk7XHJcbi8vICAgICB9O1xyXG4vLyBpZiAodmFsaWRhdGVGb3JtKGZvcm0pKXtcclxuLy8gICAgIGNvbnN0IG9yZGVyID0ge1xyXG4vLyAgICAgbmFtZTogZm9ybS5lbGVtZW50cy5uYW1lLnZhbHVlLFxyXG4vLyAgICAgbGFzdE5hbWU6IGZvcm0uZWxlbWVudHMubGFzdE5hbWUudmFsdWUsXHJcbi8vICAgICBjb21tZW50OiBmb3JtLmVsZW1lbnRzLmNvbW1lbnQudmFsdWVcclxuLy8gfTsgXHJcbi8vICAgICBjb25zdCB4aHI9bmV3IFhNTEh0dHBzUmVxdWVzdCgpO1xyXG4vLyAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsJyk7XHJcbi8vICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShvcmRlcikpO1xyXG4vLyAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbi8vICAgICBjb25zb2xlLmxvZyh4aHIucmVzcG9uc2UpfSlcclxuLy8gfX0pIiwieW1hcHMucmVhZHkoaW5pdCk7XHJcbiAgICBmdW5jdGlvbiBpbml0KCl7XHJcbiAgICAgICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzU2LjQ2ODA2OSwgODQuOTYwMDI1XSxcclxuICAgICAgICAgICAgem9vbTogMTUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOltdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbXlDb2xsZWN0aW9uID0gW1xyXG4gICAgICAgICAgICBbNTYuNDY3MzYzLCA4NC45NTUxODhdLFxyXG4gICAgICAgICAgICBbNTYuNDY5NzY5LCA4NC45NjQ5NjBdLFxyXG4gICAgICAgICAgICBbNTYuNDY2MTMxLCA4NC45NTYyNTBdLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdmFyIG15R2VvT2JqZWN0cyA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKHt9LCB7XHJcblxyXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICcuL2ltYWdlL21hcmtlci5zdmcnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlDb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG15R2VvT2JqZWN0cy5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhteUNvbGxlY3Rpb25baV0pKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteUdlb09iamVjdHMpO1xyXG5cclxuICAgIH0iLCJjb25zdCB2YWxpZGF0ZUZpZWxkcz0oZm9ybSwgQXJyYXkpPT57XHJcbiAgICBBcnJheS5mb3JFYWNoKChmaWVsZCkgPT4ge1xyXG4gICAgICAgIGZpZWxkLnJlbW92ZUNsYXNzKCdpbnB1dC0tZXJyb3InKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZmllbGQudmFsKCkudHJpbSgpPT0nJyl7XHJcbiAgICAgICAgZmllbGQuYWRkQ2xhc3MoJ2lucHV0LS1lcnJvcicpfVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBlcnJvckZpZWxkcz1mb3JtLmZpbmQoJy5pbnB1dC0tZXJyb3InKTtcclxuICAgIHJldHVybiBlcnJvckZpZWxkcy5sZW5ndGg9PTA7XHJcbn1cclxuXHJcbiQoXCIuZm9ybVwiKS5zdWJtaXQoZT0+e1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgZm9ybT0kKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICBjb25zdCBuYW1lPSBmb3JtLmZpbmQoXCJbbmFtZT0nbmFtZSddXCIpO1xyXG4gICAgY29uc3QgcGhvbmU9Zm9ybS5maW5kKFwiW25hbWU9J3Bob25lJ11cIik7XHJcbiAgICBjb25zdCBjb21tZW50PWZvcm0uZmluZChcIltuYW1lPSdjb21tZW50J11cIik7XHJcbiAgICBjb25zdCB0bz1mb3JtLmZpbmQoXCJbbmFtZT0ndG8nXVwiKTtcclxuICAgIGNvbnN0IGlzVmFsaWQ9dmFsaWRhdGVGaWVsZHMoZm9ybSwgW25hbWUscGhvbmUsY29tbWVudF0pO1xyXG4gICAgY29uc3QgbW9kYWw9JCgnI21vZGFsJyk7XHJcbiAgICBjb25zdCBjb250ZW50PW1vZGFsLmZpbmQoXCIubW9kYWxfX2NvbnRlbnRcIik7XHJcbiAgICBtb2RhbC5jc3MoJ2NvbG9yJywgJ2JsYWNrJyk7XHJcblxyXG4gICBpZiAoaXNWYWxpZCl7IFxyXG4gICAgJC5hamF4KHtcclxuICAgIHVybDpcImh0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbFwiLFxyXG4gICAgbWV0aG9kOlwicG9zdFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIG5hbWU6bmFtZS52YWwoKSxcclxuICAgICAgICBwaG9uZTpwaG9uZS52YWwoKSxcclxuICAgICAgICBjb21tZW50OmNvbW1lbnQudmFsKCksXHJcbiAgICAgICAgdG86dG8udmFsKCksXHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZGF0YT0+e1xyXG4gICAgICAgIGNvbnRlbnQudGV4dChkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICQuZmFuY3lib3gub3Blbih7XHJcbiAgICAgICAgICAgIHNyYzpcIiNtb2RhbFwiLFxyXG4gICAgICAgICAgICBjbGFzczpcImlubGluZVwiLFxyXG4gICAgICAgICAgICBsZWZ0UmF0aW86IDAuNVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IGRhdGE9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnJlc3BvbnNlSlNPTi5tZXNzYWdlO1xyXG4gICAgICAgIGNvbnRlbnQudGV4dChtZXNzYWdlKTtcclxuICAgICAgICBtb2RhbC5jc3MoJ2NvbG9yJywgJ3JlZCcpO1xyXG4gICAgICAgICQuZmFuY3lib3gub3Blbih7XHJcbiAgICAgICAgc3JjOlwiI21vZGFsXCIsXHJcbiAgICAgICAgY2xhc3M6XCJpbmxpbmVcIixcclxuICAgICAgICBsZWZ0UmF0aW86IDAuNVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG59KVxyXG4kKCcuZm9ybScpLnRyaWdnZXIoXCJyZXNldFwiKVxyXG4gICB9XHJcbn0pXHJcbiQoXCIuYXBwLWNsb3NlLW1vZGFsXCIpLmNsaWNrKGU9PntcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQuZmFuY3lib3guY2xvc2UoKVxyXG59KVxyXG4iLCJsZXQgcGxheWVyO1xyXG5cclxuY29uc3QgcGxheWVyQ29udGFpbmVyID0gJChcIi5wbGF5ZXJcIik7XHJcbmNvbnN0IHBsYXlCdXR0b249JChcIi5wbGF5ZXJfX3N0YXJ0XCIpO1xyXG5jb25zdCBwbGF5ZXJQbGF5PSQoJy5wbGF5ZXJfX3BsYXktLXBsYXknKTtcclxuY29uc3QgcGxheWVyU3RvcD0kKCcucGxheWVyX19wbGF5LS1zdG9wJylcclxuZnVuY3Rpb24gb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkoKSB7XHJcbiBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKFwieXQtcGxheWVyXCIsIHtcclxuICAgaGVpZ2h0OiBcIjQwNVwiLFxyXG4gICB3aWR0aDogXCI2NjBcIixcclxuICAgdmlkZW9JZDogXCJDUlQzOUlUTUFOc1wiLFxyXG4gICBwbGF5ZXJWYXJzOiB7XHJcbiAgIGNvbnRyb2xzOiAwLFxyXG4gICBtb2Rlc3RicmFuZGluZzogMCxcclxuICAgc2hvd2luZm86IDAsXHJcbiAgIHJlbDogMCxcclxuICAgaXZfbG9hZF9wb2xpY3k6IDNcclxuICAgIH0sXHJcblxyXG4gICBldmVudHM6IHtcclxuICAgICBvblJlYWR5OiBvblBsYXllclJlYWR5LFxyXG4gICAgIG9uU3RhdGVDaGFuZ2U6IG9uUGxheWVyU3RhdGVDaGFuZ2VcclxuICAgfVxyXG4gfSk7XHJcbn07XHJcbmNvbnN0IG9uUGxheWVyU3RhdGVDaGFuZ2UgPSBlID0+e1xyXG4gaWYgKHBsYXllci5nZXRQbGF5ZXJTdGF0ZSgpPT0xKXtcclxuICBwbGF5ZXJTdG9wLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIilcclxuIH1cclxuIGVsc2UgaWYgKHBsYXllci5nZXRQbGF5ZXJTdGF0ZSgpPT0yKXtcclxuICBwbGF5ZXJQbGF5LmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiB9XHJcbn1cclxucGxheUJ1dHRvbi5jbGljayhlPT57XHJcbiAgIGlmIChwbGF5ZXJQbGF5Lmhhc0NsYXNzKFwiYWN0aXZlXCIpKXtcclxuICAgICAgIHBsYXllci5wbGF5VmlkZW8oKVxyXG4gICB9XHJcbiAgIGVsc2Uge1xyXG4gICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcclxuICAgfVxyXG59KTtcclxuY29uc3QgZnVuVGltZSA9IHRpbWUgPT57XHJcbiAgICBjb25zdCByb3VuZFRpbWUgPSBNYXRoLnJvdW5kKHRpbWUpO1xyXG4gY29uc3QgbWludXRlcyA9IGFkZFplcm8oTWF0aC5mbG9vcihyb3VuZFRpbWUgLyA2MCkpO1xyXG4gY29uc3Qgc2Vjb25kcyA9IGFkZFplcm8ocm91bmRUaW1lIC0gbWludXRlcyAqIDYwKTtcclxuIFxyXG4gZnVuY3Rpb24gYWRkWmVybyhudW0pIHtcclxuICAgcmV0dXJuIG51bSA8IDEwID8gYDAke251bX1gIDogbnVtO1xyXG4gfVxyXG4gXHJcbiByZXR1cm4gYCR7bWludXRlc30gOiAke3NlY29uZHN9YDtcclxufTtcclxuY29uc3Qgb25QbGF5ZXJSZWFkeSA9ICgpID0+IHtcclxuICAgIGxldCBpbnRlcnZhbDtcclxuICAgIGNvbnN0IGR1cmF0aW9uU2VjID0gcGxheWVyLmdldER1cmF0aW9uKCk7XHJcbiAgICAkKFwiLnBsYXllcl9fZHVyYXRpb24tZXN0aW1hdGVcIikudGV4dChmdW5UaW1lKGR1cmF0aW9uU2VjKSk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZWRQZXJjZW50ID0gKGN1cnJlbnRUaW1lIC8gZHVyYXRpb25TZWMpICogMTAwO1xyXG4gICAgICAgICQoXCIucGxheWVyX19wbGF5YmFjay1idXR0b25cIikuY3NzKHtcclxuICAgICAgICAgICAgbGVmdDogYCR7Y29tcGxldGVkUGVyY2VudH0lYFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5wbGF5ZXJfX2R1cmF0aW9uLWNvbXBsZXRlZFwiKS50ZXh0KGZ1blRpbWUoY3VycmVudFRpbWUpKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICAgfTtcclxuXHJcbiAgICAgICAkKFwiLnBsYXllcl9fcGxheWJhY2tcIikuY2xpY2soZSA9PiB7XHJcbiAgICAgICAgY29uc3QgYmFyID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrZWRQb3NpdGlvbiA9IGUub3JpZ2luYWxFdmVudC5sYXllclg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbmV3QnV0dG9uUG9zaXRpb25QZXJjZW50ID0gKGNsaWNrZWRQb3NpdGlvbiAvIGJhci53aWR0aCgpKSAqIDEwMDtcclxuICAgICAgICBjb25zdCBuZXdQbGF5YmFja1Bvc2l0aW9uU2VjID1cclxuICAgICAgICAgIChwbGF5ZXIuZ2V0RHVyYXRpb24oKSAvIDEwMCkgKiBuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgICAgICAgbGVmdDogYCR7bmV3QnV0dG9uUG9zaXRpb25QZXJjZW50fSVgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxheWVyLnNlZWtUbyhuZXdQbGF5YmFja1Bvc2l0aW9uU2VjKTtcclxuICAgICAgIH0pO1xyXG5cclxuIiwiZnVuY3Rpb24gZmluZEJsb2NrQnlBbGxpYXMoYWxsaWFzKSB7XHJcbiAgICByZXR1cm4gJCgnLnJldmlld19fYmxvY2snKS5maWx0ZXIoKG5keCwgaXRlbSk9PiB7XHJcbiAgICAgICAgcmV0dXJuICQoaXRlbSkuYXR0cihcImRhdGEtbGlua2VkLXdpdGhcIikgPT0gYWxsaWFzO1xyXG4gICAgfSk7XHJcbn1cclxuJCgnLnJldmlld19fbGluaycpLmNsaWNrKGUgPT57XHJcbiAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgIGNvbnN0ICR0aGlzPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgY29uc3QgY3VySXRlbSA9JHRoaXMuY2xvc2VzdCgnLnJldmlld19faXRlbScpO1xyXG4gICAgIGNvbnN0IGVsZW09JHRoaXMuYXR0cihcImRhdGEtb3BlblwiKTtcclxuICAgICBjb25zdCBpdGVtVG9TaG93ID0gZmluZEJsb2NrQnlBbGxpYXMoZWxlbSk7XHJcbiAgICAgY29uc29sZS5sb2coaXRlbVRvU2hvdylcclxuICAgICBpdGVtVG9TaG93LmFkZENsYXNzKCdyZXZpZXdfX2Jsb2NrLS1hY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdyZXZpZXdfX2Jsb2NrLS1hY3RpdmUnKTtcclxuICAgICBjdXJJdGVtLmFkZENsYXNzKCdyZXZpZXdfX2l0ZW0tLWFjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ3Jldmlld19faXRlbS0tYWN0aXZlJylcclxuICAgIH0pIiwiY29uc3Qgc2VjdGlvbnMgPSAkKCdzZWN0aW9uJyk7XHJcbmNvbnN0IGRpc3BsYXkgPSAkKFwiLm1haW5fX3dyYXBwZXJcIik7XHJcbmNvbnN0IHNpZGVNZW51PSQoXCIuZml4ZWRcIik7XHJcbmNvbnN0IHNpZGVNZW51SXRlbT1zaWRlTWVudS5maW5kKCcuZml4ZWRfX2l0ZW0nKVxyXG5jb25zdCBtb2JpbGVEZXRlY3QgPSBuZXcgTW9iaWxlRGV0ZWN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcclxuY29uc3QgaXNNb2JpbGUgPSBtb2JpbGVEZXRlY3QubW9iaWxlKCk7XHJcbmxldCBpblNjcm9sbCA9IGZhbHNlO1xyXG5cclxuc2VjdGlvbnMuZmlyc3QoKS5hZGRDbGFzcygnd3JhcHBlci0tYWN0aXZlJyk7XHJcblxyXG5jb25zdCBjb3VudFNlY3Rpb25Qb3NpdGlvbj1zZWN0aW9uRXE9PntcclxuICAgIGNvbnN0IHBvc2l0aW9uPXNlY3Rpb25FcSAqIC0xMDA7XHJcbiAgICBpZiAoaXNOYU4ocG9zaXRpb24pKXtcclxuICAgICAgICByZXR1cm4gMFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvc2l0aW9uXHJcbn1cclxuXHJcbmNvbnN0IHRoZW1lTWVudT1zZWN0aW9uRXE9PntcclxuICAgIGNvbnN0IGN1cnJlbnRTZWN0aW9uPXNlY3Rpb25zLmVxKHNlY3Rpb25FcSk7XHJcbiAgICBjb25zdCBjdXJyZW50VGhlbWUgPSBjdXJyZW50U2VjdGlvbi5hdHRyKCdkYXRhLW1lbnUtdGhlbWUnKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFRoZW1lPT0nd2hpdGUnKXtcclxuICAgICAgICBzaWRlTWVudS5hZGRDbGFzcygnZml4ZWQtLXNoYWRvdycpXHJcbiAgICAgICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzaWRlTWVudS5yZW1vdmVDbGFzcygnZml4ZWQtLXNoYWRvdycpXHJcbiAgICAgICAgfVxyXG59XHJcblxyXG5jb25zdCByZXNldEFjdGl2ZUl0ZW09IChpdGVtLCBpdGVtRXEsIGFjdGl2ZUNsYXNzKT0+e1xyXG4gICAgaXRlbS5lcShpdGVtRXEpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKVxyXG59XHJcblxyXG5jb25zdCBwZXJmb3JtVHJhbnNpdGlvbiA9IHNlY3Rpb25FcSA9PntcclxuXHJcbiAgICBjb25zdCB0aW1lVHJhbnNpdGlvbj0xMDAwO1xyXG4gICAgY29uc3QgdGltZUluZXJ0aWFNb3VzZSA9MzAwO1xyXG4gICAgaWYoaW5TY3JvbGwpcmV0dXJuO1xyXG4gICAgaW5TY3JvbGw9dHJ1ZTtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gY291bnRTZWN0aW9uUG9zaXRpb24oc2VjdGlvbkVxKTtcclxuXHJcbiAgICB0aGVtZU1lbnUoc2VjdGlvbkVxKTtcclxuICAgIGRpc3BsYXkuY3NzKHtcclxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7cG9zaXRpb259JSlgXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgcmVzZXRBY3RpdmVJdGVtKHNpZGVNZW51SXRlbSxzZWN0aW9uRXEsICdmaXhlZF9faXRlbS0tYWN0aXZlJyk7XHJcbiAgICByZXNldEFjdGl2ZUl0ZW0oc2VjdGlvbnMsc2VjdGlvbkVxLCAnd3JhcHBlci0tYWN0aXZlJyk7XHJcbiAgICBcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgaW5TY3JvbGw9ZmFsc2U7XHJcbiAgICB9LCB0aW1lVHJhbnNpdGlvbit0aW1lSW5lcnRpYU1vdXNlKVxyXG59XHJcblxyXG5cclxuY29uc3Qgdmlld3BvcnRTY3JvbGxlciA9IGRpcmVjdGlvbiA9PntcclxuXHJcbiAgICBjb25zdCBhY3RpdmVTZWN0aW9uID0gc2VjdGlvbnMuZmlsdGVyKFwiLndyYXBwZXItLWFjdGl2ZVwiKTtcclxuICAgIGNvbnN0IG5leHRTZWN0aW9uID0gYWN0aXZlU2VjdGlvbi5uZXh0KCk7XHJcbiAgICBjb25zdCBwcmV2U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ucHJldigpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0KCl7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U2VjdGlvbi5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgcGVyZm9ybVRyYW5zaXRpb24obmV4dFNlY3Rpb24uaW5kZXgoKSlcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHByZXYoKXtcclxuICAgICAgICAgICAgaWYgKHByZXZTZWN0aW9uLmxlbmd0aCl7XHJcbiAgICAgICBwZXJmb3JtVHJhbnNpdGlvbihwcmV2U2VjdGlvbi5pbmRleCgpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG59XHJcbiQod2luZG93KS5vbihcIndoZWVsXCIsIGUgPT57XHJcbiAgICBjb25zdCBkZWx0YVkgPSBlLm9yaWdpbmFsRXZlbnQuZGVsdGFZO1xyXG4gICAgY29uc3Qgc2Nyb2xsZXI9dmlld3BvcnRTY3JvbGxlcigpO1xyXG4gICAgaWYgKGRlbHRhWT4wKXtcclxuICAgICAgICBzY3JvbGxlci5uZXh0KClcclxuICAgIH07XHJcbiAgICBpZiAoZGVsdGFZIDwgMCl7XHJcbiAgICAgICAgc2Nyb2xsZXIucHJldigpXHJcbiAgICB9XHJcbiAgICBcclxufSlcclxuXHJcbiQod2luZG93KS5vbihcImtleWRvd25cIiwgZT0+e1xyXG5cclxuICAgIGNvbnN0IHRhZ05hbWUgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCB1c2VyVHlwaW5nVGV4dCA9IHRhZ05hbWU9PSdpbnB1dCcgfHwgdGFnTmFtZT09J3RleHRhcmVhJztcclxuICAgIGNvbnN0IHNjcm9sbGVyPXZpZXdwb3J0U2Nyb2xsZXIoKTtcclxuICAgIGlmICh1c2VyVHlwaW5nVGV4dClyZXR1cm47XHJcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSl7XHJcbiAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgc2Nyb2xsZXIucHJldigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICBzY3JvbGxlci5uZXh0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG5cclxuICAgIFxyXG59KVxyXG4kKCcud3JhcHBlcicpLm9uKCd0b3VjaG1vdmUnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSlcclxuJCgnW2RhdGEtc2Nyb2xsLXRvXScpLmNsaWNrKGU9PntcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IGRhdGFTY3JvbGw9JHRoaXMuYXR0cignZGF0YS1zY3JvbGwtdG8nKTtcclxuICAgIGNvbnN0IHJlcVNlY3Rpb249JChgW2RhdGEtaWQtc2VjdGlvbj0ke2RhdGFTY3JvbGx9XWApO1xyXG4gICAgcGVyZm9ybVRyYW5zaXRpb24ocmVxU2VjdGlvbi5pbmRleCgpKVxyXG59KVxyXG5pZiAoaXNNb2JpbGUpe1xyXG4gICAgJChcImJvZHlcIikuc3dpcGUoIHtcclxuICAgICAgICBzd2lwZTpmdW5jdGlvbihldmVudCwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICBjb25zdCBzY3JvbGxlcj12aWV3cG9ydFNjcm9sbGVyKCk7XHJcbiAgICAgICAgICBsZXQgc2Nyb2xsRGlyZWN0aW9uPScnO1xyXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbj09J3VwJylzY3JvbGxEaXJlY3Rpb249J25leHQnO1xyXG4gICAgICAgICAgaWYgKGRpcmVjdGlvbj09J2Rvd24nKXNjcm9sbERpcmVjdGlvbj0ncHJldic7XHJcbiAgICAgICAgICAgIHNjcm9sbGVyW3Njcm9sbERpcmVjdGlvbl0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG59XHJcbiIsImNvbnN0IGNyb3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcm9zc1wiKTtcclxuY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3ZlcmxheVwiKTtcclxuY29uc3QgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoYW1idXJnZXJcIik7XHJcbmNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUob3ZlcmxheSk7XHJcblxyXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIG92ZXJsYXkuc3R5bGUucmlnaHQgPSBcIjBweFwiO1xyXG59KTtcclxuXHJcbmNyb3NzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBvdmVybGF5LnN0eWxlLnJpZ2h0ID0gXCItMTAwMHB4XCI7XHJcbn0pO1xyXG5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIG92ZXJsYXkuc3R5bGUucmlnaHQgPSBcIi0xMDAwcHhcIjtcclxufSk7IiwiY29uc3QgdGVhbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VjdGlvbl9fYmxvY2snKTtcclxuXHJcbnRlYW1MaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgbGluayA9IGUudGFyZ2V0O1xyXG4gICAgY29uc29sZS5sb2cobGluayk7XHJcbiAgICBpZiAobGluay5jbGFzc0xpc3QuY29udGFpbnMoJ3RlYW1fX2xpbmsnKSB8fCBsaW5rLmNsYXNzTGlzdC5jb250YWlucygndGVhbV9fbmFtZScpKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdGVhbUxpc3QucXVlcnlTZWxlY3RvcignLnRlYW1fX2l0ZW0udGVhbV9faXRlbS0tYWN0aXZlJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYWN0aXZlKVxyXG4gICAgICAgIGlmICghYWN0aXZlIHx8IGFjdGl2ZS5xdWVyeVNlbGVjdG9yKFwiLnRlYW1fX25hbWVcIikgIT09IGxpbmsgfHwgYWN0aXZlLnF1ZXJ5U2VsZWN0b3IoXCIudGVhbV9fbGlua1wiKSAhPT0gbGluaykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGxpbmsuY2xvc2VzdCgnLnRlYW1fX2l0ZW0nKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd0ZWFtX19pdGVtLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50ZWFtX19pbnZpc2libGUnKTtcclxuICAgICAgICAgICAgY3VycmVudC5zdHlsZS5oZWlnaHQgPSBjdXJyZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3RpdmUpe1xyXG4gICAgICAgICAgICBsZXQgaGlnaCA9IGFjdGl2ZS5xdWVyeVNlbGVjdG9yKCcudGVhbV9faW52aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIGhpZ2guc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ3RlYW1fX2l0ZW0tLWFjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9KSJdfQ==
