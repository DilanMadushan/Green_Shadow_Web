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


function loadVehicleResavationTable(){

    $('#vehicle_Resavation_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`resavation?=&type=PICKUP`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle => {

                $('#vehicle_Resavation_table tbody').append(`<tr>
                                        
                                        <td>${vehicle.resavationId}</td>
                                        <td>${vehicle.date}</td>
                                        <td>${vehicle.staff_id}</td>
                                        <td>${vehicle.vehicle_code}</td>
                                        <td>${vehicle.license_plate_number}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_vehicle_resavation">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

            setVehicleResavationCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })


    function setVehicleResavationCount(){
        var count = $("#vehicle_Resavation_table tbody tr").length;
        console.log(count);
    
        if(count<10){
            $('#vehicle_resavation_count').text("0"+count)
        }else{
            $('#vehicle_resavation_count').text(count)
        }
    }
}