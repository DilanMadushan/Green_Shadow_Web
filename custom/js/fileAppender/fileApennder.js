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
                    // Set the image preview source
                    $("#fieldImg1_previw").attr("src", e.target.result);
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
                };
                reader.readAsDataURL(file);
            } else {
                // Clear the preview if no file is selected
                $("#fieldImg2_previw").attr("src", "");
            }
        });

    });
})(jQuery);


// <div>
//     <img src="images/img.png" alt="img" id="log_Img1_previw" style="width: 380px"/>
//     <div className="form-group">
//         <label>Field Image 1</label>
//         <input type="file" name="img[]" className="file-upload-default" id="log_button"/>
//         <div className="input-group col-xs-12">
//             <input type="text" className="form-control file-upload-info" disabled=""
//                    placeholder="Upload Image" id="log_input"/>
//             <span className="input-group-append">
//                           <button className="file-upload-browse btn btn-primary" type="button"
//                                   id="log__upload">Upload</button>
//                         </span>


(function ($) {
    'use strict';
    $(function () {
        $('#log__upload').on('click', function () {
            var file = $(this).parent().parent().parent().find('#log_button');
            file.trigger('click');
        });

        $('#log_button').on('change', function () {
            // Update the input field with the selected file's name
            $(this).parent().find('#log_input').val($(this).val().replace(/C:\\fakepath\\/i, ''));

            // Handle image preview
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Set the image preview source
                    $("#log_Img1_previw").attr("src", e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Clear the preview if no file is selected
                $("#log_Img1_previw").attr("src", "");
            }
        });

    });
})(jQuery);