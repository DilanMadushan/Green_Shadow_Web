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

function loadVehicleTable(){

    $('#vehicle_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`vehicle`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle => {

                $('#vehicle_table tbody').append(`<tr>
                                        <td>${vehicle.vehicle_code}</td>
                                        <td>${vehicle.license_plate_number}</td>
                                        <td>${vehicle.vehicle_category}</td>
                                        <td>${vehicle.fuel_type}</td>
                                        <td>${vehicle.status}</td>
                                        <td>${vehicle.remarks}</td>
                                        
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_vehicle">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update" id="vehicle_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="vehicle_delete">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

            setVehicleCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })


    function setVehicleCount(){
        var count = $("#vehicle_table tbody tr").length;
        console.log(count);
    
        if(count<10){
            $('#vehicle_count').text("0"+count)
        }else{
            $('#vehicle_count').text(count)
        }
    }
}