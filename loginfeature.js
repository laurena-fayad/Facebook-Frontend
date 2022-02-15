
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

function login(){
var bodyFormData = new FormData();
let email= document.getElementById("email").value
let psw = document.getElementById("password").value
if (email !=null && password!=null && validateEmail(email)){
bodyFormData.append('email', email);
bodyFormData.append('password', psw);



}

