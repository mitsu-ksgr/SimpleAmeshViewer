/*----------------------------------------------------------------------------*

    Tokyo-Amesh Simple Viewer.
        config.js

 *----------------------------------------------------------------------------*/
/**
 *  @brief  Original size of amesh-images.
 */
const OriginImageSize = {
    'width' : 770.0, 'height' : 480.0,
};

/**
 *  @brief  User config manager.
 */
var UserConfig = UserConfig || (function() {
    //-------------------------------------------
    //  Key Names.
    const Key_ImageScale = 'image_scale';

    //-------------------------------------------
    //  Public functions.
    return {
        'loadImageScale' : function() {
            var scale = localStorage.getItem(Key_ImageScale);
            return scale == null ? '1.0' : scale;
        },
        'saveImageScale' : function(scale) {
            localStorage.setItem(Key_ImageScale, String(scale));
        },
    };
})();
