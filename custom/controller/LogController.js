function genarateNextLogId(){

    $.ajax({
        method: "GET",
        url: baseUrl+`log/last`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        success: function(index){
            var parts = index.split("LOG");
                var num = parseInt(parts[1]);
                var genNum = (num+1).toString();
                if (genNum.length == 1){
                    $("#log_code").val("LOG"+genNum);
                }else if(genNum.length == 2){
                    $("#log_code").val("LOG0"+genNum);
                }
                 else{
                    $("#log_code").val("LOG"+genNum);
                }

        },error:function(id){
            console.log(id)
        }
    })
    
}