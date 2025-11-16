
function checkVideos() {
    const container = document.getElementById('videos-container');
    const message = document.getElementById('no-videos');

    if (container.children.length === 0) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}
function checkNoSavedVideos() {
    noSavedMessage.style.display = savedContainer.children.length === 1 ? 'block' : 'none';
}

// Получаем контейнеры
const savedContainer = document.getElementById('saved-videos');
const availableContainer = document.getElementById('available-videos');
const noVideosMessage = document.getElementById('no-videos');
const noSavedMessage = document.getElementById('no-saved-videos'); // для сохранённых

noSavedMessage.style.display = savedContainer.children.length === 0 ? 'block' : 'none';

// Проверка на пустой блок сохраненных видео
function checkNoVideos() {
    if (savedContainer.children.length === 0) {
        noVideosMessage.style.display = 'block';
    } else {
        noVideosMessage.style.display = 'none';
    }
}
function checkNoAvailableVideos() {
    const availableContainer = document.getElementById('available-videos');
    const noVideosMessage = document.getElementById('no-videos');

    if (availableContainer.children.length === 0) {
        noVideosMessage.style.display = 'block';
    } else {
        noVideosMessage.style.display = 'none';
    }
}

// Обработчик кнопок "Сохранить" и "Удалить"
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-btn') || e.target.classList.contains('delete-btn')) {
        const card = e.target.closest('.video-card');

       if (e.target.classList.contains('save-btn')) {
    savedContainer.appendChild(card);
    e.target.textContent = 'Удалить';
    e.target.classList.remove('save-btn');
    e.target.classList.add('delete-btn');
} else {
    // перенос в доступные вместо удаления
    availableContainer.appendChild(card);
    e.target.textContent = 'Сохранить';
    e.target.classList.remove('delete-btn');
    e.target.classList.add('save-btn');
}
       checkNoVideos();         // проверка доступных видео
        checkNoSavedVideos();    // проверка сохранённых видео
        checkNoAvailableVideos();  // проверка доступных видео
    }
});

// Автозапуск при загрузке страницы
window.addEventListener('load', checkNoVideos);

// Предпросмотр видео при наведении
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });

    // Полноэкран при клике
    video.addEventListener('click', () => {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
        else if (video.msRequestFullscreen) video.msRequestFullscreen();
        video.play();
    });
});
