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