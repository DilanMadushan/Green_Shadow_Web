function genarateNextStaffId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`staff/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("ST");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#staff_id").val("ST00"+genNum);
                }else if(genNum.length == 2){
                    $("#staff_id").val("ST0"+genNum);
                }
                 else{
                    $("#staff_id").val("ST"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}


function loadStaffTable(){

    $('#staff_table tbody').empty();

    $.ajax({
        method: "GET",
        url: baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(resualt){
    
            resualt.forEach(function(staff){

                $('#staff_table tbody').append(`<tr>
                                        <td>${staff.staff_id}</td>
                                        <td>${staff.first_name}</td>
                                        <td>${staff.joinedDate.split("T")[0]}</td>
                                        <td>${staff.role}</td>
                                        <td>${staff.address_line_1}</td>
                                        <td>${staff.tel}</td>
                                        <td>${staff.email}</td>
                                        
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="staff_view">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update" id="staff_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="staff_delete">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`)
            })
            setStaffCount();

        },error:function(resualt){
            console.log(resualt)
        }
    })
}


function setStaffCount(){
    var count = $("#staff_table tbody tr").length;
    console.log(count);

    if(count<10){
        $('#staff_count').text("0"+count)
    }else{
        $('#staff_count').text(count)
    }

}

function changeStaffState(state){

    if(state=="View"){

        $('#save_staff').hide();
        $('#update_staff').hide();
        $('#cancle_staff').show();

        $('#staff_id').attr('disabled', true);
        $('#staff_first_name').attr('disabled', true);
        $('#staff_last_name').attr('disabled', true);
        $('#staff_dob').attr('disabled', true);
        $('#staff_gender').attr('disabled', true);
        $('#staff_joind_date').attr('disabled', true);
        $('#staff_address1').attr('disabled', true);
        $('#staff_address2').attr('disabled', true);
        $('#staff_address3').attr('disabled', true);
        $('#staff_address4').attr('disabled', true);
        $('#staff_address5').attr('disabled', true);
        $('#staff_mobile').attr('disabled', true);
        $('#staff_email').attr('disabled', true);
        $('#staff_role').attr('disabled', true);
    }

    if(state=="Save"){

        $('#save_staff').show();
        $('#update_staff').hide();
        $('#cancle_staff').show();

        $('#staff_id').attr('disabled', true);
        $('#staff_first_name').attr('disabled', false);
        $('#staff_last_name').attr('disabled', false);
        $('#staff_dob').attr('disabled', false);
        $('#staff_gender').attr('disabled', false);
        $('#staff_joind_date').attr('disabled', false);
        $('#staff_address1').attr('disabled', false);
        $('#staff_address2').attr('disabled', false);
        $('#staff_address3').attr('disabled', false);
        $('#staff_address4').attr('disabled', false);
        $('#staff_address5').attr('disabled', false);
        $('#staff_mobile').attr('disabled', false);
        $('#staff_email').attr('disabled', false);
        $('#staff_role').attr('disabled', false);
    }

    if(state=="Update"){

        $('#save_staff').hide();
        $('#update_staff').show();
        $('#cancle_staff').show();

        $('#staff_id').attr('disabled', true);
        $('#staff_first_name').attr('disabled', false);
        $('#staff_last_name').attr('disabled', false);
        $('#staff_dob').attr('disabled', false);
        $('#staff_gender').attr('disabled', false);
        $('#staff_joind_date').attr('disabled', false);
        $('#staff_address1').attr('disabled', false);
        $('#staff_address2').attr('disabled', false);
        $('#staff_address3').attr('disabled', false);
        $('#staff_address4').attr('disabled', false);
        $('#staff_address5').attr('disabled', false);
        $('#staff_mobile').attr('disabled', false);
        $('#staff_email').attr('disabled', false);
        $('#staff_role').attr('disabled', false);
    }

}

$('#cancle_staff').on('click' ,()=>{
    navigateToPage('#staff_section');
    activeNavBarButton('#staff_nav');
})

// ---------------------------- View Staff ----------------------------

$('#staff_table').on('click' ,'#staff_view' ,function(){

    let staff_id = $(this).closest('tr').find('td').first().text();
    console.log(staff_id);
    

    $.ajax({
        method:"GET",
        url:baseUrl+`staff/${staff_id}`,
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(staff){

            $('#staff_id').val(staff.staff_id);
            $('#staff_first_name').val(staff.first_name);
            $('#staff_last_name').val(staff.last_name);
            $('#staff_dob').val(staff.dob.split("T")[0]);
            $('#staff_gender').val(staff.gender);
            $('#staff_joind_date').val(staff.joinedDate.split("T")[0]);
            $('#staff_address1').val(staff.address_line_1);
            $('#staff_address2').val(staff.address_line_2);
            $('#staff_address3').val(staff.address_line_3);
            $('#staff_address4').val(staff.address_line_4);
            $('#staff_address5').val(staff.address_line_5);
            $('#staff_mobile').val(staff.tel);
            $('#staff_email').val(staff.email);
            $('#staff_role').val(staff.role);

            changeStaffState("View")
            navigateToPage('#staff_registerSection');
            activeNavBarButton('#staff_nav');

        },error:function(crop){
            console.log(crop);
        }
    })
})


// ---------------------------- Save Staff ----------------------------


$('#save_staff').on('click' ,function(){
    var staffData = {
        staff_id: $('#staff_id').val(),
        first_name: $('#staff_first_name').val(),
        last_name: $('#staff_last_name').val(),
        dob: $('#staff_dob').val(),
        gender: $('#staff_gender').val(),
        joinedDate: $('#staff_joind_date').val(),
        address_line_1: $('#staff_address1').val(),
        address_line_2: $('#staff_address2').val(),
        address_line_3: $('#staff_address3').val(),
        address_line_4: $('#staff_address4').val(),
        address_line_5: $('#staff_address5').val(),
        tel: $('#staff_mobile').val(),
        email: $('#staff_email').val(),
        role: $('#staff_role').val()
    };


    if(!validateCrop(staffData)){
        return
    }

    $.ajax({
        method:"POST",
        url: baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        processData: false,
        data:JSON.stringify(staffData),
        contentType:"application.json",
        success:function(resualt){
            loadStaffTable();
            genarateNextStaffId();
            clearStaffFields();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Save Staff successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(resualt){
            console.log(resualt);
        }

    })

          

})


function validateCrop(staff){

    console.log(staff);
    

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
        { field: staff.staff_id, message: "Staff ID is required" },
        { field: staff.first_name, message: "First name is required" },
        { field: staff.last_name, message: "Last name is required" },
        { field: staff.dob, message: "Date of birth is required" },
        { field: staff.gender, message: "Gender is required" },
        { field: staff.joinedDate, message: "Joined date is required" },
        { field: staff.address_line_1, message: "Address is required" },
        { field: staff.address_line_2, message: "Lane is required" },
        { field: staff.address_line_3, message: "Main City is required" },
        { field: staff.address_line_4, message: "Main State is required" },
        { field: staff.address_line_5, message: "Postal Code is required" },
        { field: staff.tel, message: "Mobile number is required" },
        { field: staff.email, message: "Email is required" },
        { field: staff.role, message: "Role is required" }
    ];


    for(let i = 0; i < requiredFields.length; i++){
        if(requiredFields[i].field === ""){
            showError(requiredFields[i].message);
            return false;
        }
    }
    return true;


}


// ---------------------------- Update Staff ----------------------------

$('#staff_table').on('click' ,'#staff_update' ,function(){

    let staff_id = $(this).closest('tr').find('td').first().text();
    console.log(staff_id);
    

    $.ajax({
        method:"GET",
        url:baseUrl+`staff/${staff_id}`,
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success:function(staff){

            $('#staff_id').val(staff.staff_id);
            $('#staff_first_name').val(staff.first_name);
            $('#staff_last_name').val(staff.last_name);
            $('#staff_dob').val(staff.dob.split("T")[0]);
            $('#staff_gender').val(staff.gender);
            $('#staff_joind_date').val(staff.joinedDate.split("T")[0]);
            $('#staff_address1').val(staff.address_line_1);
            $('#staff_address2').val(staff.address_line_2);
            $('#staff_address3').val(staff.address_line_3);
            $('#staff_address4').val(staff.address_line_4);
            $('#staff_address5').val(staff.address_line_5);
            $('#staff_mobile').val(staff.tel);
            $('#staff_email').val(staff.email);
            $('#staff_role').val(staff.role);

            changeStaffState("Update")
            navigateToPage('#staff_registerSection');
            activeNavBarButton('#staff_nav');

        },error:function(crop){
            console.log(crop);
        }
    })
})

$('#update_staff').on('click' ,()=>{

    var staffData = {
        staff_id: $('#staff_id').val(),
        first_name: $('#staff_first_name').val(),
        last_name: $('#staff_last_name').val(),
        dob: $('#staff_dob').val(),
        gender: $('#staff_gender').val(),
        joinedDate: $('#staff_joind_date').val(),
        address_line_1: $('#staff_address1').val(),
        address_line_2: $('#staff_address2').val(),
        address_line_3: $('#staff_address3').val(),
        address_line_4: $('#staff_address4').val(),
        address_line_5: $('#staff_address5').val(),
        tel: $('#staff_mobile').val(),
        email: $('#staff_email').val(),
        role: $('#staff_role').val()
    };


    if(!validateCrop(staffData)){
        return
    }

    $.ajax({
        method:"PATCH",
        url: baseUrl+`staff`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        processData: false,
        data:JSON.stringify(staffData),
        contentType:"application.json",
        success:function(resualt){
            loadStaffTable();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Staff successfully",
                showConfirmButton: false,
                timer: 1500
            });

        },error:function(resualt){
            console.log(resualt);
        }

    })

})


// ---------------------------- Delete Staff ----------------------------

$('#staff_table').on('click' ,'#staff_delete' ,function(){

    let staff_id = $(this).closest('tr').find('td').first().text();
    console.log(staff_id);
    
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
                url:baseUrl+`staff/${staff_id}`,
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                success:function(staff){
                    loadStaffTable();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Delete Staff successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
        
                },error:function(crop){
                    console.log(crop);
                }
            })
        }
    })

})

function clearStaffFields(){
    $('#staff_id').val('');
    $('#staff_first_name').val('');
    $('#staff_last_name').val('');
    $('#staff_dob').val('');
    $('#staff_gender').val('Gender');
    $('#staff_joind_date').val('');
    $('#staff_address1').val('');
    $('#staff_address2').val('');
    $('#staff_address3').val('');
    $('#staff_address4').val('');
    $('#staff_address5').val('');
    $('#staff_mobile').val('');
    $('#staff_email').val('');
    $('#staff_role').val('Role');
}

$('#staff_sort').on('input', ()=>{
    var data = $('#staff_sort').val();

    $('#staff_table tbody').empty();

    $.ajax({
        method: "GET",
        url: baseUrl+`staff?data=${data}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(resualt){
    
            resualt.forEach(function(staff){

                $('#staff_table tbody').append(`<tr>
                                        <td>${staff.staff_id}</td>
                                        <td>${staff.first_name}</td>
                                        <td>${staff.joinedDate.split("T")[0]}</td>
                                        <td>${staff.role}</td>
                                        <td>${staff.address_line_1}</td>
                                        <td>${staff.tel}</td>
                                        <td>${staff.email}</td>
                                        
                                        <td>
                                            <button class="btn btn-primary btn-sm" title="View" id="staff_view">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm" title="Update" id="staff_update">
                                                <i class="fa fa-edit"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm" title="Delete" id="staff_delete">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`)
            })
            setStaffCount();

        },error:function(resualt){
            console.log(resualt)
        }
    })

})