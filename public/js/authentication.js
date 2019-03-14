var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {

//CONNECTED

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(localStorage.getItem("RecieverID") === null || localStorage.getItem("RecieverID") == "null"|| localStorage.getItem("RecieverID") == ""){
        localStorage.setItem("RecieverID","DQbiDKSONOOL8DfwHSvexevmKRk2")
    }



      checkforlastmsg()

      setTimeout(function(){checkforlastmsg()},500)
      
      setTimeout(function(){checkforlastmsg()},1500)

      ifthereisnomsg()
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });







  } else {
    //NOT CONNECTED
  }
});


function ifthereisnomsg(){


    if(localStorage.getItem("RecieverID") === null || localStorage.getItem("RecieverID") == "null"|| localStorage.getItem("RecieverID") == ""){
        localStorage.setItem("RecieverID","DQbiDKSONOOL8DfwHSvexevmKRk2")
    }
}

function checkforlastmsg() {


    firebase.database().ref(`CHATROOM/MESSAGES/`).once('value',(data)=>{
        
        data.forEach(function(child){
        
        var SenderID = child.child("UserId").val();
        
            var RecieverID = child.child('RecieverID').val();
        var currentrecievr = localStorage.getItem("RecieverID");
        
        
        if(currentrecievr == ""  || currentrecievr == null  || currentrecievr == "null" || currentrecievr == "NrKkwSgoGDQoKMxW0fJ9OcZlXvw2" )   {
        if(RecieverID == firebase.auth().currentUser.uid){
        //console.log("msg for this user")
        
        localStorage.setItem("RecieverID",SenderID);

        setTimeout(function(){changeheaders()},500)

        //console.log(localStorage.getItem("RecieverID"))
        }
        }
        })
            
        
        
            })

}