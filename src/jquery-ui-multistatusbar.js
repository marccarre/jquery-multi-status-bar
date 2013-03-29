/*******************************************************************************
 * Copyright 2013 Marc CARRE
 * https://github.com/marccarre/jquery-multi-status-bar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

(function($, undefined) {

    $.widget("ui-marccarre.multistatusbar", {
		version: "1.1.0",
		options: {
			width: 200,
			payload: {},
            urls: {},
			colors: [],
            showLegend: true,
            showValuesInLegend: false,
            showValuesInBar: true
		},

        _create: function() {
			var totalNumObjects = sumValues(this.options.payload);
            if (totalNumObjects == 0) {
                this._createEmptyWidget();
            } else {
                this._createAndPopulateWidget(totalNumObjects);
            }
		},

        _createEmptyWidget: function() {
            var bar = new StatusBar(this.options.width);
            bar.addValue("N/A", this.options.width, "#DDDDDD");
            this.element.append(bar.table);
        },

        _createAndPopulateWidget: function(totalNumObjects) {
            var objectWidth = this.options.width / totalNumObjects;

            var bar = new StatusBar(this.options.width);
            this.element.append(bar.table);

            if (this.options.showLegend) {
                var legend = new Legend();
                this.element.append(legend.div);

                bar.table.mouseover(function (event) {
                    legend.div.show();
                });
                bar.table.mouseleave(function (event) {
                    legend.div.hide();
                });
            }

            var colors = this.options.colors;
            var payload = this.options.payload;
            var urls = this.options.urls;
            var i = 0;

            for (var key in payload) {
                var value = payload[key];
                var color = colors[i];

                if (value > 0) {
                    var td = bar.addValue((this.options.showValuesInBar ? value : "&nbsp;"), value * objectWidth, color);

                    if (key in urls) {
                        td.wrapInner('<a href="'+ urls[key]+ '" target="_blank" ></a>');
                    }
                }

                if (this.options.showLegend) {
                    legend.addCategory((this.options.showValuesInLegend ? (key + ": " + value + "/" + totalNumObjects) : key), color);
                }

                i++;
            }
        }});

    //----------------------------------------------------- StatusBar class

    function StatusBar(width) {
        this.table = $("<table width='" + width + "px' cellpadding='0' cellspacing='0'></table>");
        this.table.addClass('ui-widget').addClass('ui-state-default').addClass('ui-corner-all').addClass('ui-multistatusbar');

        this.tr = $("<tr></tr>");
        this.table.append(this.tr);

        this.addValue = function(value, width, color) {
            var td = $("<td style='background-color: " + color + "; width:" + width + "px;'>" + value + "</td>");
            this.tr.append(td);
            return td;
        }
    }

    //----------------------------------------------------- Legend class

    function Legend() {
        this.div = $("<div></div>");
        this.div.addClass('ui-widget').addClass('ui-state-default').addClass('ui-corner-all').addClass('ui-multistatusbar-legend');

        this.table = $("<table></table>");
        this.div.append(this.table);
        this.div.hide(); // Hide legend by default.

        this.addCategory = function(text, color) {
            this.table.append("<tr><td><div class='ui-multistatusbar-legend-icon' style='background-color: " + color + ";'></div></td><td>" + text + "</td></tr>");
        }
    }

    //----------------------------------------------------- Utilities

    function sumValues(dict) {
        var sum = 0;
        for (var key in dict) {
            sum += dict[key];
        }
        return sum;
    }

})(jQuery);