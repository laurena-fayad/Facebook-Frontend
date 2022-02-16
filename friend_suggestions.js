let token= window.localStorage.getItem('token');

document.getElementById("feed_btn").addEventListener("click", function(){
    location.href = 'homepage.html'
})

document.getElementById("friend_requests_btn").addEventListener("click", function(){
    location.href = 'friend_requests.html'
})


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

    for (let i = 0; i<data.length; i++){
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