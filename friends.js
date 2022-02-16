let token= window.localStorage.getItem('token');


document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})


let friends_data = []
let friendID
let postFormData = new FormData();
postFormData.append('token', token);

axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/view_friends.php',
    data: postFormData,
})
.then(function (response) {
    friends_data = response.data
    for (let i = 0; i<friends_data.length; i++){
        let friend_name = `${friends_data[i].fname}` + " " + `${friends_data[i].lname}` 
        friendID = `${friends_data[i].id}`
        let friend_string = "<div class=friend><div class=left-friend><img src=assets/profile-pic.png><h4>"+friend_name+"</h4></div><div class=right-friend><button id=block" + friendID + " class=block-btn type=button>Block</button><button id=remove" + friendID + " class=remove-btn type=button>Remove</button></div></div>"
        document.getElementById("friends").innerHTML += friend_string
    }


})  

//Check if any remove button is clicked and update DB accordingly
let accept_buttons =  document.getElementsByClassName("accept-btn")

for (let i = 0; i < accept_buttons.length; i++) {
    
    accept_buttons[i].addEventListener("click", function() {
        accept_btn_ID = this.getAttribute('id')
        requestID = accept_btn_ID.replace('accept','')
        let requests_accept_data = [];
        let friend_requests_accept_api = "http://localhost/Facebook/Facebook-Backend/accept_friend_request.php/?user1=" + requestID + "&user2=" + current_user
       
        axios.get(friend_requests_accept_api).then(response => {
            requests_accept_data = response.data;
            if(`${requests_accept_data.status}` == "Friend request accepted successfully."){
                ignore_btn_ID = "ignore"+requestID
                document.getElementById(accept_btn_ID).innerHTML = "New Friend Alert!"
                document.getElementById(ignore_btn_ID).style.display = "none"
            }
        })
    });
}

//Check if any ignore button is clicked and update DB accordingly
let ignore_buttons =  document.getElementsByClassName("ignore-btn")

for (let i = 0; i < ignore_buttons.length; i++) {
    
    ignore_buttons[i].addEventListener("click", function() {
        ignore_btn_ID = this.getAttribute('id')
        requestID = ignore_btn_ID.replace('ignore','')
        let requests_ignore_data = [];
        let friend_requests_ignore_api = "http://localhost/Facebook/Facebook-Backend/ignore_friend_request.php/?user1=" + requestID + "&user2=" + current_user
        axios.get(friend_requests_ignore_api).then(response => {
            requests_ignore_data = response.data;
            if(`${requests_ignore_data.status}` == "Friend request ignored successfully."){
                accept_btn_ID = "accept"+requestID
                console.log(accept_btn_ID, ignore_btn_ID)
                document.getElementById(ignore_btn_ID).innerHTML = "Request Ignored."
                document.getElementById(accept_btn_ID).style.display = "none"
            }
        })
    });
}   
