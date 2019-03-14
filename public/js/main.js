

function copylink(){
    var link = document.getElementById("invitefriendlink");
    var copybtn = document.getElementById("copylinkbtn");
    
    link.select();
  document.execCommand("copy");
  copybtn.innerHTML = "Link Copied..!"
  setTimeout(function(){
      copybtn.innerHTML = 'Copy Invitation Link  &nbsp; <i style="color:white; font-weight:999" class="fa fa-link"></i>';
      
  },3000)
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    var invitefriendslink = document.getElementById("invitefriendlink");
    
    invitefriendslink.value = "https://one2onechat.tk/#"+firebase.auth().currentUser.uid;
    

    
 if(window.location.hash){
    
    
    firebase.database().ref("CHATROOM/USERDETAILS/"+window.location.hash.replace(/\#/g,'')).on('value',function(data){
        
        if(data.hasChild("FirstName") && window.location.hash.replace(/\#/g,'') != user.uid ){
            
        
            console.log(window.location.href)
            shownotif("Info ","You Are Chatting With User: ''"+data.child("Name").val()+"'' Please Wait, Loading Messages..","info","5")
            localStorage.setItem("RecieverID",window.location.hash.slice(1))
            
            setTimeout(function(){ location.replace("https://one2onechat.tk") },1000)
        }
        
        else if(window.location.hash.replace(/\#/g,'') == user.uid){
            
            console.log("You Cannot Chat With Your Own Self..! Sorry..!")
        }
        else{console.log(window.location.hash.replace(/\#/g,'x')+" is not a valid UserID")}
        
    })
    
   
   
}
    // ...
  } else {
    // User is signed out.
    // ...
  }
});




if(localStorage.getItem("RecieverID") === null || localStorage.getItem("RecieverID") == "null"|| localStorage.getItem("RecieverID") == ""){
    localStorage.setItem("RecieverID","DQbiDKSONOOL8DfwHSvexevmKRk2")
}
var isOnline = "No"
var wasblocked = "NO";
var timeofmsg;
var name;var email;var profilepic;var userid
var e_address,pass,pass_cnfrm,namebox;
var insertedchat = document.getElementById("insert-chat");
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var textareabox = document.getElementById("message-to-send");

function scrollbottom(){
    var isScrolled = insertedchat.scrollTop == insertedchat.scrollHeight - insertedchat.offsetHeight;
       
    setTimeout(function(){insertedchat.scrollTop = insertedchat.scrollHeight;},100)
}





function deletemsg(id){


    firebase.database().ref(`CHATROOM/MESSAGES/${id}`).remove().then(function(){

        shownotif("Done!","Comment Was Deleted.!","success","1")
    })
}




function isblocked(){


    firebase.database().ref(`CHATROOM/BLOCKEDIPS`).on('value',(data)=>{
        
  
  
    
        if(data.hasChild(useripstring) || data.hasChild(firebase.auth().currentUser.uid) ){
            
    
            //agar blocked users ki list me iski ip hogi to if condition here...
            shownotif("Error!","You were blocked by administrator, If you are sure that it was an unfair ban please contact admin of this chatroom.","danger","10")
           
           if(wasblocked != "YES"){ document.getElementById("message-to-send").id="messsage-to-send";}
           
            $("#themainbody").fadeOut(300, function() {  });
            $("#blockeduser").modal({backdrop: 'static', keyboard: false})  
            wasblocked = "YES"
            
        }
        else{
           if( wasblocked === "YES") {
            document.getElementById("messsage-to-send").id="message-to-send";
            $("#themainbody").fadeIn();
            
            wasblocked = "NO"

            shownotif("Good News! ","Congratulations.! You Are Now Unblocked,  Please Reload Page For A Better Performance.","info","3")
            $("#blockeduser").modal('hide');
           }


           //console.log("User Isnt Blocked")
        
        }
    
    });
}



function changeheaders(){

    
firebase.database().ref(`CHATROOM/USERDETAILS/${localStorage.getItem("RecieverID")}`).on('value',function(data){

    

    if(data.child("ProfilePic").val() != null && data.child("Name").val() != null){
        document.getElementById("headavtr").src = data.child("ProfilePic").val();
        document.getElementById("nametitle").innerHTML = data.child("Name").val();

    }
       
       })
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {




firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).on('value',function(data){
    
    if(data.child("ProfilePic").val() != firebase.auth().currentUser.photoURL){
        firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).update({
            
            ProfilePic: firebase.auth().currentUser.photoURL
        })
        
    }
})








        changeheaders()



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



       













        setTimeout(function(){

            
            showdata()
        },250)
    
 if(userip !== undefined && userip !== null ){
    isblocked();
    ifonebanfoundaddothertoo();

 }


 else {setTimeout(function(){   isblocked(); ifonebanfoundaddothertoo()},1000)
}
//IDLE ENDS


//If user go offline remove the html from our page.



 //SET ONLINE USERS ENDS ABOVE



        //Setting up variables
         name = firebase.auth().currentUser.displayName;
         email = firebase.auth().currentUser.email;
         profilepic = firebase.auth().currentUser.photoURL;
         userid = firebase.auth().currentUser.uid;
        //Variables ends
        
      
checkforuserdetails()











        $("#modalLRForm").modal('hide');
        textareabox.addEventListener("keydown",function(event){
            
            
if (event.keyCode == 13 && !event.shiftKey) {// console.log('only enter pressed') 
   if(textareabox.value.length>1){
    moderatewords();
       pushdata()
} else{  event.preventDefault();
//Notification starts
shownotif("Warning!","Please write something before submitting. Dont Submit Blank Message.!","danger","1")
//Ends
}
   }
        });

        
    } else {
      // No user is signed in.
      
      document.getElementById("nametitle").innerHTML = "Login Required..!"
      modalLRForm()
    }
  });
  

