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
			colors: []
		},

        _create: function() {
			var totalNumObjects = this._sumValues(this.options.payload);
            if (totalNumObjects == 0) {
                this._createEmptyWidget();
            } else {
                this._createAndPopulateWidget(totalNumObjects);
            }
		},
		
		_sumValues: function(dict) {
			var sum = 0;
			for (var key in dict) {
				sum += dict[key];
			}
			return sum;
		},

        _createEmptyWidget: function() {
            var bar = this._createStatusBar();
            this._populateBar(bar.row, "#DDDDDD", "N/A", this.options.width);
        },

        _createAndPopulateWidget: function(totalNumObjects) {
            var objectWidth = this.options.width / totalNumObjects;
            var bar = this._createStatusBar();
            var legend = this._createLegend();
            this._populate(totalNumObjects, objectWidth, bar.row, legend.table); // Populate with values and associated colors.
            this._hookEvents(bar.statusBar, legend.legend);
        },

        _createStatusBar: function() {
			var statusBar = $("<table width='" + this.options.width + "px' cellpadding='0' cellspacing='0'></table>");
			statusBar.addClass('ui-widget').addClass('ui-state-default').addClass('ui-corner-all').addClass('ui-multistatusbar');
			
			var row = $("<tr></tr>");
			statusBar.append(row);
			
			this.element.append(statusBar); // Add to container.
			
			return {statusBar:statusBar, row:row}; // Return the status bar to hook events, and the row to populate it.
		},
		
		_createLegend: function() {
			var legend = $("<div></div>");
			legend.addClass('ui-widget').addClass('ui-state-default').addClass('ui-corner-all').addClass('ui-multistatusbar-legend');
			
			var table = $("<table></table>");
			legend.append(table);
			
			this.element.append(legend); // Add to container.
			legend.hide(); // Hide legend by default:
			
			return {legend:legend, table:table}; // Return the legend to hook events, and the table to populate it.
		},

        _populate: function(objectsTotal, widthPerObject, bar, legend) {
            var colors = this.options.colors;
            var payload = this.options.payload;

            var i = 0;
            for (var key in payload) {
                var value = payload[key];
                var color = colors[i];
                if (value > 0) { // Only add section in the bar if value is positive
                    this._populateBar(bar, color, value, value * widthPerObject);
                }
                this._populateLegend(legend, color, key);
                i++;
            }
        },

        _populateBar: function(bar, color, value, width) {
			bar.append($("<td style='background-color: " + color + "; width:" + width + "px;'>"+ value +"</td>"));
		},
		
		_populateLegend: function(legend, color, text) {
			legend.append("<tr><td><div class='ui-multistatusbar-legend-icon' style='background-color: " + color + ";'></div></td><td>" + text + "</td></tr>");
		},
		
		_hookEvents: function(statusBar, legend) {
			statusBar.mouseover(function(event) {
				legend.show();
            });
			statusBar.mouseleave(function(event) {
            	legend.hide();
            });
		}
	});

})(jQuery);