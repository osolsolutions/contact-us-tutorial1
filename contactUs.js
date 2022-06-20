class BasicFormOps{
    validateForm(formId){

    }//validateForm(){
      
}//class BasicFormOps{

class ContactUs extends BasicFormOps {
    postURL = "contactUs.php";
    //modalInst = M.Modal.init(document.getElementById("preloaderModal"), {dismissible: false});
    constructor(url2Post) {
      super();
      if(typeof url2Post != 'undefined')this.postURL = url2Post;
    }
    prefillForm()
    {
        document.getElementById("email").value = "dsdsdsd@dsdsd.com";
        document.getElementById("message").value = "wqwqw";
        document.getElementById("keystring").value = "sdsds";
    }
    validateEmail(email) {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var OK = emailRegex.exec(email);
        if (!OK) {
          return false;
        } else {
          return true;
        }
      }
    validateForm(){

        var data = {
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim(),
            keystring: document.getElementById("keystring").value.trim()
          };
        let validForm =  true;
          // Input length validation
        if (data.email.length == 0 || !this.validateEmail(data.email)) {
            M.toast({ html: "Please enter a valid email", displayLength: 2000 });
            document.getElementById("email").focus();
            validForm =  false;
        } else if (data.message.length == 0) {
            M.toast({ html: "Please enter a message", displayLength: 2000 });
            validForm =  false;
        } else if (data.keystring.length == 0) {
            M.toast({ html: "Please enter security text", displayLength: 2000 });
            validForm =  false;
        }
          return validForm;
          
    }//validateForm
    sendEmail(){
		//console.log("in sendEmail()");
        if(this.validateForm())
        {
            this.post2backend();
        }//if(this.validateForm())
    }//sendEmail(){
    
    getFormDataAsJSON(){

        const getFormData = () => {
          const form = document.getElementById("contactForm");
          return new FormData(form);
        }

        const toJson = function() {
          const formData = getFormData();
          let object = {};
          formData.forEach((value, key) => {
            if (!Reflect.has(object, key)) {
              object[key] = value;
              return;
            }
            if (!Array.isArray(object[key])) {
              object[key] = [object[key]];
            }
            object[key].push(value);
          });
          let json = JSON.stringify(object);
          //console.log(json);
          return json;
        };
        return toJson();
    }
	prepareFormBody4AJAXPost(data)
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
    post2backend(){
		//console.log("in post2backend()");
        preloaderInst.show();
        //let stringifiedFormData = this.getFormDataAsJSON();
		
		
        //console.log(stringifiedFormData);
        let stringVariable = window.location.href;
        let postURL = stringVariable.substring(0, stringVariable.lastIndexOf('/')) + "/contactUs.php?rer=sd";
        //console.log(postURL);
        /* let serializedFormData = $("#contactForm").serialize();
        console.log(serializedFormData); */
        let contactUs = this;


        const getFormData = () => {
          const form = document.getElementById("contactForm");
          return new FormData(form);
        }

        let formData = getFormData();
        /* const file = document.querySelector('#fileToUpload').files[0];
        formData.append('fileToUpload', file); */
        
        //console.log(formData);
        formData.forEach((value, key) => {
          console.log(key,value);
        });
        fetch(postURL, {
          method: 'POST',
          credentials: "include",
          body: formData
          //,headers: new Headers({ "content-type": "application/multipart/form-data; charset=UTF-8" })
        })
        .then(responseObj => {
          //this block is not redundant
          // this is required to get past a chrome bug
          //https://stackoverflow.com/questions/47177053/strange-behaviour-of-php-session-start-when-javascript-fetch
          console.log("response.status is "+ responseObj.status)
          if (responseObj.status !== 200) {
            
           preloaderInst.hide();
		   
            M.toast({
              html:
                "There was an error, please try again later (" +
                responseObj.status +
                ")",
              displayLength: 2000,
              classes:"red"
            });
            return null;
          }//if (responseObj.status !== 200) 
          return responseObj.json();
        })
        .then(response => {
          //console.log('Success');
          console.log('Success:', ((response)));
          if(!response)return null;// if status is not 200
          
          preloaderInst.hide();
          if (response.status === "Error") {
            M.toast({ html: response.message, displayLength: 2000,classes:"red" });
            if(response.message == "Invalid Captcha(Security Text)")refreshCaptcha();
            return;
          }
          refreshCaptcha();  
          M.toast({ html: "Mail sent!!!<br /> Our representative will get back to you within 24 hours", displayLength: 2000,classes:"green" });
            
            
        })
        //.then(response => response.json())
        .catch(error => {
          console.error('Error:', (error));
        });

    }//post2backend();
	enableFileDragDrop()
	{
			// dragover and dragenter events need to have 'preventDefault' called
            // in order for the 'drop' event to register. 
            // See: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations#droptargets
            let dropContainer = document.getElementById("dropContainer");
            let fileInput = document.getElementById("fileToUpload");

            dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
              evt.preventDefault();
            };

            dropContainer.ondrop = function(evt) {
              // pretty simple -- but not for IE :(
              fileInput.files = evt.dataTransfer.files;

              /* // If you want to use some of the dropped files
              const dT = new DataTransfer();
              dT.items.add(evt.dataTransfer.files[0]);
              dT.items.add(evt.dataTransfer.files[3]);
              fileInput.files = dT.files; */

              evt.preventDefault();
            };
	}
	refreshCaptcha()
	{
		
	    var time =  new Date().getTime();
		var url = 'contactUs.php?action=getCaptchaWithAjax&time='+time;
		var xhr = new XMLHttpRequest()
	  
	  xhr.open('GET', url, true);
	  xhr.addEventListener('readystatechange', function(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
		  // Done. Inform the user
                     let xhrResponse = JSON.parse(xhr.responseText);
					  var captchaEncypted = document.querySelector("#captchaEncypted");
					  var osolCaptchaImage = document.querySelector("#osolCaptchaImage");
					  captchaEncypted.value = xhrResponse.captchaEncypted;
					  osolCaptchaImage.src = "data:image/png;base64," + xhrResponse.imageContent;
		}
		else if (xhr.readyState == 4 && xhr.status != 200) {
		  // Error. Inform the user
		}
	  })
	  
	  xhr.send(null)
	 
	}
        

  }//class ContactUs extends BasicFormOps
//var preloader,loaderContainer,locationContainerHeight,locationContainerWidth;

var contactus,preloaderInst;
    //after window is loaded completely 
window.onload = function(){
	
	
	preloaderInst =  new OSOLJSPreloader();
	preloaderInst.init();
	
	/* var submit_btn = document.getElementById("contactSubmit");
	submit_btn.addEventListener("click", function(){submitContactUS()}); // end click */
	contactus = new ContactUs();
	  //contactus.prefillForm();
	  contactus.enableFileDragDrop();
	  var submit_btn = document.getElementById("contactSubmit");

	  submit_btn.addEventListener("click", function(e) {
		e.preventDefault();
		contactus.sendEmail();
		});
	contactus.refreshCaptcha();
}

window.onresize = function(){preloaderInst.adjustOnWindowResize()};
