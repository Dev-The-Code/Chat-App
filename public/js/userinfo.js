var usercountry;
var usercity;
var userip;
var isp;
var useripstring;

var isAdmin = "NO"


function admin() {

  firebase.database().ref(`CHATROOM/ADMIN`).on('value', (data) => {


    if (data.hasChild(firebase.auth().currentUser.uid)) {
      isAdmin = "YES"

      //console.log("Admin Rights Enabled.")
    }
    else {

      isAdmin = "NO"
    }

  });
}

function keepcheckingadmin() {
  if (isAdmin !== "NO") {
    setInterval(function () { admin() }, 60000);
  } else { admin() }
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {


    var haschild;

    firebase.database().ref(`CHATROOM/ADMIN`).on('value', (data) => {



      if (data.hasChild(firebase.auth().currentUser.uid) === true && data.child("SEEN").hasChild(firebase.auth().currentUser.uid) === false) {

        $("#newadmin").modal({ backdrop: 'static', keyboard: false })

        shownotif("Congrats..!", "You Are Now An Admin, Wohooo!!!! Go My Hero Stop The Crimes On The Chat.. ", "success", "5")

      }
      else {
        $("#newadmin").modal('hide')
        // console.log("Seen")
      }




    });


    keepcheckingadmin();




  } else {
    // No user is signed in.


  }
});
//Additional Info


$.get("https://ipapi.co/json", function (response) {


  usercity = response.city;
  usercountry = response.country_name;
  userip = response.query;
  isp = response.org;
  useripstring = userip.replace(/\./g, 'x');
  console.log("func1- City" + response.city + ", " + ", cuntry: " + response.country + ", ip: " + response.query + ". ISP: " + response.isp);

}, "jsonp");



setTimeout(function () {
  if (usercountry === null || usercountry == "null" || usercountry === undefined || usercity === undefined || usercity === null) {
    // console.log("Veriable Undefined: Country="+usercountry+", City="+usercity)
    $.get("https://ipinfo.io", function (response) {

      usercity = response.city;
      usercountry = response.country;
      userip = response.ip;
      isp = response.org;
      useripstring = userip.replace(/\./g, 'x')
      // console.log(response)
    }, "jsonp");

  }



  else if (isp === undefined || isp === null || isp == "null") {
    $.get("https://ipinfo.io", function (response) {

      isp = response.org;

      //console.log(response)
    }, "jsonp");
  }



  else if (userip === undefined || userip === null || userip == "null") {
    $.get("https://ipinfo.io", function (response) {

      userip = response.ip;

      //console.log(response)
    }, "jsonp");
  }





}, 1000)



function getthekey() {


  if (usercountry === null || usercountry == "null" || usercountry === undefined || usercity === undefined || usercity === null) {
    // console.log("Veriable Undefined: Country="+usercountry+", City="+usercity)
    $.get("https://ipinfo.io", function (response) {

      usercity = response.city;
      usercountry = response.country;
      userip = response.ip;
      isp = response.org;
      useripstring = userip.replace(/\./g, 'x')
      //console.log(response)
    }, "jsonp");

  }



  else if (isp === undefined || isp === null || isp == "null") {
    $.get("https://ipinfo.io", function (response) {

      isp = response.org;

      // console.log(response)
    }, "jsonp");
  }



  else if (userip === undefined || userip === null || userip == "null") {
    $.get("https://ipinfo.io", function (response) {

      userip = response.ip;

      //console.log(response)
    }, "jsonp");
  }







}


// 