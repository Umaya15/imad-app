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

//code for server request (AJAX)
var nameInput = document.getElementById('name');
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
     // Create a request object
    var iname = nameInput.value;
    var request = new XMLHttpRequest();
    // capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //True Action
            if (request.status === 200){
                var counter = request.responseText;
                // capture a list of names and render it as a list
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i=0; i<names.length; i++){
                    list += '<li>' + names[i] + '</li>'
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    }
    request.open('GET','http://iravalvizhigal.imad.hasura-app.io/submit-name/?name=' + iname, true);
    request.send(null);
};

//code for login
var submitl = document.getElementById('submit_login');
submit.onclick = function(){
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200) {
                alert ('Login successful');
            } else if (request.status === 403) {
                alert ('username/password is incorrect');
            } else if (request.status === 500) {
                alert ('Something went wrong');
            }
        }
    }
    var usrnm = document.getElementById('username').value;
    var pwd = document.getElementById('password').value;
    console.log(usrnm);
    console.log(pwd);
    request.open('POST', 'http://iravalvizhigal.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
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