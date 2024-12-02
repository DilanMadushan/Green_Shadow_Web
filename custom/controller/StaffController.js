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