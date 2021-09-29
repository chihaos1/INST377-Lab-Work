let slidePosition = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

document.
    querySelector('.next')
    .addEventListener('click', function() {
        moveToNextSlide();
    })

document.
    querySelector('.prev')
    .addEventListener('click', function() {
        moveToPrevSlide();
    })

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item--visible');
        slide.classList.add('carousel-item');
    }
    slides[slidePosition].classList.add('carousel-item--visible')
}

function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updateSlidePosition()
}

function moveToPrevSlide() {
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition()
}

