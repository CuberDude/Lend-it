var userItem;
var userId = localStorage.getItem('userId');
var html = "";



function resetData() {
    firebase.database().ref().child(userId).once('value').then(function(snap) {
        userItem = snap.val()
        console.log(userItem)
        for (var i = 0; i < userItem.length; i++) {
            html = html + '<div class="row"> <img class="itemImg" src="assets/img/avatar.jpg"><div class="itemInfo"><p class = "name">Item Name:' + userItem[i].Name + '</p><p class = "amount">Security Amount:</p><p class = "contant">Contact</p><p class = "lentQty">Lent :' + userItem[i].LentQty + '</p></div></div>'
        }
        $("#items").append(html);

    });
}

resetData();