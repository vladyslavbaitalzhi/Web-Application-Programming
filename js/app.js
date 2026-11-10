console.log('script.js підключено');

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

const staticCard = document.querySelector('#mood-history .card');
if (staticCard) {
    staticCard.remove();
}

const moodToLabel = mood => (mood >= 4 ? 'good' : 'hard');

function calculateAverageMood(entries) {
    let sum = 0;
    for (let i = 0; i < entries.length; i++) {
        sum += entries[i].mood;
    }
    return sum / entries.length;
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

const avgMoodElement = document.querySelector('#avg-mood');
if (avgMoodElement) {
    const avg = calculateAverageMood(moodEntries);
    avgMoodElement.textContent = `Середній настрій: ${avg.toFixed(2)}`;
}