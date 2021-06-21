var cvs = document.getElementById("canvas");
console.log(cvs);
var ctx = cvs.getContext("2d"); //отвечает за вид игры
console.log(ctx);
var bird = new Image();
var bg = new Image();
var fg = new Image(); //передний фон
var pipeUp = new Image();
var pipeBottom = new Image();

/*Загрузка изображений*/
bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var gap = 90;
// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 20;
}
// Создание блоков
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};
/*позиция птички */
var xPos = 10;
var yPos = 150;
var grav = 1;
/*рисование всех объектов в канвас */
function draw() {
    //рисование блоков
    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
    }
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos); //третий и четвертый параметр это ширина и высота картинки
    requestAnimationFrame(draw);

    yPos += grav;
}
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, );
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;
        //если позиция х равна 125 пх, то создается новый блок
        if (pipe[i].x == 25) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка страницы
        }
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw; //после загрузки последнего элемента вызывается ф-я рисования