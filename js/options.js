/*----------------------------------------------------------------------------*

    Tokyo-Amesh Simple Viewer: Options.
        option.js

 *----------------------------------------------------------------------------*/
/**
 *  @brief  Options View class.
 */
var OptView = OptView || (function() {
    //-------------------------------------------
    //  Private Functions.
    /**
     *  @brief  Get the Scale-input element.
     */
    var getInputScaleElement = function() {
        return document.getElementById('input_scale');
    };
    /**
     *  @brief  Get a span element for the Scale Preview.
     */
    var getScalePreviewElement = function() {
        return document.getElementById('scale_preview');
    };
    /**
     *  @brief  Get the SaveButton.
     */
    var getSaveButton = function() {
        return document.getElementById('save_options');
    };

    /**
     *  @brief  Update scale preview.
     */
    var updateScalePreview = function() {
        var preview_elem = getScalePreviewElement();
        var scale = getInputScaleElement().value;

        // error.
        if (scale == '') {
            preview_elem.innerHTML = 'ERROR: Numeric only.';
            return;
        }

        var get_prev_scale = function(size) {
            return String(Math.round(size * scale));
        };
        var dw = get_prev_scale(OriginImageSize.width);
        var dh = get_prev_scale(OriginImageSize.height);
        preview_elem.innerHTML = ' - (' + dw + ' x ' + dh + ')';
    };

    /**
     *  @brief  Save input options.
     */
    var saveOptions = function() {
        var cur_scale = getInputScaleElement().value;

        // Error.
        if (cur_scale == '' || isNaN(cur_scale)) {
            alert('Error occurrred!\nPlease check your input.');
            return;
        }

        UserConfig.saveImageScale(cur_scale);
    };

    //-------------------------------------------
    //  Public Functions.
    return {
        /**
         *  @brief  Initialize view class.
         */
        'init' : function() {
            // init opts.
            getInputScaleElement().value = UserConfig.loadImageScale();
            getInputScaleElement().onchange = updateScalePreview;
            getInputScaleElement().onchange();

            // init save button.
            getSaveButton().onclick = saveOptions;
        },
    };
})();

/**
 *  @brief  Called when the page loaded.
 */
window.onload = function() {
    OptView.init();
};
