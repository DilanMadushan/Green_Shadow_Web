function genarateNextVehicleReturn(){
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
                    $("#vehicle_return_id").val("VR00"+genNum);
                }else if(genNum.length == 2){
                    $("#vehicle_return_id").val("VR0"+genNum);
                }
                 else{
                    $("#vehicle_return_id").val("VR"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}


function loadVehicleReturnTable(){

    $('#vehicle_return_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`resavation?=&type=RETURN`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle => {

                $('#vehicle_return_table tbody').append(`<tr>
                                        
                                        <td>${vehicle.resavationId}</td>
                                        <td>${vehicle.date}</td>
                                        <td>${vehicle.staff_id}</td>
                                        <td>${vehicle.vehicle_code}</td>
                                        <td>${vehicle.license_plate_number}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_vehicle_return">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

            setVehicleReturnCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })


    function setVehicleReturnCount(){
        var count = $("#vehicle_return_table tbody tr").length;
        console.log(count);
    
        if(count<10){
            $('#vehicle_return_count').text("0"+count)
        }else{
            $('#vehicle_return_count').text(count)
        }
    }
}


function chageVehicleReturnState(state){

    if(state == "Save"){

        $('#save_vehicle_return').show();

        $('#vehicle_return_id').attr('disabled',true);
        $('#vehicle_return_date').attr('disabled',false);
        $('#vehicle_return_staff').attr('disabled',false);
        $('#vehicle_return_vehicle').attr('disabled',false);
        $('#vehicle_return_plane_no').attr('disabled',false);
        $('#vehicle_return_resone').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_vehicle_return').hide();

        $('#vehicle_return_id').attr('disabled',true);
        $('#vehicle_return_date').attr('disabled',true);
        $('#vehicle_return_staff').attr('disabled',true);
        $('#vehicle_return_vehicle').attr('disabled',true);
        $('#vehicle_return_plane_no').attr('disabled',true);
        $('#vehicle_return_resone').attr('disabled',true);

    }

}

function setVehicleReturnStaffId(){

    $('#vehicle_return_staff').append(`<option value="">Staff</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(staff => {
                console.log(staff);
                

                $('#vehicle_return_staff').append(`<option value="${staff.staff_id}">${staff.staff_id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

function setVehicleReturnVehicleId(){

    $('#vehicle_return_vehicle').append(`<option value="">Vehicle</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`vehicle`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle => {
                console.log(vehicle);
                

                $('#vehicle_return_vehicle').append(`<option value="${vehicle.vehicle_code}">${vehicle.vehicle_code}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

// ---------------------------------- View Vehicle Return ---------------------------------------------


$('#vehicle_return_table').on('click' ,'#view_vehicle_return' ,function(){

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
                $('#vehicle_return_id').val(vehicle.resavationId);
                $('#vehicle_return_date').val(vehicle.date);
                $('#vehicle_return_staff').val(vehicle.staff_id);
                $('#vehicle_return_vehicle').val(vehicle.vehicle_code);
                $('#vehicle_return_plane_no').val(vehicle.license_plate_number);
                $('#vehicle_return_resone').val(vehicle.resone);
            })
            
            navigateToPage('#vehicle_return_registration');
            activeNavBarButton('#vehicle_nav');
            chageVehicleReturnState("View");

        },
        error:function(field){
            console.log(field);
        }
    })

})

// ---------------------------------- Save Return ---------------------------------------------

$('#save_vehicle_return').on('click' ,()=>{

    var vehicleData = {
        resavationId: $('#vehicle_return_id').val(),
        date:  $('#vehicle_return_date').val(),
        resone: $('#vehicle_return_resone').val(),
        type: "RETURN",
        staff_id:  $('#vehicle_return_staff').val(),
        vehicle_code: $('#vehicle_return_vehicle').val(),
        license_plate_number: $('#vehicle_return_plane_no').val()
    }

      console.log(vehicleData);

      if(!validateVehicleReturn(vehicleData)){
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
            genarateNextVehicleReturn();
            loadVehicleReturnTable();
            clearVehicleReturnFields();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Return successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})

function validateVehicleReturn(vehicleData){

    const showError = (message) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    };


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


$('#cancel_vehicle_return').on('click' ,()=>{
    navigateToPage('#vehicle_return_section');
    activeNavBarButton('#vehicle_nav');
})

function clearVehicleReturnFields(){
    $('#vehicle_return_id').val('');
    $('#vehicle_return_date').val('');
    $('#vehicle_return_staff').val('');
    $('#vehicle_return_vehicle').val('');
    $('#vehicle_return_plane_no').val('');
    $('#vehicle_return_resone').val('');
}

$('#vehicle_return_sort').on('input' ,() => {
    var data = $('#vehicle_return_sort').val();

    $('#vehicle_return_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`resavation?=&type=RETURN&data=${data}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(vehicle => {

                $('#vehicle_return_table tbody').append(`<tr>
                                        
                                        <td>${vehicle.resavationId}</td>
                                        <td>${vehicle.date}</td>
                                        <td>${vehicle.staff_id}</td>
                                        <td>${vehicle.vehicle_code}</td>
                                        <td>${vehicle.license_plate_number}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_vehicle_return">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })
})