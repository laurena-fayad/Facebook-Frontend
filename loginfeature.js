
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

axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/login.php',
    data: bodyFormData,
})
.then(function (response) {
    console.log(response);
    window.localStorage.setItem('token', response.data.token);
    window.localStorage.setItem('fname', response.data.fname);
    window.localStorage.setItem('lname', response.data.lname);

    if (window.localStorage.getItem('token')!='undefined'){
        location.href="homepage.html";
    }
})
.catch(function (error) {
    console.log(error);
});

}

else{
    alert("Empty Field");
}
}
