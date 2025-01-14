
/***********************************************토글메뉴*******************************************************/
function toggleMenu(show) {
    const sideMenu = $('#sideMenu');
    //const sideMenu = document.getElementById('sideMenu');
    if (show) {
        sideMenu.style.visibility = 'visible';
        sideMenu.style.opacity = '1';
        sideMenu.classList.add('active');
    } else {
        sideMenu.classList.remove('active');
        sideMenu.style.visibility = 'hidden';
        sideMenu.style.opacity = '0';
    }
}

/*******************************************세션유지*****************************************************/



/*********************************************     BALANCE GAME     *********************************************/
const questions = document.querySelectorAll('.question');
const progressBarFill = document.getElementById('progress-bar-fill');
const form = document.getElementById('balance-game-form');
let currentQuestionIndex = 0;

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = progress + '%';
}

function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.toggle('hidden', i !== index);
    });
    updateProgress();
}

form.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-option')) {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            form.submit();
        }
    }
});


showQuestion(currentQuestionIndex);


/***************************************************************************************************************/
document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle");
    const containerHeight = 500;
    const containerWidth = 200;
    const offset = 50;
    const step = 60;
    const usedPositions = [];

    const firstCircle = circles[0];
    if (firstCircle) {
        firstCircle.style.top = `${containerHeight - 100}px`;
        firstCircle.style.left = `calc(50% - ${offset}px)`;
    }


    const secondCircle = circles[1];
    if (secondCircle) {
        secondCircle.style.top = `${containerHeight - 100}px`;
        secondCircle.style.left = `calc(50% + ${offset}px)`;
    }


    circles.forEach((circle, index) => {
        if (index < 2) return;

        let isOverlapping;
        let top, left;

        do {
            isOverlapping = false;
            top = Math.random() * (containerHeight - 100);
            left = Math.random() < 0.5
                ? `calc(50% - ${Math.random() * 80}px)`
                : `calc(50% + ${Math.random() * 80}px)`;


            for (let pos of usedPositions) {
                const distance = Math.sqrt(
                    Math.pow(pos.top - top, 2) + Math.pow(parseInt(pos.left) - parseInt(left), 2)
                );
                if (distance < 60) {
                    isOverlapping = true;
                    break;
                }
            }
        } while (isOverlapping);


        usedPositions.push({ top, left });


        circle.style.top = `${top}px`;
        circle.style.left = left;
    });
});
