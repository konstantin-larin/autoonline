// PRELOAD
let preloadCounter = 0;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('preload-container').style.display = 'none';
}
else {
    window.addEventListener('load', preload);
    if (preloadCounter > 0) {
        window.removeEventListener('load', preload);
    }
}
function elemAppear(elem) {
    elem.style.opacity = 0;
    elem.style.display = 'block';
    setTimeout(() => {
        elem.style.opacity = 1;
    }, 0);
}
function elemDisappear(elem) {
    elem.style.opacity = 0;
    elem.ontransitionend = function () {
        elem.style.display = 'none';
    }
}
function preload() {
    document.documentElement.style.overflow = 'hidden';
    if (window.innerWidth < 300) {
        window.onresize = function () {
            if (window.innerWidth >= 300) {
                preload();
                window.onresize = '';
            }
        }
        return;
    }
    document.getElementById('preload').style.display = 'flex';
    let metrics = [];
    let str1 = document.getElementById('preload-title_str1');
    let str2 = document.getElementById('preload-title_str2');
    let preloadPath = document.getElementById('preload_svg-path');
    let infinitySVG = document.getElementById('preload_svg');
    let subtitle = document.getElementById('preload-subtitle');
    let title = document.getElementById('preload-title');


    title.style.width = title.offsetWidth + 'px';

    for (let el of document.querySelectorAll('.js-clearContent')) {
        let width = el.scrollWidth;
        metrics.push(width);
        el.style.width = 0 + 'px';
    }

    setTimeout(() => {
        setTimeout(() => {
            str1.style.width = metrics[0] + 'px';
        }, 0);

        str1.ontransitionend = function () {
            infinitySVG.style.visibility = 'visible';
            let lengthOfPath = preloadPath.getTotalLength();
            preloadPath.setAttribute('stroke-dashoffset', `${lengthOfPath}`);
            preloadPath.setAttribute('stroke-dasharray', `${lengthOfPath}`);
        }

        infinitySVG.onanimationend = function () {
            setTimeout(() => {
                str2.style.width = metrics[1] + 'px';
            }, 0);
        }

        str2.ontransitionend = function () {
            elemAppear(subtitle);
        }

        subtitle.ontransitionend = function () {
            setTimeout(() => {
                elemDisappear(document.getElementById('preload-container'));
                document.documentElement.style.overflow = '';
                preloadCounter++;
            }, 500);
        }
    }, 1000);
}


const html = document.documentElement;
const registrationWindow = document.getElementById('registration-window');
const registrationContainer = document.getElementById('registration');
const registrationNotification = document.getElementById('registration-notification');
const navHead = document.getElementById('navigation-head');
const answersHeight = [];
// AUDIO
let registrationSuccessAudio = new Audio('audio/register-success.mp3');
let gurglingAudio = new Audio('audio/up-play-video-button.mp3');
gurglingAudio.volume = 0.3;

// FOR QUESTIONS-SECTION
function measuringmetrics() {
    for (let answer of document.querySelectorAll('.questions__answer-wrapper')) {
        answersHeight.push(answer.offsetHeight);
        answer.style.height = 0 + 'px';
    }
};
document.addEventListener('DOMContentLoaded', measuringmetrics);



// ARROW
// window.addEventListener('load', arrowFromPromoToButton);
let fields = [];
let controlPointsTop = [];
let controlPointsBottom = [];
// function arrowFromPromoToButton() {
//     let areas = document.querySelectorAll('.js-arrow-animate');
//     for (let field of areas) {
//         let controlPointTop = window.pageYOffset + field.getBoundingClientRect().top;
//         let controlPointBottom = window.pageYOffset + field.getBoundingClientRect().bottom;
//         fields.push(field);
//         controlPointsTop.push(controlPointTop);
//         controlPointsBottom.push(controlPointBottom);
//     }
//     function drawArrow(field, idNumber) {
//         let left = field.querySelector('[data-side="left"]');
//         let right = field.querySelector('[data-side="right"]');
//         let end;
//         let arrowBottom; let arrowTop;
//         if (window.innerWidth < 900 && field.id != 'play-video') {
//             end = right.getBoundingClientRect().left;
//             arrowBottom = left.getBoundingClientRect().top;
//             arrowTop = right.getBoundingClientRect().bottom;
//         }
//         end = right.getBoundingClientRect().right;
//         let start = left.getBoundingClientRect().left;

