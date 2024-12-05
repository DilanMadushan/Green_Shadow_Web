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

        $('#save_equipment_return').show();

        $('#equipment_return_id').attr('disabled',true);
        $('#equipment_return_date').attr('disabled',true);
        $('#equipment_return_staff').attr('disabled',true);
        $('#equipment_return_field').attr('disabled',true);
        $('#equipment_return_equipment').attr('disabled',true);
        $('#equipment_return_resone').attr('disabled',true);
    }

}