//Modal1
function modalLRForm(){
    $(document).ready(function(){

        $("#modalLRForm").modal({backdrop: 'static', keyboard: false})  
        
        });
}






function getmoredetails(){
   var  LastName = document.getElementById("UserLastName")
    var FirstName = document.getElementById("UserFirstName")
    var fullname= FirstName.value +" "+LastName.value;


    if(FirstName.value.length <2){
shownotif("Warning!","Please Write Your First Name.","danger","2")
return false;
    }
    
   else if(FirstName.value.length >10){
        shownotif("Warning!","User First Name Must Not Exceed 10 Characters..!","danger","2")
        return false;
            }
else if(LastName.value.length <2){
shownotif("Warning!","Please Write Your Last Name.","danger","2")
return false;
    }
    
   else if(LastName.value.length >10){
        shownotif("Warning!","User Last Name Must Not Exceed 10 Characters..!","danger","2")
        return false;
            }
            
            

    else{
        firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).on('value',(data)=>{

        var moredetails = {Name:fullname,FirstName:FirstName.value,LastName: LastName.value,ProfilePic:firebase.auth().currentUser.photoURL,RegisteredWithArea: usercity+", "+usercountry ,LastLoginArea: usercity+", "+usercountry,RegisteredWithIP: userip,LastIP:userip,RegisteredWithISP: isp,LastISP: isp, Email:firebase.auth().currentUser.email}

        firebase.database().ref(`CHATROOM/USERDETAILS/${firebase.auth().currentUser.uid}`).set(moredetails).then(()=>{
            $("#modalmoreinfo").modal("hide");



            setTimeout(function(){location.reload()},500)
                           })//then ends here

        })


        firebase.auth().currentUser.updateProfile({
            displayName:  FirstName.value,
            photoURL: "/defaultuser.png"
          }).then(function() {
            // console.log(user.displayName)
      
      
        console.log("Name Updated..!")
          }).catch(function(error) {
            // An error happened.
            shownotif("Error",error,"danger","1")
          });
              

    }


}


document.getElementById("UserFirstName").addEventListener("keydown",getmoredetailskeydown)
document.getElementById("UserLastName").addEventListener("keydown",getmoredetailskeydown)
document.getElementById("senddetails-btn").addEventListener("click",getmoredetails)

function getmoredetailskeydown() {
    if (event.keyCode == 13) { 
        getmoredetails()
              }
           }


















//Check if user has submitted all the required information:-

