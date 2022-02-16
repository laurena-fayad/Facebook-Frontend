let fname = window.localStorage.getItem('fname')
let lname = window.localStorage.getItem('lname')
let token= window.localStorage.getItem('token');

document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})

document.getElementById("friend-suggestions-page").addEventListener("click", function(){
    location.href = 'friend_suggestions.html'
})

document.getElementById("view-friends").addEventListener("click", function(){
    location.href = 'friends.html'
})

document.getElementById("logout").addEventListener("click", function(){
    location.href = 'index.html'
})

document.getElementById("user_name").innerHTML = fname + " " + lname

document.getElementById("load-more-btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

//Adding post text to database on click
document.getElementById("post-now-btn").addEventListener("click", function(){
    let post= document.getElementById("text-area").value;
    if (post != null){
        let data = [];
        let postFormData = new FormData();
        postFormData.append('token', token);
        postFormData.append('function', 'POST');
        postFormData.append('post', post);
        
        axios({
            method: 'post',
            url: 'http://localhost/Facebook/Facebook-Backend/post.php',
            data: postFormData,
        })
        .then(function (response) {
            data = response.data
            if(`${data.status}` == "You've just posted!") {
                document.getElementById("post-status").innerHTML = "Post Successful!"
            }else{
                document.getElementById("post-status").innerHTML = "Error. Post Unsuccessful."    
            }
        })  
    }
})

//Populating Feed Posts
var bodyFormData = new FormData();
bodyFormData.append('token', token);
bodyFormData.append('function', 'GET');    

axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/post.php',
    data: bodyFormData,
})
.then(function (response) {
    let posts_data = response.data
    console.log(posts_data)
    for (let i = 0; i<posts_data.length; i++){

        console.log(posts_data)
        let post_text = `${posts_data[i].post_text}`
        let account_name = `${posts_data[i].fname}` + " " + `${posts_data[i].lname}`
        let post_date = `${posts_data[i].post_date}`
        let post_id = `${posts_data[i].post_id}`
        let account_id = `${posts_data[i].id}`
        let current = `${posts_data.current}`

        let post_html = "<div class=post-container><div class=user-profile><img src=assets/profile-pic.png><div><p id=post_account_name>"+account_name+"</p><span id=post_date>"+post_date+"</span></div></div><p id=post-text>"+post_text+"</p><div class=post-likes><div class=activity-icons><div><a class=like-btn id=like" + post_id + " href=#><img src=assets/like-blue.png></a><span id=likes-counter" + post_id + "></span></div></div></div></div>"
        let mypost_html = "<div class=post-container><div class=post-row><div class=user-profile><img src=assets/profile-pic.png><div id=post-info><p id=post_account_name>"+account_name+"</p><span id=post_date>"+post_date+"</span></div></div><a class=delete-post-btn id=" + post_id + " href=#>Delete Post</a></div><p id=post-text>"+post_text+"</p><div class=post-likes><div class=activity-icons><div><a class=like-btn id=like" + post_id + " href=#><img src=assets/like-blue.png></a><span id=likes-counter" + post_id + "></span></div></div></div></div>"
        
        // if(account_id == current){
            // document.getElementById("posts").innerHTML += mypost_html
        // }else{
            document.getElementById("posts").innerHTML += post_html
        // }

        //Display the number of likes on each post
        var bodyFormData = new FormData()
        let likes_counter = "likes-counter" + post_id

        bodyFormData.append('token', token);
        bodyFormData.append('post_id', post_id);

        axios({
            method: 'post',
            url: 'http://localhost/Facebook/Facebook-Backend/view_post_likes.php',
            data: bodyFormData,
        })
        .then(function (response) {
            document.getElementById(likes_counter).innerHTML = `${response.data.likes}`
        })
    }
    
    //Liking/Unliking a post
    let like_btns = document.getElementsByClassName("like-btn")
    for (let i = 0; i<like_btns.length; i++){
        like_btns[i].addEventListener("click", function(){
            var bodyFormData = new FormData()
            let liked_post_id = this.getAttribute('id')
            let post_id = liked_post_id.replace("like","")
            let likes_counter = "likes-counter" + post_id

            bodyFormData.append('token', token);
            bodyFormData.append('post_id', post_id);

            axios({
                method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/like_post.php',
                data: bodyFormData,
            })
            .then(function (response) {
                axios({method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/view_post_likes.php',
                data: bodyFormData,
                })
                .then(function (response) {
                    document.getElementById(likes_counter).innerHTML = `${response.data.likes}`
                })
            })
    })

    //Deleting a post on the feed
    let delete_btns = document.getElementsByClassName("delete-post-btn")
    for (let i = 0; i<delete_btns.length; i++){
        delete_btns[i].addEventListener("click", function(){

            var bodyFormData = new FormData();
            let deleted_post_id = this.getAttribute('id') 

            bodyFormData.append('token', token);
            bodyFormData.append('post_id', deleted_post_id);
            bodyFormData.append('function', 'DELETE'); 

            axios({
                method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/post.php',
                data: bodyFormData,
            })
            .then(function (response) {
                document.getElementById(deleted_post_id).innerHTML = "Post Deleted!"
                location.href = 'homepage.html'                    
            })
        })
    }
}
})

// Populating friend suggestions section
let data = [];

let suggestionFormData = new FormData();
suggestionFormData.append('token', token);

axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/view_friend_suggestions.php',
    data: suggestionFormData,
})
.then(function (response) {

    data = response.data;

    for (let i = 0; i<3; i++){
        let suggestion = `${data[i].fname}` + " " + `${data[i].lname}` 
        let suggestionID = `${data[i].id}`
        let friend_suggestions_string = "<div class=suggestion><div class=left-suggestion><img src=assets/profile-pic.png><h4>"+suggestion+"</h4></div><div class=right-suggestion><a class=add-friend-btn id=" + suggestionID + " href=#>Add Friend</a></div></div>"
        document.getElementById("suggestions").innerHTML += friend_suggestions_string 
    }


    //Check if any add friend button is clicked and update DB accordingly
    let add_friend_buttons =  document.getElementsByClassName("add-friend-btn")

    for (let i = 0; i < add_friend_buttons.length; i++) {
        
        add_friend_buttons[i].addEventListener("click", function() {
            requestID = this.getAttribute('id')
            let add_friend_data = [];

            let addFormData = new FormData();
            addFormData.append('token', token);
            addFormData.append('friendID', requestID);

            axios({
                method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/send_friend_request.php',
                data: addFormData,
            })
            .then(function (response) {
                add_friend_data = response.data;
                if(`${add_friend_data.status}` != null){
                    document.getElementById(requestID).innerHTML = "Request Sent!"
                }
            })
        });
    } 
})