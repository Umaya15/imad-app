console.log('Loaded!');

// change text content
var element = document.getElementById('main-text');
element.innerHTML = "This is Amazing!";

// move hasura img
var img = document.getElementById('hasura-img');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function (){
    var interval = setInterval(moveRight, 50);
  img.style.marginLeft = '100px';  
};