function setIP(){
    firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).once('value',(data)=>{
    
    if(data.hasChild("LastIP") != true || data.child(useripstring).val() != useripstring){

    firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).update({LastIP:userip,LastISP:isp,LastLoginArea:usercity+", "+usercountry})

} 

    })

}

function checkforuserdetails(){
    setIP()
    



    firebase.database().ref(`CHATROOM/USERDETAILS/${userid}`).on('value',(data)=>{

        if(data.hasChild("FirstName") == false || data.hasChild("Name") == false || data.child("Name").val() === null ||data.child("Name").val() == "null"){
            $("#modalmoreinfo").modal({backdrop: 'static', keyboard: false})  

        }
else{

    $("#modalmoreinfo").modal('hide')  

    var maindiv = document.getElementById("themainbody")
    maindiv.style=""
    maindiv.className= "contaiiner clearfix animated fadeIn"
}
        


    
    })
}



  function reverify(id,name){

    
                

    var namess = firebase.database().ref(`CHATROOM/USERDETAILS/${id}/FullName`);



    var confirmbox = prompt("Please Write 123456 to Confirm That You Want User: '' "+name+" '' to Re-verify His/Her Account.")


    if(confirmbox !== undefined && confirmbox !== null && confirmbox === "123456"){
                 firebase.database().ref(`CHATROOM/USERDETAILS/${id}/FBLink`).remove().then(function(){

                    shownotif("Done! ","This user will be forced to Re Fill his information such as name,nick,fblink.","info","3")
                 })
                }
                else{shownotif("Denied!","You denied to complete confirmation, The user will not be asked to refill his info.","danger","3")}
                

}














function ignorethisuser(id){

    var ignoref=firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`);
    
    
  var askforconfirmation = prompt("After ignoring this user, you will not be able to see messages from him, however this user will be able to read your messages.\n\n if you are sure to ignore this user please write '' YES ''");

if(askforconfirmation !== null && askforconfirmation !="" && askforconfirmation !== undefined && askforconfirmation.toUpperCase() == "YES"){

    firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}/${id}`).set({ignore:"True"}).then(function(){
shownotif("Done!","This User Has Been Ignored, To Un-Ignore Users Please Visit Ignore List.","info","3")})
}
else{shownotif("Action Denied!","You cancelled to perform this action, User will not be added to ignore list.","warning","3")}
}


function changeReciever(ID){

    localStorage.setItem("RecieverID",ID)

    setTimeout(function(){location.reload()},500)
    

}



