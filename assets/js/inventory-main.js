var userId;
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // No user is signed in.
    window.location.replace("index.html");
  }
    else{
        userId=user.uid;
        const dbRef = firebase.database().ref().child('lent');
        dbRef.on('value', function(snap) { 
            var userInfo=snap.val()[userId]

        });
    }     
});
var html="";

for(var i = 0 ;i < 10 ; i++){
    html=html+'<div class="row"> <img class="itemImg" src="assets/img/avatar.jpg"><div class="itemInfo"><p class = "name">Item Name:</p><p class = "amount">Security Amount:</p><p class = "contant">Contact</p></div></div>'
}

$("#items").append(html);  
console.log(userId);
$("#logOut").click(function(){
    firebase.auth().signOut();
})
$().ready(function(){
    var userId = firebase.auth();
    console.log(userId);
})
$("#addBtn").click(function(){
    console.log("items Added");
    if(userId){}
})