//         let width;
//         let height;
//         if (window.innerWidth < 900 && field.id != 'play-video') {
//             height = arrowBottom - arrowTop + 30;
//             width = height * 1.3;
//         }
//         else if (window.innerWidth > 900 && field.id !== 'play-video') {
//             width = (start - end) + 50;
//             height = width * 0.25;
//         }
//         else {
//             width = (start - end);
//             height = width * 0.25;
//         }

//         let container = document.createElement('div');
//         container.classList.add('js-arrow-svg-container');
//         container.style.position = 'absolute';

//         container.style.height = height + 'px';
//         container.style.width = width + 'px';
//         if (window.innerWidth < 900 && field.id != 'play-video') {
//             if (window.innerWidth > 700) {
//                 container.style.left = window.innerWidth * 0.1 - 10 + 'px';
//             }
//             else {
//                 container.style.left = window.innerWidth * 0.064 - 10 + 'px';
//             }
//             container.style.top = right.offsetHeight + 10 + 'px';
//         }
//         else {
//             container.style.left = right.offsetWidth + 'px';
//             container.style.bottom = -height + 'px';
//         }

//         // for special field
//         let addWrapper;
//         if (field.id == 'play-video' && window.innerWidth > 900) {
//             container.style.width = width * 0.6 + 'px';
//             container.style.left = right.offsetWidth + width * 0.4 + 'px';
//             container.style.transformOrigin = 'top left';
//             container.style.transform = `rotate(-20deg)`;
//             addWrapper = container.cloneNode(true);
//             addWrapper.style.left = 0;
//             addWrapper.style.top = 0;
//             addWrapper.style.right = 0;
//             addWrapper.style.bottom = 0;
//             addWrapper.style.transformOrigin = 'center';
//             addWrapper.style.transform = `scaleX(-1)`;
//             container.append(addWrapper);
//         }
//         else if (field.id == 'play-video' && window.innerWidth < 900) {
//             width = 2 * width;
//             height = width * 0.3;
//             container.style.width = width + 'px';
//             container.style.bottom = -height * 1.25 + 'px';
//             container.style.left = right.offsetWidth - width * 0.5 + 'px';
//             container.style.transform = `scaleX(-1)`;
//         }
//         field.append(container);

//         let draw;
//         // if (field.id == 'play-video' && window.innerWidth > 900) {
//         //     draw = new SVG().addTo(addWrapper).size(width, height);
//         // }
//         // else {
//         //     draw = SVG().addTo(container).size(width, height);
//         // }


//         draw.attr('overflow', 'visible');
//         draw.fill('transparent');
//         let group = draw.group();
//         let arrow;
//         let line;


//         if (window.innerWidth < 900 && field.id !== 'play-video') {
//             arrow = group.path('M0, 0 L10, -3 L0, 0 L0, 10').fill('none');
//             line = group.path(`M${width * 0.99} ${height * 0.7} C37 60 10 26 ${width * 0.4} 1`);
//         }
//         else {
//             arrow = group.path('M0, 0 L10, -3 L0, 0 L0, 10').fill('none');
//             line = group.path(`M${width} 1 C${width * 0.66} ${height} ${width * 0.33} ${height} 1 1`);
//         }
//         line.attr('id', `arrow-way-${idNumber}`);
//         arrow.attr('id', `arrow-${idNumber}`);
//         arrow.attr('stroke-linecap', `round`);
//         arrow.attr('stroke-width', '1.5px');
//         line.attr('stroke-dashoffset', line.length());
//         line.attr('stroke-dasharray', line.length());

//         let animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
//         animateMotion.setAttribute("dur", "0.7s");
//         animateMotion.setAttribute("repeatCount", "1");
//         animateMotion.setAttribute('begin', '0.5s');
//         animateMotion.setAttribute('fill', 'freeze');
//         let mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
//         mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#arrow-way-${idNumber}`);
//         animateMotion.append(mpath);
//         document.getElementById(`arrow-${idNumber}`).append(animateMotion);

