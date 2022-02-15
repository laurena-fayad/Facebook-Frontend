function deletePost(){
    
    var bodyFormData = new FormData();
    let token= window.localStorage.getItem('token');
    let del = document.getElementById("id").value
    bodyFormData.append('token', token);
    bodyFormData.append('id', del);
    bodyFormData.append('function', 'DELETE');
    
    
    axios({
        method: 'post',
        url: 'http://localhost/fbmain/Facebook-Backend/post.php',
        data: bodyFormData,
    })
    .then(function (response) {
        console.log(response.data);
        
                
    })
    .catch(function (error) {
        console.log(error);
    });
    
}
deletePost()