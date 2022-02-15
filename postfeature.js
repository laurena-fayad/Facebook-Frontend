function post(){
    
        var bodyFormData = new FormData();
        let post= document.getElementById("post").value;
        let token= window.localStorage.getItem('token');
        bodyFormData.append('token', token);
        bodyFormData.append('function', 'POST');
        bodyFormData.append('post', post);
        
        axios({
            method: 'post',
            url: 'http://localhost/fbmain/Facebook-Backend/post.php',
            data: bodyFormData,
        })
        .then(function (response) {
            console.log(response.data);
            
                document.getElementById('post').innerHTML=response.data.post_text
                document.getElementById('post').innerHTML=response.data.post_date
                document.getElementById('post').innerHTML='</div><button id=edit'+response.data.id+'>POST</button>'
            
                 
        })
        .catch(function (error) {
            console.log(error);
        });
        
}
post()