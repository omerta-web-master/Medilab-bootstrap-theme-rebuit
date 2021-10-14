const body = document.querySelector('body');
const htmlDOM = document.querySelector('html')

// =============== Departments section menu =====================
const departmentsLinksArr = document.querySelectorAll('[data-departments-link]');
const departmentsDataArr = document.querySelectorAll('[data-department-menu]');

departmentsLinksArr.forEach((link, index) => {
    link.addEventListener('click', () => {
        updateClass(departmentsLinksArr, index, 'active');
        updateClass(departmentsDataArr, index, 'active')
    })
})

function updateClass(elements, activeIndex, className) {
    elements.forEach(element => {
        element.classList.remove(className);
    })
    elements[activeIndex].classList.add(className);
}

// ================= Toggler menu ===========================
const menu_toggler = document.querySelector('[data-menu-toggler]');
const menu = document.querySelector('[data-menu]');
const closeMenuBtn = document.querySelector('#close_menu_btn');
const menuLinks = document.querySelectorAll('.main_nav a');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('show_menu');
    })
})
closeMenuBtn.addEventListener('click', () => {
    menu.classList.remove('show_menu');
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.remove('show_menu');
    }
})
menu_toggler.addEventListener('click', () => {
    if (menu.classList.contains('show_menu')) {
        menu.classList.remove('show_menu');
    } else {
        menu.classList.add('show_menu');
    }
})

// =================== FIXED MENU ON SCROL =========================
const mainHeader = document.querySelector('.main_header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 40) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
})

// ====================== Toggle answers ===========================
const answerTogglerArr = document.querySelectorAll('.answer_toggler');
const answers = document.querySelectorAll('.answer');

answerTogglerArr.forEach((toggler, index) => {
    toggler.addEventListener('click', () => {
        if (answers[index].classList.contains('show')) {
            showAnswer(index);
        } else {
            hideAnswer(index);
        }
    })
})

function showAnswer(index) {
    answers[index].classList.remove('show');
    answers[index].classList.add('hide');
    answerTogglerArr[index].className = "fas fa-chevron-down answer_toggler";
}

function hideAnswer(index) {
    answers[index].classList.add('show');
    answers[index].classList.remove('hide');
    answerTogglerArr[index].className = "fas fa-chevron-up answer_toggler";
}

// ==================== Testimonials slider =========================
class Slider {
    constructor(element, slidePersentageRate, autoSlideTime, dots = undefined, firstSlideIndex) {
        this.element = element;
        this.slidePercentageRate = slidePersentageRate;
        this.slideAmount = 0;
        this.autoSlideTime = autoSlideTime;
        this.dots = dots;
        this.firstSlideIndex = firstSlideIndex;
        this.counter = this.firstSlideIndex;

        this.element.style.transform = `translateX(${this.counter * this.slidePercentageRate}%)`
        this.slideInterval = setInterval(() => {
            this.autoSlide();
        }, this.autoSlideTime);

        this.element.addEventListener('transitionend', () => {
            const reachTheLastSlide = this.counter >= this.dots.length + this.firstSlideIndex;
            if (reachTheLastSlide) {
                this.moveFastToFirstSlide();
            }
        })
        this.addEventListerOnDotMenu();
    }


    moveSlider() {
        this.updateDotsClasses();
        this.slideAmount = this.counter * this.slidePercentageRate;
        this.element.style.transform = `translate(${this.slideAmount}%)`;
    }

    updateDotsClasses() {
        let activeDotIndex = this.counter - this.firstSlideIndex;
        this.dots.forEach((dot) => {
            if (dot.classList.contains('active')) {
                dot.classList.remove('active');
            }
        })
        if (activeDotIndex > this.dots.length - 1) activeDotIndex = 0;
        this.dots[activeDotIndex].classList.add('active');
    }

