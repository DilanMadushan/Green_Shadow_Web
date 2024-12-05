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

    if(page == "#field_section"){
        clearFieldFields();
        genarateNextFieldId();
        loadFieldTable();
    }

    if(page == "#log_section"){
        clearLogFields();
        genarateNextLogId();
        loadLogTable();
        setCropIds();
        setFieldId();
        setStaffId();
    }

    if(page == "#staff_section"){
        clearStaffFields();
        genarateNextStaffId();
        loadStaffTable();
    }

    if(page == "#equipment_section"){
        clearEquipmentFields();
        genarateNextEquipmentId();
        loadEquipmentTable();
    }

    if(page == "#vehicle_section"){
        clearVehicleFields();
        genarateNextVehicleId();
        loadVehicleTable();
    }

    if(page == "#equipment_reservation_section"){
        genarateNextEquipmentResavationId();
        loadEquipmentResavationTable();
        setEquipmentResavationFieldId();
        setEquipmentResavationStaffId(); 
        setEquipmentId();
    }

    if(page == "#equipment_return_section"){
        genarateNextEquipmentReturnId();
        loadEquipmentReturnTable();
        setEquipmentReturnFieldId();
        setEquipmentReturnStaffId();
        setEquipmentReturnId();
    }

    if(page == "#vehicle_resevation_section"){
        genarateNextVehicleResavation();
        loadVehicleResavationTable();
        setVehicleResavationStaffId();
        setVehicleResavationVehicleId();
    }

    if(page == "#vehicle_return_section"){
        genarateNextVehicleReturn();
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
    clearCropFields();
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
    chageFieldState("Save");
})

$('#monitering-log_nav').click(function (){
    navigateToPage('#log_section');
    activeNavBarButton('#monitering-log_nav');
})

$('#add_log').click(function (){
    navigateToPage('#log_registerSection');
    activeNavBarButton('#monitering-log_nav');
    changeLogState("Save");
})

$('#staff_nav').click(function (){
    navigateToPage('#staff_section');
    activeNavBarButton('#staff_nav');
})

$('#add_staff').click(function (){
    // clearStaffFields();
    navigateToPage('#staff_registerSection');
    activeNavBarButton('#staff_nav');
    changeStaffState("Save");
})

$('#equipment_nav').click(function (){
    navigateToPage('#equipment_section');
    activeNavBarButton('#equipment_nav');
})

$('#add_equipment').click(function (){
    navigateToPage('#equipment_registerSection');
    activeNavBarButton('#equipment_nav');
    chageEquipmentState("Save");
})

$('#borrow_equipemnt').click(function (){
    navigateToPage('#equipment_reservation_section');
    activeNavBarButton('#equipment_nav');
})

$('#add_equipment_resavation').click(function (){
    navigateToPage('#equipment_reservation_registration');
    activeNavBarButton('#equipment_nav');
    chageEquipmentResavationState("Save");
})

$('#return_equipment').click(function (){
    navigateToPage('#equipment_return_section');
    activeNavBarButton('#equipment_nav');
})

$('#add_equipment_return').click(function (){
    navigateToPage('#equipment_return_section_registration');
    activeNavBarButton('#equipment_nav');
    chageEquipmentReturnState("Save");
})

$('#vehicle_nav').click(function (){
    navigateToPage('#vehicle_section');
    activeNavBarButton('#vehicle_nav');
})

$('#add_vehicle').click(function (){
    navigateToPage('#vehicle_registration');
    activeNavBarButton('#vehicle_nav');
    chageVehicleState("Save");
})

$('#borrow_vehicle').click(function (){
    navigateToPage('#vehicle_resevation_section');
    activeNavBarButton('#vehicle_nav');
})

$('#add_vehicle_resevetion').click(function (){
    navigateToPage('#vehicle_resevation_registration');
    activeNavBarButton('#vehicle_nav');
    chageVehicleResavationState("Save");
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



