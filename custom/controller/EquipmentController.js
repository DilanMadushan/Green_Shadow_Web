function genarateNextEquipmentId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`equipment/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("EQ");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#equipment_id").val("EQ00"+genNum);
                }else if(genNum.length == 2){
                    $("#equipment_id").val("EQ0"+genNum);
                }
                 else{
                    $("#equipment_id").val("EQ"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}

function loadEquipmentTable(){

    $('#equipment_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`equipment`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment => {

                $('#equipment_table tbody').append(`<tr>
                                        
                                        <td>${equipment.equipment_Id}</td>
                                        <td>${equipment.name}</td>
                                        <td>${equipment.type}</td>
                                        <td>${equipment.status}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_equipment">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update" id="equipment_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="equipment_delete">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

            setEquipmentCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })


    function setEquipmentCount(){
        var count = $("#equipment_table tbody tr").length;
        console.log(count);
    
        if(count<10){
            $('#equipment_count').text("0"+count)
        }else{
            $('#equipment_count').text(count)
        }
    }
}

function chageEquipmentState(state){

    if(state == "Save"){

        $('#save_equipment').show();
        $('#update_equipment').hide();

        $('#equipment_id').attr('disabled',true);
        $('#equipment_name').attr('disabled',false);
        $('#equipment_type').attr('disabled',false);
        $('#equipment_status').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_equipment').hide();
        $('#update_equipment').hide();

        $('#equipment_id').attr('disabled',true);
        $('#equipment_name').attr('disabled',true);
        $('#equipment_type').attr('disabled',true);
        $('#equipment_status').attr('disabled',true);


    }

    if(state == "Update"){

        $('#save_equipment').hide();
        $('#update_equipment').show();

        $('#equipment_id').attr('disabled',true);
        $('#equipment_name').attr('disabled',false);
        $('#equipment_type').attr('disabled',false);
        $('#equipment_status').attr('disabled',false);

    }
}

// ---------------------------------- Save Equipment ---------------------------------------------

$('#save_equipment').on('click' ,()=>{
    var equipmentData = {
        equipment_Id : $('#equipment_id').val(),
        name : $('#equipment_name').val(),
        type : $('#equipment_type').val(),
        status : $('#equipment_status').val()
      }

      console.log(equipmentData);

      if(!validateEquipment(equipmentData)){
        return
      }
      

      $.ajax({
        method:"POST",
        url:baseUrl+`equipment`,
        processData: false,
        data:JSON.stringify(equipmentData),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            clearEquipmentFields();
            genarateNextEquipmentId();
            loadEquipmentTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Save Equipment successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})


function validateEquipment(equipmentData){

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
        {field: equipmentData.equipment_Id, message: "Equipment Id is required"},
        {field: equipmentData.name, message: "Name is required"},
        {field: equipmentData.type, message: "Type is required"},
        {field: equipmentData.status, message: "Status is required"},
        
        
    ];

    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;
}


// ---------------------------------- View Equipment ---------------------------------------------


$('#equipment_table').on('click' ,'#view_equipment' ,function(){

    var equipmentId = $(this).closest('tr').find('td').first().text();
    console.log(equipmentId);
    
    
    $.ajax({
        method:"GET",
        url:baseUrl+`equipment/${equipmentId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(equipment){

            $('#equipment_id').val(equipment.equipment_Id),
            $('#equipment_name').val(equipment.name),
            $('#equipment_type').val(equipment.type),
            $('#equipment_status').val(equipment.status)


            navigateToPage('#equipment_registerSection');
            activeNavBarButton('#equipment_nav');
            chageEquipmentState("View");

        },
        error:function(field){
            console.log(field);
        }
    })

})


// ---------------------------------- Update Equipment ---------------------------------------------

$('#equipment_table').on('click' ,'#equipment_update' ,function(){

    var equipmentId = $(this).closest('tr').find('td').first().text();
    console.log(equipmentId);
    
    
    $.ajax({
        method:"GET",
        url:baseUrl+`equipment/${equipmentId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(equipment){

            $('#equipment_id').val(equipment.equipment_Id),
            $('#equipment_name').val(equipment.name),
            $('#equipment_type').val(equipment.type),
            $('#equipment_status').val(equipment.status)


            navigateToPage('#equipment_registerSection');
            activeNavBarButton('#equipment_nav');
            chageEquipmentState("Update");

        },
        error:function(field){
            console.log(field);
        }
    })

})


$('#update_equipment').on('click' ,()=>{
    var equipmentData = {
        equipment_Id : $('#equipment_id').val(),
        name : $('#equipment_name').val(),
        type : $('#equipment_type').val(),
        status : $('#equipment_status').val()
      }

      console.log(equipmentData);

      if(!validateEquipment(equipmentData)){
        return
      }
      

      $.ajax({
        method:"PATCH",
        url:baseUrl+`equipment`,
        processData: false,
        data:JSON.stringify(equipmentData),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            loadEquipmentTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Equipment successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})


// ---------------------------------- Delete Equipment ---------------------------------------------

$('#equipment_table').on('click' ,'#equipment_delete' ,function(){

    var equipmentId = $(this).closest('tr').find('td').first().text();

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
                url: baseUrl+`equipment/${equipmentId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },success:function(crop){
                    genarateNextEquipmentId();
                    loadEquipmentTable();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Delete Equipment successfully",
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


function clearEquipmentFields(){
    $('#equipment_id').val(''),
    $('#equipment_name').val(''),
    $('#equipment_type').val('Status'),
    $('#equipment_status').val('Status')
}

$('#cancel_equipment').on('click' ,() => {
    navigateToPage('#equipment_section');
    activeNavBarButton('#equipment_nav');
})

$('#equipment_sort').on('input' ,() => {
    var data = $('#equipment_sort').val();

    $('#equipment_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`equipment?data=${data}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment => {

                $('#equipment_table tbody').append(`<tr>
                                        
                                        <td>${equipment.equipment_Id}</td>
                                        <td>${equipment.name}</td>
                                        <td>${equipment.type}</td>
                                        <td>${equipment.status}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_equipment">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update" id="equipment_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="equipment_delete">
                                                <i class="fa fa-trash"></i>
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