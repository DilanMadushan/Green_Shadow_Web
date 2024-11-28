function genarateCropId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`crop/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("CR");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#crop_id").val("CR_00"+genNum);
                }else if(genNum.length == 2){
                    $("#crop_id").val("CR_0"+genNum);
                }
                 else{
                    $("#crop_id").val("CR_"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}



function loadCropTable(){
    $('#crop_table tbody').empty();

    $.ajax({
        method: "GET",
        url: baseUrl+`crop`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(resualt){
            console.log("Called");
            
            console.log(resualt);
            $('#crop_table tbody').empty()

            resualt.forEach(function(crop){
                $('#crop_table tbody').append(`<tr>
                                        <td class="font-weight-bolder">${crop.crop_code}</td>
                                        <td>${crop.common_name}</td>
                                        <td>${crop.category}</td>
                                        <td>${crop.crop_season}</td>
                                        <td>${crop.field_code}</td>
                                        
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="crop_view">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`)
            })
            setCropCount();

        },error:function(resualt){
            console.log(resualt)
        }
    })
}


function setCropCount(){
    var count = $("#crop_table tbody tr").length;
    console.log(count);

    if(count<10){
        $('#crop_count').text("0"+count)
    }else{
        $('#crop_count').text(count)
    }

}


function setFieldAllIds(){
    $('#crop_field_ids').empty()
    $('#crop_field_ids').append(`<option value="">Field</option>`)

    $.ajax({
        method:"GET",
        url:baseUrl+`field`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            resualt.forEach(function(field){
                $('#crop_field_ids').append(`<option value="${field.field_code}">${field.field_code}</option>`)
            })
            
        },
        error:function(resualt){
            log(resualt)

        }

    })
}

function cropStateChange(state){
    
    if(state == "View"){

        $('#save_crop').hide();
        $('#update_crop').hide();
        $('#crop_upload').attr('disabled', true);
        $('#crop_input').attr('disabled', true);

        $('#crop_id').attr('disabled', true);
        $('#crop_commen_name').attr('disabled', true);
        $('#crop_Scientific_name').attr('disabled', true);
        $('#crop_Season').attr('disabled', true);
        $('#crop_catagary').attr('disabled', true);
        $('#crop_field_ids').attr('disabled', true);
    }

    if(state == "Save"){

        $('#save_crop').show();
        $('#update_crop').hide();
        $('#crop_upload').attr('disabled', false);
        $('#crop_input').attr('disabled', false);

        $('#crop_id').attr('disabled', false);
        $('#crop_commen_name').attr('disabled', false);
        $('#crop_Scientific_name').attr('disabled', false);
        $('#crop_Season').attr('disabled', false);
        $('#crop_catagary').attr('disabled', false);
        $('#crop_field_ids').attr('disabled', false);
    }
}


$('#crop_table').on('click', '#crop_view' ,function(){
    console.log("Update");
    
    cropStateChange("View")
    navigateToPage('#crop_registerSection');
    activeNavBarButton('#crop_nav');
})



$('#cancel_crop').on('click', function(){
    navigateToPage('#crop_section');
    activeNavBarButton('#crop_nav');
})