function showdata(){

    firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`).on('value',(ignoreduser)=>{
        
        
        
        
        ignoreduser.forEach(function(ignoredusers){

            $("div[ignoreid='"+ignoredusers.key+"']").fadeOut('slow', function() { $("div[ignoreid='"+ignoredusers.key+"']").remove(); })
        //console.log(ignoredusers.key)
        
        })        })
    

    firebase.database().ref(`CHATROOM/MESSAGES`).on('child_removed',(data)=>{


        $("div[comment='"+data.key+"']").fadeOut("slow", function() { $("div[comment='"+data.key+"']").remove(); })
        
    })



//contact list

firebase.database().ref(`CHATROOM/CONTACTLIST/${firebase.auth().currentUser.uid}`).on('child_added',(data)=>{

    var userpic = data.child("Pic").val();
    var activeusername = data.child("Name").val();
    var LastMsg = data.child("LastMsg").val();
    var idofactiveuser = data.child("ID").val();
    
    var quoatedpic = "'"+data.child('Pic').val()+"'"

    var onclickfunc  = "changeReciever('"+idofactiveuser+"')"

    document.getElementById("contact-list").innerHTML += '<li  class="clearfix"> <img class="avatarimg" onclick="BigPicture({ el: this, imgSrc: '+quoatedpic+' })"  src="'+userpic+'" alt="avatar" /> <div style="clear:both" class="about"> <div onclick="'+onclickfunc+'"  title="'+data.child("Name").val()+'" style="cursor:pointer" class="name cursorpointer">'+activeusername+'</div><div style="font-family:Amaranth;" id="'+idofactiveuser+'" title="Time Of Last Message Recieved." class="status lastmsg">Last Msg: '+LastMsg+' </div> </div> </li>'
})



    //ONLINE USERS
 

      var onlineusersref = firebase.database().ref(`CHATROOM/ONLINEUSERS`);

      onlineusersref.on('child_added',(data)=>{
var onlineusers = document.getElementById("insert-users");





    var userpic = data.child("Photo").val();
    var activeusername = data.child("Name").val();
    var userstatus = data.child("status").val();
    var idofactiveuser = data.child("UserID").val();
    var ParentDiv = data.child("ParentID").val();
    var quoatedpic = "'"+data.child('Photo').val()+"'"

    var onclickfunc  = "changeReciever('"+data.child("ParentID").val().slice(0,-12)+"')"

    

    if(data.child("ParentID").val().slice(0,-12) == firebase.auth().currentUser.uid ){
        onclickfunc = "None"
        
        activeusername = "YOU" }

    onlineusers.innerHTML += '<li  id="'+ParentDiv+'" class="clearfix"> <img class="avatarimg" onclick="BigPicture({ el: this, imgSrc: '+quoatedpic+' })"  src="'+userpic+'" alt="avatar" /> <div class="about"> <div onclick="'+onclickfunc+'" title="'+data.child("Name").val()+'" style="cursor:pointer" class="name">'+activeusername+'</div> <div style="font-family:Amaranth;" id="'+idofactiveuser+'" title="User Is Currently Viewing Messages." class="status">  <center><img src="loadingicon.gif" style="width:30px; height:30px; border-radius:50%; position:absolute;"></center></div> </div> </li>'
   


    })

    //UPDATING USER STATUS

    firebase.database().ref(`CHATROOM/ONLINEUSERS`).on('value',(childss)=>{
        var onlineusers = document.getElementById("insert-users");
 childss.forEach(function(data){


    var userpic = data.child("Photo").val();
    var activeusername = data.child("Name").val();
    var userstatus = data.child("status").val();
    var idofactiveuser = data.child("UserID").val();
    
    var newclassname;


var divwithuserid = document.getElementById(idofactiveuser);


setTimeout(function(){

    if(divwithuserid !== undefined && divwithuserid !== null ){
    if(userstatus == "Active"){
        divwithuserid.innerHTML = '<i style="animation: ripple 1s  ease-in-out; border-radius:50%" class="fa fa-eye animated bounceIn online "></i><text class="animated fadeIn"> Active</text>'

        divwithuserid.setAttribute("title","User Is Viewing Messages.");
    }
    else if(userstatus == "Not Viewing"){
        divwithuserid.innerHTML = '<i class="fa fa-eye-slash animated bounceIn offline "></i><text class="animated fadeIn"> Not Viewing</text>'
        divwithuserid.setAttribute("title","The Browser Is Minimized, Or User May Be Using Other Tabs So Thats Why User Is Not Viewing The Messages.");
    }
    else if(userstatus == "Away"){
        divwithuserid.innerHTML = '<i class="fa fa-clock-o animated bounceIn offline "></i> <text class="animated fadeIn">Away</text>'
        divwithuserid.setAttribute("title","There is no activity by user from last 1 minute, Looks like this user is away from computer.");
    }

    else{
       // console.log("STATUS OF USER:"+userstatus)
        return shownotif("Error!"," None of the user status matched with the conditions, Please Contact Admin","danger","2") }
    }//Undefined if div ends here   
    
    else{shownotif("Error!","Couldnt Find The Div Of Online User,If Reloading the page does not help then Please Contact Admin","danger","2")}
},500)
 })

    })

    onlineusersref.on('child_removed', function(data) {
        setTimeout(function(){
// console.log("RemovedChild: "+ data.key)


var deleteddiv = document.getElementById(data.key+"ParentStatus");


$("#"+data.key+"ParentStatus").fadeOut(300, function() { $("#"+data.key+"ParentStatus").remove(); })
},200)

 


      });

    //ONLINE USERS ENDS ABOVE

   
    var datenow = new Date().toLocaleDateString("en-DE",{ day: 'numeric', month: 'long', year: 'numeric' });
    


if(firebase.auth().currentUser != null){









	firebase.database().ref(`CHATROOM/MESSAGES/`).on('child_added',(data)=>{
        admin()
        //console.log(data)


data.forEach(function(child){

//console.log(child.child("Name").val())
})
       
document.getElementById("insert-chat")
       
       var isScrolled = insertedchat.scrollTop == insertedchat.scrollHeight - insertedchat.offsetHeight;
       
       setTimeout(function(){insertedchat.scrollTop = insertedchat.scrollHeight;},100)


    
        //CHECK IF MESSAGE IS FROM CURRENT USER
var msgtime =  data.child("Time").val();
var msgdate = data.child("Date").val();
var messageofuser = data.child("Message").val();
var nameofuser = data.child('Name').val();
var imageofuser = data.child('UserImage').val();
var RecieverID = data.child('RecieverID').val();
var currentUserID = firebase.auth().currentUser.uid
var userdetailsfunction = "userdetails('"+data.child("UserId").val()+"')"
 var blockuserip = "blockuserip('"+data.child("Ip").val()+"','"+data.child("UserId").val()+"')"
 var keyofthiscomment = data.key;
var isthisadminmessage = "NO"
 var quoatedsnapkey = "'"+data.key+"'";
 var styletag =""; 
 var styleforpic = "";
var quoatedimage = "'"+data.child('UserImage').val()+"'"
 var stylenone;
 var adminclass =  "dropdown dropdowndiv right";
 
var thenick = nameofuser;
var quoateduserid = "'"+data.child("UserId").val()+"'";
//if(msgtime == currentTimeStringforCheckout){

 //   msgtime = "Just Now"
//}


        







//alert(styletag)

        if(data.child("UserId").val() == firebase.auth().currentUser.uid ){
        
        //console.log("this is mesg from current user")
        nameofuser = "YOU "
        //POSTING MSG STARTS HERE

        
if(RecieverID == localStorage.getItem("RecieverID") ){
        if(msgdate == datenow){

 //if message was sent today := 
        
 insertedchat.innerHTML += '<div  comment="'+keyofthiscomment+'" id="parentofmsg"> <li class="clearfix"> <div class="message-data align-right"> <span  data-toggle="tooltip" data-placement="top" title="'+msgtime+", "+msgdate+'" class="message-data-time"> Today at '+msgtime+'</span> &nbsp; &nbsp; <span title="'+thenick+'" class="message-data-name">'+nameofuser+'</span> <i class="fa fa-circle me"> <img width="50px" style="'+styleforpic+'"  onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })" class="avatarr" src="'+imageofuser+'"> </i> </div> <div class="message other-message float-right animated " style="text-shadow: 0px 0px 3px black;" > '+messageofuser+' </div> </li>  <br> <div class="dropdown dropdowndiv left adminrights"> <a class="aofdropdown lefta" href="javascript:void(0)" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div class="dropdown-menu menuofdropdown leftmenu">  <li><a class="adminrights" onclick="deletemsg('+quoatedsnapkey+')" href="javascript:void(0)"> Delete MSG </a></li> <li><a class="adminrights" onclick="'+userdetailsfunction+'" href="javascript:void(0)">User Details</a></li> </div> </div> </li></div>';
            
        }
        else{
        //If message was sent before today.
        insertedchat.innerHTML += '<div comment="'+keyofthiscomment+'" id="parentofmsg">  <li class="clearfix"> <div class="message-data align-right"> <span datetime="'+msgdate+'" data-toggle="tooltip" data-placement="top" title="'+msgtime+", "+msgdate+'" class=" message-data-time">     '+msgdate+', '+msgtime+'   </span> &nbsp; &nbsp; <span title="'+thenick+'" class="message-data-name">'+nameofuser+'</span> <i class="fa fa-circle me"> <img  onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })"  width="50px" class="avatarr" src="'+imageofuser+'"> </i> </div> <div class="message other-message float-right animated "  style="text-shadow: 0px 0px 3px black;" > '+messageofuser+' </div> </li>  <br> <div class="dropdown dropdowndiv left adminrights"> <a class="aofdropdown lefta" href="javascript:void(0)" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div class="dropdown-menu menuofdropdown leftmenu"> <li><a href="#">Ignore User</a> <li><a onclick="'+blockuserip+'" href="javascript:void(0)" class="adminrights">Block User</a></li> <li><a  class="adminrights" href="javascript:void(0)" onclick="deletemsg('+quoatedsnapkey+')">Delete MSG</a></li> <li><a  class="adminrights" onclick="'+userdetailsfunction+'" href="javascript:void(0)">User Details</a></li> </div> </div> </li></div>';

        }
        //POSTING ENDS ABOVE

        }}


        else{
           // console.log("this is mesg from another user")


           
        //POSTING MSG STARTS HERE
        if(RecieverID == currentUserID && data.child("UserId").val() == localStorage.getItem("RecieverID")){
        if(msgdate == datenow){

 //if message was sent today := 
 insertedchat.innerHTML += '<div ignoreid="'+data.child("UserId").val()+'" comment="'+keyofthiscomment+'" id="parentofmsg"><div > <li> <div class="message-data animated fadeIn"> <img class="avatarr" style="'+styleforpic+'" onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })"  src="'+imageofuser+'"> <span class="message-data-name"><i class="fa fa-circle online"></i> '+nameofuser+'</span> <span  data-toggle="tooltip" title="'+msgtime+', '+msgdate+'" class="message-data-time">Today at '+msgtime+'</span> </div> <div class="message my-message animated "   style="'+styletag+'" > '+messageofuser+' </div> </li> <!--Menu--> <div style="'+stylenone+'" class="'+adminclass+'"> <a class="aofdropdown righta" onclick="" href="#" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div style="" class="dropdown-menu menuofdropdown rightmenu"> <li><a onclick="ignorethisuser('+quoateduserid+')"  href="javascript:void(0)">Ignore User</a></li> <li><a class="adminrights"  onclick="'+blockuserip+'" href="javascript:void(0)">Block User</a></li> <li><a class="adminrights" onclick="deletemsg('+quoatedsnapkey+')" href="javascript:void(0)">Delete MSG</a></li> <li><a  onclick="'+userdetailsfunction+'" class="adminrights" href="javascript:void(0)">User Details</a></li> </div> </div> </div></div>';
            
        }
        else{
        //If message was sent before today.
        insertedchat.innerHTML += '<div comment="'+keyofthiscomment+'" ignoreid="'+data.child("UserId").val()+'"   id="parentofmsg"><div > <li> <div class="message-data animated fadeIn"> <img class="avatarr" style="'+styleforpic+'" onclick="BigPicture({ el: this, imgSrc: '+quoatedimage+' })"  src="'+imageofuser+'"> <span class="message-data-name"><i class="fa fa-circle online"></i> '+nameofuser+'</span> <span data-toggle="tooltip" title="'+msgtime+', '+msgdate+'"  class="message-data-time ">'+msgdate+', '+msgtime+' </span> </div> <div class="message my-message animated " style="'+styletag+'" > '+messageofuser+' </div> </li> <!--Menu--> <div  class="'+adminclass+'"> <a class="aofdropdown righta" onclick="" href="#" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i> <i class="icon-arrow"></i></a> <div style="" class="dropdown-menu menuofdropdown rightmenu">  <li><a onclick="ignorethisuser('+quoateduserid+')"  href="javascript:void(0)">Ignore User</a> <li><a onclick="'+blockuserip+'" href="javascript:void(0)" class="adminrights">Block User</a></li> <li onclick="deletemsg('+quoatedsnapkey+')" class="adminrights"><a href="javascript:void(0)" >Delete MSG</a></li> <li><a class="adminrights"  onclick="'+userdetailsfunction+'" href="javascript:void(0)">User Details</a></li> </div> </div> </div></div>';

        }
    
    }
    else{ /*do nothing*/}
        //POSTING ENDS ABOVE






        }

        //CHECKING CURRENT USER MSG ENDS ABOVE



        firebase.database().ref(`CHATROOM/IGNORED/${firebase.auth().currentUser.uid}`).once('value',(ignoreduser)=>{
        
        
        
        
            ignoreduser.forEach(function(ignoredusers){
    
                $("div[ignoreid='"+ignoredusers.key+"']").fadeOut(10, function() { $("div[ignoreid='"+ignoredusers.key+"']").remove(); })
            // console.log(ignoredusers.key)
            
            })

            
            })


            admin()
     setTimeout(function(){if(isAdmin !== "YES"){ $(".adminrights").remove()}    },300) 
 

     setTimeout(function(){scrollbottom()},1200)
   
})


}

else{
// console.log("showing data after 500ms")
    setTimeout(function(){showdata()},500)
}

}






//Online Offline Status
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    //Online

isOnline = "YES"

getthekey()
   



setTimeout(function(){
document.getElementById("loading").className = "loading animated fadeOut";
},500) 
} else {
//Offline

    document.getElementById("loading").className = "loading animated fadeIn";
    

isOnline = "No"
setTimeout(function(){
if(isOnline == "No"){
  shownotif("Slow Connection!","It looks like you are using slow internet connection, or maybe there is no internet connection, We Couldnt Connect To Server, We are still trying, You dont need to reload once internet is available, we will automatically connect to server .","warning","10")
}
},9999)

document.getElementById("loading").className = "loading animated fadeIn";
}
});























//Login SignUp
function signup(){

    
    
    e_address = document.getElementById("modalLRInput12").value;
    
    namebox = document.getElementById("name").value;
    
    pass=document.getElementById("modalLRInput13").value;
    pass_cnfrm=document.getElementById("modalLRInput14").value;
    
    
    if(namebox.length > 12){
        
        shownotif("Warning!","Name Should Be Shorter Than 11 Characters","danger","1");
        return false;
    }
    else if(namebox.length < 3){
        
        shownotif("Warning!","Name Should Be Atleast 3 Characters Long","danger","1"); 
         return false;
    }
    else if(/^[a-zA-Z ]+$/.test(namebox) !== true){
        
        shownotif("Warning!","Invalid Name, Only Alphabets Allowed (A-z)","danger","1"); 
         return false;
    }
    else if(e_address.length<6){
        shownotif("Warning!","Please Write Valid Email Address.","danger","1"); 
         return false;
    }
    else if(pass<6 ){
        shownotif("Warning!","Password Needs To Be 6 Characters Long..","danger","1"); 
    }
    
    else if(pass==pass_cnfrm ){
    if(re.test(e_address)){
    shownotif("Loading","Please Wait While We Are Signing You Up On Our Website..!","info","1");
    }
     var username = localStorage.setItem('Name', namebox);
    
    //FireBase SignUp
    var signup= firebase.auth().createUserWithEmailAndPassword(e_address, pass);
    signup.catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      
      shownotif("Error",errorMessage+", "+errorCode,"danger","3")
      // ...
    });
    
    signup.then(function() {
      // Handle Errors here.
      shownotif("Success!","You are now our registered user, you are now logged in.","success","2")
      
    // console.log('%c'+firebase.auth().currentUser, 'font-weight: bold; font-size: 20px;color: red; text-shadow: 0px 0px 10px black; border: 2px Solid black; padding:6px; border-radius:10px; display:block;');
    
    
    
    
    updatename()  
      // ...
    });
    
   
    function updatename(){
    
    
        var user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName:  localStorage.getItem("Name"),
      photoURL: "/defaultuser.png"
    }).then(function() {
      // console.log(user.displayName)


      
    }).catch(function(error) {
      // An error happened.
      shownotif("Error",error,"danger","1")
    });
        
        
        
    }
    
    
    //firebase signup above
    
    
    
    
    }
    else{
       shownotif("Error","Password didn't matched, try again","danger","1")
    
    }
    }


    function signupkeydown() {
        if (event.keyCode == 13) { // console.log('only enter pressed') 
           signup()
                  }
               }
    document.getElementById("signup-btn").addEventListener("click", signup);


    document.getElementById("modalLRInput12").addEventListener("keydown", signupkeydown);
    
    document.getElementById("name").addEventListener("keydown", signupkeydown);
    
    document.getElementById("modalLRInput13").addEventListener("keydown", signupkeydown);
    document.getElementById("modalLRInput14").addEventListener("keydown", signupkeydown);
     
   
   
 

        //Login below:- 
        
function login(){
	

	
    var email = document.getElementById('modalLRInput10').value;
	var pass = document.getElementById('modalLRInput11').value;
	
	 var n = localStorage.getItem("email_address");
   	var p =localStorage.getItem("password");
	
		if(re.test(email) === true && pass.length > 5){
		    
		    shownotif("Loading!","Please Wait While We Are Logging You In..!","info","1")
		
		var signin =firebase.auth().signInWithEmailAndPassword(email, pass);
		signin.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  shownotif("Error: ",errorMessage+", "+errorCode,"danger","2")
  // ...
});
signin.then(function(user) {
  // Handle Errors here.

  
  shownotif("Welcome! "+user.displayName,"Successfully Logged in as "+user.email,"success","5")
  
  // ...
});

	}
	
	else{
	    
	    if (email == "" || email == null || email == " "){
	        shownotif("Oops..!"," Email Is Missing, Please write email to login.","danger","1")
	    }
	    
	     else if (pass == "" || pass == null || pass == " "){
	        shownotif("Oops..! ","Password Box Is Empty, Please write Password to login.","danger","1")
        }
        else if(re.test(email)=== false){
            shownotif("Error","Invalid Email","danger","1")
        }
        else if(pass.length < 6){
            shownotif("Error","Password incorrect. ","danger","1")
        }
     
	    else{
 shownotif("Alert!"," Email or Password is invalid, Please write a valid email & password","danger","1")}
	}
    
    
}//login function ends here	
	
//Adding key down to login

function loginkeydown() {
    if (event.keyCode == 13) { // console.log('only enter pressed') 
       login()
              }
           }
document.getElementById("modalLRInput10").addEventListener("keydown", loginkeydown);
    document.getElementById("modalLRInput11").addEventListener("keydown", loginkeydown);
    document.getElementById("btn-login").addEventListener("click", login);

    
        $('[data-toggle="tooltip"]').tooltip(); 
  



        var map = {
            "<": "\u2764\uFE0F",
            "#brokenheart": "\uD83D\uDC94",
            ":D": "\uD83D\uDE00",
            ":)": "\uD83D\uDE0A",
            ";)": "\uD83D\uDE09",
            ":(": "\uD83D\uDE12",
            ":p": "\uD83D\uDE1B",
            ";p": "\uD83D\uDE1C",
            ":'(": "\uD83D\uDE22",
            ":*": "\uD83D\uDE18",
            ":/": "\uD83D\uDE15",
            "8-)": "\uD83D\uDE0e",
            "8)": "\uD83D\uDE0e",
            "B)": "\uD83D\uDE0e",
            "-_-": "\uD83D\uDE11",
            ":'(": "\uD83D\uDE22",
            ";P": "\uD83D\uDE1c",
            "*_*": "\uD83D\uDE44",
            ":O": "\uD83D\uDE32",
            "o_o": "\uD83D\uDE33",
            
            
         "FUCK": "****",
         "BITCH": "****",
         "MOTHERFUCKER": "****",
         "asshole": "****",
          ".!.": "!!",
         "FK": "****",
         "cock": "****",
         "pussy": "****",
         "LPC":"***",
        "BC":"**",
         "STFU": "****",
         "FUCK": "****",
         "#PHONE":"U+1F4DE",
         "</": ",",
         ">": ".",
         "#BR":"<br>",
         "😕/":"://"
         
         
         
         
         
         };
         
         
          function escapeSpecialChars(regex) {
            return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
          }
          
          
         
          function  moderatewords() {
              
            for (var i in map) {
              var regex = new RegExp(escapeSpecialChars(i), 'gim');
              textareabox.value = textareabox.value.replace(regex, map[i]);
            }
            
              
          };
         


firebase.messaging().onMessage(function(payload) {
 
//console.log(payload)
if(payload.data["gcm.notification.senderID"] != localStorage.getItem("RecieverID")){

   var notifsound = new Audio('/notification.m4a');
notifsound.play()

  pushnotif(payload.notification.title.substring(12),payload.notification.body,"info","7","https://one2onechat.tk/#"+payload.data["gcm.notification.senderID"],payload.notification.icon)
  
  //function pushnotif(title,msg,type,time,url,imglink)
}
  
  
  //console.log(payload.data["gcm.notification.senderID"])
 
  // ...
});
