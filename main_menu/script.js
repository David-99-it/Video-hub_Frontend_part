document.querySelectorAll(".open-player").forEach(card => {
    card.addEventListener("click", function (e) {
        e.preventDefault(); // отменяем стандартный переход

        const src = this.dataset.src;
        const title = this.querySelector("h3").textContent;
        const channel = this.querySelector("h5").textContent; // берём первый h5
        const date = this.querySelector("p").textContent;      // дата внутри <p>

        // сохраняем в sessionStorage
        sessionStorage.setItem("videoData", JSON.stringify({
            src: src,
            title: title,
            channel: channel,
            date: date
        }));

        // переходим в плеер
        window.location.href = "/video-player/index.html";
    });
});
