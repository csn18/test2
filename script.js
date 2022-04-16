let currentDistance = 0;
let currentPosition = 0;
let progressAdd = 0;
let slideCounter = 0;
let tabCounter = 0;
let hover = 0;
let timeInterval = 30000;
let progressBarInterval = timeInterval / 100;
let allSliderTabItems = document.querySelectorAll('.slider__tab-item')
let sliderContent = document.querySelector('.slider__content')
let sliderContentRow = document.querySelector('.slider__content-row')
let allSliderContentText = document.querySelectorAll('.slider__content-text')
let countSlide = allSliderContentText.length


function stopAllIntervals() {
    progressAdd = 0
    for (var i = 1; i < 99999; i++) {
        window.clearInterval(i)
    }
}

allSliderTabItems.forEach(tabItem => {
    tabItem.addEventListener('click', (event) => {
        let listTabItems = Array.from(allSliderTabItems)
        let indexOfElement = listTabItems.indexOf(tabItem)

        let sliderItemWidth = sliderContent.clientWidth
        let nextSlide = sliderItemWidth * indexOfElement

        sliderContentRow.style.transform = `translateX(-${nextSlide}px)`
        tabCounter = indexOfElement
        slideCounter = indexOfElement
        currentPosition = nextSlide
        stopAllIntervals()
        setProgressToNextItem(slide = indexOfElement)
    })
})

// Установка размера кадров по раземру блока
allSliderContentText.forEach((slide) => {
    slide.style.width = `calc(${sliderContent.clientWidth - 100}px)`;
    slide.style.margin = `0 50px`;
})

// Остановка движения при наведении
sliderContent.addEventListener('mousemove', () => hover = true);
sliderContent.addEventListener('mouseout', () => hover = false);

// Переход на следющтй tab-item
function setProgressToNextItem(slide = undefined) {
    if (tabCounter != countSlide) {
        // Удаление старого прогресс-бара
        let oldProgressAll = document.querySelectorAll('.progress')
        let arrowSliderImgAll = document.querySelectorAll('.arrow-slider-img')
        let allClassActiveSlide = document.querySelectorAll('.acticeTabItem')
        try {
            oldProgressAll.forEach(oldProgress => oldProgress.remove())
            arrowSliderImgAll.forEach(arrowSliderImg => arrowSliderImg.remove())
            allClassActiveSlide.forEach(activeSlide => activeSlide.classList.remove('acticeTabItem'))
        } catch (error) {
            // pass
        }

        // Создание нового прогресс-бара
        let newArrowSliderImg = document.createElement('img')
        newArrowSliderImg.classList.add('arrow-slider-img')
        newArrowSliderImg.setAttribute('src', 'arrow-slider-tab.svg')

        let newProgressBar = document.createElement('div')
        newProgressBar.classList.add('progress')

        if (slide) {
            allSliderTabItems[slide].appendChild(newArrowSliderImg)
            allSliderTabItems[slide].appendChild(newProgressBar)
            allSliderTabItems[slide].classList.add('acticeTabItem')
        } else {
            allSliderTabItems[tabCounter].appendChild(newArrowSliderImg)
            allSliderTabItems[tabCounter].appendChild(newProgressBar)
            allSliderTabItems[tabCounter].classList.add('acticeTabItem')
        }

        progressBarMotion()
    }
}

// Движение прогресс-бара
function progressBarMotion() {
    let intervalProgressBar = setInterval(() => {
        if (!hover) {
            let progressBar = document.querySelector('.progress')
            progressBar.style.width = `${progressAdd}%`
            progressAdd++
            if (progressAdd >= 100) {
                progressAdd = 0
                tabCounter++
                currentPosition++
                setProgressToNextItem()
                motionSlider()
                clearInterval(intervalProgressBar)
            }
        }
    }, progressBarInterval)
}


// Движение слайдера
function motionSlider() {
    if (!hover && tabCounter != countSlide) {
        let distance = sliderContent.clientWidth
        slideCounter++
        currentDistance = slideCounter * distance
        sliderContentRow.style.transform = `translateX(-${currentDistance}px)`
    } else {
        currentDistance = 0;
        currentPosition = 0;
        progressAdd = 0;
        slideCounter = 0;
        tabCounter = 0;
        hover = 0;
    }
}

setProgressToNextItem()