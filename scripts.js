document.addEventListener('DOMContentLoaded', function () {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const startDateIcon = document.getElementById('startDateIcon');
    const endDateIcon = document.getElementById('endDateIcon');

    $(startDateInput).datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function () {
            updateDays();
        }
    });

    $(endDateInput).datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function () {
            updateDays();
        }
    });

    startDateIcon.addEventListener('click', function () {
        $(startDateInput).datepicker('show');
    });

    endDateIcon.addEventListener('click', function () {
        $(endDateInput).datepicker('show');
    });

    function updateDays() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (startDate && endDate) {
            const timeDiff = endDate - startDate;
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            document.getElementById('days').value = days > 0 ? days : 0;
            calculateBG();  // Calculate cost immediately after date changes
        }
    }

    function calculateBG() {
        const bgType = document.getElementById('bgType').value;
        const amount = document.getElementById('amount').value;
        const days = document.getElementById('days').value;
        const advance = document.getElementById('advance').value;

        let baseRate = 0.01;

        switch (bgType) {
            case 'tender':
                baseRate = 0.02;
                break;
            case 'contract':
                baseRate = 0.03;
                break;
            case 'advance':
                baseRate = 0.025;
                break;
        }

        if (advance === 'yes') {
            baseRate += 0.01;
        }

        const bgCost = baseRate * amount * (days / 365);
        document.getElementById('bgCost').textContent = bgCost.toFixed(2);
    }

    function toggleContactForm() {
        const formContainer = document.getElementById('contactFormContainer');
        const overlay = document.getElementById('overlay');
        if (formContainer.style.display === 'none' || formContainer.style.display === '') {
            formContainer.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            formContainer.style.display = 'none';
            overlay.style.display = 'none';
        }
    }

    function hideOverlays() {
        const formContainer = document.getElementById('contactFormContainer');
        formContainer.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    document.getElementById('contactIcon').addEventListener('click', toggleContactForm);
    document.getElementById('overlay').addEventListener('click', hideOverlays);

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        document.getElementById('contactForm').reset();  // Reset form after submission
        hideOverlays();  // Close the form
    });
    document.addEventListener('DOMContentLoaded', function () {
        // Закрытие всплывающего окна при нажатии на кнопку закрытия
        document.querySelectorAll('.block-tagi__close').forEach(function (closeButton) {
            closeButton.addEventListener('click', function (event) {
                event.stopPropagation();
                this.closest('.block-tagi__popup').style.display = 'none';
            });
        });
    
        // Открытие всплывающего окна при наведении на элемент
        document.querySelectorAll('.block-tagi__item').forEach(function (tagiItem) {
            tagiItem.addEventListener('mouseenter', function () {
                const popup = this.querySelector('.block-tagi__popup');
                popup.style.display = 'block';
                popup.style.top = `${this.offsetHeight}px`;
            });
    
            tagiItem.addEventListener('mouseleave', function () {
                this.querySelector('.block-tagi__popup').style.display = 'none';
            });
        });
    
        // Открытие модального окна при клике на ссылку
        document.querySelectorAll('.link[data-modal], .button_blue[data-modal]').forEach(function (modalTrigger) {
            modalTrigger.addEventListener('click', function (event) {
                event.preventDefault();
                const modalId = this.getAttribute('data-modal');
                // Реализация открытия модального окна по ID (добавьте ваш код здесь)
            });
        });
    });
    
    
    
    

    // Таймер
    let timerElement = document.getElementById('timer');
    let circleElement = document.getElementById('circle');
    let duration = 10 * 60; // 10 минут в секундах
    let radius = circleElement.r.baseVal.value;
    let circumference = 2 * Math.PI * radius;
    circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
    circleElement.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circleElement.style.strokeDashoffset = offset;
    }

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        let interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            let percent = ((duration - timer) / duration) * 100;
            setProgress(percent);

            if (--timer < 0) {
                clearInterval(interval);
                display.textContent = "00:00";
                setProgress(100);
            }
        }, 1000);
    }

    startTimer(duration, timerElement);
});
