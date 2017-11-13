firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // No user is signed in.
        window.location.replace("index.html");
    }
    /*
        else{
            userId=user.uid;
            const dbRef = firebase.database().ref().child('lent');
            dbRef.on('value', function(snap) { 
                var userInfo=snap.val()[userId]

            });
        }     */
});

var userItem;
var userId = localStorage.getItem('userId');
var html = "";


firebase.database().ref().child(userId).once('value').then(function(snap) {
    userItem = snap.val()
    console.log(userItem)
    for (var i = 0; i < userItem.length; i++) {
        html = html + '<div class="row"> <img class="itemImg" src="assets/img/avatar.jpg"><div class="itemInfo"><p class = "name">Item Name:' + userItem[i].Name + '</p><p class = "amount">Security Amount:</p><p class = "contant">Contact</p></div></div>'
    }
    $("#items").append(html);

});

$("#logOut").click(function() {
    firebase.auth().signOut();
})


$("#addBtn").click(function() {
    $("#items").toggleClass("hidden");
    $("#add").toggleClass("hidden");
})

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


$("#addItem").click(function() {
    if (userId) {
        var item = {
            Name: $("#itemName").val(),
            Qty: parseInt($("#itemQty").val()),
            Id: makeid()
        };
        if (item.Name === "") {
            console.log("name");
            //add something for missing name
        } else if (!item.Qty) {
            console.log("Qty");
            // add something for missing qty
        } else {
            //adding item to db
            const dbRef = firebase.database().ref().child(userId);
            dbRef.child().set(item);
            console.log(item);
        }
    } else {
        console.log("wait");
        userId = firebase.auth().currentUser;
    }
})