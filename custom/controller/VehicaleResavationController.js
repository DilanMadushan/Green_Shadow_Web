function genarateNextVehicleResavation(){
    $.ajax({
        method: "GET",
        url: baseUrl+`resavation/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("VR");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#vehicle_Resavation_id").val("VR00"+genNum);
                }else if(genNum.length == 2){
                    $("#vehicle_Resavation_id").val("VR0"+genNum);
                }
                 else{
                    $("#vehicle_Resavation_id").val("VR"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}
