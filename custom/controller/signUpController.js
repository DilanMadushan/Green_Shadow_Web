$('#signup-button').on('click' ,()=>{
    var email = $('#siginup_email').val();
    var password = $('#siginup_password').val();
    var role = $('#siginup_role').val();

    const formData ={
        email:email,
        password:password,
        role:role
    }

    var url = "http://localhost:8080/GreenShadow/api/v1/auth/signUp";

    if(validate(email,password,role)){
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

    function validate(email, password,role) {
        if(email == "" || password == "" || role == ""){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "email name and password required and Role",
                showConfirmButton: false,
                timer: 1500
            });
            return false;
        }
        return true;
    }
})