function genarateNextFieldId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`field/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("F");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#field_code").val("F00"+genNum);
                }else if(genNum.length == 2){
                    $("#field_code").val("F0"+genNum);
                }
                 else{
                    $("#field_code").val("F"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}

function loadFieldTable(){
    $.ajax({
        method:"GET",
        url:baseUrl+`field`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },success:function(resualt){

            resualt.forEach(crop => {

                $('#field_table tbody').append(`<tr>
                                        
                                        <td>${crop.field_code}</td>
                                        <td>${crop.field_Name}</td>
                                        <td>${crop.field_location}</td>
                                        <td>${crop.extent_size_of_field}</td>
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View">
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
            });

            setFieldCount();
        },
        error:function(resualt){
            console.log(resualt);
        }
    })
}

function setFieldCount(){
    var count = $("#field_table tbody tr").length;
    console.log(count);

    if(count<10){
        $('#field_count').text("0"+count)
    }else{
        $('#field_count').text(count)
    }
}

function chageFieldState(state){

    if(state == "Save"){
        $('#field1_upload').attr('disabled',false);
        $('#field1_input').attr('disabled',false);
        $('#field2_upload').attr('disabled',false);
        $('#field2_input').attr('disabled',false);
        $('#field_code').attr('disabled',true);
        $('#field_name').attr('disabled',false);
        $('#field_location').attr('disabled',false);
        $('#field_size').attr('disabled',false);

    }
}


$('#save_field').on('click' ,()=>{
    var fieldDate = {
        field_code: $('#field_code').val(),
        field_Name: $('#field_name').val(),
        field_location:$('#field_location').val(),
        extent_size_of_field: $('#field_size').val(),
        field_image_1: $('#field1_base64_input').val(),
        field_image_2: $('#field2_base64_input').val()
      }

      console.log(fieldDate);

      if(!validateField(fieldDate)){
        return
      }
      

      $.ajax({
        method:"POST",
        url:baseUrl+`field`,
        processData: false,
        data:JSON.stringify(fieldDate),
        processData:false,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(resualt){
            genarateNextFieldId();
            loadFieldTable()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Save Field successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(result){
            console.log(result);

        }
      })
      
})


function validateField(fieldData){

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
        {field: fieldData.field_image_1, message: "Field Image is required"},
        {field: fieldData.field_image_2, message: "Field Image ID is required"},
        {field: fieldData.crop_code, message: "Field Code ID is required"},
        {field: fieldData.field_Name, message: "Field Name ID is required"},
        {field: fieldData.field_location, message: "Location is required"},
        {field: fieldData.extent_size_of_field, message: "Size is required"},
        
    ];

    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;
}