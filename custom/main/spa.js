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

    $(page).css('display', 'block');
}

function callPageFunction(page) {

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






