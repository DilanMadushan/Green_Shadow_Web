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


function chageVehicleState(state){

    if(state == "Save"){

        $('#save_vehicle').show();
        $('#update_vehicle').hide();

        $('#vehicle_id').attr('disabled',true);
        $('#vehicle_license').attr('disabled',false);
        $('#vehicle_fualType').attr('disabled',false);
        $('#vehicle_category').attr('disabled',false);
        $('#vehicle_status').attr('disabled',false);
        $('#vehicle_remarks').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_vehicle').hide();
        $('#update_vehicle').hide();

        $('#vehicle_id').attr('disabled',true);
        $('#vehicle_license').attr('disabled',true);
        $('#vehicle_fualType').attr('disabled',true);
        $('#vehicle_category').attr('disabled',true);
        $('#vehicle_status').attr('disabled',true);
        $('#vehicle_remarks').attr('disabled',true);

    }

    if(state == "Update"){

        $('#save_vehicle').hide();
        $('#update_vehicle').show();

        $('#vehicle_id').attr('disabled',true);
        $('#vehicle_license').attr('disabled',false);
        $('#vehicle_fualType').attr('disabled',false);
        $('#vehicle_category').attr('disabled',false);
        $('#vehicle_status').attr('disabled',false);
        $('#vehicle_remarks').attr('disabled',false);
    }
}

// ---------------------------------- Save Vehicle ---------------------------------------------

$('#save_vehicle').on('click' ,()=>{
    var vehicleData = {
        vehicle_code: $('#vehicle_id').val(),
        license_plate_number : $('#vehicle_license').val(),
        vehicle_category : $('#vehicle_category').val(),
        fuel_type : $('#vehicle_fualType').val(),
        status : $('#vehicle_status').val(),
        remarks : $('#vehicle_remarks').val()
    }

      console.log(vehicleData);

      if(!validateEquipment(vehicleData)){
        return
      }
      

      $.ajax({
        method:"POST",
        url:baseUrl+`vehicle`,
        processData: false,
        data:JSON.stringify(vehicleData),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            clearVehicleFields();
            genarateNextVehicleId();
            loadVehicleTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Save Vehicle successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})


function validateEquipment(vehicleData){

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
        {field: vehicleData.vehicle_code, message: "Vehicle Id is required"},
        {field: vehicleData.license_plate_number, message: "License Plate Number is required"},
        {field: vehicleData.vehicle_category, message: "Category is required"},
        {field: vehicleData.fuel_type, message: "Fual Type is required"},
        {field: vehicleData.status, message: "Status is required"},
        {field: vehicleData.remarks, message: "Remarks is required"},
        
        
    ];

    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;
}


// ---------------------------------- View Vehicle ---------------------------------------------


$('#vehicle_table').on('click' ,'#view_vehicle' ,function(){

    var vehicleId = $(this).closest('tr').find('td').first().text();
    console.log(vehicleId);
    
    
    $.ajax({
        method:"GET",
        url:baseUrl+`vehicle/${vehicleId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(vehicle){
 
            $('#vehicle_id').val(vehicle.vehicle_code);
            $('#vehicle_license').val(vehicle.license_plate_number);
            $('#vehicle_category').val(vehicle.vehicle_category);
            $('#vehicle_fualType').val(vehicle.fuel_type);
            $('#vehicle_status').val(vehicle.status);
            $('#vehicle_remarks').val(vehicle.remarks);
          
            navigateToPage('#vehicle_registration');
            activeNavBarButton('#vehicle_nav');
            chageVehicleState("View");

        },
        error:function(field){
            console.log(field);
        }
    })

})


// ---------------------------------- Update Vehicle ---------------------------------------------

$('#vehicle_table').on('click' ,'#vehicle_update' ,function(){

    var vehicleId = $(this).closest('tr').find('td').first().text();
    console.log(vehicleId);
    
    
    $.ajax({
        method:"GET",
        url:baseUrl+`vehicle/${vehicleId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(vehicle){
 
            $('#vehicle_id').val(vehicle.vehicle_code);
            $('#vehicle_license').val(vehicle.license_plate_number);
            $('#vehicle_category').val(vehicle.vehicle_category);
            $('#vehicle_fualType').val(vehicle.fuel_type);
            $('#vehicle_status').val(vehicle.status);
            $('#vehicle_remarks').val(vehicle.remarks);
          
            navigateToPage('#vehicle_registration');
            activeNavBarButton('#vehicle_nav');
            chageVehicleState("Update");

        },
        error:function(field){
            console.log(field);
        }
    })

})

$('#update_vehicle').on('click' ,()=>{
    var vehicleData = {
        vehicle_code: $('#vehicle_id').val(),
        license_plate_number : $('#vehicle_license').val(),
        vehicle_category : $('#vehicle_category').val(),
        fuel_type : $('#vehicle_fualType').val(),
        status : $('#vehicle_status').val(),
        remarks : $('#vehicle_remarks').val()
    }

      console.log(vehicleData);

      if(!validateEquipment(vehicleData)){
        return
      }
      

      $.ajax({
        method:"PATCH",
        url:baseUrl+`vehicle`,
        processData: false,
        data:JSON.stringify(vehicleData),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            loadVehicleTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Vehicle successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})


// ---------------------------------- Delete Vehicle ---------------------------------------------

$('#vehicle_table').on('click' ,'#vehicle_delete' ,function(){

    var vehicleId = $(this).closest('tr').find('td').first().text();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"

    }).then((result) =>{
        if(result.isConfirmed){

            $.ajax({
                method:"DELETE",
                url: baseUrl+`vehicle/${vehicleId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },success:function(crop){
                    loadVehicleTable();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Delete Vehicle successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
        
                },error:function(crop){
                    console.log(crop);
                }
                
            })

        }
    });

});

function clearVehicleFields(){
    $('#vehicle_id').val('');
    $('#vehicle_license').val('');
    $('#vehicle_category').val('');
    $('#vehicle_fualType').val('Fuel Type').change();
    $('#vehicle_status').val('Status').change();;
    $('#vehicle_remarks').val('');
}


$('#cancle_vehicle').on('click' ,()=>{
    navigateToPage('#vehicle_section');
    activeNavBarButton('#vehicle_nav');
})