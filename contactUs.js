//https://gist.github.com/Julian-Nash/77686553fe2461f8fad84d912e028c8e
// trim polyfill to clear whitespace
if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
function prepareFormBody(data)
{
	var formBody = [];
	for (var property in data) {
	  var encodedKey = encodeURIComponent(property);
	  var encodedValue = encodeURIComponent(data[property]);
	  formBody.push(encodedKey + "=" + encodedValue);
	}
	formBody = formBody.join("&"); 
	return formBody;
}
// Regex for validation
  var hasNumber = /\d/;
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{8,}/g;
function validateEmail(email) {
    var OK = emailRegex.exec(email);
    if (!OK) {
      return false;
    } else {
      return true;
    }
  }

  //validateEmail();

  function validatePassword(password) {
    var OK = passwordRegex.exec(password);
    if (!OK) {
      return false;
    } else {
      return true;
    }
  }
  

  

function submitContactUS()
{
	var data = {
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
    //keystring: document.getElementById("keystring").value.trim()
  };

  

  
  //validatePassword(); //disabled for the time being, will use later

  // Input length validation
  if (data.email.length == 0) {
    M.toast({ html: "Please enter an email address", displayLength: 2000, classes: 'red' });
  } else if (data.message.length == 0) {
    M.toast({ html: "Please enter a valid message", displayLength: 2000, classes: 'rounded red' });
  } else if (validateEmail(data.email) == false) {
    // Validate email
    M.toast({
      html: data.email + " doesn't look like a valid email",
      displayLength: 2000, classes: 'rounded red'
    });
  } else {
	  
	  /* USe fetch *
	  /*
	  fetch('http://myapi.com/user/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      login: login,
      senha: password
    })
  }).then(response => response.json())
  .then((responseJson) => console.log(responseJson))
}).catch(error => console.log(error));
	  */
	preloaderInst.show(); 
	let formBody = prepareFormBody(data);
	  //window.location.origin + 
    fetch("contactUs.php", {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      body: formBody,
      headers: new Headers({ "content-type": 'application/x-www-form-urlencoded' })
      //headers: new Headers({ "content-type": 'text/plain' })
      //body: JSON.stringify(data),
      //headers: new Headers({ "content-type": "application/json" })
    }).then(function(response) {
        if (response.status !== 200) {
          M.toast({
            html:
              "There was an error, please try again later (" +
              response.status +
              ")",
            displayLength: 2000, classes: 'rounded red'
          });
		  preloaderInst.hide();
          return;
        }
        response.json().then(function(data) {
			console.log(JSON.stringify(data))
          if (data.status == "Success") {
            M.toast({ html: "Success", displayLength: 2000, classes: 'green' });
          } else {
            M.toast({ html: data.message, displayLength: 2000 , classes: 'rounded red'});
          }
		  preloaderInst.hide();
        });
      })
      .catch(function(error) {
        M.toast({
          html: "There was an error, please try again later",
          displayLength: 2000
        });
        console.log("Fetch error: " + error);
		preloaderInst.hide();
      }); // end fetch
  } // end else
}

//var preloader,loaderContainer,locationContainerHeight,locationContainerWidth;

var preloaderInst;
    //after window is loaded completely 
window.onload = function(){
	preloader = document.querySelector("#preloader");
	
	preloaderInst =  new OSOLpreloader();
	preloaderInst.init();
	preloaderInst.adjustOnWindowResize();
	preloaderInst.hide();
	
	var submit_btn = document.getElementById("contactSubmit");

	submit_btn.addEventListener("click", function(){submitContactUS()}); // end click
}

window.onresize = function(){preloaderInst.adjustOnWindowResize()};

class OSOLpreloader{
	init()
	{
		this.preloader = document.querySelector("#preloader");
		this.loaderContainer = document.querySelector(".loaderContainer");
		this.locationContainerHeight = this.loaderContainer.offsetHeight;
		this.locationContainerWidth = this.loaderContainer.offsetWidth;
	}
	adjustOnWindowResize() {
		  //preloader = document.querySelector("#preloader");
		  let viewPortHeight = window.innerHeight;
		  let viewPortWidth = window.innerWidth;
		  this.preloader.style.height = viewPortHeight + "px";
		  
		  this.loaderContainer.style.top = ((viewPortHeight-this.locationContainerHeight)/2) + "px";
		  this.loaderContainer.style.left = ((viewPortWidth-this.locationContainerWidth)/2) + "px";
		  //console.log("loaderContainer.style.top is " + loaderContainer.style.top)
		  //console.log("loaderContainer.style.left is " + loaderContainer.style.left)
	}
	 show()
	{
		this.preloader.style.display = "block";
	}
	 hide()
	{
		this.preloader.style.display = "none";
	}
}