//         setTimeout(() => {
//             if (window.innerWidth < 900 && field.id !== 'play-video') {
//                 setTimeout(() => {
//                     arrow.attr('class', 'js-arrow__arrow-path_mobile');
//                 }, 300);
//             }
//             else {
//                 arrow.attr('class', 'js-arrow__arrow-path');
//             }
//             line.attr('class', 'js-arrow__line-path');
//             line.stroke('white');
//             arrow.stroke('white');
//         }, 500);
//     }
//     window.addEventListener('scroll', arrowReaction);
//     function arrowReaction() {
//         for (let i = 0; i < controlPointsTop.length; i++) {
//             if (controlPointsBottom[i] < window.innerHeight) {
//                 if (window.pageYOffset < controlPointsBottom[i] - 30) {
//                     drawArrow(fields[i], fields[i].dataset.buttonareanumber);
//                     fields.splice(i, 1);
//                     controlPointsTop.splice(i, 1);
//                     controlPointsBottom.splice(i, 1);
//                 }
//             }
//             else {
//                 if (window.pageYOffset < controlPointsBottom[i] && window.pageYOffset + window.innerHeight > controlPointsTop[i]) {
//                     drawArrow(fields[i], fields[i].dataset.buttonareanumber);
//                     fields.splice(i, 1);
//                     controlPointsTop.splice(i, 1);
//                     controlPointsBottom.splice(i, 1);
//                 }
//             }
//         }
//     }
// }
// NAVIGATION
function navEvents() {
    let navbar = document.getElementById('navbar');
    let navClose = document.getElementById('close-nav');
    navbar.style.transform = `translateY(-${navbar.offsetHeight}px)`;
    navbar.style.display = 'none';
    navHead.onclick = function () {
        navHead.ontransitionend = function (event) {
            if (event.propertyName == 'transform') {
                navHead.style.display = 'none';
                navbar.style.display = 'block';
                setTimeout(() => {
                    navbar.style.transform = '';
                }, 0);
                navHead.ontransitionend = null;
            }
        }

        navHead.style.transform = `translate(-50%, -${navHead.offsetHeight}px)`;
    };
    navClose.onclick = function () {
        navbar.ontransitionend = function (event) {
            if (event.propertyName == 'transform') {
                navbar.style.display = 'none';
                navHead.style.display = 'block';
                setTimeout(() => {
                    navHead.style.transform = '';
                }, 0);
                navbar.ontransitionend = null;
            }
        }
        navbar.style.transform = `translateY(-${navbar.offsetHeight}px)`;
    };
}
navEvents();



// PLAY VIDEO BUTTON ANIMATION
function expandingTimingFunction(timeFraction) {
    return 1 - Math.pow(1 - timeFraction, 2);
}
function easeInQuadTimingFunction(timeFraction) {
    return Math.pow(timeFraction, 2);
}
function linearTimingFunction(timeFraction) {
    return timeFraction;
}

function expandBorder(progress, elem, startValue, endValue) {
    elem.style.top = `-${startValue + (progress * (endValue - startValue))}px`;
    elem.style.right = `-${startValue + (progress * (endValue - startValue))}px`;
    elem.style.bottom = `-${startValue + (progress * (endValue - startValue))}px`;
    elem.style.left = `-${startValue + (progress * (endValue - startValue))}px`;
}
function narrowBorder(progress, elem, startValue, endValue) {
    elem.style.top = `-${startValue - (progress * (startValue - endValue))}px`;
    elem.style.right = `-${startValue - (progress * (startValue - endValue))}px`;
    elem.style.bottom = `-${startValue - (progress * (startValue - endValue))}px`;
    elem.style.left = `-${startValue - (progress * (startValue - endValue))}px`;
}

function borderOpacityChange(progress, elem, startValue, endValue) {
    elem.style.borderColor = `rgba(228, 179, 84, ${startValue + (progress * endValue)}`;
}


