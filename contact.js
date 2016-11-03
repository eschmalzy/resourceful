var saveButton = document.getElementById("save-button");
var name = document.getElementById('name');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var age = document.getElementById('age');
var birthday = document.getElementById('birthday');
var address = document.getElementById('address');
var editpress = false;

// document.getElementById("message")
//     .addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.keyCode == 13) {
//         document.getElementById("save-button").click();
//     }
// });

saveButton.onclick = function (){
  name = document.getElementById('name').value
  phone = document.getElementById('phone').value
  email = document.getElementById('email').value
  age = document.getElementById('age').value
  birthday = document.getElementById('birthday').value
  address = document.getElementById('address').value
  if (editpress){
    currentContact['name'] = document.getElementById('name').value
    currentContact['phone'] = document.getElementById('phone').value
    currentContact['email'] = document.getElementById('email').value
    currentContact['age'] = document.getElementById('age').value
    currentContact['birthday'] = document.getElementById('birthday').value
    currentContact['address'] = document.getElementById('address').value
    updatecontact();
    console.log(currentContact);
    editpress = false;
    document.getElementById("contact-list").innerHTML = "";
    document.getElementById('type').innerHTML = "New Contact";
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('birthday').value = "";
    document.getElementById('address').value = "";
    populate();
    return
  }
  addcontact(function(){
    console.log("Saved Contact")
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('birthday').value = "";
    document.getElementById('address').value = "";
    getcontacts(function(contacts){
      console.log("Success");
      console.log(contacts);
        printcontacts(contacts[contacts.length-1]);
    },function(){
      console.error("Had a problem")
    });
  }, function(){
    console.error("Unable to save contact")
  })
}

var addcontact = function (success, failure){
  var post = new XMLHttpRequest();
  post.onreadystatechange = function (){
    if (post.readyState == XMLHttpRequest.DONE){
      if (post.status >= 200 && post.status < 400) {
        success();
      } else {
        failure();
      }
    }
  };
  post.open("POST", "http://localhost:8080/contacts");
  post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  console.log(name);
  post.send("name="+name+"&phone="+phone+"&email="+email+"&age="+age+"&birthday="+birthday+"&address="+address);
};

var count = 0;
function printcontacts(item){
  var lst = document.getElementById('contact-list');
  var ul = document.getElementsByTagName('ul');
  var c = document.querySelector("#contact");
  li = c.content.querySelectorAll("li");

  li[0].innerHTML = item['name']+" " + item['phone'] +"</br>" + "<button onclick = 'edit_row("+count+")'>Edit</button><button onclick = 'delete_row("+count+")'>Delete</button></br>";
  var clone = document.importNode(c.content, true);
  ul[0].appendChild(clone);
  count += 1;
}

var getcontacts = function (success, failure){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        contacts = JSON.parse(request.responseText);
        success(contacts);
      } else {
        failure();
      }
    }
  };
  request.open("GET", "http://localhost:8080/contacts");
  request.send();
};

//on page load populate the list
function populate(){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        contacts = JSON.parse(request.responseText);
        console.log("Contacts Loaded");
        console.log(contacts);
        for (var i = 0, len = contacts.length; i <len; i++){
          printcontacts(contacts[i]);
        }
      } else {
        console.error("Couldn't load contacts!");
      }
    }
  };
request.open("GET", "http://localhost:8080/contacts");
request.send();
};

populate();

var updatecontact = function (){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        // contacts = JSON.parse(request.responseText);
        // success(contacts);

      } else {
        // failure();
      }
    }
  };
  request.open("PUT", "http://localhost:8080/contacts/"+currentContact['id'],true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send("name="+currentContact['name']+"&phone="+currentContact['phone']+"&email="+currentContact['email']+"&age="+currentContact['age']+"&birthday="+currentContact['birthday']+"&address="+currentContact['address']);
};

var deletecontact = function (){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function (){
    if (request.readyState == XMLHttpRequest.DONE){
      if (request.status >= 200 && request.status < 400) {
        // contacts = JSON.parse(request.responseText);
        // success(contacts);
      } else {
        // failure();
      }
    }
  };
  request.open("DELETE", "http://localhost:8080/contacts/"+currentContact["id"], true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send();
};


var currentContact = -1;

function edit_row(i) {
    // if(!submitpress){
    //     submitpress = true;
        editpress = true;
        currentContact = contacts[i];

        document.getElementById('name').value = currentContact['name'];
        document.getElementById('phone').value = currentContact['phone'];
        document.getElementById('email').value = currentContact['email'];
        document.getElementById('age').value = currentContact['age'];
        document.getElementById('birthday').value = currentContact['birthday'];
        document.getElementById('address').value = currentContact['address'];
        document.getElementById('type').innerHTML = "Edit Contact";

    // }
}


function delete_row(index) {
    // if(!submitpress){
        var ul = document.getElementById("contact-list");
        ul.removeChild(ul.childNodes[index]);
        currentContact = contacts[index];
        deletecontact();
        populate();
    // }
}
