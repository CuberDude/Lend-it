$("#signIn").click(function sign() {
    var userInfo;
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        userInfo = user;
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        window.location.replace("profile.html");
    }
});