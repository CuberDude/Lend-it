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
            console.log(userInfo);
            $("#name").append(userInfo['display-name']);
            $("#email").append(userInfo['email']);
            $("#profileImg").append('<img src="'+userInfo['photo-url']+'">')
        });
    };
});