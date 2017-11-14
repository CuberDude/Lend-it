firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // No user is signed in.
        window.location.replace("index.html");
    }
});

var userItem;
var userId = localStorage.getItem('userId');
var html = "";

function resetData() {
    firebase.database().ref().child(userId).child("Items").once('value').then(function(snap) {
        userItem = snap.val()
        console.log(userItem)
        for (var i = 0; i < userItem.length; i++) {
            html = html + '<div class="row"> <img class="itemImg" src="assets/img/avatar.jpg"><div class="itemInfo"><p class = "name">Item Name: ' + userItem[i].Name + '</p><p class = "qtyLeft">Qty Left :' + userItem[i].Qty + '</p><p><a src="#" onclick="del(' + i + ')" class="btn btn-danger">Delete</a></p></div></div>'
        }
        $("#items").append(html);

    });
}

resetData();

function del(i) {
    const dbRef = firebase.database().ref().child(userId).child("Items");
    dbRef.child(i).remove();
    console.log(i);
}

$("#logOut").click(function() {
    firebase.auth().signOut();
})

$("#addBtn").click(function() {
    $("#items").toggleClass("hidden");
    $("#add").toggleClass("hidden");
    $("#plusMinus").toggleClass("glyphicon-minus");
})

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


$("#addItem").click(function() {
    if (userId) {
        var item = {
            Name: $("#itemName").val(),
            Qty: parseInt($("#itemQty").val()),
            LentQty: 0,
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
            const dbRef = firebase.database().ref().child(userId).child("Items");
            dbRef.child(userItem !== null ? userItem.length : 0).set(item);
            console.log(item);
            $("#itemName").val("");
            $("#itemQty").val("");
            resetData();
        }
    } else {
        console.log("wait");
        userId = firebase.auth().currentUser;
    }
})