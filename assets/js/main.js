document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const progressBar = document.getElementById("progress-bar");
  const slides = document.querySelectorAll(".slide:not(.clone)");
  const totalSlides = slides.length;
  const slidesToShow = 2;
  const slideDuration = 3000;
  const transitionDuration = 500;
  let currentSlide = 0;
  let autoSlideInterval;

  // 2. Функция для запуска анимации прогресс-бара
  function startProgressBarAnimation() {
    progressBar.style.animation = "none";

    void progressBar.offsetWidth;

    progressBar.style.animation = `fillProgress ${
      slideDuration / 1000
    }s linear forwards`;
  }

  // 3. Функция для перехода к следующему слайду
  function nextSlide() {
    currentSlide++;
    const offset = currentSlide * (200 / (totalSlides / slidesToShow));
    slider.style.transform = `translateX(-${offset}%)`;

    startProgressBarAnimation();

    if (currentSlide >= totalSlides / slidesToShow) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentSlide = 0;
        slider.style.transform = "translateX(0)";
        // Возвращаем анимацию перехода
        setTimeout(() => {
          slider.style.transition = `transform ${
            transitionDuration / 1000
          }s ease-in-out`;
        }, 50);
      }, transitionDuration);
    }
  }

  // 4. Запускаем слайдер и прогресс-бар
  function startSlider() {
    startProgressBarAnimation();
    autoSlideInterval = setInterval(nextSlide, slideDuration);
  }

  // Запуск при загрузке страницы
  startSlider();
});

const swiper = new Swiper(".swiper", {
  // --- Основные параметры ---
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 20,

  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // --- Прогресс-бар ---
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },

  // --- Скорость анимации ---
  speed: 500,
});

document.addEventListener("DOMContentLoaded", () => {
  const sideBarMenu = document.getElementById("sidebar-menu");
  const openBtn = document.getElementById("open-sidebar");
  const closeBtn = document.getElementById("close-sidebar");
  openBtn.addEventListener("click", () => {
    sideBarMenu.classList.add("active");
  });
  closeBtn.addEventListener("click", () => {
    sideBarMenu.classList.remove("active");
  });

  sideBarMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      sideBarMenu.classList.remove("active");
    });
  });
});

// 1. Создаем общий Observer
const generalObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2,
  }
);

// 2. Ищем ВСЕ элементы, которые нужно анимировать
const animatedElements = document.querySelectorAll("[data-animate-on-scroll]");

// 3. Запускаем наблюдение за каждым найденным элементом
animatedElements.forEach((element) => {
  generalObserver.observe(element);
});
