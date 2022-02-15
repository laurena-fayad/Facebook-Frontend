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

document.getElementById("load-more-btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

//Populating Feed Posts
var bodyFormData = new FormData();
let token= window.localStorage.getItem('token');
bodyFormData.append('token', token);
bodyFormData.append('function', 'GET');    


axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/post.php',
    data: bodyFormData,
})
.then(function (response) {
    for(var i in response.data){
        let post_text = `${response.data[i].post_text}`;
        let account_name = `${response.data[i].fname}` + " " + `${response.data[i].lname}`;
        let post_date = `${response.data[i].post_date}`
        let post_id = `${response.data[i].post_id}`
        let account_id = `${response.data[i].id}`

        let post_html = "<div class=post-container><div class=user-profile><img src=assets/profile-pic.png><div><p id=post_account_name>"+account_name+"</p><span id=post_date>"+post_date+"</span></div></div><p id=post-text>"+post_text+"</p><div class=post-likes><div class=activity-icons><div><a href=#><img src=assets/like-blue.png></a><span>30</span></div></div></div></div>"

        document.getElementById("posts").innerHTML += post_html
    }           
})

//Adding post text to database on click
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