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

