// window.onload = function(){
function $(ele){
    return />/.test(ele) ? document.querySelectorAll(ele) : document.querySelector(ele);
}
var main = $('.main');
var oLis = $(".main>.mod");
var winW = window.innerWidth;
var winH = window.innerHeight;
var desW = 640;
var desH = 960;

// window.onload=function(){

// }


setTimeout(function(){
oLis[0].firstElementChild.id = 'bg-0';    
}, 1000);

// main.style.webkitTransform = "scale(" + winH / desH + ")";
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
})
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    /*阻止默认行为*/
    var touchMove = e.changedTouches[0].pageY;
    var changePos = touchMove - this.startY;
    var cur = this.index;
    // var step = 1/2;
    // var scalePos =(Math.abs(changePos)/winH)*step;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=cur){
            arguments[0].style.display="none";
        }
        arguments[0].id="";
        arguments[0].firstElementChild.id="";
    })
    if (changePos > 0) {/*↓*/
        var pos = -winH+changePos;
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;

    } else if (changePos < 0) {/*↑*/
        var pos = winH+changePos;
        // var pos = changePos;
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;

    }
    // oLis[this.preSIndex].style.webkitTransform = "translate(0,"+pos+winH+"px)";
    oLis[this.preSIndex].style.webkitTransform = "translateY("+pos+"px)";
    oLis[this.preSIndex].id = "zIndex";
    oLis[this.preSIndex].style.display="block";
    // oLis[cur].style.webkitTransform = "scale("+(1-scalePos)+") translate(0,"+changePos+"px)";
    oLis[cur].style.webkitTransform = "translate(0,"+changePos+"px)";
}
function end(e) {
    oLis[this.preSIndex].style.webkitTransform ="translate(0,0)";
    oLis[this.preSIndex].style.webkitTransition="0.5s";
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd',function(){
        this.style.webkitTransition="";
        this.firstElementChild.id = "bg-"+(this.index);
    })
}
// }