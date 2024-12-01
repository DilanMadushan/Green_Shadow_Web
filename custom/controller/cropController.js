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
                    $("#crop_id").val("CR00"+genNum);
                }else if(genNum.length == 2){
                    $("#crop_id").val("CR0"+genNum);
                }
                 else{
                    $("#crop_id").val("CR"+genNum);
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
                                            <button class="btn btn-primary btn-sm" title="Update" id="crop_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="crop_delete">
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

        $('#crop_id').attr('readonly', true);
        $('#crop_commen_name').attr('disabled', false);
        $('#crop_Scientific_name').attr('disabled', false);
        $('#crop_Season').attr('disabled', false);
        $('#crop_catagary').attr('disabled', false);
        $('#crop_field_ids').attr('disabled', false);
    }

    if(state == "Update"){

        $('#save_crop').hide();
        $('#update_crop').show();
        $('#crop_upload').attr('disabled', false);
        $('#crop_input').attr('disabled', false);

        $('#crop_id').attr('readonly', true);
        $('#crop_commen_name').attr('disabled', false);
        $('#crop_Scientific_name').attr('disabled', false);
        $('#crop_Season').attr('disabled', false);
        $('#crop_catagary').attr('disabled', false);
        $('#crop_field_ids').attr('disabled', false);
    }

}


$('#cancel_crop').on('click', function(){
    navigateToPage('#crop_section');
    activeNavBarButton('#crop_nav');
})


$('#add_crop').on('click' ,function(){
    cropStateChange("Save")
})



// ---------------------------- Save Crop ---------------------------- 

$('#save_crop').on('click' ,function(){
    var cropData = {
        crop_code : $('#crop_id').val(),
        common_name :  $('#crop_commen_name').val(),
        scientific_name : $('#crop_Scientific_name').val(),
        crop_image : $('#cropbase64_input').val(),
        category : $('#crop_catagary').val(),
        crop_season : $('#crop_Season').val(),
        field_code :  $('#crop_field_ids').val()
        
    }

    if(!validateCrop(cropData)){
        return
    }

    $.ajax({
        method:"POST",
        url: baseUrl+`crop`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        processData: false,
        data:JSON.stringify(cropData),
        contentType:"application.json",
        success:function(resualt){
            genarateCropId();
            loadCropTable();
            clearCropFields()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Save Crop successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(resualt){
            console.log(resualt);
        }

    })

          

})


function validateCrop(crop){

    console.log(crop);
    

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
        {field: crop.crop_code, message: "Crop Code is required"},
        {field: crop.common_name, message: "Common Name is required"},
        {field: crop.scientific_name, message: "Scientific Name is required"},
        {field: crop.crop_image, message: "Image is required"},
        {field: crop.category, message: "Category is required"},
        {field: crop.crop_season, message: "Crop Season is required"},
        {field: crop.field_code, message: "Field Code is required"},
    ];

    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;


}


// ---------------------------- update Crop ----------------------------

$('#crop_table').on('click', '#crop_update' ,function(){
    
    
    let cropId = $(this).closest('tr').find('td').first().text();

    console.log(cropId);

    $.ajax({
        method:"GET",
        url: baseUrl+`crop/${cropId}`,
        // url: baseUrl+`crop/CR001`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(crop){

            $('#crop_id').val(crop.crop_code);
            $('#crop_commen_name').val(crop.common_name);
            $('#crop_Scientific_name').val(crop.scientific_name)
            $('#cropImg_previw').attr("src", crop.crop_image);
            $('#crop_catagary').val(crop.category);
            $('#crop_Season').val(crop.crop_season);
            $('#crop_field_ids').val(crop.field_code);

            cropStateChange("Update")
            navigateToPage('#crop_registerSection');
            activeNavBarButton('#crop_nav');

        },error:function(crop){
            console.log(crop);
        }
        
    })

})

$('#update_crop').on('click', ()=>{

    var cropData = {
        crop_code : $('#crop_id').val(),
        common_name :  $('#crop_commen_name').val(),
        scientific_name : $('#crop_Scientific_name').val(),
        crop_image : $('#cropbase64_input').val(),
        category : $('#crop_catagary').val(),
        crop_season : $('#crop_Season').val(),
        field_code :  $('#crop_field_ids').val()
        
    }

    if(!validateCrop(cropData)){
        return
    }

    $.ajax({
        method:"PATCH",
        url: baseUrl+`crop`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        processData: false,
        data:JSON.stringify(cropData),
        contentType:"application.json",
        success:function(resualt){
            clearCropFields();
            loadCropTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Crop successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(resualt){
            console.log(resualt);
        }

    })

})


// ---------------------------- Delete Crop ----------------------------

$('#crop_table').on('click', '#crop_delete' ,function(){
    
    
    let cropId = $(this).closest('tr').find('td').first().text();

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
                url: baseUrl+`crop/${cropId}`,
            
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },success:function(crop){
                    loadCropTable();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Delete Crop successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
        
                },error:function(crop){
                    console.log(crop);
                }
                
            })

        }
    });


})

// ---------------------------- View Crop ----------------------------

$('#crop_table').on('click', '#crop_view' ,function(){

    let cropId = $(this).closest('tr').find('td').first().text();

    $.ajax({
        method:"GET",
        url:baseUrl+`crop/${cropId}`,
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(crop){

            $('#crop_id').val(crop.crop_code);
            $('#crop_commen_name').val(crop.common_name);
            $('#crop_Scientific_name').val(crop.scientific_name)
            $('#cropImg_previw').attr("src", crop.crop_image);
            $('#crop_catagary').val(crop.category);
            $('#crop_Season').val(crop.crop_season);
            $('#crop_field_ids').val(crop.field_code);

            cropStateChange("View")
            navigateToPage('#crop_registerSection');
            activeNavBarButton('#crop_nav');

        },error:function(crop){
            console.log(crop);
        }
    })
    
})


function clearCropFields(){
    genarateCropId()
    $('#crop_commen_name').val("");
    $('#crop_Scientific_name').val("")
    $('#cropImg_previw').attr("src", "images/img.png");
    $('#crop_input').val("");
    $('#crop_catagary').val('Category').change();
    $('#crop_Season').val("");
    $('#crop_field_ids').val('Field').change();
}