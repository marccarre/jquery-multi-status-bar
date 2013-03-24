beforeEach(function() {
    this.addMatchers({
        toBeColor: function(expectedColor) {
            function rgbToHex(rgbObject) {
                var rgb = /rgb\((.+),(.+),(.+)\)/i.exec(rgbObject);
                var r = parseInt(rgb[1]);
                var g = parseInt(rgb[2]);
                var b = parseInt(rgb[3]);
                return '#' + (addLeadingZeros(r.toString(16),2) + addLeadingZeros(g.toString(16),2) + addLeadingZeros(b.toString(16),2)).toUpperCase();
            }

            function addLeadingZeros(str, max) {
                return (str.length < max) ? addLeadingZeros("0" + str, max) : str;
            }

            return rgbToHex(this.actual) === expectedColor;
        }
    });
});
