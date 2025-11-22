const player = document.getElementById('mainPlayer');
const source = document.getElementById('mainSource');

const title = document.getElementById("videoTitle");
const channel = document.getElementById("videoChannel");
const date = document.getElementById("videoDate");

const saved = sessionStorage.getItem("videoData");

if (saved) {
    const data = JSON.parse(saved);

    source.src = data.src;
    title.textContent = data.title;
    channel.textContent = data.channel;
    date.textContent = data.date;

    player.load();
    player.play();
} else {
    alert("Видео не выбрано!");
}
