firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // No user is signed in.
        window.location.replace("index.html");
    } else {
        const userId = user.uid;
        localStorage.setItem('userId', userId);
        console.log(userId);
        const dbRef = firebase.database().ref().child('user-profiles');
        dbRef.on('value', function(snap) {
            var userInfo = snap.val()[userId]
            console.log(userInfo);
            $("#name").append(userInfo['display-name']);
            $("#email").append(userInfo['email']);
            $("#profileImg").append('<div class="col-lg-3 col-sm-3 col-xs-3 col-md-3"></div><img class="col-lg-6 col-sm-6 col-xs-6 col-md-6 "src="' + userInfo['photo-url'] + '">')
        });
    };
});

$("#logOut").click(function() {
    console.log("done");
    firebase.auth().signOut();
})