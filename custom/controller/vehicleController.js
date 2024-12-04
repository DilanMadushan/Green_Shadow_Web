function genarateNextVehicleId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`vehicle/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("V");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#vehicle_id").val("V00"+genNum);
                }else if(genNum.length == 2){
                    $("#vehicle_id").val("V0"+genNum);
                }
                 else{
                    $("#vehicle_id").val("V"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}

