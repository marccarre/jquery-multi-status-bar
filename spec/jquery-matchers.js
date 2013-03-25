beforeEach(function() {

    function rgbToHex(rgbObject) {
        function addLeadingZeros(str, max) {
            return (str.length < max) ? addLeadingZeros("0" + str, max) : str;
        }

        var rgb = /rgb\((.+),(.+),(.+)\)/i.exec(rgbObject);
        var r = parseInt(rgb[1]);
        var g = parseInt(rgb[2]);
        var b = parseInt(rgb[3]);
        return '#' + (addLeadingZeros(r.toString(16),2) + addLeadingZeros(g.toString(16),2) + addLeadingZeros(b.toString(16),2)).toUpperCase();
    }

    this.addMatchers({
        toBeColor: function(expectedColor) {
            return rgbToHex(this.actual) === expectedColor;
        },

        toHaveBackgroundColorEqualTo: function(expectedColor) {
            return rgbToHex(this.actual.css('background-color')) === expectedColor;
        },

        toHavePixelWidthOf: function(expectedWidth) {
            return this.actual.css('width') === (Math.round(expectedWidth).toString() + "px");
        }
    });
});
