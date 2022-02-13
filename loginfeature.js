const get_loginData = () =>{
    axios.get('http://localhost/facebook/Facebook-Backend/login.php').then(response=>{
        console.log(response);
    });
};



const signUp = () =>{
    axios.post('http://localhost/facebook/Facebook-Backend/signup.php',{
         //insert json
    })
    .then(response=>{
        console.log(response);
    })
    .catch(err =>{
        console.log(err, err.response);
    });
};