
const savedContainer = document.getElementById('saved-videos');
const availableContainer = document.getElementById('available-videos');
const noVideosMessage = document.getElementById('no-videos');
const noSavedMessage = document.getElementById('no-saved-videos');

function checkNoSavedVideos() {
    const videoCards = savedContainer.querySelectorAll('.video-card'); // только видео
    noSavedMessage.style.display = videoCards.length === 0 ? 'block' : 'none';
}

// Запуск при загрузке
window.addEventListener('load', checkNoSavedVideos);

// И после удаления/сохранения видео
// например, внутри обработчика кнопок:
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.video-card');
        card.remove();  // удаляем
        checkNoSavedVideos(); // проверка после удаления
    }
});
function updateMessages() {
    const savedVideos = savedContainer.querySelectorAll('.video-card');
    const availableVideos = availableContainer.querySelectorAll('.video-card');

    noSavedMessage.style.display = savedVideos.length === 0 ? 'block' : 'none';
    noVideosMessage.style.display = availableVideos.length === 0 ? 'block' : 'none';
}

// Обработчик кнопок "Сохранить" и "Удалить" через делегирование
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn') || e.target.classList.contains('delete-btn')) {
        e.stopPropagation();
        const card = e.target.closest('.video-card');

        if (e.target.classList.contains('save-btn')) {
            savedContainer.appendChild(card);
            e.target.textContent = 'Удалить';
            e.target.classList.remove('save-btn');
            e.target.classList.add('delete-btn');
        } else {
            availableContainer.appendChild(card);
            e.target.textContent = 'Сохранить';
            e.target.classList.remove('delete-btn');
            e.target.classList.add('save-btn');
        }

        updateMessages();
    }
});

// Обработчик клика по карточке для открытия видео
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn') || e.target.classList.contains('save-btn')) return;

        const data = {
            src: card.dataset.src,
            title: card.dataset.title,
            channel: card.dataset.channel,
            date: card.dataset.date
        };
        sessionStorage.setItem("videoData", JSON.stringify(data));
        window.location.href = "video-player/index.html";
    });
});

// Предпросмотр видео при наведении
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Автозапуск при загрузке страницы
window.addEventListener('load', updateMessages);
