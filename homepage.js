let fname = window.localStorage.getItem('fname')
let lname = window.localStorage.getItem('lname')
console.log(fname, lname)
current_user = 27

document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})

document.getElementById("friend-suggestions-page").addEventListener("click", function(){
    location.href = 'friend_suggestions.html'
})

document.getElementById("user_name").innerHTML = fname + " " + lname

document.getElementById("post-now-btn").addEventListener("click", function(){
    
    let data = [];
    let bodyFormData = new FormData();
    let post= document.getElementById("text-area").value;
    let token= window.localStorage.getItem('token');
    bodyFormData.append('token', token);
    bodyFormData.append('function', 'POST');
    bodyFormData.append('post', post);
    
    axios({
        method: 'post',
        url: 'http://localhost/Facebook/Facebook-Backend/post.php',
        data: bodyFormData,
    })
    .then(function (response) {
        data = response.data
        if(`${data.status}` == "You've just posted!") {
            document.getElementById("post-status").innerHTML = "Post Successful!"
        }else{
            document.getElementById("post-status").innerHTML = "Error. Post Unsuccessful."    
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    
})