// Перевірка підключення файлу
console.log('script.js підключено');

// Оголошення даних варіанта (масив записів із полями date та mood)
const moodEntries = [
    { date: '2026-10-19', mood: 4 },
    { date: '2026-10-20', mood: 5 },
    { date: '2026-10-21', mood: 3 },
    { date: '2026-10-22', mood: 2 },
    { date: '2026-10-23', mood: 4 },
    { date: '2026-10-24', mood: 4 },
    { date: '2026-10-25', mood: 5 }
];

// Стрілкова функція, що повертає текстову назву рівня настрою за його числовою оцінкою (1-5)
const moodToLabel = mood => {
    if (mood === 5) return 'Чудовий';
    if (mood === 4) return 'Радісний';
    if (mood === 3) return 'Спокійний';
    if (mood === 2) return 'Сумний';
    if (mood === 1) return 'Тривожний';
    return 'Невідомо';
};

// Функція для обчислення середнього настрою циклом for та класифікації періоду за допомогою if/else
function calculateAverageMood(entries) {
    let sum = 0;

    // Цикл for: перебір елементів масиву та накопичення суми
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        sum += entry.mood;
        console.log(`Дата: ${entry.date} | Оцінка: ${entry.mood} (${moodToLabel(entry.mood)})`);
    }

    const average = sum / entries.length;
    console.log(`Середній бал настрою за період: ${average.toFixed(2)}`);

    // Умовна конструкція if/else для класифікації результату
    if (average >= 3.5) {
        console.log('Класифікація періоду: «гарний тиждень»');
    } else {
        console.log('Класифікація періоду: «важкий тиждень»');
    }

    return average;
}

// Демонстрація роботи стрілкової функції moodToLabel
console.log('--- Перевірка роботи функції moodToLabel ---');
console.log(`Оцінка 5: ${moodToLabel(5)}`);
console.log(`Оцінка 2: ${moodToLabel(2)}`);

// Виклик основної функції аналізу даних
console.log('--- Аналіз записів трекера настрою ---');
calculateAverageMood(moodEntries);