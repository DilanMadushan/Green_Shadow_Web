function genarateNextEquipmentReturnId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`equipmentDetails/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("EQR");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#equipment_return_id").val("EQR00"+genNum);
                }else if(genNum.length == 2){
                    $("#equipment_return_id").val("EQR0"+genNum);
                }
                 else{
                    $("#equipment_return_id").val("EQR"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}


function loadEquipmentReturnTable(){

    $('#equupment_Return_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`equipmentDetails?data=RETURN`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment => {

                $('#equupment_Return_table tbody').append(`<tr>
                                        
                                        <td>${equipment.detailId}</td>
                                        <td>${equipment.date}</td>
                                        <td>${equipment.staff_id}</td>
                                        <td>${equipment.field_code}</td>
                                        <td>${equipment.equipment_Id}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_equipmentReturn">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

            setEquipmentReturnCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })


    function setEquipmentReturnCount(){
        var count = $("#equupment_Return_table tbody tr").length;
        console.log(count);
    
        if(count<10){
            $('#equipment_return_count').text("0"+count)
        }else{
            $('#equipment_return_count').text(count)
        }
    }
}


function chageEquipmentReturnState(state){

    if(state == "Save"){

        $('#save_equipment_return').show();

        $('#equipment_return_id').attr('disabled',true);
        $('#equipment_return_date').attr('disabled',false);
        $('#equipment_return_staff').attr('disabled',false);
        $('#equipment_return_field').attr('disabled',false);
        $('#equipment_return_equipment').attr('disabled',false);
        $('#equipment_return_resone').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_equipment_return').hide();

        $('#equipment_return_id').attr('disabled',true);
        $('#equipment_return_date').attr('disabled',true);
        $('#equipment_return_staff').attr('disabled',true);
        $('#equipment_return_field').attr('disabled',true);
        $('#equipment_return_equipment').attr('disabled',true);
        $('#equipment_return_resone').attr('disabled',true);
    }

}

function setEquipmentReturnFieldId(){

    $('#equipment_return_field').append(`<option value="">Field</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`field`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(field => {

                $('#equipment_return_field').append(`<option value="${field.field_code}">${field.field_code}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

function setEquipmentReturnId(){

    $('#equipment_return_equipment').append(`<option value="">Equipment</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`equipment`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment => {

                $('#equipment_return_equipment').append(`<option value="${equipment.equipment_Id}">${equipment.equipment_Id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}


function setEquipmentReturnStaffId(){

    $('#equipment_return_staff').append(`<option value="">Staff</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(staff => {
                console.log(staff);
                

                $('#equipment_return_staff').append(`<option value="${staff.staff_id}">${staff.staff_id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

//---------------------------------- View Equipment Return ---------------------------------------------


$('#equupment_Return_table').on('click' ,'#view_equipmentReturn' ,function(){

    var equipmentReservationId = $(this).closest('tr').find('td').first().text();

    $.ajax({
        method: "GET",
        url: `${baseUrl}equipmentDetails?data=${equipmentReservationId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(result) {
            result.forEach(equipment => {
                $('#equipment_return_id').val(equipment.detailId);
                $('#equipment_return_date').val(equipment.date);
                $('#equipment_return_staff').val(equipment.staff_id);
                $('#equipment_return_field').val(equipment.field_code);
                $('#equipment_return_equipment').val(equipment.equipment_Id);
                $('#equipment_return_resone').val(equipment.resone);
            });

            navigateToPage('#equipment_return_section_registration');
            activeNavBarButton('#equipment_nav');
            chageEquipmentReturnState("View");
        },
        error: function(error) {
            console.error('Error fetching equipment details:', error);
        }
    });

})



// ---------------------------------- Save Equipment Return  ---------------------------------------------

$('#save_equipment_return').on('click' ,()=>{
    var equipmentData = {
        detailId: $('#equipment_return_id').val(),
        date: $('#equipment_return_date').val(),
        resone: $('#equipment_return_resone').val(),
        resavationType: "RETURN",
        staff_id: $('#equipment_return_staff').val(),
        field_code:  $('#equipment_return_field').val(),
        equipment_Id:$('#equipment_return_equipment').val()
    }

      console.log(equipmentData);

      if(!validateEquipmentReturn(equipmentData)){
        return
      }
      

      $.ajax({
        method:"POST",
        url:baseUrl+`equipmentDetails`,
        processData: false,
        data:JSON.stringify(equipmentData),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            clearEquipmentReturnFields();
            genarateNextEquipmentReturnId();
            loadEquipmentReturnTable();
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

function validateEquipmentReturn(equipmentData){

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
        {field: equipmentData.detailId, message: "Retuern Id is required"},
        {field: equipmentData.date, message: "Date is required"},
        {field: equipmentData.resone, message: "Resone is required"},
        {field: equipmentData.resavationType, message: "Type is required"},
        {field: equipmentData.staff_id, message: "Satff is required"},
        {field: equipmentData.field_code, message: "Field is required"},
        {field: equipmentData.equipment_Id, message: "Equipment is required"},
        
        
    ];

    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;
}


$('#cancel_equipment_return').on('click' ,function(){
    navigateToPage('#equipment_return_section');
    activeNavBarButton('#equipment_nav');
})


function clearEquipmentReturnFields(){
    $('#equipment_return_id').val('');
    $('#equipment_return_date').val('');
    $('#equipment_return_resone').val('');
    $('#equipment_return_staff').val('');
    $('#equipment_return_field').val('');
    $('#equipment_return_equipment').val('');
}
