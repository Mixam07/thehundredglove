const wrappers = document.querySelectorAll(".video__item");
let activeIndex = null;

wrappers.forEach((wrapper, index) => {
    const video = wrapper.querySelector("[data-video]");
    const playIcon = wrapper.querySelector(".video__play-icon");

    // Клік по відео-блоку
    wrapper.addEventListener("click", () => {
        document.querySelectorAll("[data-video]").forEach((v, i) => {
            if (i !== index) {
                v.pause();
                // ВАЖЛИВО: НЕ скидати currentTime одразу
                const parent = v.closest(".video__item");
                parent?.classList.remove("playing");
            }
        });

        // Перемикаємо play/pause для поточного
        if (video.paused) {
            video.play();
            activeIndex = index;
        } else {
            video.pause();
            activeIndex = null;
        }
    });

    // Клас playing → іконка зникає
    video.addEventListener("play", () => {
        wrapper.classList.add("playing");
    });

    video.addEventListener("pause", () => {
        wrapper.classList.remove("playing");
    });

    // Додатково: коли відео закінчиться — повернути play-іконку
    video.addEventListener("ended", () => {
        wrapper.classList.remove("playing");
        video.currentTime = 0; // тепер можна скидати
    });
});