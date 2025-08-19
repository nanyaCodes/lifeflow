
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    
    if (mobileMenuButton && mobileMenu && hamburgerIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                
                mobileMenu.offsetHeight;
                mobileMenu.classList.add('show');
            } else {
                mobileMenu.classList.remove('show');
                
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
            }
            
            hamburgerIcon.classList.toggle('hidden');
            hamburgerIcon.classList.toggle('block');
            closeIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('block');
            
        
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });

        
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
            const isMenuOpen = !mobileMenu.classList.contains('hidden');
            
            if (!isClickInsideNav && isMenuOpen) {
                mobileMenu.classList.remove('show');
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
                hamburgerIcon.classList.remove('hidden');
                hamburgerIcon.classList.add('block');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('block');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});


let currentMonth = 5; 
let currentYear = 2024;
let selectedDate = null;

let selectedTime = {
    hour: 8,
    minute: 30,
    period: 'AM'
};

// DOM elements
const startProcessBtn = document.getElementById('startProcessBtn');
const startBtn = document.getElementById('startBtn');
const processBtn = document.getElementById('processBtn');
const starterBtn = document.getElementById('starterBtn');
const lifeBtn = document.getElementById('lifeBtn');
const modalOverlay = document.getElementById('modal-overlay');
const closeForm = document.getElementById('closeForm');
const findHospitalsBtn = document.getElementById('findHospitalsBtn');
const hospitalModal = document.getElementById('hospitalModal');
const loadingScreen = document.getElementById('loadingScreen');
const resultsScreen = document.getElementById('resultsScreen');
const closeHospitalModal = document.getElementById('closeHospitalModal');
const closeResultsModal = document.getElementById('closeResultsModal');
const scheduleModal = document.getElementById('scheduleModal');
const closeScheduleModal = document.getElementById('closeScheduleModal');
const dateStep = document.getElementById('dateStep');
const timeStep = document.getElementById('timeStep');
const backButton = document.getElementById('backButton');
const backToDate = document.getElementById('backToDate');
const confirmAppointment = document.getElementById('confirmAppointment');
const confirmationModal = document.getElementById('confirmationModal');
const closeConfirmationModal = document.getElementById('closeConfirmationModal');
const goToMail = document.getElementById('goToMail');

// Event listeners for modal flow
startProcessBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

startBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

starterBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

processBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

lifeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

closeForm.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

findHospitalsBtn.addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const bloodGroup = document.getElementById('bloodGroup').value;

    if (!fullName || !phoneNumber || !emailAddress || !bloodGroup) {
        alert('Please fill in all required fields');
        return;
    }

    modalOverlay.classList.add('hidden');
    showHospitalLoading();
});

function showHospitalLoading() {
    hospitalModal.classList.remove('hidden');
    hospitalModal.classList.add('flex');
    loadingScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');

    setTimeout(() => {
        showHospitalResults();
    }, 3000);
}

function showHospitalResults() {
    loadingScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
}

closeHospitalModal.addEventListener('click', () => {
    hospitalModal.classList.add('hidden');
    hospitalModal.classList.remove('flex');
});

closeResultsModal.addEventListener('click', () => {
    hospitalModal.classList.add('hidden');
    hospitalModal.classList.remove('flex');
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'makeAppointmentBtn') {
        console.log('Make appointment button clicked!');
        hospitalModal.classList.add('hidden');
        hospitalModal.classList.remove('flex');
        scheduleModal.classList.remove('hidden');
        scheduleModal.classList.add('flex');
        showDateStep();
        updateCalendar();
    }
});

function openScheduleModal() {
    scheduleModal.classList.remove('hidden');
    scheduleModal.classList.add('flex');
    showDateStep();
    updateCalendar();
}

closeScheduleModal.addEventListener('click', () => {
    scheduleModal.classList.add('hidden');
    scheduleModal.classList.remove('flex');
    resetScheduleModal();
});

function resetScheduleModal() {
    showDateStep();
    selectedDate = null;
    selectedTime = {
        hour: 8,
        minute: 30,
        period: 'AM'
    };
    if (document.getElementById('timeSelect')) {
        document.getElementById('timeSelect').value = `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.period}`;
    }
    updateTimePicker();
}

function showDateStep() {
    dateStep.classList.remove('hidden');
    timeStep.classList.add('hidden');
    backButton.classList.add('hidden');
}

function showTimeStep() {
    dateStep.classList.add('hidden');
    timeStep.classList.remove('hidden');
    backButton.classList.remove('hidden');
    updateTimePicker();
}

backToDate.addEventListener('click', showDateStep);

