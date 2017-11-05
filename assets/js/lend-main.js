firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // No user is signed in.
    window.location.replace("index.html");
  }
    else{
        const userId=user.uid;
        console.log(userId);
        const dbRef = firebase.database().ref().child('user-profiles');
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

$("#logOut").click(function(){
    console.log("done");
    firebase.auth().signOut();
})