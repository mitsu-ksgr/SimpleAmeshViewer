/*----------------------------------------------------------------------------*

    Tokyo-Amesh Simple Viewer
        amesh_viewer.js

 *----------------------------------------------------------------------------*/
/**
 *  @brief  Amesh View Class.
 */
var AmeshViwer = AmeshViwer || (function() {
    //-------------------------------------------
    //  Private functions.
    /**
     *  @brief  Get an img element for the rain-image.
     */
    var getRainImageElement = function() {
        return document.getElementById('rain');
    };
    /**
     *  @brief  Get an img element for the BG-image.
     */
    var getBGImageElement = function() {
        return document.getElementById('bg');
    };
    /**
     *  @brief  Get an img element for the FG-image.
     */
    var getFGImageElement = function() {
        return document.getElementById('fg');
    };
    /**
     *  @brief  Get the Amesh-URL of the specified date.
     */
    var getAmeshRainImageURL = function(date) {
        // get time.
        var yy = date.getYear() + 1900;
        var mm = date.getMonth() + 1;
        var dd = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        m = m - m % 5;  // at intervals of 5 minutes.

        // convert String.
        var zero_pad = function(n) {return n < 10 ? '0' + n : String(n);}
        yy = String(yy);
        mm = zero_pad(mm);
        dd = zero_pad(dd);
        h = zero_pad(h);
        m = zero_pad(m);

        // generate url.
        var url = 'http://tokyo-ame.jwa.or.jp/mesh/000/'
                    + yy + mm + dd + h + m + '.gif';
        return url;
    };

    //-------------------------------------------
    //  Public functions.
    return {
        /**
         *  @brief  Initialize view class, then load a rain-image.
         */
        'init': function() {
            var scale = UserConfig.loadImageScale();
            var to_px = function(size) {
                return String(Math.round(size * scale)) + 'px';
            };
            var config_w = to_px(OriginImageSize.width);
            var config_h = to_px(OriginImageSize.height);

            // Init body.
            document.body.style.minWidth  = config_w;
            document.body.style.minHeight = config_h;

            // Init images.
            var setup_style = (function() {
                var zindex = 0;
                return function(elem) {
                    elem.style.width = config_w;
                    elem.style.height = config_h;
                    elem.style.position = 'absolute';
                    elem.style.zIndex = zindex++;
                };
            })();
            setup_style(getBGImageElement());
            setup_style(getRainImageElement());
            setup_style(getFGImageElement());
        },

        /**
         *  @brief  Load a rain-image from the Tokyo Amesh.
         */
        'loadRainImage': function(target_date) {
            getRainImageElement().src = getAmeshRainImageURL(target_date);
        },
    };
})();

/**
 *  @brief  Called when the page loaded.
 */
window.onload = function() {
    AmeshViwer.init();

    // if accessed in the update timing, the rain image may not be obtained.
    // so, to generate a url as 30 sec ago state.
    AmeshViwer.loadRainImage(new Date((new Date()).getTime() - 30000));
};
