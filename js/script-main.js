
var swiperHome = new Swiper(".home", {
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination", 
        clickable: true,
    },
    preventClicks: false,
    preventClicksPropagation: false,
    noSwipingSelector: '.swiper-no-swiping',
    touchRatio: 0.5, 
    touchAngle: 10,  
    
});
    

var swiperMovies = new Swiper(".movie-container", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction:false,
    },
    centeredSlides: true,
    preventClicks: false,
    preventClicksPropagation: false,
    noSwipingSelector: '.swiper-no-swiping',
    touchRatio: 0.5, 
    touchAngle: 10,  
    

    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        568: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        968:{
            slidesPerView: 5,
        }
    },
});



window.addEventListener("scroll", () => {
    const header = document.querySelector("header"); 
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
 