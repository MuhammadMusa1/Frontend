let selectedImage = null;

// Примеры мемов для быстрой загрузки
const memeExamples = [
    { 
        image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=300&fit=crop', 
        top: 'КОГДА ТВОЙ КОД', 
        bottom: 'НАКОНЕЦ-ТО РАБОТАЕТ' 
    },
    { 
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=300&fit=crop', 
        top: 'ПОНЕДЕЛЬНИК', 
        bottom: 'БУДЬ ПРОКЛЯТ' 
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// Инициализация всех обработчиков событий
function initializeEventListeners() {
    // Загрузка изображения
    document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
    
    // Генерация мема при изменении текста
    document.getElementById('topText').addEventListener('input', generateMeme);
    document.getElementById('bottomText').addEventListener('input', generateMeme);
    
    // Генерация мема по нажатию Enter
    document.getElementById('topText').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateMeme();
    });
    
    document.getElementById('bottomText').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') generateMeme();
    });
    
    console.log('Генератор мемов инициализирован!');
}

// Обработка загрузки изображения
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        // Проверка типа файла
        if (!file.type.startsWith('image/')) {
            alert('Пожалуйста, выберите файл изображения!');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            selectedImage = event.target.result;
            document.getElementById('memeImage').src = selectedImage;
            generateMeme(); // Автоматически генерируем мем после загрузки
        };
        reader.onerror = function() {
            alert('Ошибка при чтении файла!');
        };
        reader.readAsDataURL(file);
    }
}

// Генерация мема
function generateMeme() {
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    
    // Обновляем отображение текста
    document.getElementById('topTextDisplay').textContent = topText;
    document.getElementById('bottomTextDisplay').textContent = bottomText;
    
    // Адаптируем размер шрифта в зависимости от длины текста
    adjustTextSize(topText, bottomText);
}

// Адаптация размера текста
function adjustTextSize(topText, bottomText) {
    const topElement = document.getElementById('topTextDisplay');
    const bottomElement = document.getElementById('bottomTextDisplay');
    
    const maxLength = Math.max(topText.length, bottomText.length);
    let fontSize = 32;
    
    if (maxLength > 30) fontSize = 24;
    if (maxLength > 50) fontSize = 18;
    if (maxLength > 70) fontSize = 14;
    
    topElement.style.fontSize = fontSize + 'px';
    bottomElement.style.fontSize = fontSize + 'px';
}

// Скачивание мема
function downloadMeme() {
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    
    if (!selectedImage) {
        alert('Пожалуйста, сначала выберите изображение!');
        return;
    }
    
    if (!topText && !bottomText) {
        alert('Добавьте текст для создания мема!');
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Рисуем изображение
        ctx.drawImage(img, 0, 0);
        
        // Настройки текста в стиле мемов
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = Math.max(canvas.width / 100, 3);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // Адаптивный размер шрифта
        const fontSize = Math.max(canvas.width / 15, 20);
        ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
        
        // Верхний текст
        if (topText) {
            const topY = canvas.height * 0.05;
            ctx.strokeText(topText.toUpperCase(), canvas.width / 2, topY);
            ctx.fillText(topText.toUpperCase(), canvas.width / 2, topY);
        }
        
        // Нижний текст
        if (bottomText) {
            const textMetrics = ctx.measureText(bottomText.toUpperCase());
            const bottomY = canvas.height - textMetrics.actualBoundingBoxDescent - canvas.height * 0.05;
            ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, bottomY);
            ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, bottomY);
        }
        
        // Создаем ссылку для скачивания
        const link = document.createElement('a');
        link.download = `meme-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Уведомление об успешном скачивании
        showNotification('Мем успешно скачан! 🎉');
    };
    
    img.onerror = function() {
        alert('Ошибка при загрузке изображения!');
    };
    
    img.src = selectedImage;
}

// Загрузка примера мема
function loadExample(index) {
    if (index >= 0 && index < memeExamples.length) {
        const example = memeExamples[index];
        selectedImage = example.image;
        
        const img = document.getElementById('memeImage');
        img.onload = function() {
            document.getElementById('topText').value = example.top;
            document.getElementById('bottomText').value = example.bottom;
            generateMeme();
        };
        img.src = example.image;
    }
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Глобальные функции для HTML атрибутов
window.generateMeme = generateMeme;
window.downloadMeme = downloadMeme;
window.loadExample = loadExample;