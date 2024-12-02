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


function loadLogTable(){

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