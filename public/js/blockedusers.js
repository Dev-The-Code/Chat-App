function blockuserip(ipofuser, userid) {
    firebase.database().ref(`CHATROOM/BLOCKEDIPS`).once('value', (data) => {

        var notdotip = ipofuser.replace(/\./g, 'x');


        if (data.hasChild(notdotip)) {




            shownotif("Block Failed!", "We Couldnt Block Because This User Is Already In The Block List", "warning", "5")
            return false;
        }
        else {

            blockuseriptwo(notdotip, userid)
        }


    })
}



function blockuseriptwo(ipofuser, userid) {

    if (isAdmin == "YES") {

        firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).once('value', (data) => {
            var emailofuser = data.child("Email").val()
            var fblinkofuser = data.child("FBLink").val()
            var fullnameofuser = data.child("Name").val()
            var lastipofuser = data.child("LastIP").val()
            var lastispofuser = data.child("LastISP").val()
            var lastloginarea = data.child("LastLoginArea").val()
            var nickofuser = data.child("FirstName").val()
            var phoneofuser = "NONE"
            var regareaofuser = data.child("RegisteredWithArea").val()
            var regipofuser = data.child("RegisteredWithIP").val()
            var regispofuser = data.child("RegisteredWithISP").val();
            var ProfilePicOfUser = data.child("ProfilePic").val();
            var reason = prompt("Reason to Block User:" + fullnameofuser + " ?, You can also submit link to screenshot image.");
            if (reason === null || reason == undefined || reason == "" || reason == "null") {
                shownotif("Error!", "Cannot block a user without reason, you have to write reason why are you blocking this user? you can also upload screenshot to postimages.org and write link of the screenshot in the 'Reason Promp Box', The User Is Not Yet Blocked Please Try Again.", "danger", "20")
            }

            else {



                var userdetails = { Name: fullnameofuser, Reason: reason, Pic: ProfilePicOfUser, BlockedByAdmin: firebase.auth().currentUser.email, Email: emailofuser, FBLink: fblinkofuser, NickName: nickofuser, Phone: phoneofuser, LArea: lastloginarea, LIP: lastipofuser, LISP: lastispofuser, RArea: regareaofuser, RIP: regipofuser, RISP: regispofuser };
                firebase.database().ref(`CHATROOM/BLOCKEDIPS/${ipofuser}`).set(userdetails);
                firebase.database().ref(`CHATROOM/BLOCKEDIPS/${userid}`).set(userdetails);
                shownotif("Success!", "User  ''" + fullnameofuser + "'' Has Been Blocked  Successfully", "success", "3")

            }

        })


    }

    else {
        shownotif("Error!", "Couldnt Perform this action, You dont have enough permissions to perform this aciton.", "danger", "4")

    }


}



function ifonebanfoundaddothertoo() {

    firebase.database().ref(`CHATROOM/BLOCKEDIPS`).on('value', (data) => {



        //    data.forEach(function(child){alert("EachFunc: :"+child.hasChild(firebase.auth().currentUser.uid)) })


        if (data.hasChild(useripstring) === true && data.hasChild(firebase.auth().currentUser.uid) === false) {
            //alert("IF: :"+data.hasChild(firebase.auth().currentUser.uid))

            //alert("Blocked by if")

            firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).on('value', (data) => {





                console.log('"' + firebase.auth().currentUser.uid + '"' + ', ' + firebase.auth().currentUser.uid)

                var emailofuser = data.child("Email").val()
                var fblinkofuser = data.child("FBLink").val()
                var fullnameofuser = data.child("FullName").val()
                var lastipofuser = data.child("LastIP").val()
                var lastispofuser = data.child("LastISP").val()
                var lastloginarea = data.child("LastLoginArea").val()
                var nickofuser = data.child("NickName").val()
                var phoneofuser = data.child("Phone").val()
                var regareaofuser = data.child("RegisteredWithArea").val()
                var regipofuser = data.child("RegisteredWithIP").val()
                var regispofuser = data.child("RegisteredWithISP").val();
                var ProfilePicOfUser = data.child("ProfilePic").val();



                console.log("Looks like user is violating terms by creating fake accounts.")


                var userdetails = { Name: fullnameofuser, Reason: "AutoBlock Systems", BlockedByAdmin: "server@autoblock", Pic: ProfilePicOfUser, Email: emailofuser, FBLink: fblinkofuser, NickName: nickofuser, Phone: phoneofuser, LArea: lastloginarea, LIP: lastipofuser, LISP: lastispofuser, RArea: regareaofuser, RIP: regipofuser, RISP: regispofuser };

                firebase.database().ref(`CHATROOM/BLOCKEDIPS/${firebase.auth().currentUser.uid}`).set(userdetails);



            })















        }
        else if (data.hasChild(useripstring) === true && data.hasChild(firebase.auth().currentUser.uid) === true) {
            //  alert("Else:"+data.hasChild(firebase.auth().currentUser.uid) )
            // alert("Already Blocked")
        }

    });

}