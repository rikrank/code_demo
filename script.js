
let featureSlide;
let SPEED = 2500;
const SLIDE_CHANGE_DURATION = 1500;

const initAnimationDuration = () => {
    const inidicatorsIn = document.querySelectorAll(".swiper-progress-in");
    inidicatorsIn.forEach((el, index) => {
        el.style.animationDuration = SPEED + "ms";
    });
};

const changeStatusClass = (rIdx) => {
    const indicators = document.querySelectorAll(".swiper-pagination-bullet");
    indicators.forEach((el, index) => {
        rIdx > index && el.classList.add("is-completed"); // 現在のインデックス以前のものには「.is-completed」を付与
        rIdx < index && el.classList.remove("is-completed"); // 現在のインデックス以降のものは「.is-completed」を削除
    });
};

const swiperOptions = {
    speed: SLIDE_CHANGE_DURATION,
    slidesPerView: 1.75,
    centeredSlides: true,
    loop: true,
    spaceBetween: 0,
    autoplay: {
        delay: SPEED,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "bullets",
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "<b class='swiper-progress-in'>" + "</b>" + "</span>";
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        slideChange: (s) => {
            if (featureSlide) {
                featureSlide.params.autoplay.delay = SPEED - SLIDE_CHANGE_DURATION;
                changeStatusClass(s.realIndex);
            }
        },
    },
};

const featureSliderHandler = () => {
    featureSlide = new Swiper(".swiper-container", swiperOptions);
    initAnimationDuration(); // durationの秒数をJSのみで管理できるようにするため、JSでプロパティ設定する
};

window.addEventListener('DOMContentLoaded', () => {
    featureSliderHandler();
})