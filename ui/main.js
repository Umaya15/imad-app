console.log('Loaded!');

// change text content
var element = document.getElementById('main-text');
alert ("Pause");
element.innerHTML = "This is Amazing!";

// move hasura img
var img = document.getElementById('hasura-img');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function (){
    var interval = setInterval(moveRight, 100);
  img.style.marginLeft = '100px';  
};