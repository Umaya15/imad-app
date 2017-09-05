console.log('Loaded!');

//counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function (){
    // Make a request to the counter endpoint
    
    // capture the response and store it in a variable
    
    //render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
} ;

/*
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
*/