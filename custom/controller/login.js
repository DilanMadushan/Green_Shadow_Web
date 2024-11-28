$("#login_button").on('click' , function (){
    var email = $('#login_email').val();
    var password = $('#login_password').val();

    const formData ={
        email:email,
        password:password
    }

    var url = "http://localhost:8080/GreenShadow/api/v1/auth/signIn";

    if(validate(email,password)){
        $.ajax({
            method:"POST",
            url:url,
            contentType:"application/json",
            data:JSON.stringify(formData),
            success:function(response){
                console.log(response.token);
                document.cookie = "token= "+response.token;
                document.location.href = "../../index.html";
            },error:function(token){
                console.log(token)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Invalid User Name or Password",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        })
    }

    function validate(email, password) {
        if(email == "" || password == ""){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "email name and password required",
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        }
        return true;
    }
})