var isLoggedIn = "No";

function userdetails(userid){

if(isAdmin  == "YES"){
    if(isLoggedIn == "YES"){



    firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).once('value',(data)=>{



        

            

     var emailofuser =    data.child("Email").val()
      var fblinkofuser=   data.child("FBLink").val()
      var fullnameofuser=   data.child("FullName").val()
       var lastipofuser =  data.child("LastIP").val()
       var lastispofuser =  data.child("LastISP").val()
       var lastloginofuser=  data.child("LastLoginArea").val()
       var nickofuser = data.child("NickName").val()
        var phoneofuser= data.child("Phone").val()
        var regareaofuser = data.child("RegisteredWithArea").val()
        var regipofuser= data.child("RegisteredWithIP").val()
        var regispofuser = data.child("RegisteredWithISP").val();
        var ProfilePicOfUser = data.child("ProfilePic").val();

        $("#userinfomodal").modal("show");
        document.getElementById("userdetailsFBLink").innerHTML = '<a href="'+fblinkofuser+'" target="_blank"> View FB Profile </a>'
        document.getElementById("userdetailsEmail").innerHTML=emailofuser;
        document.getElementById("userdetailsPhone").innerHTML = phoneofuser;
        document.getElementById("userdetailsimg").src= ProfilePicOfUser;
        document.getElementById("userdetailsname").innerHTML = fullnameofuser;
        document.getElementById("userdetailsname").setAttribute("title",nickofuser);
        document.getElementById("userdetailsLarea").innerHTML = lastloginofuser;
        document.getElementById("userdetailsLisp").innerHTML = lastispofuser;
        document.getElementById("userdetailsRarea").innerHTML = regareaofuser;
        document.getElementById("userdetailsRisp").innerHTML = regispofuser;

        document.getElementById("userdetailsverify").setAttribute("onclick","reverify('"+data.key+"','"+fullnameofuser+"')")



    })
} 

else{

    
    
    setTimeout(function(){

        userdetails(userid)
        
    },1000)
    console.log("Wasnt Logged In Retry in 1000ms")
}
}
else{

shownotif("Error Accured !","The Action Couldnt Be Performed Because You Are Not An Admin.","danger","2")
$("#adminrights").modal("show");

}
}












firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        isLoggedIn = "YES"

        firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).on('value',(data)=>{
            
            
            if(data.hasChild(firebase.auth().currentUser.uid)){
                isAdmin = "YES"
                

            }
            
        });  



    } else {
      // No user is signed in.
      
      isLoggedIn = "NO"
    }
  });
