function signUp(){
    var bodyFormData = new FormData();
    let name= document.getElementById("name").value
    let lastname = document.getElementById("lastname").value
    let mail = document.getElementById("email-pos").value
    let psw = document.getElementById("pass-pos").value

    if(mail !=null && psw!=null && lastname!=null && name!=null) {
    bodyFormData.append('name', name);
    bodyFormData.append('lastname', lastname);
    
    bodyFormData.append('email', mail);
    bodyFormData.append('password', psw);

    axios({
        method:'post',
        url: 'http://localhost/fbmain/Facebook-Backend/signup.php',
        data: bodyFormData,
    })
    .then(function (response) { 

        if(response.data.status=='SIGNED UP SUCCESSFULLY'){ 
            

         window.location.href = ('http://localhost/SE_FACTORY_FB/Facebook-Frontend/index.html');

        }
        else{
        console.log(response.data)
    }
        

    })
    .catch(function (error) {
        console.log(error.data);
    });   
}
}