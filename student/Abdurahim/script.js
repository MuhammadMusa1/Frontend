class MemeGenerator {
    constructor() {
        this.selectedImage = null;
        this.canvas = document.getElementById('memeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.drawPlaceholder();
    }

    setupEventListeners() {
        // Загрузка изображения
        document.getElementById('imageUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Автогенерация при вводе текста
        document.getElementById('topText').addEventListener('input', () => {
            this.generateMeme();
        });

        document.getElementById('bottomText').addEventListener('input', () => {
            this.generateMeme();
        });

        // Генерация по Enter
        document.getElementById('topText').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generateMeme();
        });

        document.getElementById('bottomText').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generateMeme();
        });
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите файл изображения!');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                this.selectedImage = new Image();
                this.selectedImage.onload = () => {
                    this.generateMeme();
                };
                this.selectedImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    generateMeme() {
        if (!this.selectedImage) {
            this.drawPlaceholder();
            return;
        }

        // Очищаем canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Рисуем изображение
        this.ctx.drawImage(this.selectedImage, 0, 0, this.canvas.width, this.canvas.height);

        const topText = document.getElementById('topText').value;
        const bottomText = document.getElementById('bottomText').value;

        // Обновляем текстовые дисплеи
        document.getElementById('topTextDisplay').textContent = topText;
        document.getElementById('bottomTextDisplay').textContent = bottomText;

        // Рисуем текст на canvas
        this.drawTextOnCanvas(topText, bottomText);
    }

    drawTextOnCanvas(topText, bottomText) {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 40px Impact';

        // Верхний текст
        if (topText) {
            this.ctx.strokeText(topText.toUpperCase(), this.canvas.width / 2, 50);
            this.ctx.fillText(topText.toUpperCase(), this.canvas.width / 2, 50);
        }

        // Нижний текст
        if (bottomText) {
            this.ctx.strokeText(bottomText.toUpperCase(), this.canvas.width / 2, this.canvas.height - 20);
            this.ctx.fillText(bottomText.toUpperCase(), this.canvas.width / 2, this.canvas.height - 20);
        }
    }

    drawPlaceholder() {
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ccc';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Выберите изображение', this.canvas.width / 2, this.canvas.height / 2);
    }

    downloadMeme() {
        if (!this.selectedImage) {
            alert('Пожалуйста, сначала выберите изображение!');
            return;
        }

        const topText = document.getElementById('topText').value;
        const bottomText = document.getElementById('bottomText').value;

        if (!topText && !bottomText) {
            alert('Добавьте текст для создания мема!');
            return;
        }

        // Создаем временный canvas для скачивания
        const downloadCanvas = document.createElement('canvas');
        const downloadCtx = downloadCanvas.getContext('2d');
        
        downloadCanvas.width = this.selectedImage.width;
        downloadCanvas.height = this.selectedImage.height;

        // Рисуем изображение
        downloadCtx.drawImage(this.selectedImage, 0, 0);

        // Настройки текста
        downloadCtx.fillStyle = 'white';
        downloadCtx.strokeStyle = 'black';
        downloadCtx.lineWidth = Math.max(downloadCanvas.width / 100, 3);
        downloadCtx.textAlign = 'center';
        downloadCtx.font = `bold ${Math.max(downloadCanvas.width / 15, 20)}px Impact`;

        // Верхний текст
        if (topText) {
            downloadCtx.strokeText(topText.toUpperCase(), downloadCanvas.width / 2, 50);
            downloadCtx.fillText(topText.toUpperCase(), downloadCanvas.width / 2, 50);
        }

        // Нижний текст
        if (bottomText) {
            downloadCtx.strokeText(bottomText.toUpperCase(), downloadCanvas.width / 2, downloadCanvas.height - 20);
            downloadCtx.fillText(bottomText.toUpperCase(), downloadCanvas.width / 2, downloadCanvas.height - 20);
        }

        // Скачивание
        const link = document.createElement('a');
        link.download = `meme-${Date.now()}.png`;
        link.href = downloadCanvas.toDataURL('image/png');
        link.click();
    }

    loadExample(index) {
        const examples = [
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

        if (index >= 0 && index < examples.length) {
            const example = examples[index];
            this.selectedImage = new Image();
            this.selectedImage.onload = () => {
                document.getElementById('topText').value = example.top;
                document.getElementById('bottomText').value = example.bottom;
                this.generateMeme();
            };
            this.selectedImage.src = example.image;
        }
    }
}

// Инициализация приложения
let memeApp;

document.addEventListener('DOMContentLoaded', () => {
    memeApp = new MemeGenerator();
});

// Глобальные функции для HTML
function generateMeme() {
    memeApp.generateMeme();
}

function downloadMeme() {
    memeApp.downloadMeme();
}

function loadExample(index) {
    memeApp.loadExample(index);
}