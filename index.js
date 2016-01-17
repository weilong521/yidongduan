var main = document.querySelector('#main');
var oLis = document.querySelectorAll(".slide>li");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 960;
var music = document.querySelector("#music");
var sound = document.querySelector("#sound");
if (desW / desH < winW / winH) {
    main.style.webkitTransform = 'scale(' + winW / desW + ')';
} else {
    main.style.webkitTransform = 'scale(' + winH / desH + ')';
}
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
});
function start(e) {
    music.play();
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    /*×èÖ¹Ä¬ÈÏÐÐÎª*/
    var touchMove = e.changedTouches[0].pageY;
    var changePos = touchMove - this.startY;
    var cur = this.index;
    var step = 1 / 2;
    var scalePos = (Math.abs(changePos) / winH) * step;
    [].forEach.call(oLis, function () {
        if (arguments[1] != cur) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    });
    if (changePos > 0) {/*¡ý*/
        var pos = -winH + changePos;
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;
    } else if (changePos < 0) {/*¡ü*/
        var pos = winH + changePos;
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;

    }
    oLis[this.preSIndex].style.webkitTransform = "translate(0," + pos + "px)";
    oLis[this.preSIndex].className = "zIndex";
    oLis[this.preSIndex].style.display = "block";
    oLis[cur].style.webkitTransform = "scale(" + (1 - scalePos) + ") translate(0," + changePos + "px)";
}
function end(e) {
    oLis[this.preSIndex].style.webkitTransform = "translate(0,0)";
    oLis[this.preSIndex].style.webkitTransition = "0.5s";
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd', function () {
        this.style.webkitTransition = "";
        this.firstElementChild.id = "a" + (this.index + 1);
    })
}
sound.addEventListener("click", function () {
    music.pause();
},false);
