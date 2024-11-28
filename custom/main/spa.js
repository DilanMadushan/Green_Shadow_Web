const baseUrl = 'http://localhost:8080/GreenShadow/api/v1/';

const token = getToken("token");
console.log(token)

if(!token || token == null || token == ""){
    console.log("if true")
    document.location.href = "../../login.html";
}

navigateToPage('#dash_board')
activeNavBarButton('#dashboard_nav');

function navigateToPage(page) {
    callPageFunction(page);
    $('#dash_board').css('display', 'none');
    $('#crop_section').css('display', 'none');
    $('#crop_registerSection').css('display', 'none');
    $('#field_section').css('display', 'none');
    $('#field_registerSection').css('display', 'none');
    $('#log_section').css('display', 'none');
    $('#log_registerSection').css('display', 'none');
    $('#staff_section').css('display', 'none');
    $('#staff_registerSection').css('display', 'none');
    $('#equipment_section').css('display', 'none');
    $('#equipment_registerSection').css('display', 'none');
    $('#equipment_reservation_section').css('display', 'none');
    $('#equipment_reservation_registration').css('display', 'none');
    $('#equipment_return_section').css('display', 'none');
    $('#equipment_return_section_registration').css('display', 'none');
    $('#vehicle_section').css('display', 'none');
    $('#vehicle_registration').css('display', 'none');
    $('#vehicle_resevation_section').css('display', 'none');
    $('#vehicle_resevation_registration').css('display', 'none');
    $('#vehicle_return_section').css('display', 'none');
    $('#vehicle_return_registration').css('display', 'none');

    $(page).css('display', 'block');
}

function callPageFunction(page) {

    if(page =="#crop_section"){
        genarateCropId();
        loadCropTable();
        setFieldAllIds();
        cropStateChange("Save");    
    }

}


function activeNavBarButton(button) {
    $('#dashboard_nav').removeClass('active');
    $('#crop_nav').removeClass('active');
    $('#field_nav').removeClass('active');
    $('#staff_nav').removeClass('active');
    $('#equipment_nav').removeClass('active');
    $('#vehicle_nav').removeClass('active');
    $('#monitering-log_nav').removeClass('active');

    $(button).addClass('active');
}

$('#dashboard_nav').click(function (){
    navigateToPage('#dash_board');
    activeNavBarButton('#dashboard_nav');
})

$('#crop_nav').click(function () {
    navigateToPage('#crop_section');
    activeNavBarButton('#crop_nav');
});

$('#add_crop').click(function () {
    navigateToPage('#crop_registerSection');
    activeNavBarButton('#crop_nav');
});

$('#field_nav').click(function (){
    navigateToPage('#field_section');
    activeNavBarButton('#field_nav');
})

$('#add_Field').click(function (){
    navigateToPage('#field_registerSection');
    activeNavBarButton('#field_nav');
})

$('#monitering-log_nav').click(function (){
    navigateToPage('#log_section');
    activeNavBarButton('#monitering-log_nav');
})

$('#add_log').click(function (){
    navigateToPage('#log_registerSection');
    activeNavBarButton('#monitering-log_nav');
})

$('#staff_nav').click(function (){
    navigateToPage('#staff_section');
    activeNavBarButton('#staff_nav');
})

$('#add_staff').click(function (){
    navigateToPage('#staff_registerSection');
    activeNavBarButton('#staff_nav');
})

$('#equipment_nav').click(function (){
    navigateToPage('#equipment_section');
    activeNavBarButton('#equipment_nav');
})

$('#add_equipment').click(function (){
    navigateToPage('#equipment_registerSection');
    activeNavBarButton('#equipment_nav');
})

$('#borrow_equipemnt').click(function (){
    navigateToPage('#equipment_reservation_section');
    activeNavBarButton('#equipment_nav');
})

$('#add_equipment_resavation').click(function (){
    navigateToPage('#equipment_reservation_registration');
    activeNavBarButton('#equipment_nav');
})

$('#return_equipment').click(function (){
    navigateToPage('#equipment_return_section');
    activeNavBarButton('#equipment_nav');
})

$('#add_equipment_return').click(function (){
    navigateToPage('#equipment_return_section_registration');
    activeNavBarButton('#equipment_nav');
})

$('#vehicle_nav').click(function (){
    navigateToPage('#vehicle_section');
    activeNavBarButton('#vehicle_nav');
})

$('#add_vehicle').click(function (){
    navigateToPage('#vehicle_registration');
    activeNavBarButton('#vehicle_nav');
})

$('#borrow_vehicle').click(function (){
    navigateToPage('#vehicle_resevation_section');
    activeNavBarButton('#vehicle_nav');
})

$('#add_vehicle_resevetion').click(function (){
    navigateToPage('#vehicle_resevation_registration');
    activeNavBarButton('#vehicle_nav');
})

$('#return_vehicle').click(function (){
    navigateToPage('#vehicle_return_section');
    activeNavBarButton('#vehicle_nav');
})

$('#add_vehicle_return').click(function (){
    navigateToPage('#vehicle_return_registration');
    activeNavBarButton('#vehicle_nav');
})


function getToken(token){
    return document.cookie.split(token+"=").pop(0).trim();
}