    addEventListerOnDotMenu() {
        this.dots.forEach((dot, dotIndex) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.counter = dotIndex + this.firstSlideIndex;
                this.slideAmount = this.counter * this.slidePercentageRate;
                this.moveSlider();
                clearInterval(this.slideInterval)
                this.slideInterval = setInterval(() => {
                    this.autoSlide();
                }, this.autoSlideTime);   
            })
        })
    }

    autoSlide() {
        this.counter++;
        this.moveSlider();
    }

    moveFastToFirstSlide() {
        this.element.style.transition = 'none';
        this.counter = this.firstSlideIndex;
        this.moveSlider()
        setTimeout(() => {
            this.element.style.transition = 'transform 1s ease';
        }, 1)
    }
}


const tDots = document.querySelectorAll('[data-t-dot]');
const testimonialsContainer = document.querySelector('.testimonials_slides_container')
const changeTranslateRateTriggerPoint = 1100;
let testimonialsContainerTranslateRate;
let firstSlideIndex;
if (window.innerWidth > changeTranslateRateTriggerPoint) {
    testimonialsContainerTranslateRate = -33;
    firstSlideIndex = 2;
} else {
    testimonialsContainerTranslateRate = -100;
    firstSlideIndex = 3;
}


let testimonialsSlideShow = new Slider(testimonialsContainer, testimonialsContainerTranslateRate, 3000, tDots, firstSlideIndex)

window.addEventListener('resize', () => {
    let isLowerThanTriggerPoint = window.innerWidth < changeTranslateRateTriggerPoint;

    if (isLowerThanTriggerPoint) {
        testimonialsSlideShow.slidePercentageRate = -100;
        testimonialsSlideShow.firstSlideIndex = 3;
    } else {
        testimonialsSlideShow.slidePercentageRate = -33;
        testimonialsSlideShow.firstSlideIndex = 2;
    }
})

// ==================== Modal gallery =================================
const imgList = document.querySelectorAll('.gallery_container img');
const srcAtributeList = [];
let firstImageIndex;

imgList.forEach(img => {
    const srcAtribute = img.getAttribute('src');
    srcAtributeList.push(srcAtribute);
})

body.addEventListener('click', (e) => {
    if (e.target.parentElement.id === 'close_gallery_button') {
        const modalGallery = document.querySelector('.modal_gallery');
        modalGallery.remove();

        activateScroll()

        e.preventDefault()
    }

    if (e.target.parentElement.id === 'left_arrow') {
        firstImageIndex--;

        if (firstImageIndex < 0) firstImageIndex = srcAtributeList.length - 1;
        const currentModalImage = document.querySelector('#current_modal_image');
        currentModalImage.setAttribute('src', srcAtributeList[firstImageIndex])
        e.preventDefault()
    }

    if (e.target.parentElement.id === 'right_arrow') {
        firstImageIndex++;
        if (firstImageIndex >= srcAtributeList.length - 1) firstImageIndex = 0;
        const currentModalImage = document.querySelector('#current_modal_image');
        currentModalImage.setAttribute('src', srcAtributeList[firstImageIndex])
        e.preventDefault()
    }
})

imgList.forEach((img, imgIndex) => {
    img.addEventListener('click', () => {
        firstImageIndex = imgIndex;

        disableScroll()

        const modalGalleryHtmlCode = `
        <div class="modal_gallery">
            <div class="modal_img">
                <img id="current_modal_image" src="${srcAtributeList[imgIndex]}" alt="">
            </div>
            <button id="close_gallery_button"><i class="fas fa-times fa-3x"></i></button>
            <button id="left_arrow" class="arrow_btn"><i class="fas fa-chevron-left fa-3x"></i></button>
            <button id="right_arrow" class="arrow_btn"><i class="fas fa-chevron-right fa-3x"></i></button>
        </div>`
        body.insertAdjacentHTML('beforeend', modalGalleryHtmlCode);
        
    })
})

function disableScroll() {
    htmlDOM.classList.toggle('modal-open')
    
    console.log("Modal open :"+htmlDOM.classList)
}

function activateScroll() {
    htmlDOM.classList.toggle('modal-open')
    console.log("Modal close :"+htmlDOM.classList)
}