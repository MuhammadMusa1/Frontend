let selectedImage = null;

        // Загрузка изображения
        document.getElementById('imageUpload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    selectedImage = event.target.result;
                    document.getElementById('memeImage').src = selectedImage;
                };
                reader.readAsDataURL(file);
            }
        });

        // Генерация мема
        function generateMeme() {
            const topText = document.getElementById('topText').value;
            const bottomText = document.getElementById('bottomText').value;
            
            document.getElementById('topTextDisplay').textContent = topText;
            document.getElementById('bottomTextDisplay').textContent = bottomText;
        }

        // Скачивание мема (используем Canvas)
        function downloadMeme() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = document.getElementById('memeImage');
            
            // Ждем загрузки изображения
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Рисуем изображение
                ctx.drawImage(img, 0, 0);
                
                // Настройки текста
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 3;
                ctx.textAlign = 'center';
                ctx.font = 'bold 40px Impact';
                
                // Верхний текст
                const topText = document.getElementById('topText').value;
                if (topText) {
                    ctx.strokeText(topText, canvas.width / 2, 50);
                    ctx.fillText(topText, canvas.width / 2, 50);
                }
                
                // Нижний текст
                const bottomText = document.getElementById('bottomText').value;
                if (bottomText) {
                    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
                    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
                }
                
                // Создаем ссылку для скачивания
                const link = document.createElement('a');
                link.download = 'my-meme.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
            
            // Если изображение уже загружено
            if (img.complete) {
                img.onload();
            }
        }

        // Быстрые примеры мемов
        const memeExamples = [
            { image: 'https://via.placeholder.com/500x300/ff6b6b/white?text=Драконий+мем', top: 'Когда твой код', bottom: 'наконец-то работает' },
            { image: 'https://via.placeholder.com/500x300/4ecdc4/white?text=Котик+мем', top: 'Понедельник', bottom: 'будь проклят' }
        ];

        // Функция для быстрой загрузки примера
        window.loadExample = function(index) {
            const example = memeExamples[index];
            selectedImage = example.image;
            document.getElementById('memeImage').src = example.image;
            document.getElementById('topText').value = example.top;
            document.getElementById('bottomText').value = example.bottom;
            generateMeme();
        };