function PlayVideoButtonOnPointerDown(event) {
    let button = event.target;
    let buttonWrapper = event.target.closest('div');
    let currentBorder = document.querySelector(`.js-${button.id}-border_current`);
    currentBorder.style.borderColor = '';
    // metrics
    let initialBorderOffset = 20;
    let borderOffset = +getComputedStyle(currentBorder).top.slice(1, -2);
    let expandBorderOffset = 60;
    let pushedBorderOffset = 10;
    let borderOpacity = +getComputedStyle(currentBorder).borderColor.slice(19, -1);
    let blinkBorderOpacity = 1 - borderOpacity;

    let pushDuration = borderOffset * (10 + borderOffset);
    let bigExpandDuration = 2000;
    let smallExpandDuration = 1000;

    let newBorder = document.createElement('div');
    newBorder.classList.add(`${button.id}-border`);
    pushPlayVideoButtonAnimation();
    button.addEventListener('pointerup', PlayVideoButtonOnPointerUp);

    function pushPlayVideoButtonAnimation() {
        let start = performance.now();
        requestAnimationFrame(function pushPlayVideoButtonAnimation(time) {
            let timeFraction = (time - start) / pushDuration;
            let pushAnimationProgress = linearTimingFunction(timeFraction);

            narrowBorder(pushAnimationProgress, currentBorder, borderOffset, pushedBorderOffset);
            borderOpacityChange(pushAnimationProgress, currentBorder, borderOpacity, blinkBorderOpacity);

            if (timeFraction < 1) {
                let requestAnim = requestAnimationFrame(pushPlayVideoButtonAnimation);
                button.onpointerup = () => {
                    cancelAnimationFrame(requestAnim);
                }
                button.onpointerleave = function () {
                    PlayVideoButtonOnPointerUp();
                }
            }
        });
    }
    function PlayVideoButtonOnPointerUp() {
        gurglingAudio.currentTime = 0.15;
        gurglingAudio.play();
        button.onpointerleave = '';
        let borderOffset = +getComputedStyle(currentBorder).top.slice(1, -2);
        let borderOpacity = +getComputedStyle(currentBorder).borderColor.slice(19, -1);
        // какой-то баг с opacity. Когда значение доходит до 1 (конец push-анимации), почему-то оно
        // становится равным нулю
        if (borderOpacity <= 0) borderOpacity = 1;
        currentBorder.classList.remove(`js-${button.id}-border_current`);
        newBorder.classList.add(`js-${button.id}-border_current`);
        buttonWrapper.append(newBorder);

        function backBorderAnimation() {
            let start = performance.now();
            let requestAnim;

            requestAnimationFrame(function backBorderAnimation(time) {
                let timeFraction = (time - start) / smallExpandDuration;
                let progress = expandingTimingFunction(timeFraction);
                expandBorder(progress, newBorder, borderOffset, initialBorderOffset);
                borderOpacityChange(progress, newBorder, borderOpacity, 1 - borderOpacity);
                if (timeFraction < 1) {
                    requestAnim = requestAnimationFrame(backBorderAnimation);
                }
                button.onpointerdown = () => {
                    cancelAnimationFrame(requestAnim);
                }
            });
        }
        function expandBorderAnimation() {
            let start = performance.now();

            requestAnimationFrame(function expandBorderAnimation(time) {
                let timeFraction = (time - start) / bigExpandDuration;
                let expandingProgress = expandingTimingFunction(timeFraction);
                let opacityProgress = easeInQuadTimingFunction(timeFraction);
                expandBorder(expandingProgress, currentBorder, borderOffset, expandBorderOffset);
                borderOpacityChange(opacityProgress, currentBorder, borderOpacity, -borderOpacity);
                if (timeFraction < 1) {
                    requestAnimationFrame(expandBorderAnimation);
                }
                else {
                    currentBorder.remove();
                    currentBorder.style.display = 'none';
                }
            });
        }
        backBorderAnimation();
        expandBorderAnimation();
        button.removeEventListener('pointerup', PlayVideoButtonOnPointerUp);
    }
}
const playVideoButton = document.getElementById('play-video__button');
playVideoButton.addEventListener('pointerdown', PlayVideoButtonOnPointerDown);

// QUESTIONS SECTION
function questionsListOnClick(event) {
    let question = null;
    let icon = null;
    let iconPushed = null;
    if (event.target.closest('.questions__question')) {
        question = event.target.closest('.questions__question')
    }
    if (event.target.closest('.questions__question-icon')) {
        iconPushed = true;
        icon = question.querySelector('.questions__question-icon');
    }
    if (question) {
        let answer = question.closest('.questions__questions-list-item').querySelector('.questions__answer-wrapper');
        let number = +answer.dataset.answernumber;
        if (!(+answer.dataset.opened)) {
            question.style.cursor = 'default';
            icon = question.querySelector('.questions__question-icon');
            icon.style.transform = 'rotate(0)';
            answer.style.height = answersHeight[number - 1] + 'px';
            answer.dataset.opened = '1';
        }
        else {
            if (iconPushed) {
                question.style.cursor = 'pointer';
                icon.style.transform = 'rotate(-45deg)';
                answer.style.height = 0 + 'px';
                answer.dataset.opened = '0';
            }
        }
    }
}
const questionsList = document.getElementById('questions-list');
questionsList.addEventListener('click', questionsListOnClick);

