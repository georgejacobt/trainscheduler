
let row = 0;

// let currentTime = moment().format("HHmm");
// console.log(currentTime);



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYRFPIf8n1FSldXjkNHSyn6acyUXcrZYc",
    authDomain: "trainapp-99104.firebaseapp.com",
    databaseURL: "https://trainapp-99104.firebaseio.com",
    projectId: "trainapp-99104",
    storageBucket: "trainapp-99104.appspot.com",
    messagingSenderId: "816275816192"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  let dbName = "";
  let dbDestination = "";
  let dbFrequency = "";


database.ref().once("value", function(snapshot) {

    for (var key in snapshot.val()) {

        let tr = $("<tr>");
        let th = $("<th>");
        let td1 = $("<td>");
        let td2 = $("<td>");
        let td3 = $("<td>");
        let td4 = $("<td>");
        let td5 = $("<td>");

         //console.log(key);

        console.log(snapshot.child(key).val().trainName);
        dbName = snapshot.child(key).val().trainName;
        console.log(snapshot.child(key).val().destination);
        dbDestination = snapshot.child(key).val().destination;
        console.log(snapshot.child(key).val().frequency);
        dbFrequency = snapshot.child(key).val().frequency;


        
$("tbody").append(tr);
th.attr("scope","row");
row++ ;
th.text(row);
tr.append(th);

td1.text(dbName);
tr.append(td1);

td2.text(dbDestination);
tr.append(td2);

td3.text(dbFrequency);
tr.append(td3);

td4.text("tobecalc");
tr.append(td4);

td5.text("tobecalc");
tr.append(td5);
        


    }
});





$("#submitTrain").on("click", function(event) {

    let tr = $("<tr>");
    let th = $("<th>");
    let td1 = $("<td>");
    let td2 = $("<td>");
    let td3 = $("<td>");
    let td4 = $("<td>");
    let td5 = $("<td>");

let trainName = $("#trainName").val();
let destination = $("#dest").val();
let firsTrain = $("#firstTime").val();
let freq = parseInt($("#freq").val());
console.log(firsTrain);
let firsTrainConv = moment(firsTrain, "HHmm");
let nextArrival = moment(firsTrainConv).add(freq,"m").format("HH:mm");
let nextArrivalObj = moment(firsTrainConv).add(freq,"m");

let minsAway = moment(nextArrivalObj).fromNow();

console.log(minsAway);




database.ref().push({

    trainName: trainName,
    destination: destination,
    frequency: freq

});

database.ref().on("child_added", function(snapshot){

    dbName = snapshot.val().trainName;
    dbDestination = snapshot.val().destination;
    dbFrequency = snapshot.val().frequency;
    
  
  });

$("tbody").append(tr);
th.attr("scope","row");
row++ ;
th.text(row);
tr.append(th);

td1.text(dbName);
tr.append(td1);

td2.text(dbDestination);
tr.append(td2);

td3.text(dbFrequency);
tr.append(td3);

td4.text("tobecalc");
tr.append(td4);

td5.text("tobecalc");
tr.append(td5);



});