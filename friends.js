let token= window.localStorage.getItem('token');


document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})

let friends_data = []
let friendID
let friendFormData = new FormData();
friendFormData.append('token', token);

axios({
    method: 'post',
    url: 'http://localhost/Facebook/Facebook-Backend/view_friends.php',
    data: friendFormData,
})
.then(function (response) {
    friends_data = response.data
    for (let i = 0; i<friends_data.length; i++){
        let friend_name = `${friends_data[i].fname}` + " " + `${friends_data[i].lname}` 
        friendID = `${friends_data[i].id}`
        let friend_string = "<div class=friend><div class=left-friend><img src=assets/profile-pic.png><h4>"+friend_name+"</h4></div><div class=right-friend><button id=block" + friendID + " class=block-btn type=button>Block</button><button id=remove" + friendID + " class=remove-btn type=button>Remove</button></div></div>"
        document.getElementById("friends").innerHTML += friend_string
    }

    //Check if any remove button is clicked and update DB accordingly
    let remove_buttons =  document.getElementsByClassName("remove-btn")

    for (let i = 0; i < remove_buttons.length; i++) {
        
        remove_buttons[i].addEventListener("click", function() {
            remove_btn_ID = this.getAttribute('id')
            friendID = remove_btn_ID.replace('remove','')
            let removeFormData = new FormData()
            removeFormData.append('token', token)
            removeFormData.append('friendID', friendID)

            axios({
                method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/remove_friend.php',
                data: removeFormData,
            })
            .then(function (response) {
                if(`${response.data.status}` == "Success"){
                    document.getElementById(remove_btn_ID).innerHTML = "Removed"
                    let block_btn_ID = "block" + friendID
                    document.getElementById(block_btn_ID).style.display = "none"
                }
            })
        })
    }

    //Check if any block button is clicked and update DB accordingly
    let block_buttons =  document.getElementsByClassName("block-btn")

    for (let i = 0; i < block_buttons.length; i++) {
        
        block_buttons[i].addEventListener("click", function() {
            block_btn_ID = this.getAttribute('id')
            friendID = block_btn_ID.replace('block','')
            let blockFormData = new FormData()
            blockFormData.append('token', token)
            blockFormData.append('friendID', friendID)

            axios({
                method: 'post',
                url: 'http://localhost/Facebook/Facebook-Backend/block_user.php',
                data: blockFormData,
            })
            .then(function (response) {
                if(`${response.data.status}` == "Success."){
                    document.getElementById(block_btn_ID).innerHTML = "Blocked"
                    let remove_btn_ID = "remove" + friendID
                    document.getElementById(remove_btn_ID).style.display = "none"
                }
            })
        })
    }  
})