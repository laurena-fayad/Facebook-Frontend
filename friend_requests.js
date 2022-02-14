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
let friend_requests_api = "http://localhost/Facebook/Facebook-Backend/view_friend_requests.php/?user_id=" + current_user
axios.get(friend_requests_api).then(response => {
    data = response.data;
    for (let i = 0; i<data.length; i++){
        let request = `${data[i].fname}` + " " + `${data[i].lname}` 
        let requestID = `${data[i].id}`
        document.getElementById("requests").innerHTML += "<li>" +" " + requestID+" "+ request + "</li>"
    }
})
