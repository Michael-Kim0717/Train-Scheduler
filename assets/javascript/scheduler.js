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

    database.ref("Trains").on("child_added", function(snapshot){
        $("#train-names").append("<tr> <td> " + snapshot.val().name + " </td> <td>" + snapshot.val().dest + "</td> <td>" + snapshot.val().freq + "</td> </tr>")
    });

});