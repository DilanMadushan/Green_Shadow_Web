function genarateNextEquipmentResavationId(){
    $.ajax({
        method: "GET",
        url: baseUrl+`equipmentDetails/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("EQR");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#equipment_resavation_id").val("EQR00"+genNum);
                }else if(genNum.length == 2){
                    $("#equipment_resavation_id").val("EQR0"+genNum);
                }
                 else{
                    $("#equipment_resavation_id").val("EQR"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
}