// START DATE
let startHour = 19;
let today;
let monthNumber
for (let startDate of document.querySelectorAll('.js-start-date')) {
    determineTodaysDate(startDate);
}
function determineTodaysDate(elem) {
    let date = new Date();
    today = date.getDate();
    monthNumber = date.getMonth();
    if (date >= new Date(date.getFullYear(), monthNumber, today, 20, 0, 0)) {
        today += 1;
        startHour = 43;
    }
    let month;

    switch (monthNumber) {
        case 0:
            month = 'января'
            break;
        case 1:
            month = 'февраля'
            break;
        case 2:
            month = 'марта'
            break;
        case 3:
            month = 'апреля'
            break;
        case 4:
            month = 'мая'
            break;
        case 5:
            month = 'июня'
            break;
        case 6:
            month = 'июля'
            break;
        case 7:
            month = 'августа'
            break;
        case 8:
            month = 'сентября'
            break;
        case 9:
            month = 'октября'
            break;
        case 10:
            month = 'ноября'
            break;
        case 11:
            month = 'декабря'
            break;
        default:
            break;
    }
    elem.textContent = today + ' ' + month;
}

// CLOCK
class Clock {
    constructor(template) {
        this.template = template;
    }

    render() {
        let date = new Date();
        if (date.getDate() == today) {
            startHour = 19;
        }
        else {
            startHour = 43;
        }

        let hours = startHour - date.getHours();
        let hoursSpan = document.getElementById('hours-span');
        let hoursLength = `${hours}`.length;
        let endDigitHour = `${hours}`[hoursLength - 1];
        if (hours != 11 && endDigitHour == '1') {
            hoursSpan.textContent = 'час';
        }
        else if (!(hours > 10 && hours < 20) && (endDigitHour == '2' || endDigitHour == '3' || endDigitHour == '4')) {
            hoursSpan.textContent = 'часа';
        }
        else {
            hoursSpan.textContent = 'часов';
        }

        if (hours < 10) {
            hours = '0' + hours;
        }

        let mins = 59 - date.getMinutes();
        let minutesSpan = document.getElementById('minutes-span');
        let minsLength = `${mins}`.length;
        let endDigitMin = `${mins}`[minsLength - 1];
        if (mins != 11 && endDigitMin == '1') {
            minutesSpan.textContent = 'минута';
        }
        else if (!(mins > 10 && mins < 20) && (endDigitMin == '2' || endDigitMin == '3' || endDigitMin == '4')) {
            minutesSpan.textContent = 'минуты';
        }
        else {
            minutesSpan.textContent = 'минут';
        }

        if (mins < 10) {
            mins = '0' + mins;
        }

        let secs = 59 - date.getSeconds();
        let secondsSpan = document.getElementById('seconds-span');
        let secsLength = `${secs}`.length;
        let endDigitSec = `${secs}`[secsLength - 1];
        if (secs != 11 && endDigitSec == '1') {
            secondsSpan.textContent = 'секунда';
        }
        else if (!(secs > 10 && secs < 20) && (endDigitSec == '2' || endDigitSec == '3' || endDigitSec == '4')) {
            secondsSpan.textContent = 'секунды';
        }
        else {
            secondsSpan.textContent = 'секунд';
        }
        if (secs < 10) {
            secs = '0' + secs;
        }

        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = mins;
        document.getElementById('seconds').textContent = secs;
    }

    stop() {
        clearInterval(this.timer);
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = mins;
        document.getElementById('seconds').textContent = secs;
    }

    start() {
        this.timer = setInterval(() => this.render(), 1000);
    }

    setTimer(ms) {
        this.start();
        setTimeout(() => {
            this.stop()
        }, ms);
    }
}
let clock = new Clock();
clock.start();
// чтобы обновлял дату
window.addEventListener('load', function(){
    let date = new Date();
    let time = date - new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 10, 0);
    if(time < 0){
        time = time * (-1);
    }
    setTimeout(() => {
        for (let startDate of document.querySelectorAll('.js-start-date')) {
            determineTodaysDate(startDate);
        }
    }, time);
});

// MEDIA QUERIES
let isInner = null;
let bgIsInverted = null;

