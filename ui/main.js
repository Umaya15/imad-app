console.log('Loaded!');

// change text content
var element = document.getElementById('main-text');
alert ("Pause");
element.innerHTML = "This is Amazing!";

// move hasura img
var img = document.getElementById('hasura-img');
img.onclick = function (){
  img.style.marginLeft = '100px';  
};