
function getallFeeds(){

    var bodyFormData = new FormData();
    let token= window.localStorage.getItem('token');
    bodyFormData.append('token', token);
    bodyFormData.append('function', 'GET');
    // bodyFormData.append('post', 'POST');
    
    
    axios({
        method: 'post',
        url: 'http://localhost/fbmain/Facebook-Backend/post.php',
        data: bodyFormData,
    })
    .then(function (response) {
        console.log(response.data);
        for(var i in response.data){
            console.log(response.data[i])
            document.getElementById('feeds').innerHTML+='<input>'+response.data[i].post_text+'</input>'
            document.getElementById('feeds').innerHTML+='</div><button id=edit'+response.data[i].id+'>EDIT</button>'
        }
                
    })
    .catch(function (error) {
        console.log(error);
    });
    }

    getallFeeds()