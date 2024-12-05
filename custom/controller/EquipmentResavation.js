function genarateNextEquipmentResavationId(){
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
                    $("#equipment_resavation_id").val("EQR00"+genNum);
                }else if(genNum.length == 2){
                    $("#equipment_resavation_id").val("EQR0"+genNum);
                }
                 else{
                    $("#equipment_resavation_id").val("EQR"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}


function loadEquipmentResavationTable(){

    $('#equipment_resavation_table tbody').empty();

    $.ajax({
        method:"GET",
        url:baseUrl+`equipmentDetails?data=PICKUP`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment => {

                $('#equipment_resavation_table tbody').append(`<tr>
                                        
                                        <td>${equipment.detailId}</td>
                                        <td>${equipment.date}</td>
                                        <td>${equipment.staff_id}</td>
                                        <td>${equipment.field_code}</td>
                                        <td>${equipment.equipment_Id}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="view_equipmentResavation">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>`) 
            });

            setEquipmentResavationCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })


    function setEquipmentResavationCount(){
        var count = $("#equipment_resavation_table tbody tr").length;
        console.log(count);
    
        if(count<10){
            $('#equipment_resavation_count').text("0"+count)
        }else{
            $('#equipment_resavation_count').text(count)
        }
    }
}

function chageEquipmentResavationState(state){

    if(state == "Save"){

        $('#save_equipment_resavtion').show();

        $('#equipment_resavation_id').attr('disabled',true);
        $('#equipment_resavation_date').attr('disabled',false);
        $('#equipment_resavation_staff').attr('disabled',false);
        $('#equipment_resavation_field').attr('disabled',false);
        $('#equipment_resavation_equipment').attr('disabled',false);
        $('#equipment_resavation_resone').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_equipment_resavtion').hide();

        $('#equipment_resavation_id').attr('disabled',true);
        $('#equipment_resavation_date').attr('disabled',true);
        $('#equipment_resavation_staff').attr('disabled',true);
        $('#equipment_resavation_field').attr('disabled',true);
        $('#equipment_resavation_equipment').attr('disabled',true);
        $('#equipment_resavation_resone').attr('disabled',true);

    }

}

function setEquipmentResavationFieldId(){

    $('#equipment_resavation_field').append(`<option value="">Field</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`field`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(field => {

                $('#equipment_resavation_field').append(`<option value="${field.field_code}">${field.field_code}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

function setEquipmentId(){

    $('#equipment_resavation_equipment').append(`<option value="">Equipment</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`equipment`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment => {

                $('#equipment_resavation_equipment').append(`<option value="${equipment.equipment_Id}">${equipment.equipment_Id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}


function setEquipmentResavationStaffId(){

    $('#equipment_resavation_staff').append(`<option value="">Staff</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(staff => {
                console.log(staff);
                

                $('#equipment_resavation_staff').append(`<option value="${staff.staff_id}">${staff.staff_id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}


// ---------------------------------- View Equipment Resavation ---------------------------------------------


$('#equipment_resavation_table').on('click' ,'#view_equipmentResavation' ,function(){

    var equipmentResavationId = $(this).closest('tr').find('td').first().text();
    console.log(equipmentResavationId);
    
    
    $.ajax({
        method:"GET",
        url:baseUrl+`equipmentDetails?data=${equipmentResavationId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(equipment =>{
                $('#equipment_resavation_id').val(equipment.detailId);
                $('#equipment_resavation_date').val(equipment.date);
                $('#equipment_resavation_staff').val(equipment.staff_id);
                $('#equipment_resavation_field').val(equipment.field_code);
                $('#equipment_resavation_equipment').val(equipment.equipment_Id);
                $('#equipment_resavation_resone').val(equipment.resone);
            })
            
            navigateToPage('#equipment_reservation_registration');
            activeNavBarButton('#equipment_nav');
            chageEquipmentResavationState("View");

        },
        error:function(field){
            console.log(field);
        }
    })

})


// ---------------------------------- Save Equipment ---------------------------------------------

$('#save_equipment_resavtion').on('click' ,()=>{
    var equipmentData = {
        detailId: $('#equipment_resavation_id').val(),
        date: $('#equipment_resavation_date').val(),
        resone: $('#equipment_resavation_resone').val(),
        resavationType: "PICKUP",
        staff_id: $('#equipment_resavation_staff').val(),
        field_code: $('#equipment_resavation_field').val(),
        equipment_Id: $('#equipment_resavation_equipment').val()
    }

      console.log(equipmentData);

      if(!validateEquipmentResavation(equipmentData)){
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
            genarateNextEquipmentResavationId();
            loadEquipmentResavationTable();
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

function validateEquipmentResavation(equipmentData){

    const showError = (message) => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    };


    var equipmentData = {
        detailId: $('#equipment_resavation_id').val(),
        date: $('#equipment_resavation_date').val(),
        resone: $('#equipment_resavation_resone').val(),
        resavationType: "PICKUP",
        staff_id: $('#equipment_resavation_staff').val(),
        field_code: $('#equipment_resavation_field').val(),
        equipment_Id: $('#equipment_resavation_equipment').val()
    }

    const requiredFields = [
        {field: equipmentData.detailId, message: "Resavation Id is required"},
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

$('#cancel_equipment_resavtion').on('click' ,function(){
    navigateToPage('#equipment_reservation_section');
    activeNavBarButton('#equipment_nav');
})