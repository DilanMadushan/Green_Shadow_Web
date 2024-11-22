(function ($) {
    'use strict';
    $(function () {
        $('.file-upload-browse').on('click', function () {
            var file = $(this).parent().parent().parent().find('.file-upload-default');
            file.trigger('click');
        });

        $('.file-upload-default').on('change', function () {
            // Update the input field with the selected file's name
            $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));

            // Handle image preview
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Set the image preview source
                    $("#cropIgePrevew").attr("src", e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Clear the preview if no file is selected
                $("#cropImgPreview").attr("src", "");
            }
        });
    });
})(jQuery);
