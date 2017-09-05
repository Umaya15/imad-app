console.log('Loaded!');

//counter code
var button = document.getElementById('counter');

button.onclick = function (){
    // Create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //True Action
            if (request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //False Action
    };
    
// Make the request
request.open('GET','http://iravalvizhigal.imad.hasura-app.io/counter', true);
request.send(null);
    
};

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