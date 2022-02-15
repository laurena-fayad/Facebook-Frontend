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