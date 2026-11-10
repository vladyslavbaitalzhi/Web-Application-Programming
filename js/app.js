console.log('app.js підключено');

// Константа URL
const API_URL = 'https://jsonplaceholder.typicode.com/comments?postId=1';
const MAX_NOTE_LENGTH = 200;

// Отримання посилань на елементи DOM
const listContainer = document.querySelector('#mood-history');
const reloadBtn = document.querySelector('#reload-btn');
const loadingIndicator = document.querySelector('#loading-indicator');
const errorMessage = document.querySelector('#error-message');

const moodForm = document.querySelector('#mood-form');
const dateInput = document.querySelector('#entry-date');
const moodInput = document.querySelector('#mood');
const noteInput = document.querySelector('#note');
const charCounter = document.querySelector('#char-counter');

// Керування станом завантаження
function showLoading(isLoading) {
    loadingIndicator.hidden = !isLoading;
    reloadBtn.disabled = isLoading;
}

// Керування відображенням помилок
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
}

function hideError() {
    errorMessage.textContent = '';
    errorMessage.hidden = true;
}

// Функція рендерингу списку в DOM (виводить поля: name, body, email)
function renderMoodHistory(entries) {
    listContainer.innerHTML = '';

    entries.forEach(entry => {
        const card = document.createElement('article');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = entry.name;

        const body = document.createElement('p');
        body.classList.add('card__note');
        body.textContent = entry.body;

        const email = document.createElement('small');
        email.classList.add('card__email');
        email.textContent = entry.email;

        card.append(title, body, email);
        listContainer.append(card);
    });
}

// Отримання записів настрою з API JSONPlaceholder:
// https://jsonplaceholder.typicode.com/comments?postId=1
async function loadData() {
    showLoading(true);
    hideError();

    try {
        const response = await fetch(API_URL);

        // Перевірка HTTP-статусу відповіді
        if (!response.ok) {
            throw new Error(`Сервер відповів кодом ${response.status}`);
        }

        const data = await response.json();
        renderMoodHistory(data);
    } catch (error) {
        // Очищення контейнера та виведення тексту помилки згідно з вимогами Варіанта 3
        listContainer.innerHTML = '';
        showError('Записи тимчасово недоступні');
        console.error('Помилка завантаження даних:', error);
    } finally {
        showLoading(false);
    }
}

// Обробники подій
reloadBtn.addEventListener('click', loadData);

moodInput.addEventListener('input', () => {
    const value = Number(moodInput.value);
    if (moodInput.value !== '' && (value < 1 || value > 5)) {
        moodInput.setCustomValidity('Оцінка настрою має бути від 1 до 5');
    } else {
        moodInput.setCustomValidity('');
    }
});

noteInput.addEventListener('input', () => {
    const remaining = MAX_NOTE_LENGTH - noteInput.value.length;
    charCounter.textContent = `Залишилося символів: ${remaining}`;
});

moodForm.addEventListener('submit', event => {
    event.preventDefault();

    const newEntry = {
        name: `Запис від ${dateInput.value} (Оцінка: ${moodInput.value}/5)`,
        body: noteInput.value.trim(),
        email: 'local-user@example.com'
    };

    const card = document.createElement('article');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.textContent = newEntry.name;

    const body = document.createElement('p');
    body.classList.add('card__note');
    body.textContent = newEntry.body;

    const email = document.createElement('small');
    email.classList.add('card__email');
    email.textContent = newEntry.email;

    card.append(title, body, email);
    listContainer.prepend(card);

    moodForm.reset();
    charCounter.textContent = `Залишилося символів: ${MAX_NOTE_LENGTH}`;
});

// Початкове завантаження даних при завантаженні сторінки
loadData();