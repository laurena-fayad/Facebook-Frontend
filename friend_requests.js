document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})

document.getElementById("friend-suggestions-page").addEventListener("click", function(){
    location.href = 'friend_suggestions.html'
})

//Should be the actual logged in user
window.localStorage.setItem('current_user', '27');
let current_user = window.localStorage.getItem('current_user')
let friend_requests_data = []
let requestID
let friend_requests_api = "http://localhost/Facebook/Facebook-Backend/view_friend_requests.php/?user_id=" + current_user

axios.get(friend_requests_api).then(response => {
    friend_requests_data = response.data;
    for (let i = 0; i<friend_requests_data.length; i++){
        let request = `${friend_requests_data[i].fname}` + " " + `${friend_requests_data[i].lname}` 
        requestID = `${friend_requests_data[i].id}`
        let friend_requests_string = "<div class=request><div class=left-request><img src=assets/profile-pic.png><h4>"+request+"</h4></div><div class=right-request><button id=accept" + requestID + " class=accept-btn type=button>Accept</button><button id=ignore" + requestID + " class=ignore-btn type=button>Ignore</button></div></div>"
        document.getElementById("requests").innerHTML += friend_requests_string
    }

    //Check if any accept button is clicked and update DB accordingly
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
})