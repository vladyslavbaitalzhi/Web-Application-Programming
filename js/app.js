console.log('app.js підключено');

const moodEntries = [
    { date: '2026-10-19', mood: 4, note: 'Продуктивний робочий день, гарний настрій.' },
    { date: '2026-10-20', mood: 5, note: 'Чудовий вечір із друзями, багато позитиву.' },
    { date: '2026-10-21', mood: 3, note: 'Звичайний спокійний день без особливих подій.' },
    { date: '2026-10-22', mood: 2, note: 'Втома та погана погода, відчувався смуток.' },
    { date: '2026-10-23', mood: 4, note: 'Вдалося завершити складне завдання, задоволений.' },
    { date: '2026-10-24', mood: 4, note: 'Плідно попрацював над практичною роботою.' },
    { date: '2026-10-25', mood: 5, note: 'Чудовий вихідний день на природі.' }
];

const listContainer = document.querySelector('#mood-history');
const moodForm = document.querySelector('#mood-form');
const dateInput = document.querySelector('#entry-date');
const moodInput = document.querySelector('#mood');
const noteInput = document.querySelector('#note');
const charCounter = document.querySelector('#char-counter');
const avgMoodElement = document.querySelector('#avg-mood');

const MAX_NOTE_LENGTH = 200;

const staticCard = document.querySelector('#mood-history .card');
if (staticCard) {
    staticCard.remove();
}

const moodToLabel = mood => (mood >= 4 ? 'good' : 'hard');

function calculateAverageMood(entries) {
    if (entries.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < entries.length; i++) {
        sum += entries[i].mood;
    }
    return sum / entries.length;
}

function updateAverageMood() {
    if (avgMoodElement) {
        const avg = calculateAverageMood(moodEntries);
        avgMoodElement.textContent = `Середній настрій: ${avg.toFixed(2)}`;
    }
}

function renderMoodHistory(entries) {
    listContainer.innerHTML = '';

    entries.forEach(entry => {
        const card = document.createElement('article');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = entry.date;

        const note = document.createElement('p');
        note.textContent = entry.note;

        card.append(title, note);

        card.dataset.mood = entry.mood;
        card.classList.add(moodToLabel(entry.mood));

        listContainer.append(card);
    });
}

renderMoodHistory(moodEntries);
updateAverageMood();

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
        date: dateInput.value,
        mood: Number(moodInput.value),
        note: noteInput.value.trim()
    };

    moodEntries.push(newEntry);
    renderMoodHistory(moodEntries);
    updateAverageMood();

    moodForm.reset();
    charCounter.textContent = `Залишилося символів: ${MAX_NOTE_LENGTH}`;
});