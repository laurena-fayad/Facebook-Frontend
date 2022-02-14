document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})

//Should be the actual logged in user
window.localStorage.setItem('current_user', '27');
let current_user = window.localStorage.getItem('current_user')

let data = [];
let friend_suggestions_api = "http://localhost/Facebook/Facebook-Backend/view_friend_suggestions.php/?user_id=" + current_user
axios.get(friend_suggestions_api).then(response => {
    data = response.data;

    for (let i = 0; i<data.length; i++){
        let suggestion = `${data[i].fname}` + " " + `${data[i].lname}` 
        let suggestionID = `${data[i].id}`
        let string = "<div class=suggestion><div class=left-suggestion><img src=assets/profile-pic.png><h4>"+suggestion+"</h4></div><div class=right-suggestion><a class=add-friend-btn href=#>Add Friend</a></div></div>"
        document.getElementById("suggestions").innerHTML += string
    }
})