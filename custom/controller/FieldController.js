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