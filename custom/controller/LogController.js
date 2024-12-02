function genarateNextLogId(){

    $.ajax({
        method: "GET",
        url: baseUrl+`log/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("LOG");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#log_code").val("LOG"+genNum);
                }else if(genNum.length == 2){
                    $("#log_code").val("LOG0"+genNum);
                }
                 else{
                    $("#log_code").val("LOG"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
    
}

function loadLogTable(){

    $('#log_table tbody').empty();

    $.ajax({
        method: "GET",
        url: baseUrl+`log`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(resualt){
            console.log("Called");
            
            console.log(resualt);
           

            resualt.forEach(function(log){

                console.log(log);
                

                $('#log_table tbody').append(`<tr>
                                        <td class="font-weight-bolder">${log.log_code}</td>
                                        <td>${log.log_date.split("T")[0]}</td>
                                        <td>${log.field_code}</td>
                                        <td>${log.crop_code}</td>
                                        <td>${log.staff_id}</td>
                                        
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="log_view">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update" id="log_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="log_delete">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`)
            })
            setLogCount();

        },error:function(resualt){
            console.log(resualt)
        }
    })
}


function setLogCount(){
    var count = $("#log_table tbody tr").length;
    console.log(count);

    if(count<10){
        $('#log_count').text("0"+count)
    }else{
        $('#log_count').text(count)
    }

}

function setCropIds(){
    $.ajax({
        method: "GET",
        url: baseUrl+`crop`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(resualt){
             $('#log_crop_id').append(`<option value="">Crop</option>`);

            resualt.forEach(function(crop){
                $('#log_crop_id').append(`<option value="${crop.crop_code}">${crop.crop_code}</option>`);
                
            })

        },error:function(resualt){
            console.log(resualt)
        }
    })
}


function setFieldId(){

    $('#log_field_id').append(`<option value="">Field</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`field`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(field => {

                $('#log_field_id').append(`<option value="${field.field_code}">${field.field_code}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

function setCropIds(){
    $.ajax({
        method: "GET",
        url: baseUrl+`crop`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(resualt){
             $('#log_crop_id').append(`<option value="">Crop</option>`);

            resualt.forEach(function(crop){
                $('#log_crop_id').append(`<option value="${crop.crop_code}">${crop.crop_code}</option>`);
                
            })

        },error:function(resualt){
            console.log(resualt)
        }
    })
}


function setStaffId(){

    $('#log_staff_id').append(`<option value="">Staff</option>`) 

    $.ajax({
        method:"GET",
        url:baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(staff => {
                console.log(staff);
                

                $('#log_staff_id').append(`<option value="${staff.staff_id}">${staff.staff_id}</option>`) 
            });

        },
        error:function(resualt){
            console.log(resualt);
        }
    })

}

function changeLogState(state){

    if(state == "Save"){

        $('#save_log').show();
        $('#update_log').hide();


        $('#field1_upload').attr('disabled',false);
        $('#log_upload').attr('disabled',false);
        
        $('#log_code').attr('disabled',true);
        $('#log_date').attr('disabled',false);
        $('#log_crop_id').attr('disabled',false);
        $('#log_field_id').attr('disabled',false);
        $('#log_staff_id').attr('disabled',false);
        $('#log_details').attr('disabled',false);

    }

    if(state == "View"){

        $('#save_log').hide();
        $('#update_log').hide();


        $('#field1_upload').attr('disabled',true);
        $('#log_upload').attr('disabled',true);
        
        $('#log_code').attr('disabled',true);
        $('#log_date').attr('disabled',true);
        $('#log_crop_id').attr('disabled',true);
        $('#log_field_id').attr('disabled',true);
        $('#log_staff_id').attr('disabled',true);
        $('#log_details').attr('disabled',true);

    }

    if(state == "Update"){

        $('#save_log').hide();
        $('#update_log').show();


        $('#field1_upload').attr('disabled',false);
        $('#log_upload').attr('disabled',false);
        
        $('#log_code').attr('disabled',true);
        $('#log_date').attr('disabled',false);
        $('#log_crop_id').attr('disabled',false);
        $('#log_field_id').attr('disabled',false);
        $('#log_staff_id').attr('disabled',false);
        $('#log_details').attr('disabled',false);

    }

}