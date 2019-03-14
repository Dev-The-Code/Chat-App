var nickname;




var date = new Date();
 

var fulldate = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });


var textarea = document.getElementById("message-to-send")
//Setting up variables
  // console.log(firebase.auth().currentUser)

  function userinfo(){

    if(firebase.auth().currentUser === null){
        // console.log("checking current user in 500ms ")
        setTimeout(function(){userinfo()},500)
    }
    
else{
  name = firebase.auth().currentUser.displayName;
  email = firebase.auth().currentUser.email;
  profilepic = firebase.auth().currentUser.photoURL;
  userid = firebase.auth().currentUser.uid;
  // console.log(firebase.auth().currentUser)
}
  }
  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

     
        //Setting up variables
         name = firebase.auth().currentUser.displayName;
         email = firebase.auth().currentUser.email;
         profilepic = firebase.auth().currentUser.photoURL;
         userid = firebase.auth().currentUser.uid;
        //Variables ends
        userinfo()

  

        
    } else {
      // No user is signed in.
      
     
    }
  });
 //Variables ends

 
 
 function onclickpushdata(){
    if(textareabox.value.length>1){ pushdata()}
 else{shownotif("Warning!","Please write something before submitting. Dont Submit Blank Message.!","danger","1")}
 }

 document.getElementById("sendbtnimage").addEventListener("click", function(){moderatewords(); onclickpushdata()});
function pushdata(){
if(name === null || name === undefined){

    shownotif("Error!","Name Is Not Set, Cannot Send Message.","danger","4")
}



else if( email === null || email === undefined){
    shownotif("Error!","User Email Is Missing, Cannot Send Message.","danger","4")
}



else if(profilepic === null || profilepic === undefined) {

shownotif("Error!","Profile Picture Is Missing, Cannot Send Message.If Reloading does not help then upload your profile picture by clicking the setting gear at top right corner.","danger","6")

setTimeout(function(){location.reload()},1000)
}



else{

    if(isOnline == "No") {

        shownotif("Oops!","There is no connection between server and you, The message will not be delivered.","warning","2")
        event.preventDefault();
        return false;
    }

    

else{



    firebase.database().ref(`CHATROOM/ONLINEUSERS`).once('value',(childss)=>{

if(childss.child("status") != "Active"){
    

    firebase.database().ref(`CHATROOM/ONLINEUSERS/${firebase.auth().currentUser.uid}`).set({ParentID:firebase.auth().currentUser.uid+"ParentStatus",UserID:firebase.auth().currentUser.uid+"Status",Name:firebase.auth().currentUser.displayName,Photo:firebase.auth().currentUser.photoURL,status:"Active"});
}

    })


    var currentUserID = firebase.auth().currentUser.uid;


    firebase.database().ref(`CHATROOM/CONTACTLIST/${localStorage.getItem("RecieverID")}`).once('value',(contacts)=>{

if(contacts.hasChild(currentUserID) === false){
    firebase.database().ref(`CHATROOM/CONTACTLIST/${localStorage.getItem("RecieverID")}/${currentUserID}`).set({

        Name: firebase.auth().currentUser.displayName,
        Pic: firebase.auth().currentUser.photoURL,
        ID: currentUserID,
        LastMsg: fulldate+", "+currentTimeStringforCheckout

    })
}

else{
    firebase.database().ref(`CHATROOM/CONTACTLIST/${localStorage.getItem("RecieverID")}/${currentUserID}`).update({

        LastMsg:  currentTimeStringforCheckout+", "+fulldate,
        Pic: firebase.auth().currentUser.photoURL

    })

}


    })







    firebase.database().ref("fcmTokens").once("value", function(snapshot) {
       // console.log(snapshot);
        snapshot.forEach(function(token) {
     if(token.val() == localStorage.getItem("RecieverID")){
     
      
        // console.log(token.key)   


         $.ajax({        
            type : 'POST',
            url : "https://fcm.googleapis.com/fcm/send",
            headers : {
                Authorization : 'key=' + 'AIzaSyAAi8WTXEyRWBBKiEhj1CUJ8_sbKoQrb3k'
            },
            contentType : 'application/json',
            dataType: 'json',
            data: JSON.stringify({"to": token.key, "notification": {
                "title":`New Msg From ${firebase.auth().currentUser.displayName}`,
                "body":`${textarea.value}`,
                "icon": `${firebase.auth().currentUser.photoURL}` ,
      "click_action": `https://one2onechat.tk${'#'+firebase.auth().currentUser.uid}`,
      "senderID":firebase.auth().currentUser.uid
            
            
            
            }
            
            
            }),
            success : function(response) {
                //console.log(response);
            },
            error : function(xhr, status, error) {
                console.log(xhr.error);                   
            }
        });
     }
        });
    });
    



var msgwithlinks = textarea.value.replace(/(https?:\/\/[^\s]+)/g, "<a class='sentlinks' target='_blank' href='$1'>$1</a>");



firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`).once('value',function(data){
    
    
    if(data.hasChild(localStorage.getItem("RecieverID"))){
        
        shownotif("Warning! ","You have ignored this user, it means you cannot send or recieve messages from this user, you can go to your ignore list to un-ignore this user","warning","3");
    }
    else{
        
        firebase.database().ref(`CHATROOM/IGNORED/${localStorage.getItem("RecieverID")}`).once('value',function(reciever){
            
            if(reciever.hasChild(firebase.auth().currentUser.uid)){
                
                  shownotif("Warning! ","This user has ignored your messages, you cannot send a message to this user untill the user un-ignore you.","warning","3");
            }
            
            else{
                   firebase.database().ref(`CHATROOM/MESSAGES/`).push({RecieverID: localStorage.getItem("RecieverID"),Name: name,EMAIL: email,UserImage:profilepic , UserId: userid,Ip: userip,Message:msgwithlinks,Date:fulldate,Time:currentTimeStringforCheckout}).then((result) => {
        var textarea = document.getElementById("message-to-send");
        textarea.value = "";
        textarea.innerHTML = "";
    
      })
                
            }
            
        })
        
        
    }
})

 
    
    
  
    event.preventDefault();}
}

   
}