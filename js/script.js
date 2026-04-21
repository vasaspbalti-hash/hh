function mobileMenu() {
    var navbar = document.getElementsByTagName("navbar")[0];
    if (!navbar) {
        return;
    }

    navbar.classList.toggle("mobile");
}

document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.getElementsByTagName("navbar")[0];
    var audio = document.getElementById("balti-audio");
    var toggle = document.getElementById("music-toggle");
    var status = document.getElementById("music-status");

    if (navbar) {
        var links = navbar.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function () {
                if (window.innerWidth <= 800) {
                    navbar.classList.remove("mobile");
                }
            });
        }

        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                navbar.classList.remove("mobile");
            }
        });
    }

    if (!audio || !toggle) {
        return;
    }

    audio.volume = 1;

    function updateButton(isPlaying) {
        toggle.classList.toggle("is-playing", isPlaying);
        toggle.setAttribute("aria-pressed", String(isPlaying));
        toggle.innerHTML = isPlaying
            ? '<i class="fa-solid fa-pause"></i><span>Пауза</span>'
            : '<i class="fa-solid fa-play"></i><span>Включить мелодию</span>';

        if (status) {
            status.textContent = isPlaying
                ? "Музыка играет."
                : "Нажми на кнопку или плеер ниже, чтобы включить музыку.";
        }
    }

    toggle.addEventListener("click", function () {
        if (audio.paused) {
            audio.play()
                .then(function () {
                    updateButton(true);
                })
                .catch(function () {
                    if (status) {
                        status.textContent = "Браузер заблокировал запуск. Нажми кнопку Play на встроенном плеере.";
                    }
                });
        } else {
            audio.pause();
            updateButton(false);
        }
    });

    audio.addEventListener("play", function () {
        updateButton(true);
    });

    audio.addEventListener("pause", function () {
        updateButton(false);
    });

    audio.addEventListener("ended", function () {
        updateButton(false);
    });

    audio.addEventListener("error", function () {
        if (status) {
            status.textContent = "Аудио не загрузилось. Проверь файл audio/balti-theme.wav.";
        }
    });
});
