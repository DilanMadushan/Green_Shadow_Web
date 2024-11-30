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