jquery-multi-status-bar
=======================

The ideal bar to monitor the status of multiple objects.

(Originally hosted at: http://code.google.com/p/jquery-multi-status-bar/)

----

**Current features**:
- Shows values for the provided categories with the provided colors in background.
- Fails gracefully by showing 'N/A' with a grey background if:
  - no object is provided;
  - the sum of values in the provided object is zero.
- Does not show categories for which the value is zero.
- Option to show/hide the legend.
- Option to show/hide values in the status bar.
- Option to show/hide values in the legend.
- Maps an URL to each category, in order to have click-able sections in the status bar.
- Ability to periodically update the status bar by passing an URL and a refresh frequency.

----

**Usage**:
1. Add jQuery and jQuery UI to your page:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>

2. Download the multi-status bar (javascript, css)

3. Add them to your page:

    <link type="text/css" href="jquery-ui-multistatusbar.min.css" rel="stylesheet"/>
    <script type="text/javascript" src="jquery-ui-multistatusbar.min.js"></script>

4. Add a `div` in your page, e.g. :

    <div id="bar"></div>

5. Create the plugin when your page has been loaded, e.g. :

    <script type="text/javascript">
        $(document).ready(function () {
            $("#bar").multistatusbar({
                payload: {"NEW": 2, "IN PROGRESS": 5, "FINISHED": 10},
                colors: ["#D5E5FF", "#FFFF84", "#00CC33"]
            });
        });
    </script>


----

**Backlog**:
- Option to automatically pick colors with a good contrast for the text
- Harmonize width differences caused by ceiling/rounding errors