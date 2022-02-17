let token= window.localStorage.getItem('token');

document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})

let blocked_friends_data = []
let blocked_friend_ID
let blockedFormData = new FormData();
blockedFormData.append('token', token);
console.log("hi")

axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/view_blocked.php',
    data: blockedFormData,
})
.then(function (response) {
    blocked_friends_data = response.data
    for (let i = 0; i<blocked_friends_data.length; i++){
        let blocked_friend_name = `${blocked_friends_data[i].fname}` + " " + `${blocked_friends_data[i].lname}` 
        blocked_friend_ID = `${blocked_friends_data[i].user2_id}`
        let blocked_friend_string = "<div class=blocked-friend><div class=left-friend><img src=assets/profilepic.png><h4>"+blocked_friend_name+"</h4></div><div class=right-friend><button id=unblock" + blocked_friend_ID + " class=unblock-btn type=button>Unblock</button></div></div>"
        document.getElementById("blocked-friends").innerHTML += blocked_friend_string
    }

    //Check if any unblock button is clicked and update DB accordingly
    let unblock_buttons =  document.getElementsByClassName("unblock-btn")

    for (let i = 0; i < unblock_buttons.length; i++) {
        
        unblock_buttons[i].addEventListener("click", function() {
            unblock_btn_ID = this.getAttribute('id')
            blocked_friend_ID = unblock_btn_ID.replace('unblock','')
            let unblockFormData = new FormData()
            unblockFormData.append('token', token)
            unblockFormData.append('friendID', blocked_friend_ID)

            axios({
                method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/unblock_user.php',
                data: unblockFormData,
            })
            .then(function (response) {
                if(`${response.data.status}` == "Success"){
                    document.getElementById(unblock_btn_ID).innerHTML = "Unblocked!"
                }
            })
        })
    }
})