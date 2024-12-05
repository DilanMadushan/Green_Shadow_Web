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

function chageVehicleResavationState(state){

    if(state == "Save"){

        $('#save_Vehicle_resavation').show();

        $('#vehicle_Resavation_id').attr('disabled',true);
        $('#vehicle_Resavation_date').attr('disabled',false);
        $('#vehicle_Resavation_staff').attr('disabled',false);
        $('#vehicle_Resavation_vehicle').attr('disabled',false);
        $('#vehicle_Resavation_plaate_no').attr('disabled',false);
        $('#vehicle_Resavation_resone').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_Vehicle_resavation').hide();

        $('#vehicle_Resavation_id').attr('disabled',true);
        $('#vehicle_Resavation_date').attr('disabled',true);
        $('#vehicle_Resavation_staff').attr('disabled',true);
        $('#vehicle_Resavation_vehicle').attr('disabled',true);
        $('#vehicle_Resavation_plaate_no').attr('disabled',true);
        $('#vehicle_Resavation_resone').attr('disabled',true);

    }

}

function setVehicleResavationStaffId(){

    $('#vehicle_Resavation_staff').append(`<option value="">Staff</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(staff => {
                console.log(staff);
                

                $('#vehicle_Resavation_staff').append(`<option value="${staff.staff_id}">${staff.staff_id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}


function setVehicleResavationVehicleId(){

    $('#vehicle_Resavation_vehicle').append(`<option value="">Vehicle</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`vehicle`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle => {
                console.log(vehicle);
                

                $('#vehicle_Resavation_vehicle').append(`<option value="${vehicle.vehicle_code}">${vehicle.vehicle_code}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}


// ---------------------------------- View Vehicle Resavation ---------------------------------------------


$('#vehicle_Resavation_table').on('click' ,'#view_vehicle_resavation' ,function(){

    var vehicleResavationId = $(this).closest('tr').find('td').first().text();
    console.log(vehicleResavationId);
    
    
    $.ajax({
        method:"GET",
        url:baseUrl+`resavation?data=${vehicleResavationId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle =>{
                $('#vehicle_Resavation_id').val(vehicle.resavationId);
                $('#vehicle_Resavation_date').val(vehicle.date);
                $('#vehicle_Resavation_staff').val(vehicle.staff_id);
                $('#vehicle_Resavation_vehicle').val(vehicle.vehicle_code);
                $('#vehicle_Resavation_plaate_no').val(vehicle.license_plate_number);
                $('#vehicle_Resavation_resone').val(vehicle.resone);
            })
            
            navigateToPage('#vehicle_resevation_registration');
            activeNavBarButton('#vehicle_nav');
            chageVehicleResavationState("View");

        },
        error:function(field){
            console.log(field);
        }
    })

})

// ---------------------------------- Save Resavation ---------------------------------------------

$('#save_Vehicle_resavation').on('click' ,()=>{
    var vehicleData = {
        resavationId: $('#vehicle_Resavation_id').val(),
        date:  $('#vehicle_Resavation_date').val(),
        resone: $('#vehicle_Resavation_resone').val(),
        type: "PICKUP",
        staff_id:  $('#vehicle_Resavation_staff').val(),
        vehicle_code: $('#vehicle_Resavation_vehicle').val(),
        license_plate_number: $('#vehicle_Resavation_plaate_no').val()
    }

      console.log(vehicleData);

      if(!validateVehicleResavation(vehicleData)){
        return
      }
      

      $.ajax({
        method:"POST",
        url:baseUrl+`resavation`,
        processData: false,
        data:JSON.stringify(vehicleData),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            genarateNextVehicleResavation();
            loadVehicleResavationTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Resavation successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})

function validateVehicleResavation(vehicleData){

    const showError = (message) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    };


    var vehicleData = {
        resavationId: $('#vehicle_Resavation_id').val(),
        date:  $('#vehicle_Resavation_date').val(),
        resone: $('#vehicle_Resavation_resone').val(),
        type: "PICKUP",
        staff_id:  $('#vehicle_Resavation_staff').val(),
        vehicle_code: $('#vehicle_Resavation_vehicle').val(),
        license_plate_number: $('#vehicle_Resavation_plaate_no').val()
    }

    const requiredFields = [
        {field: vehicleData.resavationId, message: "Resavation Id is required"},
        {field: vehicleData.date, message: "Date is required"},
        {field: vehicleData.resone, message: "Resone is required"},
        {field: vehicleData.type, message: "Type is required"},
        {field: vehicleData.staff_id, message: "Satff is required"},
        {field: vehicleData.vehicle_code, message: "Vehicle is required"},
        {field: vehicleData.license_plate_number, message: "License Plate Number is required"},
        
        
    ];

    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;
}

$('#cancel_Vehicle_resavation').on('click' ,()=>{
    navigateToPage('#vehicle_resevation_section');
    activeNavBarButton('#vehicle_nav');
})