(function ($) {
    'use strict';
    $(function () {
        $('#field1_upload').on('click', function () {
            var file = $(this).parent().parent().parent().find('#fieldImg1_button');
            file.trigger('click');
        });

        $('#fieldImg1_button').on('change', function () {
            // Update the input field with the selected file's name
            $(this).parent().find('#field1_input').val($(this).val().replace(/C:\\fakepath\\/i, ''));

            // Handle image preview
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    $("#fieldImg1_previw").attr("src", e.target.result);
                    $("#field1_base64_input").val(e.target.result.toString());

                    console.log($("#field1_base64_input").val());
                    
                };
                reader.readAsDataURL(file);
            } else {
                // Clear the preview if no file is selected
                $("#fieldImg1_previw").attr("src", "");
            }
        });

    });
})(jQuery);


(function ($) {
    'use strict';
    $(function () {
        $('#field2_upload').on('click', function () {
            var file = $(this).parent().parent().parent().find('#fieldImg2_button');
            file.trigger('click');
        });

        $('#fieldImg2_button').on('change', function () {
            // Update the input field with the selected file's name
            $(this).parent().find('#field2_input').val($(this).val().replace(/C:\\fakepath\\/i, ''));

            // Handle image preview
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Set the image preview source
                    $("#fieldImg2_previw").attr("src", e.target.result);
                    $("#field2_base64_input").val(e.target.result.toString());
                    
                };
                reader.readAsDataURL(file);
            } else {
                // Clear the preview if no file is selected
                $("#fieldImg2_previw").attr("src", "");
            }
        });

    });
})(jQuery);


// (function ($) {
//     'use strict';
//     $(function () {
//         $('#log__upload').on('click', function () {
//             var file = $(this).parent().parent().parent().find('#log_button');
//             file.trigger('click');
//         });

//         $('#log_button').on('change', function () {
//             // Update the input field with the selected file's name
//             $(this).parent().find('#log_input').val($(this).val().replace(/C:\\fakepath\\/i, ''));

//             // Handle image preview
//             const file = this.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = function (e) {
//                     // Set the image preview source
//                     $("#log_Img1_previw").attr("src", e.target.result);
//                     imagefile = e.target.result.toString(); 
//                 };
//                 reader.readAsDataURL(file);
//             } else {
//                 // Clear the preview if no file is selected
//                 $("#log_Img1_previw").attr("src", "");
//             }
//         });

//     });
// })(jQuery);


(function ($) {
    'use strict';
    $(function () {
        $('#crop_upload').on('click', function () {
            var file = $(this).parent().parent().parent().find('#cropImg_button');
            file.trigger('click');
            console.log("1")
        });

        $('#cropImg_button').on('change', function () {
            // Update the input field with the selected file's name
            $(this).parent().find('#crop_input').val($(this).val().replace(/C:\\fakepath\\/i, ''));

            // Handle image preview
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Set the image preview source
                    $("#cropImg_previw").attr("src", e.target.result);

                 
                    const imagefile = e.target.result.toString();
                    const cropbase64_input = $("#cropbase64_input");
                    cropbase64_input.val(imagefile);
                   


                };
                reader.readAsDataURL(file);
            } else {
                // Clear the preview if no file is selected
                $("#cropImg_previw").attr("src", "");
            }
        });

    });
})(jQuery);