// Khởi tạo Swiper cho phần Home Slider
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
    
    // ===========================================
    // ⚡️ ĐIỀU CHỈNH ĐỘ NHẠY KÉO (SWIPE) ⚡️
    // ===========================================
    touchRatio: 0.5, // Giảm độ nhạy kéo tổng thể (Mặc định là 1)
    touchAngle: 10,  // Chỉ kéo ngang khi góc kéo nhỏ (ưu tiên cuộn dọc)
    // ===========================================
});
    
// Khởi tạo Swiper cho các danh sách phim (movie-container)
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
    
    // ===========================================
    // ⚡️ ĐIỀU CHỈNH ĐỘ NHẠY KÉO (SWIPE) ⚡️
    // ===========================================
    touchRatio: 0.5, // Giảm độ nhạy kéo tổng thể
    touchAngle: 10,  // Ưu tiên cuộn dọc
    // ===========================================

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

// ... (phần code cuộn trang giữ nguyên)
// THANH ĐIỀU HƯỚNG NỀN ĐEN KHI CUỘN
window.addEventListener("scroll", () => {
    const header = document.querySelector("header"); 
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
