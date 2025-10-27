document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const progressBar = document.getElementById("progress-bar");
  const slides = document.querySelectorAll(".slide:not(.clone)");
  const totalSlides = slides.length; // 4 элемента
  const slidesToShow = 2; // Сколько элементов видно
  const slideDuration = 3000; // 3 секунды на один "круг" (переход к следующей паре)
  const transitionDuration = 500; // 0.5 секунды на переключение
  let currentSlide = 0;
  let autoSlideInterval;

  // 1. Установим начальную позицию (показываем первые 2)
  // Это не нужно, так как по умолчанию мы показываем первые элементы

  // 2. Функция для запуска анимации прогресс-бара
  function startProgressBarAnimation() {
    // Сброс анимации
    progressBar.style.animation = "none";
    // Принудительный рефлоу для перезапуска
    void progressBar.offsetWidth;
    // Запуск новой анимации
    progressBar.style.animation = `fillProgress ${
      slideDuration / 1000
    }s linear forwards`;
  }

  // 3. Функция для перехода к следующему слайду
  function nextSlide() {
    currentSlide++;
    const offset = currentSlide * (200 / (totalSlides / slidesToShow));
    slider.style.transform = `translateX(-${offset}%)`;

    // Перезапуск прогресс-бара
    startProgressBarAnimation();

    // Проверка для создания эффекта бесконечного цикла
    if (currentSlide >= totalSlides / slidesToShow) {
      // После завершения анимации перехода, мгновенно перемещаемся к началу
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
  direction: "horizontal", // Направление
  slidesPerView: 1, // Показывать по одному слайду
  spaceBetween: 20, // Отступ между слайдами

  // --- Бесконечная прокрутка ---
  loop: true,

  // --- Автопрокрутка ---
  autoplay: {
    delay: 3000, // 3 секунды, как у вас было
    disableOnInteraction: false, // Не отключать после ручного переключения
  },

  // --- Прогресс-бар ---
  pagination: {
    el: ".swiper-pagination", // Элемент, который мы добавили в HTML
    type: "progressbar", // Тип - прогресс-бар
  },

  // --- Скорость анимации ---
  speed: 500, // 0.5 секунды, как у вас было
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
});

// 1. Создаем общий Observer
const generalObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // Проверяем, вошел ли элемент в область видимости
      if (entry.isIntersecting) {
        // 🔥 Добавляем универсальный класс, который запустит CSS-анимацию
        entry.target.classList.add("is-visible");

        // Прекращаем наблюдение за этим конкретным элементом
        observer.unobserve(entry.target);
      }
    });
  },
  {
    // Настройки видимости (можно сделать их общими или задавать через data-атрибут)
    rootMargin: "0px",
    threshold: 0.2, // Срабатывает, когда видно 20% элемента
  }
);

// 2. Ищем ВСЕ элементы, которые нужно анимировать
const animatedElements = document.querySelectorAll("[data-animate-on-scroll]");

// 3. Запускаем наблюдение за каждым найденным элементом
animatedElements.forEach((element) => {
  generalObserver.observe(element);
});
