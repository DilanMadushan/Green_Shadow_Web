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

function loadFieldTable(){

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