function changeLayout() {
    // REGISTER
    for (let svg of document.querySelectorAll('.js-arrow-svg-container')) {
        svg.remove();
    }
    fields = [];
    controlPointsBottom = [];
    controlPointsTop = [];

    let headerImg = document.querySelector('.header__img-wrapper');
    let playVideoFrame = document.querySelector('.play-video');
    let playVideoImg = document.getElementById('play-video-img');
    let mobileWatch = document.querySelector('.about-us__modile-img-wrapper');
    // if (!isInner) {
    //     arrowFromPromoToButton();
    // }
    if (window.innerWidth <= 900) {
        // HEADER
        document.querySelector('.header__content-subtitle').after(headerImg);
        // ABOUT US
        mobileWatch.style.display = 'flex';
        mobileWatch.append(playVideoFrame);
        playVideoImg.style.display = 'none';
    }

    else {
        document.querySelector('.header__body').append(headerImg);
        document.getElementById('about-us').append(playVideoFrame);
        mobileWatch.style.display = 'none';
        playVideoImg.style.display = 'block';
    }
    if (window.innerWidth <= 768) {
        registrationWindow.classList.remove('registration-window_light-theme');
        registrationWindow.classList.add('registration-window_dark-theme');
        bgIsInverted = true;
    }
    else {
        if (registrationWindow.classList.contains('registration-window_dark-theme') && bgIsInverted) {
            registrationWindow.classList.add('registration-window_light-theme');
            registrationWindow.classList.remove('registration-window_dark-theme');
            bgIsInverted = false;
        }
    }
}
window.addEventListener('resize', () => isInner = false);
window.addEventListener('resize', changeLayout);
if (window.innerWidth <= 900) {
    isInner = true;
    changeLayout();
}
let navHeadIsScaled = null;
function MobileNavHead() {
    if (window.innerWidth <= 600) {
        if (window.pageYOffset >= 25) {
            if (!navHeadIsScaled) {
                navHead.style.height = 100 + 'px';
                navHeadIsScaled = true;
            }
            else {
                return;
            }
        }
        else {
            navHead.style.height = '';
            navHeadIsScaled = false;
        }
    }
}
window.addEventListener('scroll', MobileNavHead);

// REGISTRATION WINDOW
for (let button of document.querySelectorAll('.js-open-reg-window')) {
    button.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            if (registrationWindow.classList.contains('registration-window_dark-theme')) {
                registrationWindow.classList.remove('registration-window_dark-theme');
                registrationWindow.classList.add('registration-window_light-theme');
            }
            else {
                registrationWindow.classList.remove('registration-window_light-theme');
                registrationWindow.classList.add('registration-window_dark-theme');
            }
        }
        else {
            registrationWindow.classList.remove('registration-window_light-theme');
            registrationWindow.classList.add('registration-window_dark-theme');
        }
        registrationWindow.style.display = '';
        document.body.style.overflowY = 'hidden';
    });
}
for (let close of document.querySelectorAll('.js-close-reg-window')) {
    close.addEventListener('click', () => {
        registrationWindow.style.display = 'none';
        registrationNotification.style.display = 'none';
        registrationContainer.style.display = '';
        document.body.style.overflowY = '';
    });
}

let telInput = document.getElementById('tel-input');
telInput.onfocus = function () {
    if (this.value.length <= 2) {
        this.value = '+7';
    }
}
telInput.oninput = function (event) {
    if (
        event.data != '0' &&
        event.data != '1' &&
        event.data != '2' &&
        event.data != '3' &&
        event.data != '4' &&
        event.data != '5' &&
        event.data != '6' &&
        event.data != '7' &&
        event.data != '8' &&
        event.data != '9' &&
        event.data != null
    ) {
        console.log(event.data);
        this.value = `${this.value}`.slice(0, -1);
    }
    if (this.value.length <= 2) {
        this.value = '+7';
    }
}
let mailInput = document.getElementById('mail-input');
let error = null;
let registrationForm = document.getElementById('registration-form');
registrationForm.onsubmit = function () {
    if (error) {
        error.remove();
        error = null;
    }
    if (!(mailInput.value.includes('@'))) {
        mailInput.focus();
        error = document.createElement('div');
        error.style.color = 'red';
        error.innerHTML = 'Вы ввели некорректную почту';
        mailInput.closest('div').append(error);
        return false;
    }
    registrationSuccessAudio.play();
    registrationContainer.style.display = 'none';
    registrationNotification.style.display = '';
    return false;
}