confirmAppointment.addEventListener('click', () => {
    console.log('Confirm appointment clicked!');
    if (selectedDate && selectedTime) {
        scheduleModal.classList.add('hidden');
        scheduleModal.classList.remove('flex');
        showConfirmationModal();
    } else {
        alert('Please select both date and time');
    }
});

function showConfirmationModal() {
    console.log('Showing confirmation modal...');
    const timeString = `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.period}`;
    document.getElementById('confirmationTime').textContent = timeString.toUpperCase();
    
    if (selectedDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = selectedDate.toLocaleDateString('en-US', options);
        const ordinal = getOrdinal(selectedDate.getDate());
        const formattedDate = dateStr.replace(/\d+/, selectedDate.getDate() + ordinal);
        document.getElementById('confirmationDate').textContent = formattedDate;
    }

    confirmationModal.classList.remove('hidden');
    confirmationModal.classList.add('flex');
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

closeConfirmationModal.addEventListener('click', () => {
    confirmationModal.classList.add('hidden');
    confirmationModal.classList.remove('flex');
    resetScheduleModal();
});

goToMail.addEventListener('click', () => {
    window.open('mailto:', '_blank');
});

// Calendar navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

function updateCalendar() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    document.getElementById('monthYear').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'p-2';
        calendarDays.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day p-2 text-center cursor-pointer rounded hover:bg-gray-100';
        dayElement.textContent = day;
        
        
        if (currentMonth === 5 && currentYear === 2024 && day === 26) {
            dayElement.classList.add('selected');
            selectedDate = new Date(currentYear, currentMonth, day);
            updateDateInput();
        }

        dayElement.addEventListener('click', () => {
            
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            dayElement.classList.add('selected');
            selectedDate = new Date(currentYear, currentMonth, day);
            updateDateInput();
            
            setTimeout(() => {
                showTimeStep();
            }, 300);
        });

        calendarDays.appendChild(dayElement);
    }
}

function updateDateInput() {
    if (selectedDate) {
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = selectedDate.getFullYear();
        document.getElementById('dateInput').value = `${day}/${month}/${year}`;
    }
}

function initTimePicker() {
    createHourPicker();
    createMinutePicker();
    createPeriodPicker();
    updateTimeDisplay();
}

function createHourPicker() {
    const hourPicker = document.getElementById('hourPicker');
    if (!hourPicker) return; 
    
    hourPicker.innerHTML = '';
    
    hourPicker.innerHTML += '<div class="picker-item" style="height: 50px;"></div>';
    
    for (let i = 1; i <= 12; i++) {
        const item = document.createElement('div');
        item.className = `picker-item ${i === selectedTime.hour ? 'selected' : 'inactive'}`;
        item.textContent = i;
        item.addEventListener('click', () => selectHour(i));
        hourPicker.appendChild(item);
    }
    
    hourPicker.innerHTML += '<div class="picker-item" style="height: 50px;"></div>';
    
    setTimeout(() => {
        const selectedIndex = selectedTime.hour - 1;
        hourPicker.scrollTop = selectedIndex * 50;
    }, 0);
}

function createMinutePicker() {
    const minutePicker = document.getElementById('minutePicker');
    if (!minutePicker) return; 
    
    minutePicker.innerHTML = '';
    
    minutePicker.innerHTML += '<div class="picker-item" style="height: 50px;"></div>';
    
    for (let i = 0; i <= 59; i++) {
        const item = document.createElement('div');
        const minute = i.toString().padStart(2, '0');
        item.className = `picker-item ${i === selectedTime.minute ? 'selected' : 'inactive'}`;
        item.textContent = minute;
        item.addEventListener('click', () => selectMinute(i));
        minutePicker.appendChild(item);
    }
    
    minutePicker.innerHTML += '<div class="picker-item" style="height: 50px;"></div>';
    
    setTimeout(() => {
        minutePicker.scrollTop = selectedTime.minute * 50;
    }, 0);
}

function createPeriodPicker() {
    const periodPicker = document.getElementById('periodPicker');
    if (!periodPicker) return; 
    
    periodPicker.innerHTML = '';
    
    periodPicker.innerHTML += '<div class="picker-item" style="height: 50px;"></div>';
    
    ['AM', 'PM'].forEach(period => {
        const item = document.createElement('div');
        item.className = `picker-item ${period === selectedTime.period ? 'selected' : 'inactive'}`;
        item.textContent = period;
        item.addEventListener('click', () => selectPeriod(period));
        periodPicker.appendChild(item);
    });
    
    periodPicker.innerHTML += '<div class="picker-item" style="height: 50px;"></div>';
    
    setTimeout(() => {
        const selectedIndex = selectedTime.period === 'AM' ? 0 : 1;
        periodPicker.scrollTop = selectedIndex * 50;
    }, 0);
}

