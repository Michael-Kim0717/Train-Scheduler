$(document).ready(function(){

    /* Database object */
    var database = firebase.database();

    /* When the 'Add Train' button is pressed,
        Insert the fields into both Firebase and Table.
     */
    $("#add-train").on("click", function(){
        var newTrain = {
            name: $("#train-name").val(),
            dest: $("#train-dest").val(),
            time: $("#train-time").val(),
            freq: $("#train-freq").val()
        }
        database.ref("Trains").push(newTrain);
    });

    /* Grab all trains as well as update whenever a new train is added.
        Grab the time and the first train time and find the time until the next train.
     */
    database.ref("Trains").on("child_added", function(snapshot){
        var trainTime = moment(snapshot.val().time, "HH:mm");
        var timeDifference = moment().diff(moment(trainTime), "minutes");
        var timeUntilNextTrain = snapshot.val().freq - (timeDifference % snapshot.val().freq);
        console.log(timeUntilNextTrain);
        var timeOfNextTrain = moment().add(timeUntilNextTrain, 'minutes').format("HH:mm");
        
        $("#train-names").append("<tr> <td> " + snapshot.val().name + " </td> <td>" + snapshot.val().dest + "</td> <td>" + snapshot.val().freq + "</td> <td>" + timeOfNextTrain + "</td> <td>" + timeUntilNextTrain + " minutes </td> </tr>")
    });

});