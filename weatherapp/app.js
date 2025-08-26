new Vue({
            el: '#app',
            data: {
                city: '',
                weatherData: null,
                loading: false,
                error: ''
            },
            computed: {
                weatherIcon() {
                    if (!this.weatherData || !this.weatherData.weather[0]) return 'fas fa-question';
                    
                    const iconCode = this.weatherData.weather[0].icon;
                    const iconMap = {
                        '01d': 'fas fa-sun',
                        '01n': 'fas fa-moon',
                        '02d': 'fas fa-cloud-sun',
                        '02n': 'fas fa-cloud-moon',
                        '03d': 'fas fa-cloud',
                        '03n': 'fas fa-cloud',
                        '04d': 'fas fa-cloud',
                        '04n': 'fas fa-cloud',
                        '09d': 'fas fa-cloud-showers-heavy',
                        '09n': 'fas fa-cloud-showers-heavy',
                        '10d': 'fas fa-cloud-sun-rain',
                        '10n': 'fas fa-cloud-moon-rain',
                        '11d': 'fas fa-bolt',
                        '11n': 'fas fa-bolt',
                        '13d': 'fas fa-snowflake',
                        '13n': 'fas fa-snowflake',
                        '50d': 'fas fa-smog',
                        '50n': 'fas fa-smog'
                    };
                    
                    return iconMap[iconCode] || 'fas fa-question';
                }
            },
            methods: {
                getWeather() {
                    if (!this.city.trim()) {
                        this.error = 'Пожалуйста, введите название города';
                        return;
                    }
                    
                    this.loading = true;
                    this.error = '';
                    
                    const apiKey = 'c2cf9aa843364a6587faf9167aaa2996996';
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&units=metric&appid=${apiKey}&lang=ru`;
                    
                    fetch(apiUrl)
                        .then(response => {
                            if (!response.ok) {
                                if (response.status === 404) {
                                    throw new Error('Город не найден. Проверьте правильность написания.');
                                } else if (response.status === 401) {
                                    throw new Error('Недействительный API-ключ.');
                                } else {
                                    throw new Error('Ошибка сервера. Попробуйте позже.');
                                }
                            }
                            return response.json();
                        })
                        .then(data => {
                            this.weatherData = data;
                            this.loading = false;
                        })
                        .catch(error => {
                            this.error = error.message || 'Произошла ошибка при загрузке данных. Попробуйте позже.';
                            this.weatherData = null;
                            this.loading = false;
                        });
                },
                capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            },
            mounted() {
                this.$el.querySelector('input').focus();
            }
        });