function selectHour(hour) {
    selectedTime.hour = hour;
    updateHourDisplay();
    updateTimeDisplay();
}

function selectMinute(minute) {
    selectedTime.minute = minute;
    updateMinuteDisplay();
    updateTimeDisplay();
}

function selectPeriod(period) {
    selectedTime.period = period;
    updatePeriodDisplay();
    updateTimeDisplay();
}

function updateHourDisplay() {
    const hourPicker = document.getElementById('hourPicker');
    if (!hourPicker) return;
    
    const items = hourPicker.querySelectorAll('.picker-item');
    items.forEach((item, index) => {
        if (index === 0 || index === items.length - 1) return; 
        const hour = parseInt(item.textContent);
        if (hour === selectedTime.hour) {
            item.className = 'picker-item selected';
        } else {
            item.className = 'picker-item inactive';
        }
    });
}

function updateMinuteDisplay() {
    const minutePicker = document.getElementById('minutePicker');
    if (!minutePicker) return;
    
    const items = minutePicker.querySelectorAll('.picker-item');
    items.forEach((item, index) => {
        if (index === 0 || index === items.length - 1) return; 
        const minute = parseInt(item.textContent);
        if (minute === selectedTime.minute) {
            item.className = 'picker-item selected';
        } else {
            item.className = 'picker-item inactive';
        }
    });
}

function updatePeriodDisplay() {
    const periodPicker = document.getElementById('periodPicker');
    if (!periodPicker) return;
    
    const items = periodPicker.querySelectorAll('.picker-item');
    items.forEach((item, index) => {
        if (index === 0 || index === items.length - 1) return;
        if (item.textContent === selectedTime.period) {
            item.className = 'picker-item selected';
        } else {
            item.className = 'picker-item inactive';
        }
    });
}

function updateTimeDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    if (!timeDisplay) return;
    
    const minute = selectedTime.minute.toString().padStart(2, '0');
    timeDisplay.textContent = `${selectedTime.hour}:${minute} ${selectedTime.period}`;
}

function updateTimePicker() {
    // Only initialize if the elements exist
    if (document.getElementById('hourPicker')) {
        initTimePicker();
        addScrollListeners();
    }
}


function addScrollListeners() {
    const hourPicker = document.getElementById('hourPicker');
    const minutePicker = document.getElementById('minutePicker');
    const periodPicker = document.getElementById('periodPicker');

    if (!hourPicker || !minutePicker || !periodPicker) return;

    let hourScrollTimeout, minuteScrollTimeout, periodScrollTimeout;

    hourPicker.addEventListener('scroll', () => {
        clearTimeout(hourScrollTimeout);
        hourScrollTimeout = setTimeout(() => {
            const scrollTop = hourPicker.scrollTop;
            const itemIndex = Math.round(scrollTop / 50);
            const hour = itemIndex + 1;
            if (hour >= 1 && hour <= 12 && hour !== selectedTime.hour) {
                selectHour(hour);
            }
        }, 150);
    });

    minutePicker.addEventListener('scroll', () => {
        clearTimeout(minuteScrollTimeout);
        minuteScrollTimeout = setTimeout(() => {
            const scrollTop = minutePicker.scrollTop;
            const minute = Math.round(scrollTop / 50);
            if (minute >= 0 && minute <= 59 && minute !== selectedTime.minute) {
                selectMinute(minute);
            }
        }, 150);
    });

    periodPicker.addEventListener('scroll', () => {
        clearTimeout(periodScrollTimeout);
        periodScrollTimeout = setTimeout(() => {
            const scrollTop = periodPicker.scrollTop;
            const periodIndex = Math.round(scrollTop / 50);
            const period = periodIndex === 0 ? 'AM' : 'PM';
            if (period !== selectedTime.period) {
                selectPeriod(period);
            }
        }, 150);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimePicker();
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});

hospitalModal.addEventListener('click', (e) => {
    if (e.target === hospitalModal) {
        hospitalModal.classList.add('hidden');
        hospitalModal.classList.remove('flex');
    }
});

scheduleModal.addEventListener('click', (e) => {
    if (e.target === scheduleModal) {
        scheduleModal.classList.add('hidden');
        scheduleModal.classList.remove('flex');
        resetScheduleModal();
    }
});

confirmationModal.addEventListener('click', (e) => {
    if (e.target === confirmationModal) {
        confirmationModal.classList.add('hidden');
        confirmationModal.classList.remove('flex');
        resetScheduleModal();
    }
});

updateCalendar();