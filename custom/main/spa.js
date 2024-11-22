navigateToPage('#dash_board')
activeNavBarButton('#dashboard_nav');

function navigateToPage(page) {
    callPageFunction(page);
    $('#dash_board').css('display', 'none');
    $('#crop_section').css('display', 'none');
    $('#crop_registerSection').css('display', 'none');
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






