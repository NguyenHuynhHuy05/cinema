// Nội dung file: js/detail-script.js

// Đường dẫn TƯƠNG ĐỐI đến file dữ liệu phim. 
// LƯU Ý: Nếu file HTML và thư mục 'js' nằm cùng cấp, đường dẫn này là chính xác.
const DATA_FILE_PATH = 'js/movie-data.json'; 

document.addEventListener("DOMContentLoaded", () => {
    
    console.log("--- BẮT ĐẦU TẢI DỮ LIỆU PHIM VÀ THIẾT LẬP SỰ KIỆN ---");

    // ===================================
    // XỬ LÝ NÚT THÀNH VIÊN (LOGIN/REGISTER)
    // ===================================
    const loginButton = document.querySelector(".button-login"); 
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            window.location.href = "login.html"; 
        });
    }

    // ===================================
    // XỬ LÝ TẢI DỮ LIỆU PHIM
    // ===================================
    fetch(DATA_FILE_PATH)
        .then(response => {
            if (!response.ok) {
                console.error("Lỗi: Không thể tải file CSDL. Status:", response.status, "URL:", DATA_FILE_PATH);
                throw new Error(`Không thể tải file CSDL '${DATA_FILE_PATH}'. Lỗi: ${response.status} - ${response.statusText}`);
            }
            console.log("Thành công: Đã tải file JSON.");
            return response.json();
        })
        .then(movieDatabase => {
            console.log("Thành công: Đã chuyển đổi JSON thành Object.");

            const urlParams = new URLSearchParams(window.location.search);
            const movieId = urlParams.get('id');
            
            console.log("ID Phim đọc được từ URL:", movieId); 

            if (movieId) {
                const movie = movieDatabase[movieId];

                if (movie) {
                    console.log("Thành công: Đã tìm thấy phim:", movie.P_TEN);
                    
                    // ===================================
                    // ĐIỀN DỮ LIỆU VÀO HTML
                    // ===================================
                    document.title = movie.P_TEN + " - mephim.vn"; 
                    document.getElementById("movie-title").textContent = movie.P_TEN;
                    
                    // 🖼️ XỬ LÝ POSTER (Vấn đề đường dẫn)
                    const posterElement = document.getElementById("movie-poster");
                    if (posterElement) {
                        posterElement.src = movie.P_POSTER;
                        posterElement.alt = movie.P_TEN;
                    }

                    document.getElementById("movie-description").textContent = movie.P_MOTA;
                    
                    // XỬ LÝ NHÃN MÀU ĐỎ
                    const ageTagElement = document.getElementById("movie-rating");
                    if (ageTagElement) {
                        ageTagElement.textContent = movie.P_NHAN ? movie.P_NHAN.split(' ')[0] : 'ĐC'; // Nếu không có nhãn, đặt mặc định là 'ĐC'
                    }
                    
                    // Điền Năm và Thời lượng
                    document.getElementById("movie-year").textContent = movie.P_NAMPH;
                    document.getElementById("movie-duration").textContent = movie.P_THOILUONG;
                    
                    // 🎬 KHẮC PHỤC LỖI TRAILER (Đảm bảo logic đúng)
                    const trailerElement = document.getElementById("movie-video-player");
                    if (trailerElement) {
                        // Gán đường dẫn Trailer cho thuộc tính src của IFRAME
                        trailerElement.src = movie.P_TRAILER; 
                        console.log("Đã gán Trailer:", movie.P_TRAILER);
                    } else {
                        console.error("LỖI: Không tìm thấy phần tử có ID 'movie-video-player' trong HTML.");
                    }
                    
                    // Điền Đạo diễn và Diễn viên
                    document.getElementById("movie-director").textContent = movie.DD_ID ? movie.DD_ID : "Đang cập nhật"; 
                    document.getElementById("movie-actors").textContent = movie.P_DIENVIEN;
                    
                    // Xử lý Quốc gia
                    document.getElementById("movie-national").textContent = movie.P_QUOCGIA;

                    // Xử lý điểm (P_DIEM)
                    const scoreElement = document.getElementById("movie-score"); 
                    if (movie.P_DIEM && movie.P_DIEM > 0) {
                        scoreElement.innerHTML = `<i class='bx bxs-star'></i> ${movie.P_DIEM}`;
                        scoreElement.classList.add('imdb'); 
                        scoreElement.style.background = '';
                        scoreElement.style.color = '';
                    } else {
                        scoreElement.innerHTML = `Điểm: Đang cập nhật`; 
                        scoreElement.classList.remove('imdb'); 
                        scoreElement.style.background = '#333'; 
                        scoreElement.style.color = '#fff'; 
                    }

                    // XỬ LÝ GENRE (THỂ LOẠI)
                    const genreContainer = document.getElementById("movie-genre");
                    genreContainer.innerHTML = ""; 
                    if (movie.genre && movie.genre.length > 0) {
                        const genres = Array.isArray(movie.genre) ? movie.genre : movie.genre.split(',').map(g => g.trim());
                        
                        genres.forEach(g => {
                            if (g) {
                                const tag = document.createElement("span");
                                tag.className = "tag category";
                                tag.textContent = g;
                                genreContainer.appendChild(tag);
                            }
                        });
                    } else {
                        console.warn("Phim " + movie.P_TEN + " không có thuộc tính 'genre' hoặc genre rỗng.");
                    }

                } else {
                    console.error(`LỖI: Key '${movieId}' không tồn tại trong CSDL. Vui lòng kiểm tra lại Key/ID.`);
                    handleMovieNotFound();
                }
            } else {
                console.error("LỖI: Không tìm thấy tham số 'id' trên URL.");
                handleMovieNotFound();
            }
        })
        .catch(error => {
            console.error("LỖI NGHIÊM TRỌNG (Mạng hoặc JSON):", error);
            handleMovieNotFound();
        });
});

function handleMovieNotFound() {
    const detailsContainer = document.querySelector(".movie-details-container");
    if (detailsContainer) {
        detailsContainer.innerHTML = 
            "<div style='text-align: center; width: 100%; padding: 50px 0;'><h1>Lỗi 404: Phim không tồn tại.</h1><p>Vui lòng quay lại <a href='main.html' style='color: var(--main-color); text-decoration: underline;'>Trang chủ</a>.</p></div>";
    }
    
    const watchSection = document.querySelector(".watch-section");
    if (watchSection) {
        watchSection.style.display = "none";
    }
    
    document.title = "Không tìm thấy phim - mephim.vn";
}

// THANH ĐIỀU HƯỚNG NỀN ĐEN KHI CUỘN
window.addEventListener("scroll", () => {
    const header = document.querySelector("header"); 
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});